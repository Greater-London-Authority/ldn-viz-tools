# London City Data Design System (LCD-DS)

## Specification

The [Design System Specification](./design-system-specification.md) is the canonical reference for understanding the London City Data Design System (LCD-DS)

The content of the specification is hand written. The tables of values it contains are generated from tokens and CSS by the scripts in [./scripts](./scripts) (see [Running the scripts](#running-the-scripts)).

## Governance

As changes to the specification can introduce breaking changes that effect our production applications we have implemented a simple, formal governance process.

Changes to the design system specification should be raised by submitting a Request For Comment (rfc). This will then be discussed by the design system maintainers and actions agreed upon.

Decisions are logged as numbered Architectural Decision Records which in tern are referenced from the canonical [RULES](./RULES.md) file, with the spec being updated accordingly.

More details can be found in [ADR-LIFECYCLE](./governance/ADR-LIFECYCLE.md)

"Everyday" fixes that don't bear architectural weight can be submitted as issues in this repo, or taken as comments in Figma.

### Templates

Templates for **Architectural Decision Record (adr)** and **Request For Comment (rfc)** are in [./governance/templates](./governance/templates)

## Documentation

The documentation of the design system lives at: [apps.london.gov.uk/city-data/design-system] (https://apps.london.gov.uk/city-data/design-system)

The @ldn-viz-tools component library that is built using the design system is documented in our [Storybook](https://greater-london-authority.github.io/ldn-viz-tools)

## Running the scripts

The scripts in [./scripts](./scripts) keep the value tables in the specification in step with the CSS emitted by `packages/themes`. They need Python 3.8 or later and nothing else. Run them from the repo root:

```sh
# 1. Rebuild the tokens and confirm the output matches the shipped packages/themes/styles/
python3 design-system-specification/scripts/verify_build.py

# 2. Regenerate the value tables in design-system-specification.md
python3 design-system-specification/scripts/gen_spec.py
#    or, to only report stale tables without writing (exits 1 if any are stale):
python3 design-system-specification/scripts/gen_spec.py --check

# 3. Check no invariant or pinned decision has drifted from the emitted CSS (exits 1 on failure)
python3 design-system-specification/scripts/check_spec.py
```

Run them in that order. `verify_build.py` needs Node, because it runs `sd.build.js`.

Each script finds the spec and `packages/themes` on its own. Use `--spec`, `--styles` or `--project` to point at other paths, and `--help` to list the options.

Values that encode a decision, such as the pinned font sizes and the flow ramp, live in `scripts/check_spec.py`. When an ADR changes one of them, update it there.
