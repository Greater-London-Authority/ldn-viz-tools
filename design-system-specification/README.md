# London City Data Design System (LCD-DS)

## Specification

The [Design System Specification](./design-system-specification.md) is the canonical reference for understanding the London City Data Design System (LCD-DS)

The content of the specification is hand written. The tables of values it contains are generated from the `packages/themes` build by the scripts in [./scripts](./scripts) (see [Running the scripts](#running-the-scripts)).

## Governance

As changes to the specification can introduce breaking changes that affect our production applications we have implemented a simple, formal governance process.

Changes to the design system specification should be raised by submitting a Request For Comment (rfc). This will then be discussed by the design system maintainers and actions agreed upon.

Decisions are logged as numbered Architectural Decision Records which in turn are referenced from the canonical [RULES](./RULES.md) file, with the spec being updated accordingly.

More details can be found in [ADR-LIFECYCLE](./governance/ADR-LIFECYCLE.md)

"Everyday" fixes that don't bear architectural weight can be submitted as issues in this repo, or taken as comments in Figma.

### Templates

Templates for **Architectural Decision Record (adr)** and **Request For Comment (rfc)** are in [./governance/templates](./governance/templates)

## Documentation

The documentation of the design system lives at: [apps.london.gov.uk/city-data/design-system](https://apps.london.gov.uk/city-data/design-system)

The @ldn-viz-tools component library that is built using the design system is documented in our [Storybook](https://greater-london-authority.github.io/ldn-viz-tools)

## Running the scripts

The scripts in [./scripts](./scripts) keep the specification and the decision records in step with the build output of `packages/themes`. They need Python 3.8 or later and no other packages. The build itself needs Node, with the repository's dependencies installed.

The build output in `packages/themes/styles/` is not committed, so build the tokens before running the scripts:

```sh
cd packages/themes && npm run build-tokens && cd ../..
```

Then run the scripts from the repository root, in this order:

```sh
# 1. Rebuild the tokens and confirm the result is identical to the build in packages/themes/styles/
python3 design-system-specification/scripts/verify_build.py

# 2. Regenerate the value tables in design-system-specification.md
python3 design-system-specification/scripts/gen_spec.py
#    or, to report stale tables without writing them (exits 1 if any are stale):
python3 design-system-specification/scripts/gen_spec.py --check

# 3. Check the build against the values and rules the specification states, and
#    the class and token names in RULES.md (exits 1 on failure)
python3 design-system-specification/scripts/check_spec.py

# 4. Check the decision records against ADR-LIFECYCLE.md (exits 1 on failure)
python3 design-system-specification/scripts/adr_check.py
#    after adding an ADR or changing its status, regenerate decisions/INDEX.md first:
python3 design-system-specification/scripts/adr_check.py --write-index
```

`verify_build.py` runs the build a second time and compares the two results, so a difference means the build is not reproducible or `styles/` is out of date. `gen_spec.py` and `check_spec.py` read `styles/tokens.json`, `styles/system.css` and `RULES.md`. `adr_check.py` reads `decisions/` and `RULES.md`, and does not need the build.

`check_spec.py` and `adr_check.py` can also report `[WARN]` lines. A warning does not fail the run. It marks something to follow up, such as a primitive value no role uses, or a proposed ADR that `RULES.md` does not cite yet.

Each script finds the specification and `packages/themes` without being told where they are. Use `--spec`, `--styles`, `--rules` or `--project` to point at other paths, and `--help` to list the options.

Values that encode a decision, such as the role weights, the type scale and the flow ramp, are pinned near the top of `scripts/check_spec.py`. When an ADR changes one of them, update it there.
