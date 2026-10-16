#!/usr/bin/env python3
"""
check_spec.py — fail (exit 1) if a pinned value, a structural rule, or a name in
RULES.md no longer matches the build output. Does not check whether the spec's
generated blocks are current; run gen_spec.py --check for that.

Reads styles/tokens.json for values, styles/system.css for classes, and RULES.md
for the class and token names it states. A [WARN] is reported but does not fail
the run: it marks drift in a value no semantic token uses.

Typical flow:  verify_build.py  ->  gen_spec.py  ->  check_spec.py
(see governance/SPEC-CHANGE-PROTOCOL.md)

stdlib only. Python 3.8+.
"""
import argparse, json, os, re, sys

from spec_common import (BREAKPOINTS, DEFAULT_STYLES, FLOW_CONTEXTS, FLOW_STEPS,
                         ROLES, SIZES, SPEC_DIR, TYPESETS, UNSIZED_ROLES,
                         class_names, load_system, load_tokens, parse_rules, px,
                         role_keys, role_label, sections, typography)

# ── values the spec's prose states, pinned so a change to one is caught. When
#    one fires, a decision changed: review the prose that states it, then
#    re-pin the value here and point the comment at the ADR.

# Per-role identity weights (spec: Typography › Per-role identity weights;
# 0003). "Both typesets currently give each role the same weight."
ROLE_WEIGHTS = {"display": 700, "headline": 700, "subhead": 400, "title": 600,
                "subtitle": 400, "body": 400, "label": 500, "metric": 700,
                "caption": 400, "eyebrow": 500}

# Font weights (spec: Typography › Font Weight).
FONT_WEIGHTS = {"light": 300, "regular": 400, "medium": 500, "semi-bold": 600, "bold": 700}

# Typeface purposes (spec: Typography › Typeface).
TYPEFACES = {"display": "Inter", "default": "Inter", "code": "Source Code Pro"}

# The primitive type scale, step -> px (spec: Primitive Typography Scale).
TYPE_SCALE_PX = {-2: 12, -1: 14, 0: 16, 1: 18, 2: 20, 3: 22, 4: 24, 5: 26, 6: 28,
                 7: 30, 8: 32, 9: 36, 10: 40, 11: 48, 12: 56, 13: 64, 14: 72}

# Line height = font-size + k, k in px (spec: Line Height; 0003).
LINE_HEIGHT_K = {"tight": 4, "default": 8, "loose": 12}

# Breakpoints in px (spec: Patterns per tier › Primitive › Breakpoint).
BREAKPOINTS_PX = {"sm": 640, "md": 768, "lg": 1024, "xl": 1280, "2xl": 1536}

# The flow ramp in px, as authored in Figma (0005). Each step is a pure
# reference to a primitive spacing, never a restated value.
FLOW_RAMP_PX = {
    "spacious": {"tight": 4, "default": 16, "loose": 24, "section": 40},
    "standard": {"tight": 4, "default":  8, "loose": 16, "section": 24},
    "compact":  {"tight": 4, "default":  4, "loose":  8, "section":  8},
}
# Content outside any declared context takes standard (0005, 0016): the bare
# --flow-{step} properties on :root point at it, so a utility outside any
# context class still resolves instead of falling back to 0.
FLOW_DEFAULT_CONTEXT = "standard"

# The public spacing aliases (0004): each --spacing-{n} must exist and be a pure
# reference to the identically keyed primitive. Guards a dropped step and the
# mis-key bug (--spacing-9 -> --primitive-spacing-10).
SPACING_ALIAS_REQUIRED = ["1", "2", "3", "4", "5", "6", "7", "8", "10", "12",
                          "14", "16", "20", "24", "px", "0-5", "1-5", "2-5", "3-5"]

# Elevation runs 0 to 6 (0011), as tokens and as classes.
ELEVATION_STEPS = [str(n) for n in range(7)]

# Emphasis modifiers (spec: Typography › Emphasis modifier).
EMPHASIS = {"text-strong": "semi-bold", "text-soft": "regular"}

# Every flow rule is rooted at the element declaring the context: a child
# combinator straight after the context group (0005, 0016). A descendant
# combinator there reaches through nested contexts and into components, at a
# specificity the component can't override.
# Author-declared steps beat inferred ones by exclusion, not specificity: every
# sibling rule carries the guard. Guarding only some reorders the rules against
# each other (eyebrow -> heading flips from tight to section).
FLOW_OWL_GUARD = '.mt-flow, [class*="mt-flow-"]'

# Names in RULES.md that look like classes but are not system classes.
RULES_NOT_CLASSES = {
    "ds-doc-frame": "a skill, not a class (0009)",
    "space-before": "a retired token property, not a class (0003)",
}

# Each styles/ output except these must be in the package's exports map (0014).
# Emitted-but-unwired has been the shape of three earlier defects: the file is
# rebuilt every time, looks maintained, and reaches nothing.
UNEXPORTED_OUTPUTS = {"tokens.json": "tooling only (RFC 0003, workstream 6)"}

# ───────────────────────── reporting ──────────────────────────────────────

class Report:
    def __init__(self):
        self.ok = True

    def heading(self, text):
        print(text + ":")

    def result(self, failures, passed, warn=False):
        """failures: lines to report. passed: the PASS line when there are none."""
        if not failures:
            print(f"  [PASS] {passed}")
            return
        if not warn:
            self.ok = False
        for line in failures:
            print(f"  [{'WARN' if warn else 'FAIL'}] {line}")

# ───────────────────────── token checks ───────────────────────────────────

def check_spacing(r, tokens):
    r.heading("spacing aliases (--spacing-{n} -> --primitive-spacing-{n}, 0004)")
    aliases = {k[len("--spacing-"):]: t for k, t in tokens.items()
               if k.startswith("--spacing-")}
    fails = [f"--spacing-{k} is missing" for k in SPACING_ALIAS_REQUIRED if k not in aliases]
    for key, t in aliases.items():
        ref = t.get("references")
        if ref is None:
            fails.append(f"--spacing-{key} restates a value instead of referencing a primitive")
        elif ref != f"--primitive-spacing-{key}":
            fails.append(f"--spacing-{key} -> {ref} (expected --primitive-spacing-{key})")
    r.result(fails, f"{len(aliases)} aliases, each a pure reference to the matching primitive")

def flow_token(context, step):
    return f"--flow-{context}" if step == "default" else f"--flow-{context}-{step}"

def check_flow_tokens(r, tokens):
    r.heading("flow ramp (--flow-{context}[-{step}], 0005)")
    fails = []
    for context in FLOW_CONTEXTS:
        for step in FLOW_STEPS:
            name = flow_token(context, step)
            t = tokens.get(name)
            if t is None:
                fails.append(f"{name} is missing")
                continue
            if not str(t.get("references", "")).startswith("--primitive-spacing-"):
                fails.append(f"{name} restates a value instead of referencing a primitive spacing")
            want = FLOW_RAMP_PX[context][step]
            if px(t["value"]) != want:
                fails.append(f"{name} = {px(t['value'])}px, pinned {want}px")
    r.result(fails, "12 steps match the pinned ramp (spacious 4/16/24/40, "
                    "standard 4/8/16/24, compact 4/4/8/8), each a primitive reference")

    fails = []
    for step in FLOW_STEPS:
        want = flow_token(FLOW_DEFAULT_CONTEXT, step)
        got = tokens.get(f"--flow-{step}", {}).get("references")
        if got != want:
            fails.append(f"--flow-{step} -> {got} (expected {want}); a utility outside "
                         "any context would resolve an undefined property and fall back to 0")
    r.result(fails, f"the bare --flow-{{step}} properties point at {FLOW_DEFAULT_CONTEXT}")

def check_typography(r, tokens, model):
    r.heading("typography tokens (0002, 0003)")
    props = ["font-family", "font-size", "font-weight", "letter-spacing", "line-height"]
    expected = {(bp, ts, role, size, prop) for bp in BREAKPOINTS for ts in TYPESETS
                for role, size in role_keys() for prop in props}
    missing = sorted(expected - set(model), key=str)
    extra = sorted(set(model) - expected, key=str)
    fails = [f"missing: --typography-{bp}-{ts}-{role_label(ro, sz)}-{p}"
             for bp, ts, ro, sz, p in missing[:10]]
    fails += [f"not in the spec's role set: --typography-{bp}-{ts}-{role_label(ro, sz)}-{p}"
              for bp, ts, ro, sz, p in extra[:10]]
    if len(missing) + len(extra) > 20:
        fails.append(f"({len(missing)} missing and {len(extra)} unexpected in all)")
    r.result(fails, f"both typesets define every role and size at {len(BREAKPOINTS)} "
                    f"breakpoints ({len(expected)} tokens); eyebrow alone has no size")

    fails = []
    for (bp, ts, role, size, prop), value in model.items():
        if prop == "font-weight" and value != ROLE_WEIGHTS.get(role):
            fails.append(f"{bp} {ts} {role_label(role, size)} weight {value}, "
                         f"pinned {ROLE_WEIGHTS.get(role)}")
    r.result(fails[:10], "every role takes its pinned identity weight in both typesets")

    fails = []
    for (bp, ts, role, size, prop), value in model.items():
        if prop != "line-height":
            continue
        k = value - model[(bp, ts, role, size, "font-size")]
        if k not in LINE_HEIGHT_K.values():
            fails.append(f"{bp} {ts} {role_label(role, size)}: line height is font-size + "
                         f"{k}px, not one of {sorted(LINE_HEIGHT_K.values())}")
    r.result(fails[:10], "every role's line height is font-size + 4, 8 or 12px")

def check_primitives(r, tokens):
    r.heading("primitive values the spec states")
    fails = []
    for step, want in TYPE_SCALE_PX.items():
        t = tokens.get(f"--primitive-typography-scale-{step}")
        if t is None or px(t["value"]) != want:
            fails.append(f"scale step {step}: {t and px(t['value'])}px, pinned {want}px")
    steps = {int(k.rsplit("scale-", 1)[1]) for k in tokens
             if k.startswith("--primitive-typography-scale-")}
    if steps - set(TYPE_SCALE_PX):
        fails.append(f"unlisted scale steps: {sorted(steps - set(TYPE_SCALE_PX))}")
    r.result(fails, f"type scale: {len(TYPE_SCALE_PX)} steps, 12px to 72px")

    fails = []
    for name, want in FONT_WEIGHTS.items():
        got = tokens.get(f"--primitive-typography-font-weight-{name}", {}).get("value")
        if got != want:
            fails.append(f"font-weight-{name} = {got}, pinned {want}")
    emitted = {k.rsplit("font-weight-", 1)[1] for k in tokens
               if k.startswith("--primitive-typography-font-weight-")}
    unlisted = emitted - set(FONT_WEIGHTS)
    if unlisted:
        fails.append(f"weights the spec does not list: {sorted(unlisted)}")
    for purpose, want in TYPEFACES.items():
        got = tokens.get(f"--primitive-typography-font-family-{purpose}", {}).get("value")
        if got != want:
            fails.append(f"font-family-{purpose} = {got!r}, pinned {want!r}")
    for bp, want in BREAKPOINTS_PX.items():
        got = tokens.get(f"--primitive-breakpoint-{bp}", {}).get("value")
        if got is None or px(got) != want:
            fails.append(f"breakpoint {bp} = {got}, pinned {want}px")
    for step in ELEVATION_STEPS:
        if f"--elevation-{step}" not in tokens:
            fails.append(f"--elevation-{step} is missing")
    r.result(fails, "weights, typefaces, breakpoints and elevation 0 to 6 match the spec")

    # The formula also generates the primitive line heights. A primitive no
    # role uses can drift without reaching a page, so it warns.
    fails = []
    for name, t in tokens.items():
        m = re.fullmatch(r"--primitive-typography-line-height-(\w+)-(-?\d+)", name)
        if not m:
            continue
        kind, step = m.group(1), int(m.group(2))
        size = TYPE_SCALE_PX.get(step)
        if size is not None and px(t["value"]) != size + LINE_HEIGHT_K[kind]:
            fails.append(f"{name} = {px(t['value'])}px; {size}px + {LINE_HEIGHT_K[kind]} "
                         f"gives {size + LINE_HEIGHT_K[kind]}px (fix in Figma)")
    r.result(fails, "primitive line heights follow font-size + k", warn=True)

# ───────────────────────── system.css checks ──────────────────────────────

def check_classes(r, rules, css_sections):
    r.heading("system.css names every class the spec does (0015)")
    names = class_names(rules)
    want = ["typeset-longform", "typeset-product"]
    want += [role_label(role, size) for role, size in role_keys()]
    want += [f"flow-{c}" for c in FLOW_CONTEXTS]
    want += [f"elevation-{s}" for s in ELEVATION_STEPS]
    want += list(EMPHASIS)
    missing = [n for n in want if n not in names]
    r.result([f".{n} is missing" for n in missing], f"{len(want)} classes present")

    fails = []
    for selector, decls, _m in parse_rules(css_sections.get("Emphasis", "")):
        name = selector.lstrip(".")
        want = EMPHASIS.get(name)
        got = decls.get("font-weight")
        if want and got != f"var(--primitive-typography-font-weight-{want})":
            fails.append(f".{name} font-weight is {got}, pinned the {want} primitive")
    r.result(fails, "the emphasis modifiers bind the weights the spec shows")

def flow_utility(prefix, step):
    return prefix if step == "default" else f"{prefix}-{step}"

def check_flow_css(r, css_sections):
    r.heading("flow utilities and rules (0002, 0005, 0016)")
    rules = parse_rules(css_sections.get("Flow utilities", ""))
    got = sorted(s.lstrip(".") for s, _d, _m in rules)
    want = sorted(flow_utility(p, s) for p in ("mt-flow", "gap-flow") for s in FLOW_STEPS)
    fails = []
    if got != want:
        fails.append(f"utilities {got}, expected {want} (the default step is implied: "
                     ".mt-flow, not .mt-flow-default)")
    prefixed = [g for g in got if re.match(r"(mt|gap)-flow-(%s)\b" % "|".join(FLOW_CONTEXTS), g)]
    if prefixed:
        fails.append(f"context-prefixed utilities {prefixed}: a utility carries a "
                     "relationship, never a density")
    r.result(fails, "the four mt-flow and four gap-flow utilities, the default step implied")

    rules = parse_rules(css_sections.get("Flow rules", ""))
    roots = re.match(r":is\(([^)]*)\) > ", rules[1][0] if len(rules) > 1 else "")
    fails = []
    if not roots or not {f".flow-{c}" for c in FLOW_CONTEXTS} <= set(roots.group(1).split(", ")):
        fails.append("the flow rules' context group does not hold the three flow contexts")
        r.result(fails, "")
        return
    root = roots.group(0)
    reset, *placed = rules
    if not reset[0].startswith(":where("):
        fails.append(f"the first flow rule should be the :where() margin reset, got {reset[0][:60]}")
    unrooted = [s for s, _d, _m in placed if not s.startswith(root)]
    fails += [f"not rooted at the context element: {s[:90]}…" for s in unrooted]
    r.result(fails, f"all {len(placed)} flow rules start '{root.strip()}'")

    def sibling_pair(selector):
        rest = mask_groups(selector[len(root):])
        return " + " in rest and all(" " not in p.strip() for p in rest.split(" + "))
    siblings = [s for s, _d, _m in placed if sibling_pair(s)]
    unguarded = [s for s in siblings if f":not(.sr-only, [hidden], template, {FLOW_OWL_GUARD})" not in s
                 and f":not({FLOW_OWL_GUARD})" not in s]
    r.result([f"no owl guard, so an author's .mt-flow-* loses: {s[:90]}…" for s in unguarded],
             f"all {len(siblings)} sibling rules exclude {FLOW_OWL_GUARD} "
             f"({len(placed) - len(siblings)} descendant rules exempt)")

def mask_groups(selector):
    """Blank the inside of every (...) group, so combinators inside :is()/:not()
    lists are not read as structure."""
    out, depth = [], 0
    for ch in selector:
        depth += ch == "("
        out.append("_" if depth and ch not in "()" else ch)
        depth -= ch == ")"
    return "".join(out)

def check_typography_delivery(r, rules):
    """Role properties are set on the typeset, never on the role element. A
    declaration on an element beats an inherited one outright, so a role-level
    rule from an outer typeset overrides a nested typeset's own values (the
    chart subtitle bug). Set on the typeset, the innermost typeset wins."""
    r.heading("role properties are set on the typeset, never on the text (0003)")
    role_prop = re.compile(r"--(%s)(-(%s))?-(font|line|letter)" % ("|".join(ROLES), "|".join(SIZES)))
    fails, setters = [], set()
    for selector, decls, _m in rules:
        if not any(role_prop.match(p) for p in decls):
            continue
        for part in (p.strip() for p in selector.split(",")):
            setters.add(part)
            if part != ":root" and not re.fullmatch(r"\.typeset-[\w-]+", part):
                fails.append(f"{part} sets role properties; only :root and typeset classes may")
    r.result(fails, f"only {', '.join(sorted(setters))} set role properties")

def check_aliases(r, css_sections):
    r.heading("each usage alias reads one role (0003)")
    fails, count = [], 0
    for selector, decls, _m in parse_rules(css_sections.get("Usage aliases", "")):
        read = {m.group(1) for v in decls.values()
                for m in re.finditer(r"var\(--((?:%s)(?:-(?:%s))?)-(?:font|line|letter)"
                                     % ("|".join(ROLES), "|".join(SIZES)), v)}
        if not read:
            continue
        count += 1
        if len(read) != 1:
            fails.append(f"{selector} reads {sorted(read)}")
    r.result(fails, f"{count} alias rules, each reading a single role")

def check_outputs(r, styles_dir):
    r.heading("every output is published (0014)")
    pkg = json.load(open(os.path.join(os.path.dirname(styles_dir), "package.json")))
    exported = {os.path.normpath(v) for v in pkg.get("exports", {}).values()}
    fails = []
    for f in sorted(os.listdir(styles_dir)):
        rel = os.path.normpath(os.path.join("styles", f))
        if f not in UNEXPORTED_OUTPUTS and rel not in exported:
            fails.append(f"styles/{f} is built but not in the exports map")
    r.result(fails, "each styles/ output is in the exports map, or listed as tooling only")

# ───────────────────────── RULES.md ───────────────────────────────────────

def name_pattern(name):
    """A RULES.md name -> regex. {placeholder} and * match any name segment."""
    out = ""
    for part in re.split(r"(\{[^}]*\}|\*)", name):
        out += r"[\w-]+" if part.startswith("{") or part == "*" else re.escape(part)
    return re.compile(out + r"\Z")

def rules_names(text):
    """(kind, name, negated, line) for each class or token name RULES.md states.
    A name is negated when RULES.md says it is not used: 'not `X`', or a
    sentence that ends 'are retired'."""
    found = []
    for lineno, line in enumerate(text.splitlines(), 1):
        for sentence in re.split(r"(?<=[.:])\s+(?=[A-Z*])", line):
            retired = re.search(r"\bretired\b", sentence)
            for m in re.finditer(r"`([^`]+)`|(?<![\w`-])(--[a-z][\w{}*–-]*)", sentence):
                name = (m.group(1) or m.group(2)).strip()
                # A grammar pattern with optional [-{segment}] parts names no
                # token, and a dotted name (--spacing-0.5) is never valid CSS.
                after = sentence[m.end():m.end() + 2]
                if m.group(2) and (after[:1] in "[`" or re.match(r"\.\d", after)):
                    continue
                negated = bool(re.search(r"\bnot\s*$", sentence[:m.start()])) or bool(retired)
                if name.startswith("--"):
                    if re.fullmatch(r"--[a-z][\w{}*–-]*", name):
                        found.append(("token", name, negated, lineno))
                elif re.fullmatch(r"\.?[a-z][a-z0-9]*(-[a-z0-9{}–]+)+(\{[^}]+\})?", name) \
                        or re.fullmatch(r"\.[a-z][\w{}–-]*", name):
                    bare = name.lstrip(".")
                    if bare not in RULES_NOT_CLASSES:
                        found.append(("class", bare, negated, lineno))
    return found

def check_rules_md(r, rules_path, tokens, rules):
    r.heading(f"names in {os.path.basename(rules_path)} exist in the build")
    classes = class_names(rules)
    fails, checked = [], 0
    for kind, name, negated, line in rules_names(open(rules_path).read()):
        pool = classes if kind == "class" else tokens.keys()
        pattern = name_pattern(name)
        present = any(pattern.match(n) for n in pool)
        where = "system.css" if kind == "class" else "tokens.json"
        shown = f".{name}" if kind == "class" else name
        checked += 1
        if negated and present:
            fails.append(f"line {line}: {shown} is ruled out, but {where} has it")
        elif not negated and not present:
            fails.append(f"line {line}: {shown} is not in {where}")
    r.result(fails, f"{checked} class and token names agree with system.css and tokens.json")

# ───────────────────────── command ────────────────────────────────────────

def cmd_check(styles_dir, rules_path):
    r = Report()
    tokens = load_tokens(styles_dir)
    model = typography(tokens)
    css = load_system(styles_dir)
    rules = parse_rules(css)
    css_sections = sections(css)

    check_spacing(r, tokens)
    check_flow_tokens(r, tokens)
    check_typography(r, tokens, model)
    check_primitives(r, tokens)
    check_classes(r, rules, css_sections)
    check_flow_css(r, css_sections)
    check_typography_delivery(r, rules)
    check_aliases(r, css_sections)
    check_outputs(r, styles_dir)
    check_rules_md(r, rules_path, tokens, rules)

    print("OK" if r.ok else "DRIFT DETECTED")
    sys.exit(0 if r.ok else 1)

def main():
    ap = argparse.ArgumentParser(description=" ".join(__doc__.strip().split("\n\n")[0].split()))
    ap.add_argument("--styles", default=DEFAULT_STYLES, help="built styles/ directory")
    ap.add_argument("--rules", default=os.path.join(SPEC_DIR, "RULES.md"), help="path to RULES.md")
    a = ap.parse_args()
    cmd_check(a.styles, a.rules)

if __name__ == "__main__":
    main()
