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
    ("prose eyebrow weight 500",          "prose",   "eyebrow",   "font-weight", 500,    None),
    ("product card-panel-eyebrow wt 500", "product", "card-panel-eyebrow","font-weight",500,None),
]

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
    ("Dashboard head",      ["dashboard-head"]),
    ("Metric",              ["metric"]),
    ("Section head",        ["section-head"]),
    ("Card / Panel title",  ["card-panel-title"]),
    ("Metric Sm",           ["metric-sm"]),
    ("Body / Field value",  ["body"]),
    ("Body Sm / Label",     ["body-sm", "label"]),
    ("Caption",             ["caption"]),
    ("Label Sm",            ["label-sm"]),
]
# roles legitimately absent from the collapsed matrices (editorial), so the
# "did the emitted role set change?" assertion doesn't false-alarm on them.
PRODUCT_MATRIX_OMIT = {"card-panel-subtitle", "card-panel-eyebrow"}

# representative roles shown in the CSS appendix typography sample
SAMPLE = [
    ("prose",   ["display", "body", "body-sm", "caption"]),
    ("product", ["card-panel-title", "label", "label-sm"]),
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

def cmd_check(spec_path, styles_dir):
    ok = True
    stale = cmd_gen(spec_path, styles_dir, dry=True)
    if stale:
        ok = False
        print("STALE blocks (run `gen`): " + ", ".join(stale))
    else:
        print("blocks: up to date")
    model = parse_typography(styles_dir)
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
