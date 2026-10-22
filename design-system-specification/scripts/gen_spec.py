#!/usr/bin/env python3
"""
gen_spec.py — regenerate the value blocks in design-system-specification.md (the
two typeset matrices, the usage alias table, the spacing table, the flow
table, the flow element map and the grid table) in place, between <!-- GEN:name START/END --> markers, from the build.

With --check, write nothing: exit 1 if any block is stale (i.e. a run without
--check would change the spec).

Typical flow:  verify_build.py  ->  gen_spec.py  ->  check_spec.py
(see governance/SPEC-CHANGE-PROTOCOL.md)

stdlib only. Python 3.8+.
"""
import argparse, os, re, sys

from spec_common import (BREAKPOINTS, DEFAULT_STYLES, FLOW_CONTEXTS, FLOW_STEPS,
                         ROLES, SIZES, SPEC_DIR, load_system, load_tokens,
                         parse_rules, px, role_keys, role_label, sections,
                         typography)

DEFAULT_SPEC = os.path.join(SPEC_DIR, "design-system-specification.md")

# ───────────────────────── generating the blocks ──────────────────────────

def fmt(n):
    return f"{n:g}"

def table(header, rows):
    """A Markdown table, padded as Prettier writes it, so formatting the spec
    doesn't make a block look stale."""
    widths = [max(3, len(h), *(len(r[i]) for r in rows)) for i, h in enumerate(header)]
    line = lambda cells: "| " + " | ".join(c.ljust(w) for c, w in zip(cells, widths)) + " |"
    return "\n".join([line(header), line(["-" * w for w in widths])] + [line(r) for r in rows])

def gen_matrix(typeset):
    """Every role and size of one typeset: font size / line height in px at each
    breakpoint, high to low as the spec lists the roles."""
    def block(styles_dir):
        model = typography(load_tokens(styles_dir))
        rows = []
        for role, size in role_keys():
            cells = []
            for bp in BREAKPOINTS:
                key = (bp, typeset, role, size)
                if key + ("font-size",) not in model:
                    sys.exit(f"ERROR: no {typeset} {role_label(role, size)} font size at {bp}")
                cells.append(f"{fmt(model[key + ('font-size',)])}/{fmt(model[key + ('line-height',)])}")
            weights = {model[(bp, typeset, role, size, "font-weight")] for bp in BREAKPOINTS}
            weight = "/".join(fmt(w) for w in sorted(weights))
            rows.append([f"`{role_label(role, size)}`", *cells, weight])
        return (table(["Role", *BREAKPOINTS, "Weight"], rows)
                + "\n\n_Font size / line height in px. Breakpoints: base <640, sm ≥640, "
                  "md ≥768, lg ≥1024, xl ≥1280._")
    return block

def gen_alias_table(styles_dir):
    """Each usage alias class, the role it reads, and anything it adds."""
    role = re.compile(r"var\(--((?:%s)(?:-(?:%s))?)-font-size\)" % ("|".join(ROLES), "|".join(SIZES)))
    css = sections(load_system(styles_dir)).get("Usage aliases")
    if css is None:
        sys.exit("ERROR: no 'Usage aliases' section in system.css")
    rows = []
    for selector, decls, _m in parse_rules(css):
        m = role.match(decls.get("font-size", ""))
        if not m:
            sys.exit(f"ERROR: alias {selector} reads no role font size")
        adds = []
        if decls.get("font-variant-numeric") == "tabular-nums":
            adds.append("tabular numerals")
        if decls.get("color") == "var(--color-text-muted)":
            adds.append("muted colour")
        rows.append([f"`{selector}`", f"`.{m.group(1)}`", ", ".join(adds)])
    return table(["Alias", "Role", "Adds"], rows)

def gen_spacing_table(styles_dir):
    """The public spacing scale, in emitted order."""
    tokens = load_tokens(styles_dir)
    rows = [[f"`{name}`", fmt(px(t["value"])), t["value"]]
            for name, t in tokens.items() if name.startswith("--spacing-")]
    return table(["Token", "px", "rem"], rows)

def gen_flow_table(styles_dir):
    """Each step's value in each context, in px, with the utility that sets it."""
    tokens = load_tokens(styles_dir)
    def value(context, step):
        name = f"--flow-{context}" if step == "default" else f"--flow-{context}-{step}"
        if name not in tokens:
            sys.exit(f"ERROR: {name} not in tokens.json")
        return fmt(px(tokens[name]["value"]))
    rows = [[f"`{step}`", f"`.{'mt-flow' if step == 'default' else f'mt-flow-{step}'}`",
             *(value(c, step) for c in FLOW_CONTEXTS)] for step in FLOW_STEPS]
    return table(["Step", "Utility", *FLOW_CONTEXTS], rows) + "\n\n_Values in px._"

GRID_BREAKPOINTS = ["base", "sm", "md", "lg", "xl", "2xl"]

def gen_grid_table(styles_dir):
    """Container padding for each layout, and the contained width, in px at
    each breakpoint."""
    tokens = load_tokens(styles_dir)
    def value(name):
        if name not in tokens:
            sys.exit(f"ERROR: {name} not in tokens.json")
        return fmt(px(tokens[name]["value"]))
    rows = []
    for bp in GRID_BREAKPOINTS:
        width = "100%" if bp == "base" else value(f"--primitive-breakpoint-{bp}")
        rows.append([f"`{bp}`", width,
                     *(value(f"--grid-{bp}-{layout}-container-padding")
                       for layout in ("contained", "fluid"))])
    return (table(["Breakpoint", "Contained width", "Contained padding", "Fluid padding"], rows)
            + "\n\n_Values in px. The fluid layout is always the full width._")

# What a selector list in the Flow rules section stands for, named by the
# elements in it. The lists are built from the roles in sd/system.config.js.
def flow_group(selector):
    sel = re.sub(r':not\(\.mt-flow, \[class\*="mt-flow-"\]\)', "", selector).strip()
    items = set(re.findall(r"[.\w-]+", re.sub(r":(is|not|has)\(", "(", sel)))
    if sel.startswith(":not("):
        return "any element"
    if "figure" in items and ".chart" in items:
        return "a block object"
    if {"h1", "h3"} <= items:
        return "a heading"
    if "h1" in items:
        return "a major heading"
    if "h3" in items:
        return "a minor heading"
    if ".subtitle-sm" in items:
        return "a subtitle or subhead"
    if ".eyebrow" in items and len(items) == 1:
        return "an eyebrow"
    if ".caption-sm" in items:
        return "a caption"
    return f"`{sel}`"

def gen_flow_map(styles_dir):
    """Each flow rule: the element it spaces, what comes before it, and the
    step, read from system.css."""
    css = sections(load_system(styles_dir)).get("Flow rules")
    if css is None:
        sys.exit("ERROR: no 'Flow rules' section in system.css")
    rows = []
    for selector, decls, _m in parse_rules(css):
        margin = decls.get("margin-top", "")
        step = re.fullmatch(r"var\(--flow-(\w+)\)", margin)
        if not step and margin != "0":
            continue
        shown = f"`{step.group(1)}`" if step else "none"
        inner = selector.split(" > ", 1)[1]
        # Rules inside a list, description list or figure space its items,
        # not flow siblings; show their selector as it is.
        if re.search(r"(^|[\s>])(li|dd|dt|figcaption)\b", inner):
            rows.append([f"`{inner}`", "—", shown])
            continue
        before_next = re.search(r":has\(\+ (.*)\)$", inner)
        if before_next:
            inner = inner[:before_next.start()]
        parts = [p.strip() for p in re.split(r" \+ (?![^(]*\))", inner)]
        element, after = flow_group(parts[1]), flow_group(parts[0])
        if before_next:
            element += f", before {flow_group(before_next.group(1))}"
        rows.append([element, after, shown])
    return (table(["Element", "After", "Step"], rows)
            + "\n\n_Later rows win. A heading is a role class, a usage alias or an element alias "
              "on that role: major is display and headline (`h1`, `h2`), minor is title "
              "(`h3` to `h5`). A block object is `figure`, `img`, `table`, `pre`, `blockquote` "
              "or `.chart`._")

BLOCKS = {
    "longform-matrix": gen_matrix("longform"),
    "product-matrix":  gen_matrix("product"),
    "alias-table":     gen_alias_table,
    "spacing-table":   gen_spacing_table,
    "flow-table":      gen_flow_table,
    "flow-map":        gen_flow_map,
    "grid-table":      gen_grid_table,
}

# ───────────────────────── marker splicing ────────────────────────────────

def markers(name):
    return (f"<!-- GEN:{name} START -->", f"<!-- GEN:{name} END -->")

def splice(text, name, new_body):
    a, b = markers(name)
    pre, rest = text.split(a, 1)
    _old, post = rest.split(b, 1)
    return pre + a + "\n\n" + new_body + "\n\n" + b + post

def current_body(text, name):
    a, b = markers(name)
    return text.split(a, 1)[1].split(b, 1)[0].strip("\n")

# ───────────────────────── command ────────────────────────────────────────

def gen_blocks(spec_path, styles_dir, check=False):
    text = open(spec_path).read()
    stale = []
    for name, fn in BLOCKS.items():
        a, b = markers(name)
        if a not in text or b not in text:
            sys.exit(f"ERROR: markers for '{name}' not found in {spec_path}. "
                     f"Wrap the block once with {a} ... {b} (see SPEC-CHANGE-PROTOCOL.md).")
        new_body = fn(styles_dir)
        if current_body(text, name).strip() != new_body.strip():
            stale.append(name)
        text = splice(text, name, new_body)
    unknown = set(re.findall(r"<!-- GEN:([\w-]+) START -->", text)) - set(BLOCKS)
    if unknown:
        sys.exit(f"ERROR: the spec marks blocks no generator writes: {sorted(unknown)}")
    if check:
        if stale:
            print("STALE blocks (run gen_spec.py): " + ", ".join(stale))
            sys.exit(1)
        print("blocks: up to date")
        return stale
    open(spec_path, "w").write(text)
    print("gen: regenerated " + ", ".join(BLOCKS) + f" from {styles_dir}")
    print("     (updated: " + ", ".join(stale) + ")" if stale
          else "     (already current — no value changes)")
    return stale

def main():
    ap = argparse.ArgumentParser(description=" ".join(__doc__.strip().split("\n\n")[0].split()))
    ap.add_argument("--spec", default=DEFAULT_SPEC, help="path to the spec markdown")
    ap.add_argument("--styles", default=DEFAULT_STYLES, help="built styles/ directory")
    ap.add_argument("--check", action="store_true",
                    help="write nothing; exit 1 if any generated block is stale")
    a = ap.parse_args()
    gen_blocks(a.spec, a.styles, check=a.check)

if __name__ == "__main__":
    main()
