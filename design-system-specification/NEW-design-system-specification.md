# London City Data Design System (LCD-DS)

## Overview

This design system is a shared set of foundations for the products we build at the GLA. It brings together patterns, components and guidance so that the people who use our work find it consistent and clear, and so that those of us building it don't have to solve the same problems from scratch each time.

## Scope

The London City Data Design System is flexible such that it allows for tiered usage:

- **The full system:** The tokens and components that combine to create our digital products
- **Adapting existing systems:** Raw values, specifications and guidance that can be adapted outside of our core technology stack
- **Anywhere:** Raw values, specifications and guidance applicable anywhere

## Governance

See the accompanying [README](./README.md)

## Development

The design system is developed using Figma. Values are exported from Figma as design tokens and transformed and formatted using style dictionary. The primary consumer of the design system is the `ldn-viz-tools` component library

# Design System Specification

This is the specification for the design system's foundations covering:

- Design Tokens
- Typography
- Spacing
- Content flow (rhythm)
- Layout Grid
- Color
- Accessibility

## Design Tokens

The design tokens are defined in Figma as variables. We use a consistent naming grammar to make them simple, flexible and easy to understand.

Tokens are defined in two tiers: primitive → semantic. Primitive tokens are named by their value.
Semantic tokens are named by their role.

### Token naming Grammar

Every token name is built from the same ordered segments, running from general to specific:

`(tier) → category → variant → concept → role → emphasis → state → property/value`

- **Minimum:** a category plus at least one more segment.
- **Order is fixed:** Segments that don't apply are left out, but the rest never change order.
- **Tier:** primitive tokens carry the `primitive-` prefix. Semantic tokens have no tier segment.
- **Implied defaults:** a default is left out unless another segment follows it. `--shadow` is the default shadow. `base` is included in `--typography-base-product-title-font-size` because more segments follow it.
- **More than one variant:** a token can have several variants, in this order:
  1. breakpoint or scope,
  2. context, layout or inverse.

  Examples: `md-product`, `md-contained`, `chart-inverse`.

- **The same word in two slots:**
  - `color-text`: `text` is a concept straight after the category.
  - `interactive-primary-text`: `text` is an emphasis after a role, where it acts as a contrast modifier.

#### Segment values

Each segment has a fixed set of values. Within a segment, values are grouped by the job they do. The examples are real tokens.

| Segment          | Group         | Values                                                                                                 | Example                                                      |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| Category         |               | `color` `spacing` `typography` `flow` `grid-spacing` `shadow` `elevation` `breakpoint`                 | `--spacing-4`                                                |
| Variant          | Mode          | `inverse` `static` `mode-light` `mode-dark`                                                            | `--color-inverse-surface`                                    |
|                  | Breakpoint    | `base` `sm` `md` `lg` `xl` `2xl`                                                                       | `--typography-md-product-title-font-size`                    |
|                  | Scope         | `chart` `geo`                                                                                          | `--color-chart-axis`                                         |
|                  | Context       | `prose` `product` `compact` `chart`                                                                    | `--flow-prose-loose`                                         |
|                  | Layout        | `fluid` `contained`                                                                                    | `--grid-spacing-md-contained-gutter`                         |
| Concept          | Interface     | `canvas` `container` `surface` `interactive` `text` `label` `border`                                   | `--color-surface`                                            |
|                  | Visualisation | `data` `feature` `annotation` `axis` `grid`                                                            | `--color-geo-feature`                                        |
|                  | Colour sets   | `palette` `brand`                                                                                      | `--color-static-brand`                                       |
| Role             | Hierarchy     | `primary` `secondary` `tertiary`                                                                       | `--color-interactive-primary`                                |
|                  | Feedback      | `positive` `negative` `caution` `neutral`                                                              | `--color-surface-caution`                                    |
|                  | Surface       | `accent` `alpha` `beta` `empty`                                                                        | `--color-surface-accent`                                     |
|                  | Data          | `categorical` `context` `male` `female`                                                                | `--color-data-categorical-blue`                              |
|                  | Typography    | the role set for each context                                                                          | `--typography-base-chart-tick-font-size`                     |
| Emphasis         | Contrast      | `muted` `wash` `text`                                                                                  | `--color-text-muted`                                         |
|                  | Elevation     | `level-1` `level-2` `level-3`                                                                          | `--color-container-level-2`                                  |
| State            | Interaction   | `hover` `active` `focus`                                                                               | `--color-interactive-primary-hover`                          |
|                  | Selection     | `selected` `on` `off` `dragged`                                                                        | `--color-interactive-selected`                               |
|                  | Availability  | `disabled` `error`                                                                                     | `--color-interactive-disabled`                               |
| Property / value | Colour        | hue · hue + step · step · `white` `black` `base`                                                       | `--color-palette-blue-500`                                   |
|                  | Size          | `sm` `md` `lg` …                                                                                       | `--shadow-md`, `--typography-base-product-body-sm-font-size` |
|                  | Shadow type   | `inner`                                                                                                | `--shadow-inner`                                             |
|                  | Typography    | `font-family` `font-size` `font-weight` `line-height` `letter-spacing` `readable-width` `space-before` | `--typography-base-prose-readable-width`                     |

#### Patterns per tier per category

##### Primitive

**Breakpoint:** `--primitive-breakpoint-{value}`

**Color:** `--primitive-color-{variant}-{value}`

**Typography:** `--primitive-typography-{property}[-{value}]`

**Spacing:** `--primitive-spacing-{value}`

##### Semantic

**Color:** `--color[-{variant}][-{concept}][-{role}][-{emphasis}][-{state}][-{value}]`

_(Scope, mode and inverse are all variants: `--color-chart-inverse-axis`. A mode variant can be followed directly by a value: `--color-static-black`.)_

_(`--color-interactive-disabled-muted`: is an accepted outlier. This one puts state before emphasis.)_

**Typography:** `--typography-{breakpoint}-{context}[-{role}][-{size}]-{property}`

_(`--typography-base-prose-readable-width` has no role. `-sm` roles carry a size: `--typography-base-product-body-sm-font-size`.)_

**Spacing:** `--spacing-{value}`

**Flow:** `--flow-[{context}-]{step}`

**Shadow:** `--shadow[-{value}]`
