#!/usr/bin/env python3
"""
verify_build.py — reproduce the Style Dictionary build and diff it against the
shipped styles/. A zero-diff means the emitted output is trustworthy as the
source the spec is generated from.

Typical flow:  verify_build.py  ->  gen_spec.py  ->  check_spec.py
(see governance/SPEC-CHANGE-PROTOCOL.md)

stdlib only. Python 3.8+.
"""
import argparse, os, shutil, subprocess, sys, tempfile

from spec_common import DEFAULT_PROJECT

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
    ap = argparse.ArgumentParser(description=" ".join(__doc__.strip().split("\n\n")[0].split()))
    ap.add_argument("--project", default=DEFAULT_PROJECT,
                    help="directory containing sd.build.js and styles/")
    a = ap.parse_args()
    cmd_verify_build(a.project)

if __name__ == "__main__":
    main()
