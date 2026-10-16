"""
spec_common.py — shared paths and readers for the design-system-specification
scripts (gen_spec.py, check_spec.py, verify_build.py).

The build output in packages/themes/styles/ is ground truth: it ships, and the
Style Dictionary build is deterministic. Values are read from styles/tokens.json,
the flat resolved export written for this tooling (RFC 0003, workstream 6), so
the scripts don't depend on how the CSS is split or named. Classes are read from
styles/system.css, because a class only exists as CSS.

stdlib only. Python 3.8+.
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
SPEC_DIR = os.path.join(REPO_ROOT, "design-system-specification")
DEFAULT_PROJECT = os.path.join(REPO_ROOT, "packages", "themes")
DEFAULT_STYLES = os.path.join(DEFAULT_PROJECT, "styles")

BREAKPOINTS = ["base", "sm", "md", "lg", "xl"]
TYPESETS = ["longform", "product"]
ROLES = ["display", "headline", "subhead", "title", "subtitle", "body", "label",
         "metric", "caption", "eyebrow"]
SIZES = ["sm", "md", "lg"]
UNSIZED_ROLES = {"eyebrow"}
FLOW_CONTEXTS = ["spacious", "standard", "compact"]
FLOW_STEPS = ["tight", "default", "loose", "section"]

# ───────────────────────── tokens.json ─────────────────────────────────────

def load_tokens(styles_dir):
    """styles/tokens.json -> {"--name": {value, type, path, references?, dark?}}"""
    path = os.path.join(styles_dir, "tokens.json")
    if not os.path.exists(path):
        sys.exit(f"ERROR: {path} not found. Build the tokens first "
                 "(npm run build-tokens in packages/themes).")
    tokens = json.load(open(path))
    if not tokens:
        sys.exit(f"ERROR: {path} holds no tokens")
    return tokens

def px(value):
    """A resolved dimension ('1.5rem', '640px', '0', 1.75) -> px as a number."""
    if isinstance(value, (int, float)):
        return value
    m = re.fullmatch(r"(-?[0-9.]+)(rem|px)?", str(value).strip())
    if not m:
        raise ValueError(f"not a dimension: {value!r}")
    n = float(m.group(1))
    n = n * 16 if m.group(2) == "rem" else n
    return int(n) if n == int(n) else n

def typography(tokens):
    """The semantic typography tokens, keyed (breakpoint, typeset, role, size, prop).
    size is None for an unsized role (eyebrow). line-height is converted from the
    emitted ratio back to px, so it reads as the spec states it."""
    model = {}
    for name, t in tokens.items():
        parts = t.get("path", "").split(".")
        if parts[0] != "typography":
            continue
        if len(parts) == 6:
            _, bp, ts, role, size, prop = parts
        elif len(parts) == 5:
            (_, bp, ts, role, prop), size = parts, None
        else:
            sys.exit(f"ERROR: unexpected typography path {t['path']!r} ({name})")
        model[(bp, ts, role, size, prop)] = t["value"]
    for key, value in list(model.items()):
        if key[-1] == "line-height":
            font_size = px(model[key[:-1] + ("font-size",)])
            model[key] = round(value * font_size, 2)
        elif key[-1] == "font-size":
            model[key] = px(value)
    return model

def role_keys():
    """Every (role, size) the spec names, in the spec's order."""
    return [(r, None) if r in UNSIZED_ROLES else (r, s) for r in ROLES
            for s in ([None] if r in UNSIZED_ROLES else SIZES)]

def role_label(role, size):
    return role if size is None else f"{role}-{size}"

# ───────────────────────── system.css ──────────────────────────────────────

def _strip(css):
    """Comments out, strings kept (a string can hold a brace, as data URIs do)."""
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)

def _blocks(css):
    """Yield (prelude, body) for each top-level block, honouring strings."""
    i, n, start = 0, len(css), 0
    while i < n:
        ch = css[i]
        if ch in "\"'":
            i = css.index(ch, i + 1) + 1
            continue
        if ch == "{":
            depth, j = 1, i + 1
            while depth:
                c = css[j]
                if c in "\"'":
                    j = css.index(c, j + 1) + 1
                    continue
                depth += {"{": 1, "}": -1}.get(c, 0)
                j += 1
            yield css[start:i].strip(), css[i + 1:j - 1]
            i = start = j
            continue
        if ch == ";":  # a block-less statement such as @import
            start = i + 1
        i += 1

def parse_rules(css, media=None):
    """CSS text -> [(selector, {property: value}, media)], at-rule blocks flattened."""
    out = []
    for prelude, body in _blocks(_strip(css)):
        if prelude.startswith("@media") or prelude.startswith("@supports"):
            out += parse_rules(body, prelude)
        elif prelude.startswith("@"):
            continue
        else:
            decls = {}
            for decl in re.split(r";(?=(?:[^\"']*[\"'][^\"']*[\"'])*[^\"']*$)", body):
                if ":" in decl:
                    prop, value = decl.split(":", 1)
                    decls[prop.strip()] = value.strip()
            out.append((" ".join(prelude.split()), decls, media))
    return out

def load_system(styles_dir):
    path = os.path.join(styles_dir, "system.css")
    if not os.path.exists(path):
        sys.exit(f"ERROR: {path} not found. Build the tokens first.")
    return open(path).read()

def sections(css):
    """system.css -> {section title: css text}. The generator opens each section
    with a top-level /* Title */ comment."""
    parts = re.split(r"^/\* ([A-Z][^*]*?) \*/$", css, flags=re.M)
    return {title.strip(): body for title, body in zip(parts[1::2], parts[2::2])}

def class_names(rules):
    """Every class a selector in `rules` names."""
    names = set()
    for selector, _decls, _media in rules:
        names.update(re.findall(r"\.(-?[_a-zA-Z][\w-]*)", selector))
    return names
