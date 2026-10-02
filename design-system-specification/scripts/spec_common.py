"""
spec_common.py — shared paths and CSS parsing for the
design-system-specification scripts (gen_spec.py, check_spec.py, verify_build.py).

The emitted CSS in packages/themes/styles/ is ground truth (it ships; the SD build
is deterministic). These scripts make the spec's *value* content generated from
that output, so the spec can only ever be out-of-date (fixable by a rerun), never
wrong. Prose — intent, rationale, role logic — stays hand-written and untouched.

stdlib only. Python 3.8+.
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
DEFAULT_PROJECT = os.path.join(REPO_ROOT, "packages", "themes")
DEFAULT_STYLES = os.path.join(DEFAULT_PROJECT, "styles")

MODES = ["base", "sm", "md", "lg", "xl"]
PROPS = ["font-size", "line-height", "font-weight", "letter-spacing",
         "font-family", "space-before"]

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
