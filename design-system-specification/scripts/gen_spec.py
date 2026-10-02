#!/usr/bin/env python3
"""
gen_spec.py — regenerate the pure-value blocks in design-system-specification.md
(CSS appendix, spacing tables, the two responsive matrices) in place, between
<!-- GEN:name START/END --> markers, from the emitted styles/.

With --check, write nothing: exit 1 if any block is stale (i.e. a run without
--check would change the spec).

Typical flow:  verify_build.py  ->  gen_spec.py  ->  check_spec.py
(see governance/SPEC-CHANGE-PROTOCOL.md)

stdlib only. Python 3.8+.
"""
import argparse, os, re, sys

from spec_common import (DEFAULT_STYLES, MODES, REPO_ROOT, fs_px,
                         parse_spacing_alias, parse_typography)

DEFAULT_SPEC = os.path.join(REPO_ROOT, "design-system-specification",
                            "design-system-specification.md")

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

# representative roles shown in the CSS appendix typography sample
SAMPLE = [
    ("prose",   ["display", "body", "body-sm", "caption"]),
    ("product", ["title", "label", "label-sm"]),
    ("chart",   ["axis-title", "tick", "tick-sm"]),
]

# ───────────────────────── parsing the emitted CSS ─────────────────────────

def role_set(model, family):
    return {role for (_m, fam, role, _p) in model if fam == family}

def parse_primitive_scale(styles_dir):
    path = os.path.join(styles_dir, "primitive-scale.css")
    txt = open(path).read()
    fs = re.findall(r"(--primitive-typography-font-size-\d+):\s*([^;]+);", txt)
    sp = re.findall(r"(--primitive-spacing-[0-9a-z-]+):\s*([^;]+);", txt)
    return fs, sp

# ───────────────────────── generating the blocks ──────────────────────────

def gen_css_appendix(styles_dir):
    fs, sp = parse_primitive_scale(styles_dir)
    sp_whole = [(n, v) for n, v in sp if re.search(r"spacing-\d+$", n)]
    sp_sub   = [(n, v) for n, v in sp if not re.search(r"spacing-\d+$", n)]
    m = parse_typography(styles_dir)
    L = []
    L += ["```css",
          "/* ---------------------------------------------------------------",
          "   GENERATED FROM TOKENS - DO NOT HAND-EDIT (scripts/gen_spec.py).",
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
            sys.exit(f"ERROR: markers for '{name}' not found. Wrap the block once with the START/END markers")
        return text, False
    pre, rest = text.split(a, 1)
    _old, post = rest.split(b, 1)
    return pre + a + "\n" + new_body + "\n" + b + post, True

def current_body(text, name):
    a, b = markers(name)
    return text.split(a, 1)[1].split(b, 1)[0].strip("\n")

# ───────────────────────── command ────────────────────────────────────────

def gen_blocks(spec_path, styles_dir, check=False):
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
    if check:
        if stale:
            print("STALE blocks (run gen_spec.py): " + ", ".join(stale))
            sys.exit(1)
        print("blocks: up to date")
        return stale
    open(spec_path, "w").write(text)
    print("gen: regenerated " + ", ".join(BLOCKS) + f" from {styles_dir}")
    if stale:
        print("     (updated: " + ", ".join(stale) + ")")
    else:
        print("     (already current — no value changes)")
    return stale

def main():
    ap = argparse.ArgumentParser(description=" ".join(__doc__.strip().split("\n\n")[0].split()))
    ap.add_argument("--spec", default=DEFAULT_SPEC, help="path to the spec markdown")
    ap.add_argument("--styles", default=DEFAULT_STYLES, help="emitted styles/ directory")
    ap.add_argument("--check", action="store_true",
                    help="write nothing; exit 1 if any generated block is stale")
    a = ap.parse_args()
    gen_blocks(a.spec, a.styles, check=a.check)

if __name__ == "__main__":
    main()
