#!/usr/bin/env python3
"""
regen_spec.py — keep design-system-specification.md downstream of the build.

The emitted CSS in styles/ is ground truth (it ships; the SD build is
deterministic). This tool makes the spec's *value* content generated from that
output, so the spec can only ever be out-of-date (fixable by a rerun), never
wrong. Prose — intent, rationale, role logic — stays hand-written and untouched.

Two things it does:
  * GENERATE the pure-value blocks (CSS appendix, spacing table, the two
    responsive matrices) in place, between <!-- GEN:name START/END --> markers.
  * LINT the hand-written prose values (caption size, chart ticks, reading
    leading, eyebrow weight, ...) against the emitted output + a pinned set of
    decisions, so drift in prose is reported for a human to fix.

Commands
  gen           regenerate the marked blocks from styles/ (writes the spec)
  check         fail (exit 1) if any marked block is stale OR any lint fails
  verify-build  reproduce the SD build and diff vs shipped styles/ (the harness)

Typical flow:  verify-build  ->  gen  ->  check   (see SPEC-CHANGE-PROTOCOL.md)

stdlib only. Python 3.8+.
"""
import argparse, os, re, sys, shutil, subprocess, tempfile, difflib

MODES = ["base", "sm", "md", "lg", "xl"]
PROPS = ["font-size", "line-height", "font-weight", "letter-spacing",
         "font-family", "space-before"]

# ── decisions expressed as machine-checkable expectations (keep in step with
#    DECISIONS.md). When one of these fires it means a decision changed and the
#    prose that states it needs review, then re-pin the value here.
PINNED = [
    # (description, family, role, prop, expected, modes)  modes=None -> all modes
    ("caption = 12px (prose)",            "prose",   "caption",   "font-size",   12,     None),
    ("caption = 12px (product)",          "product", "caption",   "font-size",   12,     None),
    ("prose body reading leading 1.625",  "prose",   "body",      "line-height", 1.625,  None),
    ("prose body-sm reading leading 1.571","prose",  "body-sm",   "line-height", 1.5714, None),
    ("prose body stays 16px all modes",   "prose",   "body",      "font-size",   16,     None),
    ("chart tick = 14px (default)",       "chart",   "tick",      "font-size",   14,     None),
    ("chart tick-sm = 12px (default)",    "chart",   "tick-sm",   "font-size",   12,     None),
    ("chart axis-title = 14px",           "chart",   "axis-title","font-size",   14,     None),
    ("chart axis-title weight 500",       "chart",   "axis-title","font-weight", 500,    None),
    ("chart label = 14px",                "chart",   "label",     "font-size",   14,     None),
    ("chart title = 20px (= product)",    "chart",   "title",     "font-size",   20,     None),
    ("chart subtitle = 16px (= product)", "chart",   "subtitle",  "font-size",   16,     None),
    ("chart eyebrow = 14px (= product)",  "chart",   "eyebrow",   "font-size",   14,     None),
    ("prose eyebrow weight 500",          "prose",   "eyebrow",   "font-weight", 500,    None),
    ("product eyebrow wt 500",            "product", "eyebrow",   "font-weight", 500,    None),
]

# ── public spacing-alias contract (--spacing-{n} -> var(--primitive-spacing-{n})).
#    These are the dev-facing rungs (migration-table targets + sub-steps); each
#    MUST exist and resolve to the identically-keyed primitive by *pure reference*
#    (never a restated value). Guards two failure classes: a dropped rung, and the
#    mis-key bug (e.g. --spacing-9 -> --primitive-spacing-10). Keep in step with
#    DECISIONS.md "spacing consumption alias --spacing-{n} -> primitive".
SPACING_ALIAS_REQUIRED = ["1", "2", "3", "4", "5", "6", "7", "8", "10", "12",
                          "14", "16", "20", "24", "px", "0-5", "1-5", "2-5", "3-5"]

# ── the Figma-authored flow ramp (semantic-flow, 3 contexts x 4 rungs), in px
#    before the /16. These are the pinned values: `custom/flow` emits them as flat
#    --flow-{context}-{rung} vars in styles/flow.css, and the .flow-{context}
#    blocks must be *pure references* to them (never restated literals) so a Figma
#    change propagates. Keep in step with DECISIONS.md "flow ramp reference chain".
FLOW_CONTEXTS = ["prose", "product", "compact"]
FLOW_RUNGS = ["tight", "default", "loose", "section"]
# The generated utility surface is the FOUR context-agnostic rungs, never the
# twelve context-prefixed ones (withdrawn in change-set 02): mt-flow-product-section
# resolves a flat var directly, so it is context-INdependent by construction — `mt-6`
# wearing a flow badge, opting its element out of the rhythm it sits in. A rung
# utility carries a RELATIONSHIP; density comes from the context class in scope.
FLOW_UTILITY_KEYS = ["flow-" + r for r in FLOW_RUNGS]
# Product is the library default density: flow.css must define the four BARE
# --flow-{rung} vars on :root, so a rung utility in a component with no ancestor
# context class is not a silent no-op (undefined var -> invalid at computed-value
# time -> margin-top falls back to 0).
FLOW_DEFAULT_CONTEXT = "product"
# Author-declared rungs must beat DOM-inferred ones. Enforced by EXCLUSION, not by
# escalating specificity: every sibling rule in flow/flow.cjs that sets margin-top
# carries this guard. It must be on ALL of them — guarding only some raises those
# rules from (0,3,0) to (0,4,0) while the rest stay put, which silently inverts the
# companion-coupling order (eyebrow->heading flips from tight to section).
FLOW_OWL_GUARD = '[class*="mt-flow-"]'
# Every flow rule is ROOTED at the element declaring the context: a child combinator
# immediately after the :is() context group. A descendant combinator there reaches
# arbitrary depth — through `not-prose`, through a nested context, into any component —
# and the component author cannot override it (the rule computes to (0,1,3); the
# obvious `[&>li+li]:mt-0` only reaches (0,1,2)). That was the footnote ghost-margin
# bug in ChromeFooter/TableContainer. Keep in step with DECISIONS.md "a declared
# context seals its subtree".
FLOW_ROOT = ":is(.flow-prose, .flow-product, .flow-compact) > "
FLOW_RAMP_PX = {
    "prose":   {"tight": 4, "default": 16, "loose": 24, "section": 40},
    "product": {"tight": 4, "default":  8, "loose": 16, "section": 24},
    "compact": {"tight": 4, "default":  4, "loose":  8, "section":  8},
}

# ── ordered editorial rows for the responsive matrices. Each display row names
#    one or more emitted roles; multi-role rows must share a value (asserted).
PROSE_ROWS = [
    ("Eyebrow",  ["eyebrow"]),  ("Display", ["display"]), ("Headline", ["headline"]),
    ("Subhead",  ["subhead"]),  ("Title 1", ["title-1"]), ("Title 2", ["title-2"]),
    ("Title 3",  ["title-3"]),  ("Title 4", ["title-4"]), ("Subtitle", ["subtitle"]),
    ("Lead",     ["lead"]),     ("Body",    ["body"]),    ("Body Sm", ["body-sm"]),
    ("Caption",  ["caption"]),
]
PRODUCT_ROWS = [
    ("Page head",           ["page-head"]),
    ("Metric",              ["metric"]),
    ("Section head",        ["section-head"]),
    ("Title",               ["title"]),
    ("Metric Sm",           ["metric-sm"]),
    ("Body / Field value",  ["body"]),
    ("Body Sm / Label",     ["body-sm", "label"]),
    ("Caption",             ["caption"]),
    ("Label Sm",            ["label-sm"]),
]
# roles legitimately absent from the collapsed matrices (editorial), so the
# "did the emitted role set change?" assertion doesn't false-alarm on them.
# `subtitle`/`eyebrow` are metric duplicates of body/label (renamed 07-27 from
# card-panel-subtitle/card-panel-eyebrow) — omitted here for the same reason
# the old names were: a dedicated row would just repeat Body/Label's values.
PRODUCT_MATRIX_OMIT = {"subtitle", "eyebrow"}

# ── role names chart shares with another type set. `chart/{role}` must resolve to
#    the same value as its `product/{role}` source: chart aliases product for these
#    (title/subtitle/eyebrow) or restates the identical primitive (label). A shared
#    name whose values DIVERGE is the shape of the subtitle bug — chart/subtitle
#    rendered at prose's 18px inside a prose page for as long as the chart family
#    had shipped, and went unseen only because every other shared name coincided.
#    Keep in step with DECISIONS.md "a nested context seals only the roles it defines".
CHART_SHARED_ROLES = ["title", "subtitle", "eyebrow", "label"]

# representative roles shown in the CSS appendix typography sample
SAMPLE = [
    ("prose",   ["display", "body", "body-sm", "caption"]),
    ("product", ["title", "label", "label-sm"]),
    ("chart",   ["axis-title", "tick", "tick-sm"]),
]

# ───────────────────────── parsing the emitted CSS ─────────────────────────

def parse_typography(styles_dir):
    """styles/typography.css -> {(mode,family,role,prop): raw_value_string}"""
    path = os.path.join(styles_dir, "typography.css")
    txt = open(path).read()
    prop_alt = "|".join(map(re.escape, PROPS))
    pat = re.compile(
        r"--typography-(" + "|".join(MODES) + r")-(prose|product|chart)-"
        r"(.+?)-(" + prop_alt + r")\s*:\s*([^;]+);")
    model = {}
    for mode, fam, role, prop, val in pat.findall(txt):
        model[(mode, fam, role, prop)] = val.strip()
    if not model:
        sys.exit(f"ERROR: parsed 0 declarations from {path}")
    return model

def fs_px(raw):
    """font-size raw -> integer px. Prefers the primitive name; falls back to rem."""
    m = re.search(r"font-size-(\d+)", raw)
    if m:
        return int(m.group(1))
    m = re.search(r"([0-9.]+)rem", raw)
    if m:
        return round(float(m.group(1)) * 16)
    raise ValueError(f"cannot read px from font-size {raw!r}")

def weight_num(raw):
    m = re.search(r"font-weight-(\w[\w-]*)", raw)
    names = {"light":300,"regular":400,"medium":500,"semi-bold":600,"bold":700}
    if m and m.group(1) in names:
        return names[m.group(1)]
    m = re.search(r"\b(\d{3})\b", raw)
    return int(m.group(1)) if m else None

def role_set(model, family):
    return {role for (_m, fam, role, _p) in model if fam == family}

def parse_primitive_scale(styles_dir):
    path = os.path.join(styles_dir, "primitive-scale.css")
    txt = open(path).read()
    fs = re.findall(r"(--primitive-typography-font-size-\d+):\s*([^;]+);", txt)
    sp = re.findall(r"(--primitive-spacing-[0-9a-z-]+):\s*([^;]+);", txt)
    return fs, sp

def parse_spacing_alias(styles_dir):
    """styles/spacing.css -> {alias_key: referenced_primitive_key or None}, in
    emission order. e.g. '--spacing-4: var(--primitive-spacing-4, 1rem);' -> 4:'4'.
    The var() target is what matters (the fallback is not part of the contract)."""
    path = os.path.join(styles_dir, "spacing.css")
    txt = open(path).read()
    out = {}
    for key, body in re.findall(r"--spacing-([0-9a-z-]+)\s*:\s*([^;}]+)", txt):
        m = re.search(r"var\(\s*--primitive-spacing-([0-9a-z-]+)", body)
        out[key] = m.group(1) if m else None
    if not out:
        sys.exit(f"ERROR: parsed 0 --spacing-* aliases from {path}")
    return out

# ───────────────────────── generating the blocks ──────────────────────────

def gen_css_appendix(styles_dir):
    fs, sp = parse_primitive_scale(styles_dir)
    sp_whole = [(n, v) for n, v in sp if re.search(r"spacing-\d+$", n)]
    sp_sub   = [(n, v) for n, v in sp if not re.search(r"spacing-\d+$", n)]
    m = parse_typography(styles_dir)
    L = []
    L += ["```css",
          "/* ---------------------------------------------------------------",
          "   GENERATED FROM TOKENS - DO NOT HAND-EDIT (regen_spec.py gen).",
          "   Emitted by Style Dictionary from the Figma export. Representative",
          "   excerpt; full per-mode set is the shipped output under styles/.",
          "   Grammar: primitives named by px; semantics",
          "   --typography-{mode}-{family}-{role}-{prop}; spacing --primitive-spacing-{n}.",
          "   There is no --fs-*, --lh-*, --sp-*, --prose-*, or --ui-*.",
          "   --------------------------------------------------------------- */",
          "",
          "/* -- Primitives -------------------------------------------------- */",
          ":root {",
          "  /* Font family + weights (note semi-bold is hyphenated). */",
          "  --primitive-typography-font-family: Inter;",
          "  --primitive-typography-font-weight-light: 300;",
          "  --primitive-typography-font-weight-regular: 400;",
          "  --primitive-typography-font-weight-medium: 500;",
          "  --primitive-typography-font-weight-semi-bold: 600;",
          "  --primitive-typography-font-weight-bold: 700;",
          "",
          "  /* Font-size scale - named by px, emitted in rem. 13px not emitted. */"]
    L += [f"  {n}: {v};" for n, v in fs]
    L += ["",
          "  /* Numbered spacing - index x 4px (--primitive-spacing-4 = 16px). */"]
    L += [f"  {n}: {v};" for n, v in sp_whole]
    L += [f"  {n}: {v};" for n, v in sp_sub]
    L += ["}", "",
          "/* -- Semantic typography (base slice; sm/md/lg/xl follow) -------- */",
          ":root {"]
    for fam, roles in SAMPLE:
        L.append(f"  /* {fam} */")
        for r in roles:
            fsz = m.get(("base", fam, r, "font-size"))
            lh  = m.get(("base", fam, r, "line-height"))
            wt  = m.get(("base", fam, r, "font-weight"))
            if fsz: L.append(f"  --typography-base-{fam}-{r}-font-size: {fsz};")
            if lh:  L.append(f"  --typography-base-{fam}-{r}-line-height: {lh};")
            if wt:  L.append(f"  --typography-base-{fam}-{r}-font-weight: {wt};")
    L += ["}", ""]
    flow = open(os.path.join(styles_dir, "flow.css")).read().strip().splitlines()
    L += ["/* -- Content flow (context themes; each rung a --primitive-spacing-{n}) */"]
    L += [ln.rstrip() for ln in flow]
    L += ["```"]
    return "\n".join(L)

def gen_spacing_table(styles_dir):
    _fs, sp = parse_primitive_scale(styles_dir)
    rows = ["| Token | Value (px) | Value (rem) |", "|-------|-----------|-------------|"]
    for name, val in sp:
        mnum = re.search(r"spacing-(\d+)$", name)
        if mnum:
            px = f"{int(mnum.group(1))*4}px"
        else:
            sub = {"px":"1px","0-5":"2px","1-5":"6px","2-5":"10px","3-5":"14px"}
            key = name.split("primitive-spacing-")[1]
            px = sub.get(key, "—")
        rows.append(f"| `{name}` | {px} | {val} |")
    return "\n".join(rows)

def gen_spacing_alias(styles_dir):
    """Public spacing layer table: utility -> --spacing-{n} -> primitive it references.
    Utility name uses Tailwind's dot spelling for sub-steps (1-5 -> mt-1.5)."""
    alias = parse_spacing_alias(styles_dir)
    def util(k):
        return "mt-" + re.sub(r"^(\d+)-(\d+)$", r"\1.\2", k)
    rows = ["| Utility (e.g.) | Public token | References |",
            "|----------------|--------------|------------|"]
    for k, ref in alias.items():
        tgt = f"`--primitive-spacing-{ref}`" if ref else "**—  not a reference!**"
        rows.append(f"| `{util(k)}` | `--spacing-{k}` | {tgt} |")
    return "\n".join(rows)

def _matrix(model, family, rowspec, omit):
    emitted = role_set(model, family) - {"readable-width"}
    named = {r for _lbl, rs in rowspec for r in rs}
    missing = emitted - named - omit
    extra = named - emitted
    if missing:
        sys.exit(f"ERROR: {family} roles emitted but not in matrix rowspec: "
                 f"{sorted(missing)} (update PRODUCT_ROWS/PROSE_ROWS deliberately)")
    if extra:
        sys.exit(f"ERROR: {family} matrix rowspec names non-emitted roles: {sorted(extra)}")
    header = "| Role (high → low) | " + " | ".join(MODES) + " | |"
    sep    = "|" + "---|" * (len(MODES) + 2)
    out = [header, sep]
    for label, roles in rowspec:
        vals = []
        for mode in MODES:
            pxs = {fs_px(model[(mode, family, r, "font-size")]) for r in roles}
            if len(pxs) != 1:
                sys.exit(f"ERROR: collapsed row {label!r} roles disagree at {mode}: {pxs}")
            vals.append(pxs.pop())
        kind = "scales" if len(set(vals)) > 1 else "fixed"
        out.append(f"| {label} | " + " | ".join(str(v) for v in vals) + f" | {kind} |")
    return "\n".join(out)

def gen_prose_matrix(styles_dir):
    return _matrix(parse_typography(styles_dir), "prose", PROSE_ROWS, set())

def gen_product_matrix(styles_dir):
    return _matrix(parse_typography(styles_dir), "product", PRODUCT_ROWS, PRODUCT_MATRIX_OMIT)

BLOCKS = {
    "css-appendix":   gen_css_appendix,
    "spacing-table":  gen_spacing_table,
    "spacing-alias":  gen_spacing_alias,
    "prose-matrix":   gen_prose_matrix,
    "product-matrix": gen_product_matrix,
}

# ───────────────────────── marker splicing ────────────────────────────────

def markers(name):
    return (f"<!-- GEN:{name} START -->", f"<!-- GEN:{name} END -->")

def splice(text, name, new_body, required=True):
    a, b = markers(name)
    if a not in text or b not in text:
        if required:
            sys.exit(f"ERROR: markers for '{name}' not found. Run: regen_spec.py init")
        return text, False
    pre, rest = text.split(a, 1)
    _old, post = rest.split(b, 1)
    return pre + a + "\n" + new_body + "\n" + b + post, True

def current_body(text, name):
    a, b = markers(name)
    return text.split(a, 1)[1].split(b, 1)[0].strip("\n")

# ───────────────────────── commands ───────────────────────────────────────

def cmd_gen(spec_path, styles_dir, dry=False):
    text = open(spec_path).read()
    stale = []
    for name, fn in BLOCKS.items():
        if markers(name)[0] not in text or markers(name)[1] not in text:
            sys.exit(f"ERROR: markers for '{name}' not found in {spec_path}. "
                     f"Wrap the block once with {markers(name)[0]} ... {markers(name)[1]} "
                     f"(see SPEC-CHANGE-PROTOCOL.md).")
        new_body = fn(styles_dir)
        if current_body(text, name).strip() != new_body.strip():
            stale.append(name)
        text, _ = splice(text, name, new_body)
    if dry:
        return stale
    open(spec_path, "w").write(text)
    print("gen: regenerated " + ", ".join(BLOCKS) + f" from {styles_dir}")
    if stale:
        print("     (updated: " + ", ".join(stale) + ")")
    else:
        print("     (already current — no value changes)")
    return stale

def check_spacing_alias(styles_dir):
    """The governing-decision invariant: every public --spacing-{n} is a pure
    reference to the identically-keyed primitive, and every required rung exists."""
    alias = parse_spacing_alias(styles_dir)
    ok = True
    print("spacing alias (--spacing-{n} -> --primitive-spacing-{n}):")
    missing = [k for k in SPACING_ALIAS_REQUIRED if k not in alias]
    if missing:
        ok = False
        print(f"  [FAIL] required rungs missing from --spacing-*: {missing}")
    for key, ref in alias.items():
        if ref is None:
            ok = False
            print(f"  [FAIL] --spacing-{key} restates a value instead of referencing a primitive")
        elif ref != key:
            ok = False
            print(f"  [FAIL] --spacing-{key} -> --primitive-spacing-{ref} (key mismatch; expected -{key})")
    if ok:
        print(f"  [PASS] {len(alias)} aliases present, all pure references to the matching primitive")
    return ok

def parse_flow(styles_dir):
    """styles/flow.css -> (flat, blocks, default_ramp).
      flat         {'prose-tight': 0.25, ...}   the :root value source, in rem
      blocks       {'prose': {'tight': 'prose-tight' | None}}
                   the var() target each .flow-{context} rung references; None
                   means the rung restated a literal instead of referencing it.
      default_ramp {'tight': 'product-tight', ...}
                   the BARE --flow-{rung} vars on :root — the library default
                   density, so a rung utility outside any context class still
                   resolves. Value is the flat var each one points at."""
    path = os.path.join(styles_dir, "flow.css")
    txt = open(path).read()
    root = re.search(r":root\s*\{(.*?)\}", txt, re.S)
    flat, default_ramp = {}, {}
    if root:
        body = root.group(1)
        for key, val in re.findall(r"--flow-([a-z]+-[a-z]+)\s*:\s*([0-9.]+)rem", body):
            flat[key] = float(val)
        for rung, ref in re.findall(
                r"--flow-(tight|default|loose|section)\s*:\s*var\(\s*--flow-([a-z]+-[a-z]+)", body):
            default_ramp[rung] = ref
    blocks = {}
    for context, body in re.findall(r"\.flow-([a-z]+)\s*\{(.*?)\}", txt, re.S):
        rungs = {}
        for rung, val in re.findall(r"--flow-(tight|default|loose|section)\s*:\s*([^;}]+)", body):
            m = re.search(r"var\(\s*--flow-([a-z]+-[a-z]+)", val)
            rungs[rung] = m.group(1) if m else None
        blocks[context] = rungs
    return flat, blocks, default_ramp

def parse_tw_extend_flow(styles_dir):
    """styles/tw-extend/flow.cjs -> the exported utility keys, in emission order.
    Read textually (not via node) to keep this stdlib-only."""
    path = os.path.join(styles_dir, "tw-extend", "flow.cjs")
    txt = open(path).read()
    return re.findall(r'"(flow-[a-z-]+)"\s*:', txt)

def check_flow(styles_dir):
    """Invariants on the flow ramp and its utility surface:
      * reference integrity — each .flow-{context} rung is a pure var() reference
        to a flat --flow-{context}-{rung} present in the same file (01/Change 3);
      * default ramp — :root defines the four BARE --flow-{rung} vars, pointing at
        the default-density context, so a rung utility outside any context class
        resolves instead of silently computing to 0 (02/Amendment 3A);
      * utility surface — tw-extend/flow.cjs exports exactly the four
        context-agnostic rung keys, and NO context-prefixed key (02/Amendment 2;
        the 4-not-12 count also catches 01's key-collapse bug from the other side);
      * value parity — each flat var equals its Figma-authored rung."""
    ok = True
    flat, blocks, default_ramp = parse_flow(styles_dir)
    print("flow ramp (.flow-{context} -> --flow-{context}-{rung}):")

    if not flat:
        print("  [FAIL] no :root flat --flow-{context}-{rung} vars in flow.css — "
              "the context blocks have no value source")
        return False

    # reference integrity
    ref_ok = True
    for context in FLOW_CONTEXTS:
        rungs = blocks.get(context)
        if rungs is None:
            ok = ref_ok = False
            print(f"  [FAIL] .flow-{context} block missing from flow.css")
            continue
        for rung in FLOW_RUNGS:
            if rung not in rungs:
                ok = ref_ok = False
                print(f"  [FAIL] .flow-{context} is missing rung --flow-{rung}")
            elif rungs[rung] is None:
                ok = ref_ok = False
                print(f"  [FAIL] .flow-{context} --flow-{rung} restates a literal "
                      f"instead of referencing --flow-{context}-{rung}")
            elif rungs[rung] != f"{context}-{rung}":
                ok = ref_ok = False
                print(f"  [FAIL] .flow-{context} --flow-{rung} -> --flow-{rungs[rung]} "
                      f"(key mismatch; expected -{context}-{rung})")
            elif rungs[rung] not in flat:
                ok = ref_ok = False
                print(f"  [FAIL] .flow-{context} --flow-{rung} references "
                      f"--flow-{context}-{rung}, which is not declared in flow.css")
    if ref_ok:
        print(f"  [PASS] {len(FLOW_CONTEXTS) * len(FLOW_RUNGS)} rungs, all pure "
              "references to a flat var declared in the same file")

    # default ramp on :root
    want = {r: f"{FLOW_DEFAULT_CONTEXT}-{r}" for r in FLOW_RUNGS}
    if default_ramp == want:
        print(f"  [PASS] :root defines all 4 bare --flow-{{rung}} vars from "
              f"{FLOW_DEFAULT_CONTEXT} (library default density)")
    else:
        ok = False
        for rung in FLOW_RUNGS:
            got = default_ramp.get(rung)
            if got is None:
                print(f"  [FAIL] :root does not define bare --flow-{rung} — a rung "
                      "utility outside any flow context resolves an undefined var "
                      "and margin-top silently falls back to 0")
            elif got != want[rung]:
                print(f"  [FAIL] :root --flow-{rung} -> --flow-{got}, expected "
                      f"--flow-{want[rung]}")

    # utility surface: exactly the four context-agnostic keys
    keys = parse_tw_extend_flow(styles_dir)
    prefixed = [k for k in keys if re.match(r"flow-(%s)-" % "|".join(FLOW_CONTEXTS), k)]
    if prefixed:
        ok = False
        print(f"  [FAIL] tw-extend/flow.cjs exports context-prefixed keys "
              f"{prefixed} — withdrawn; a rung utility must carry a relationship, "
              "not a density (a component needing fixed density declares a context class)")
    if sorted(keys) != sorted(FLOW_UTILITY_KEYS):
        ok = False
        missing = [k for k in FLOW_UTILITY_KEYS if k not in keys]
        extra = [k for k in keys if k not in FLOW_UTILITY_KEYS and k not in prefixed]
        print(f"  [FAIL] tw-extend/flow.cjs exports {len(keys)} keys, expected "
              f"{len(FLOW_UTILITY_KEYS)}; missing={missing} unexpected={extra}")
        if len(set(keys)) < len(keys):
            print("         (duplicate keys — the rungs collapsed onto one key; "
                  "key the format on the rung name)")
    elif not prefixed:
        print(f"  [PASS] tw-extend/flow.cjs exports exactly the {len(keys)} "
              "context-agnostic rung keys")

    # value parity
    parity_ok = True
    for context in FLOW_CONTEXTS:
        for rung in FLOW_RUNGS:
            expected = FLOW_RAMP_PX[context][rung] / 16
            got = flat.get(f"{context}-{rung}")
            if got is None:
                ok = parity_ok = False
                print(f"  [FAIL] --flow-{context}-{rung} not declared")
            elif abs(got - expected) > 0.0001:
                ok = parity_ok = False
                print(f"  [FAIL] --flow-{context}-{rung} = {got}rem, "
                      f"pinned {expected}rem ({FLOW_RAMP_PX[context][rung]}px)")
    if parity_ok:
        print("  [PASS] all 12 flat vars match the pinned Figma ramp "
              "(prose 4/16/24/40, product 4/8/16/24, compact 4/4/8/8)")
    return ok

def parse_flow_selectors(project):
    """flow/flow.cjs -> the selector keys, in emission order (or None if unreadable).
    Keys are written out in full as quoted object keys, so a static read is enough —
    no need to execute the plugin."""
    path = os.path.join(project, "tailwind-custom", "flow", "flow.cjs")
    if not os.path.exists(path):
        print(f"  [FAIL] {path} not found (flow plugin moved?)")
        return None
    txt = open(path).read()
    sels = re.findall(r"^\t'(:is\(\.flow-[^']+)':", txt, re.M)
    if not sels:
        print(f"  [FAIL] parsed 0 flow selectors from {path}")
        return None
    return sels

def _mask_groups(sel):
    """Blank out the contents of every (...) group so combinators INSIDE :is()/:not()/
    :has() lists are not mistaken for structure in the selector itself."""
    out, depth = [], 0
    for ch in sel:
        if ch == "(":
            depth += 1; out.append(ch)
        elif ch == ")":
            depth -= 1; out.append(ch)
        else:
            out.append("_" if depth else ch)
    return "".join(out)

def _is_direct_child_pair(sel):
    """True when the adjacent pair in `sel` are DIRECT CHILDREN of the flow container:
    "<root> A + B". False for a pair that sits deeper — "<root> > :is(ul, ol) li + li"
    is rooted at the container but its pair is a descendant, so it is a descendant rule."""
    if not sel.startswith(FLOW_ROOT):
        return False
    # mask AFTER stripping the root: the root's own :is() list would otherwise be
    # blanked out and no longer match
    rest = _mask_groups(sel[len(FLOW_ROOT):])
    if " + " not in rest:
        return False
    # a descendant step anywhere in either side of the pair means the pair is deeper
    return all(" " not in part.strip() for part in rest.split(" + "))

def check_flow_rooted(project):
    """Every flow rule is rooted at the element declaring the context — a child
    combinator immediately after the context group, no exceptions. Catches a
    regression to unbounded descendant reach, which is invisible in the source
    (one missing `>`) and unoverridable at the component (see FLOW_ROOT)."""
    selectors = parse_flow_selectors(project)
    if selectors is None:
        return False
    unrooted = [s for s in selectors if not s.startswith(FLOW_ROOT)]
    print("flow rules are rooted at the context element:")
    if unrooted:
        print(f"  [FAIL] {len(unrooted)} of {len(selectors)} flow rules use a "
              "descendant combinator after the context group — they reach into any "
              "component at any depth, and the component author cannot override them:")
        for s in unrooted:
            print(f"         {s[:96]}...")
        return False
    print(f"  [PASS] all {len(selectors)} flow rules start with '{FLOW_ROOT.strip()}'")
    return True

def check_flow_owl_guard(project):
    """Author-declared rungs must beat DOM-inferred ones. Every SIBLING rule in
    flow/flow.cjs that sets margin-top must exclude elements carrying an explicit
    rung utility, via FLOW_OWL_GUARD on the receiving compound.

    Uniformity is the invariant, not a count. The guard adds (0,1,0) when appended
    to an :is()-terminated compound but nothing when folded into an existing
    :not() list, so guarding only some sibling rules reorders them against each
    other — measured: it flips eyebrow->heading coupling from tight (4px) to
    section (24px). Descendant rules (figcaption, li+li, dd, dt) are out of scope
    by decision and are not required to carry it — note that since change-set 03
    those are rooted too, so "descendant" means the adjacent PAIR sits below the
    flow root, not that the rule is unrooted."""
    selectors = parse_flow_selectors(project)
    if selectors is None:
        return False
    siblings = [s for s in selectors if _is_direct_child_pair(s)]
    unguarded = [s for s in siblings if FLOW_OWL_GUARD not in s]
    print("flow owl guard (explicit rung beats the inferred one):")
    if unguarded:
        print(f"  [FAIL] {len(unguarded)} of {len(siblings)} sibling rules lack "
              f"{FLOW_OWL_GUARD} — an author's mt-flow-* is silently overridden "
              "there, and the partial guard reorders the rules against each other:")
        for s in unguarded:
            print(f"         {s[:96]}...")
        return False
    print(f"  [PASS] all {len(siblings)} sibling rules carry {FLOW_OWL_GUARD} "
          f"({len(selectors) - len(siblings)} descendant rules exempt by decision)")
    return True

def check_typography_delivery(project):
    """Typography responsive values are delivered on the CONTEXT element, never on
    the role element. A declaration on an element beats an inherited one outright —
    it is not a specificity contest — so an element-level rule from an OUTER context
    (`.prose .subtitle { --subtitle-font-size: 18px }`) overrode a nested context's
    own inherited values, and `not-prose` did not exclude it. That was the chart
    subtitle bug. Every context must publish its full role set on itself, so the
    innermost declared context wins at any depth.

    Read statically from the plugin source: the per-role selector loop that caused
    this is a distinctive shape (a `.${context} .${role}` template), and its absence
    plus all three contexts in the delivery loop is what we assert."""
    path = os.path.join(project, "tailwind-custom", "typography", "typography.cjs")
    if not os.path.exists(path):
        print(f"  [FAIL] {path} not found (typography plugin moved?)")
        return False
    txt = open(path).read()
    print("typography delivered on the context, never the role element:")
    ok = True
    # any selector template pairing a context with a role — `.${context}.${role}`,
    # `.${context} .${role}`, or the `.not-prose ...` variants that existed only to
    # keep element-level targeting working across a not-prose boundary
    role_elem = re.findall(r"`[^`]*\$\{context\}[^`]*\$\{role\}[^`]*`", txt)
    if role_elem:
        ok = False
        print(f"  [FAIL] {len(role_elem)} selector template(s) target the role "
              "element from a context; an outer context then overrides a nested "
              "one's own values:")
        for r in role_elem:
            print(f"         {r}")
    else:
        print("  [PASS] no context+role selector template (the per-role loop is gone)")
    if ".not-prose" in txt:
        ok = False
        print("  [FAIL] typography.cjs still emits `.not-prose` selector variants — "
              "they existed only for element-level targeting; inheritance crosses a "
              "not-prose boundary regardless")
    # all three contexts publish their role set on themselves. chart has no key in
    # responsive.cjs and contributes no vars here, but must be in the loop so that
    # nothing is left relying on element-level delivery.
    m = re.search(r"\[([^\]]*)\]\.forEach\(\(context\)", txt)
    listed = set(re.findall(r"'(\w+)'", m.group(1))) if m else set()
    want = {"prose", "product", "chart"}
    if listed >= want:
        print(f"  [PASS] context delivery loop covers {sorted(want)}")
    else:
        ok = False
        print(f"  [FAIL] context delivery loop covers {sorted(listed) or 'nothing'}, "
              f"expected at least {sorted(want)} — a context left out does not seal")
    return ok

def check_chart_seals(model):
    """A nested context seals only the roles it DEFINES; for the names chart shares
    with product, the two must agree. chart aliases product for title/subtitle/eyebrow
    and restates the same primitive for label, so a divergence means either the alias
    broke or the two sets drifted — the shape of the subtitle bug, which hid for as
    long as it did precisely because the other shared names coincided."""
    print("chart's shared role names agree with their product source:")
    ok = True
    for role in CHART_SHARED_ROLES:
        for mode in MODES:
            chart = model.get((mode, "chart", role, "font-size"))
            prod = model.get((mode, "product", role, "font-size"))
            if chart is None or prod is None:
                ok = False
                print(f"  [FAIL] {mode}/{role}: chart={chart!r} product={prod!r} — "
                      "one side is missing a font-size")
                break
            if fs_px(chart) != fs_px(prod):
                ok = False
                print(f"  [FAIL] {mode} chart/{role} = {fs_px(chart)}px but "
                      f"product/{role} = {fs_px(prod)}px — a shared role name whose "
                      "values diverge is invisible until it is nested")
                break
        else:
            print(f"  [PASS] chart/{role} = product/{role} = "
                  f"{fs_px(model[('md', 'chart', role, 'font-size')])}px at all modes")
    return ok

def _repo_root(styles_dir):
    d = os.path.abspath(styles_dir)
    while d != os.path.dirname(d):
        if os.path.isdir(os.path.join(d, ".git")):
            return d
        d = os.path.dirname(d)
    return None

def check_tw_extend_wired(styles_dir):
    """Category guard. Every generated styles/tw-extend/*.cjs must be required
    somewhere in the repo. Emitted-but-unwired has now been the shape of three
    separate defects (primitive-spacing.cjs, the line-height alias regex, flow):
    the file is regenerated on every build, looks maintained, and reaches nothing."""
    tw = os.path.join(styles_dir, "tw-extend")
    if not os.path.isdir(tw):
        print(f"  [FAIL] no {tw} directory")
        return False
    root = _repo_root(styles_dir)
    if root is None:
        print("  [SKIP] tw-extend wiring: could not locate the repo root")
        return True
    names = sorted(f[:-4] for f in os.listdir(tw) if f.endswith(".cjs"))
    hits = {n: [] for n in names}
    skip = {"node_modules", ".git", ".svelte-kit", "dist", "build", ".turbo"}
    for base, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in skip]
        if os.path.abspath(base) == os.path.abspath(tw):
            continue
        for f in files:
            if not f.endswith((".cjs", ".js", ".mjs", ".ts")):
                continue
            path = os.path.join(base, f)
            try:
                txt = open(path, encoding="utf-8", errors="ignore").read()
            except OSError:
                continue
            for n in names:
                if re.search(r"tw-extend/%s\b" % re.escape(n), txt):
                    hits[n].append(os.path.relpath(path, root))
    print("generated tw-extend/*.cjs are wired in:")
    ok = True
    for n in names:
        if hits[n]:
            print(f"  [PASS] {n}.cjs required by {hits[n][0]}"
                  + (f" (+{len(hits[n]) - 1} more)" if len(hits[n]) > 1 else ""))
        else:
            ok = False
            print(f"  [FAIL] {n}.cjs is generated on every build but required by "
                  "nothing — either wire it into ldn-theme.cjs or stop emitting it")
    return ok

def cmd_check(spec_path, styles_dir):
    ok = True
    stale = cmd_gen(spec_path, styles_dir, dry=True)
    if stale:
        ok = False
        print("STALE blocks (run `gen`): " + ", ".join(stale))
    else:
        print("blocks: up to date")
    if not check_spacing_alias(styles_dir):
        ok = False
    if not check_flow(styles_dir):
        ok = False
    project = os.path.dirname(os.path.abspath(styles_dir))
    if not check_flow_rooted(project):
        ok = False
    if not check_flow_owl_guard(project):
        ok = False
    if not check_typography_delivery(project):
        ok = False
    if not check_tw_extend_wired(styles_dir):
        ok = False
    model = parse_typography(styles_dir)
    if not check_chart_seals(model):
        ok = False
    print("lint (pinned decisions vs emitted):")
    for desc, fam, role, prop, expected, modes in PINNED:
        ms = modes or MODES
        vals = []
        for mode in ms:
            raw = model.get((mode, fam, role, prop))
            if raw is None:
                vals.append(None); continue
            if prop == "font-size":
                vals.append(fs_px(raw))
            elif prop == "font-weight":
                vals.append(weight_num(raw))
            elif prop == "line-height":
                vals.append(round(float(raw), 4))
            else:
                vals.append(raw)
        if isinstance(expected, float):
            good = all(v is not None and abs(v - expected) < 0.001 for v in vals)
        else:
            good = all(v == expected for v in vals)
        mark = "PASS" if good else "FAIL"
        if not good: ok = False
        shown = vals[0] if len(set(map(str, vals))) == 1 else vals
        print(f"  [{mark}] {desc}  (emitted: {shown}, pinned: {expected})")
    print("OK" if ok else "DRIFT DETECTED")
    sys.exit(0 if ok else 1)

def cmd_verify_build(project):
    build = os.path.join(project, "sd.build.js")
    styles = os.path.join(project, "styles")
    if not (os.path.exists(build) and os.path.isdir(styles)):
        sys.exit(f"ERROR: need sd.build.js and styles/ under {project}")
    snap = tempfile.mkdtemp(prefix="styles_shipped_")
    shutil.rmtree(snap); shutil.copytree(styles, snap)
    r = subprocess.run(["node", "sd.build.js"], cwd=project,
                       capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout); print(r.stderr); sys.exit("ERROR: build failed")
    diffs = []
    for root, _d, files in os.walk(styles):
        for f in files:
            new = os.path.join(root, f)
            old = os.path.join(snap, os.path.relpath(new, styles))
            if not os.path.exists(old) or open(new,"rb").read() != open(old,"rb").read():
                diffs.append(os.path.relpath(new, styles))
    if diffs:
        print("BUILD NOT REPRODUCIBLE — differs from shipped:")
        for d in diffs: print("  " + d)
        sys.exit(1)
    print(f"verify-build: zero-diff — build reproduces shipped styles/ ({project})")

def main():
    ap = argparse.ArgumentParser(description="Keep the spec downstream of the build.")
    ap.add_argument("command", choices=["gen","check","verify-build"])
    ap.add_argument("--spec", default="design-system-specification.md")
    ap.add_argument("--styles", default="styles")
    ap.add_argument("--project", default=".")
    a = ap.parse_args()
    if a.command == "gen":          cmd_gen(a.spec, a.styles)
    elif a.command == "check":      cmd_check(a.spec, a.styles)
    elif a.command == "verify-build": cmd_verify_build(a.project)

if __name__ == "__main__":
    main()
