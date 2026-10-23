# Design tokens

Spec section: Design tokens. ADRs: [0002](../../../../design-system-specification/decisions/0002-token-naming-grammar.md), [0013](../../../../design-system-specification/decisions/0013-token-export-and-parsing.md), [0014](../../../../design-system-specification/decisions/0014-distribution-and-outputs.md).

## Tiers

There are two tiers. A primitive has a value and is named by that value or by its step on a scale: `--primitive-spacing-4`, `--primitive-typography-scale-0`. A semantic token is named by its role: `--color-border`, `--flow-standard-loose`.

Components and pages use semantic tokens, or classes built on them. Never use a `--primitive-*` token or a raw value in authored code. `.text-strong` and `.text-soft` in `system.css` bind font-weight primitives, as system code; don't copy that pattern.

The Figma export has a `semantic` segment. The build removes it, so `semantic/flow/spacious/section` becomes `--flow-spacious-section`.

## Grammar

Every token name uses the same segments in the same order, leaving out those that don't apply:

`(tier) → category → variant → concept → role → emphasis → state → property/value`

| Category | Pattern | Example |
| --- | --- | --- |
| Typography | `--typography-{breakpoint}-{typeset}[-{role}][-{size}]-{property}` | `--typography-base-product-title-md-font-size` |
| Colour | `--color[-{variant}][-{concept}][-{role}][-{emphasis}][-{state}][-{value}]` | `--color-interactive-primary-muted-hover` |
| Spacing | `--spacing-{value}` | `--spacing-4` |
| Flow | `--flow-{context}[-{step}]` | `--flow-spacious-loose` |
| Grid | `--grid-{breakpoint}-{layout}-{property}` | `--grid-md-contained-container-padding` |
| Shadow | `--shadow[-{value}]` | `--shadow-md` |
| Elevation | `--elevation-{value}` | `--elevation-1` |

Each segment has a fixed list of values, in the spec's Segment values table. A new value needs a spec change.

When a token has two variants, breakpoint or scope comes first, then typeset, flow context, layout or inverse: `--color-inverse-chart-axis`, `--grid-md-contained-container-padding`.

A default value is dropped when nothing follows it. `--color-border` is the default border colour, and `--flow-standard` is the default step of the standard context. A typeset, flow context or role size is always written: `title-md`, never `title`.

Names are lowercase kebab-case. Fractional steps use a hyphen: `--spacing-0-5`.

`--color-interactive-disabled-muted` puts state before emphasis. It is the one accepted exception.

## Role properties

`system.css` copies each typography token onto a short name for the current typeset and breakpoint: `--title-md-font-size`, `--body-md-line-height`. Role classes, usage aliases and the hand-written content and form styles use these short names. They aren't tokens, and aren't in `tokens.json`.

## Usage aliases

Usage aliases are classes named for where they are used, such as `.card-title` and `.chart-tick`. Each points to a role. They are allowed to name a component because they are classes, not tokens. They come from the `usage` style set in Figma (`tokens/lcd-ds-usage.tokens.json`). The list is in [typography.md](typography.md).

## Reading a value

`styles/tokens.json` has every token, keyed by its custom property name. Each entry has `value`, `type`, `path`, `references` and, for colours, `dark`. Use it to check a value rather than reading `tokens.css`.
