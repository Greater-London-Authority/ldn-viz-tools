#!/usr/bin/env python3
"""
adr_check.py — fail (exit 1) if the decision record has drifted from the rules
in governance/ADR-LIFECYCLE.md: front matter, symmetric links, statuses against
folders, the amendment limit, sealed bodies, RULES.md citations and INDEX.md.

With --write-index, regenerate decisions/INDEX.md first.

Run with the other checks (see governance/SPEC-CHANGE-PROTOCOL.md).

stdlib only. Python 3.8+.
"""
import argparse, glob, os, re, subprocess, sys

from spec_common import REPO_ROOT, SPEC_DIR

DECISIONS = os.path.join(SPEC_DIR, "decisions")
ARCHIVE = os.path.join(DECISIONS, "archive")
INDEX = os.path.join(DECISIONS, "INDEX.md")
RULES = os.path.join(SPEC_DIR, "RULES.md")

LIVE = ["proposed", "accepted"]
TERMINAL = ["declined", "superseded", "retired"]
FIELDS = ["id", "title", "status", "date", "released-in", "deciders", "areas",
          "breaking", "supersedes", "superseded-by", "amends", "amended-by", "spec"]
OPTIONAL = {"pr_url", "baseline", "guards"}
MAX_AMENDMENTS = 2

# The tag a release is cut at, tried in order, for the sealed-body check.
TAG_FORMATS = ["@ldn-viz/themes@{v}", "v{v}", "{v}"]

# ───────────────────────── reading ADRs ───────────────────────────────────

def scalar(raw):
    raw = raw.split(" #", 1)[0].strip()
    if raw.startswith("[") and raw.endswith("]"):
        return [scalar(x) for x in raw[1:-1].split(",") if x.strip()]
    if raw in ("null", "~", ""):
        return None
    if raw in ("true", "false"):
        return raw == "true"
    return raw.strip("'\"")

def front_matter(text):
    """The YAML subset ADRs use: one `key: value` per line, inline lists."""
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    if not m:
        return None, text
    fm = {}
    for line in m.group(1).splitlines():
        kv = re.match(r"([\w-]+):\s*(.*)$", line)
        if kv:
            fm[kv.group(1)] = scalar(kv.group(2))
    return fm, text[m.end():]

def load_adrs():
    adrs = {}
    for path in sorted(glob.glob(os.path.join(DECISIONS, "[0-9]*.md"))
                       + glob.glob(os.path.join(ARCHIVE, "[0-9]*.md"))):
        text = open(path).read()
        fm, body = front_matter(text)
        number = os.path.basename(path)[:4]
        adrs[number] = {"path": path, "fm": fm, "body": body,
                        "archived": os.path.dirname(path) == ARCHIVE}
    return adrs

def rel(path):
    return os.path.relpath(path, REPO_ROOT)

# ───────────────────────── checks ─────────────────────────────────────────

def check_front_matter(adrs, fail):
    for number, a in adrs.items():
        fm, where = a["fm"], rel(a["path"])
        if fm is None:
            fail(f"{where}: no front matter")
            continue
        for field in FIELDS:
            if field not in fm:
                fail(f"{where}: front matter is missing '{field}'")
        for field in set(fm) - set(FIELDS) - OPTIONAL:
            fail(f"{where}: unknown front matter field '{field}'")
        if fm.get("status") not in LIVE + TERMINAL:
            fail(f"{where}: unknown status {fm.get('status')!r}")
        if fm.get("id") != number:
            fail(f"{where}: id {fm.get('id')!r} does not match the file number {number}")
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", str(fm.get("date"))):
            fail(f"{where}: date {fm.get('date')!r} is not YYYY-MM-DD")
        for field in ("supersedes", "amends", "amended-by", "deciders", "areas", "spec"):
            if field in fm and not isinstance(fm[field], list):
                fail(f"{where}: '{field}' should be a list")

def as_list(value):
    return value if isinstance(value, list) else ([] if value is None else [value])

def check_links(adrs, fail):
    """supersedes <-> superseded-by and amends <-> amended-by name each other,
    and every number they name exists."""
    pairs = [("supersedes", "superseded-by"), ("amends", "amended-by")]
    for number, a in adrs.items():
        fm = a["fm"] or {}
        for forward, back in pairs:
            for other in as_list(fm.get(forward)) + as_list(fm.get(back)):
                if other not in adrs:
                    fail(f"{rel(a['path'])}: names ADR {other}, which does not exist")
            for other in as_list(fm.get(forward)):
                if other in adrs and number not in as_list((adrs[other]["fm"] or {}).get(back)):
                    fail(f"{number} {forward} {other}, but {other} has no {back}: {number}")
            for other in as_list(fm.get(back)):
                if other in adrs and number not in as_list((adrs[other]["fm"] or {}).get(forward)):
                    fail(f"{number} {back} {other}, but {other} has no {forward}: {number}")

def check_folders(adrs, fail):
    for number, a in adrs.items():
        status = (a["fm"] or {}).get("status")
        if a["archived"] and status in LIVE:
            fail(f"{rel(a['path'])}: {status} ADR is in the archive; live ADRs stay in decisions/")
        if not a["archived"] and status in TERMINAL:
            fail(f"{rel(a['path'])}: {status} ADR should be moved to decisions/archive/ (git mv)")
        if status == "superseded" and not (a["fm"] or {}).get("superseded-by"):
            fail(f"{rel(a['path'])}: superseded, but superseded-by is empty")

def check_amendment_limit(adrs, fail):
    for number, a in adrs.items():
        fm = a["fm"] or {}
        if fm.get("status") == "accepted" and len(as_list(fm.get("amended-by"))) > MAX_AMENDMENTS:
            fail(f"{number} has {len(fm['amended-by'])} amendments; the next change must be "
                 "a consolidating supersession (ADR-LIFECYCLE › Consolidation)")

def git(*args):
    r = subprocess.run(["git", *args], cwd=REPO_ROOT, capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None

def check_sealed(adrs, fail):
    """A sealed ADR's body matches the file at its release tag, unless a
    Revisions line records the change."""
    sealed = 0
    for number, a in adrs.items():
        version = (a["fm"] or {}).get("released-in")
        if not version:
            continue
        sealed += 1
        path = rel(a["path"]).replace(os.sep, "/")
        old = None
        for fmt in TAG_FORMATS:
            tag = fmt.format(v=version)
            if git("rev-parse", "--verify", "--quiet", f"refs/tags/{tag}"):
                # The file may have moved to the archive since the release.
                for candidate in (path, path.replace("decisions/archive/", "decisions/")):
                    old = git("show", f"{tag}:{candidate}")
                    if old is not None:
                        break
                break
        if old is None:
            fail(f"{number}: released-in {version}, but no tag or file at that release "
                 f"(tried {', '.join(f.format(v=version) for f in TAG_FORMATS)})")
            continue
        _fm, old_body = front_matter(old)
        strip = lambda b: re.split(r"^## Revisions\b", b, flags=re.M)[0].strip()
        if strip(old_body) != strip(a["body"]):
            revisions = re.split(r"^## Revisions\b", a["body"], flags=re.M)
            old_revisions = re.split(r"^## Revisions\b", old_body, flags=re.M)
            if len(revisions) < 2 or (len(old_revisions) > 1 and
                                      revisions[1].strip() == old_revisions[1].strip()):
                fail(f"{number}: sealed at {version}, but its body has changed with no "
                     "new line in its Revisions footer")
    return sealed

def rules_citations():
    text = open(RULES).read()
    return {m.group(2): m.group(1) for m in
            re.finditer(r"\]\(\./(decisions/(?:archive/)?(\d{4})-[\w-]+\.md)\)", text)}

def check_rules(adrs, fail, warn):
    cited = rules_citations()
    for number, target in sorted(cited.items()):
        a = adrs.get(number)
        if a is None:
            fail(f"RULES.md cites ADR {number}, which does not exist")
            continue
        if not os.path.exists(os.path.join(SPEC_DIR, target)):
            fail(f"RULES.md links {target}, which does not exist (moved to the archive?)")
        status = (a["fm"] or {}).get("status")
        if status not in LIVE:
            fail(f"RULES.md cites {number}, which is {status}; cite the ADR that replaced it")
    for number, a in adrs.items():
        status = (a["fm"] or {}).get("status")
        if number in cited:
            continue
        if status == "accepted":
            fail(f"accepted ADR {number} is cited nowhere in RULES.md")
        elif status == "proposed":
            warn(f"proposed ADR {number} is not in RULES.md yet; add its rules when it is accepted")

# ───────────────────────── INDEX.md ───────────────────────────────────────

def render_index(adrs):
    lines = ["# Decisions", "",
             "_Generated by `scripts/adr_check.py --write-index`. Do not edit by hand._", ""]
    for status in LIVE[::-1] + TERMINAL:
        group = [(n, a) for n, a in adrs.items() if (a["fm"] or {}).get("status") == status]
        if not group:
            continue
        lines += [f"## {status.capitalize()}", ""]
        for number, a in group:
            fm = a["fm"]
            link = os.path.relpath(a["path"], DECISIONS).replace(os.sep, "/")
            notes = []
            for field in ("amends", "amended-by", "supersedes"):
                if as_list(fm.get(field)):
                    notes.append(f"{field} {', '.join(as_list(fm[field]))}")
            if fm.get("superseded-by"):
                notes.append(f"superseded-by {fm['superseded-by']}")
            if fm.get("released-in"):
                notes.append(f"sealed {fm['released-in']}")
            suffix = f" ({'; '.join(notes)})" if notes else ""
            lines.append(f"- [{number} — {fm.get('title')}](./{link}){suffix}")
        lines.append("")
    return "\n".join(lines)

def check_index(adrs, fail, write):
    want = render_index(adrs)
    if write:
        open(INDEX, "w").write(want)
        print(f"wrote {rel(INDEX)}")
        return
    if not os.path.exists(INDEX):
        fail(f"{rel(INDEX)} is missing (run adr_check.py --write-index)")
    elif open(INDEX).read() != want:
        fail(f"{rel(INDEX)} is stale (run adr_check.py --write-index)")

# ───────────────────────── command ────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser(description=" ".join(__doc__.strip().split("\n\n")[0].split()))
    ap.add_argument("--write-index", action="store_true",
                    help="regenerate decisions/INDEX.md before checking")
    a = ap.parse_args()

    failures, warnings = [], []
    adrs = load_adrs()
    if not adrs:
        sys.exit(f"ERROR: no ADRs found in {rel(DECISIONS)}")

    check_front_matter(adrs, failures.append)
    check_links(adrs, failures.append)
    check_folders(adrs, failures.append)
    check_amendment_limit(adrs, failures.append)
    sealed = check_sealed(adrs, failures.append)
    check_rules(adrs, failures.append, warnings.append)
    check_index(adrs, failures.append, a.write_index)

    for line in failures:
        print(f"  [FAIL] {line}")
    for line in warnings:
        print(f"  [WARN] {line}")
    live = sum((x["fm"] or {}).get("status") in LIVE for x in adrs.values())
    print(f"adr-check: {len(adrs)} ADRs ({live} live, {sealed} sealed) — "
          + ("OK" if not failures else f"{len(failures)} problem(s)"))
    sys.exit(1 if failures else 0)

if __name__ == "__main__":
    main()
