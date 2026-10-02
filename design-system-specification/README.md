# London City Data Design System (LCD-DS)

## Specification

The [Design System Specification](./design-system-specification.md) is the canonical reference for understanding the London City Data Design System (LCD-DS)

The content of the specification is hand written. The tables of values it contains are generated from tokens and CSS by running the `regen_spec.py` script.

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
