---
id: '0002'
title: Token Naming Grammar
status: accepted
date: 2026-09-30
released-in: null
deciders: [Chris Knight]
areas: [Design Tokens]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: []
pr_url: ''
---

# 0002 — Token Naming Grammar

## Context

Consistent naming grammar for design tokens should be clear and logical. Keep it simple, flexible and understandable. Guard against bloat and cognitive load.

## Decision

- **Two tiers:** primitive → semantic. Primitives hold values. Semantic tokens say what a value is for. Components use semantic tokens only, never primitives or raw values.
  - Primitives carry the `primitive-` prefix and are named by their value.
    --primitive-typography-font-size-14 · --primitive-typography-font-weight-semi-bold · --primitive-spacing-4 (4 × 4px)
  - Semantic tokens drop the tier segment (it is inferred after being output from Figma), and are named by their role, never by value or component.
    `title` (role), not 20 (value) and not card-panel-title (component).
- **One grammar for every token, general to specific:** `(tier) → category → variant → concept → role → emphasis → state → property/value`. Segments that don't apply are left out; the rest never change order.
- **Minimum:** a category plus at least one more segment.
- Each segment has a fixed set of values, listed in the spec. A new value needs a spec change.
- The grammar applied to each category:

| Category   | Pattern                                                                   | Example                                                       |
| ---------- | ------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Typography | --typography-{breakpoint}-{context}[-{role}][-{size}]-{property}          | --typography-base-product-title-md-font-size                  |
| Colour     | --color[-{variant}][-{concept}][-{role}][-{emphasis}][-{state}][-{value}] | --color-interactive-primary-muted-hover, --color-static-black |
| Spacing    | --spacing-{value}                                                         | --spacing-4                                                   |
| Flow       | --flow-{context}[-{step}]                                                 | --flow-spacious-loose, --flow-standard                        |
| Shadow     | --shadow[-{value}]                                                        | --shadow, --shadow-md, --shadow-inner                         |
| Elevation  | --elevation-{value}                                                       | --elevation-0, --elevation-1                                  |

- **More than one variant:** breakpoint or scope first, then context, layout or inverse.
- **One accepted outlier:** --color-interactive-disabled-muted puts state before emphasis.
- **The context segment decides the family.** In typography it is longform or product ([0003](./0003-typography.md)); in flow it is spacious, standard or compact ([0005](./0005-flow.md)). chart is not a typography context, only a scope in colour. Families never mix: a Product/\* component uses product tokens only. Charts and tables use the product typeset, or the usage aliases provided for them.
- **Role names are the shared role vocabulary of [0003](./0003-typography.md):** display, headline, subhead, title, subtitle, body, label, metric, caption and eyebrow. Both typesets use the same names. They say what the text does, not which component it sits in.
- **Accepted exception to role-only naming:** the usage aliases in [0003](./0003-typography.md) are component-level names. They are allowed because they are classes, not tokens, and they are a convenience layer over the typeset roles, which remain the canonical API.
- **Implied defaults:** For a semantic token a default is a value that can be omitted when it is last; a context or a size is never omitted.
  - where a set has a default value, that value's name is dropped when no further segment follows it. `--color-border` is the default border colour and `--shadow` is the default shadow.
  - **Flow:** Flow is set by a context class (`.flow-spacious`, `.flow-standard` or `.flow-compact`), which assigns values to the steps (`tight`, `default`, `loose`, `section`). The tokens always name the context: `--flow-standard-tight`, `--flow-standard`, `--flow-standard-loose`, `--flow-standard-section` and so on. **The utilities don't**: `.mt-flow-{step}` and `.gap-flow-{step}` resolve against the nearest context. The default step follows the implied-default rule, so the utility is `.mt-flow`, not `.mt-flow-default`.
  - **Typography:** role sizes are a fixed range (`sm`, `md`, `lg`) and are always written, as in `title-md`. `md` is not a default; it is one of three sizes. `eyebrow` has no size. `base` is the default breakpoint, but it is written whenever more segments follow it, as in `--typography-base-product-title-md-font-size`.
- Shadow tokens are still emitted, but stepped elevation uses `elevation-{0–6}` ([0011](./0011-elevation.md)), not a shadow size.
- The same word can fill two slots: text is a concept in color-text and an emphasis in interactive-primary-text.
- **Spelling:** lowercase kebab-case throughout. Multi-word values are hyphenated (semi-bold, line-height). Context classes put the kind first: `typeset-longform`, `typeset-product`, `flow-spacious`. Fractional steps use a hyphen, because dots aren't valid in CSS names: --spacing-0-5, not --spacing-0.5

## Options considered

- **Semantic tokens are named by their role, never by value or component.**
- **Component scoped tokens** On face value component scoped tokens may appear more user friendly, however they leave the door open to token bloat, so role based naming is enforced for semantic tokens. Usage _classes_ are allowed because they are classes, not tokens, and they are a convenience layer over the typeset roles, which remain the canonical API.

- **The default has no modifier**
- **Include default modifier** Decided not to include this to keep usage terse. Favouring --color-text over --color-text-default.

## Consequences

- **`outputReferences` in the style dictionary pipeline is on for the typography platform, and must stay on.** Without it typography emits resolved literals, so an alias is indistinguishable from a copied value and drift is invisible.
