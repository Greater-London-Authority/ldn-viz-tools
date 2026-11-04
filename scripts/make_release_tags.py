#!/usr/bin/env python3
"""
This script writes a file containing a list of `git tag` commands.

These will tag a commit for each release of each package
(pointing to the commit where its package.json and CHANGLEOG were updated).


Finds commits whose subject starts with "Update CHANGELOG and package.json",
reads every package.json that commit modified, and emits one
`git tag <name>@<version> <sha>` line per package whose version changed.

Usage: make_release_tags.py [--repo PATH] [--rev REV] [--out FILE]

Usually, run:

    make_release_tags.py --rev main

Then:

   sh git-tag-commands.sh
   git push origin --tags

"""

import argparse
import json
import subprocess
import sys

SUBJECT = "Update CHANGELOG and package.json"


def git(repo, *args, check=True):

    # "git -C path" runs git in path instead of the current directory
    result = subprocess.run(
        ["git", "-C", repo, *args], capture_output=True, text=True
    )
    if check and result.returncode != 0:
        sys.exit(f"git {' '.join(args)} failed:\n{result.stderr}")
    return result


def read_package(repo, rev, path):
    """Return (name, version) from package.json at rev, or None if absent."""
    result = git(repo, "show", f"{rev}:{path}", check=False)
    if result.returncode != 0:
        return None
    data = json.loads(result.stdout)
    return data.get("name"), data.get("version")


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--repo", default=".", help="path to the git repo")
    parser.add_argument(
        "--rev", default="--all", help="revision to search from (default: all refs)"
    )
    parser.add_argument("--out", default="git-tag-commands.sh", help="output file")
    args = parser.parse_args()

    # Oldest first, so if a version somehow appears twice, the first release wins.
    # # The format is %H (commit hash) %x09 (ascii character 9, horizontal tab) %s (subject) 
    log = git(
        args.repo, "log", args.rev, "--reverse", "--no-merges",
        "--format=%H%x09%s",
    ).stdout.splitlines()

    commands = []
    seen = {}
    existing = set(git(args.repo, "tag", "--list").stdout.split())

    for line in log:
        sha, subject = line.split("\t", 1)
        if not subject.startswith(SUBJECT):
            continue

        # diff-tree compares the content of blobs in two tree objects
        # --no-commit-id suppresses te line with the commit ID
        # --name-only shows only the name of each changed file
        # -r means recurse into sub-trees
        changed = git(
            args.repo, "diff-tree", "--no-commit-id", "--name-only", "-r",
            f"{sha}^", sha,
        ).stdout.splitlines()

        for path in sorted(p for p in changed if p.endswith("package.json")):
            after = read_package(args.repo, sha, path)
            if not after or not after[0] or not after[1]:
                continue
            before = read_package(args.repo, f"{sha}^", path)
            if before and before[1] == after[1]:
                continue  # file changed but version did not

            tag = f"{after[0]}@{after[1]}"
            if tag in seen:
                print(f"warning: {tag} already from {seen[tag][:8]}, "
                      f"skipping {sha[:8]}", file=sys.stderr)
                continue
            seen[tag] = sha

            prefix = "# already exists: " if tag in existing else ""
            commands.append(f"{prefix}git tag {tag} {sha[:8]}  # {subject}")

    with open(args.out, "w") as f:
        f.write("#!/bin/sh\n")
        f.write("\n".join(commands) + "\n")

    print(f"Wrote {len(commands)} tag commands to {args.out}")


if __name__ == "__main__":
    main()
