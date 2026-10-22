# London City Data Design System (LCD-DS)

## Overview

This design system is a shared set of foundations for the products we build at the GLA. It brings together patterns, components and guidance so that the people who use our work find it consistent and clear, and so that while making the work we don't have to solve the same problems from scratch each time.

## Scope

The London City Data Design System is flexible, supporting three tiers of use:

- **The full system:** the tokens and components that combine to create our digital products.
- **Adapting existing systems:** raw values, alias classes, specifications and guidance that can be adapted outside our core technology stack.
- **Anywhere:** raw values, specifications and guidance that apply in any medium.

## Governance

Decisions about the system are recorded as numbered Architectural Decision Records in [decisions](./decisions). Each accepted decision is summarised in [RULES](./RULES.md).

If this specification and a decision record disagree, the decision record should be considered correct and this document needs updating. The process for proposing a change is described in the accompanying [README](./README.md).

## Development

The design system is developed in Figma, which is where new work and new values first appear. Values are exported from Figma as design tokens, then transformed and formatted using [Style Dictionary](https://styledictionary.com/). The primary consumer of the design system is the `ldn-viz-tools` component library.

# Design System Specification

This is the specification for the design system's foundations, covering:

- Design tokens
- Typography
- Spacing
- Content flow (the vertical space between blocks)
- Elevation
- Layout grid
- Colour
- Accessibility

## Design Tokens

Design tokens are defined in Figma as variables. Every token follows the same naming grammar, so that they are simple, flexible and easy to understand.

Tokens are defined in two tiers: primitive and semantic. A primitive token holds a raw value and is named by that value, for example `--primitive-spacing-4`. A semantic token says what a value is for and is named by its role, for example `--semantic-flow-spacious-section`. Components use semantic tokens only.

Tokens are exported from Figma as JSON, and the Style Dictionary pipeline turns them into CSS custom properties. To keep the token grammar terse the `semantic` namespace is removed during the Style Dictionary pipeline. The delivered token in the above example becomes `--flow-spacious-section`. The `--primitive` prefix is kept as a guard against direct use.

_Note: In documentation of token anatomy square brackets `[...]` indicate optional modifiers, while curly braces `{...}` represent dynamic variables or specific design choices._

### Token naming grammar

Every token name is built from the same ordered segments, running from general to specific:

`(tier) → category → variant → concept → role → emphasis → state → property/value`

The order of the segments is fixed, segments that don't apply are left out, but the rest never change order.

As a minimum a token name contains a category plus at least one more segment.
For example: `--color-border` is `--{category}[-{role}]`.

Token names are written using lowercase kebab-case. Multi-word values are hyphenated (`semi-bold`, `line-height`). Because dots are not valid in CSS, fractional steps use a hyphen: `--spacing-0-5`.

#### Segment values

Each segment has a fixed set of values. Within a segment, values are grouped by function.

| Segment          | Group          | Values                                                                                        | Example                                                      |
| ---------------- | -------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Category         |                | `color` `spacing` `typography` `flow` `grid` `shadow` `elevation` `breakpoint`                | `--spacing-4`                                                |
| Variant          | Mode           | `inverse` `static` `mode-light` `mode-dark`                                                   | `--color-inverse-surface`                                    |
|                  | Breakpoint     | `base` `sm` `md` `lg` `xl` `2xl`                                                              | `--typography-md-product-title-md-font-size`                 |
|                  | Scope          | `chart` `geo`                                                                                 | `--color-chart-axis`                                         |
|                  | Typeset        | `longform` `product`                                                                          | `--typography-base-longform-body-md-font-size`               |
|                  | Flow context   | `spacious` `standard` `compact`                                                               | `--flow-spacious-loose`                                      |
|                  | Layout         | `fluid` `contained`                                                                           | `--grid-md-contained-gutter`                                 |
| Concept          | Interface      | `canvas` `surface` `interactive` `text` `label` `border`                                      | `--color-surface`                                            |
|                  | Visualisation  | `data` `feature` `annotation` `axis` `grid`                                                   | `--color-geo-feature`                                        |
|                  | Colour sets    | `palette` `brand`                                                                             | `--color-static-brand`                                       |
| Role             | Hierarchy      | `primary` `secondary` `tertiary`                                                              | `--color-interactive-primary`                                |
|                  | Feedback       | `positive` `negative` `caution` `neutral`                                                     | `--color-surface-caution`                                    |
|                  | Surface        | `accent` `alpha` `beta` `empty`                                                               | `--color-surface-accent`                                     |
|                  | Data           | `categorical` `context` `male` `female`                                                       | `--color-data-categorical-blue`                              |
|                  | Typography     | `display` `headline` `subhead` `title` `subtitle` `body` `label` `metric` `caption` `eyebrow` | `--typography-base-product-caption-sm-font-size`             |
| Emphasis         | Contrast       | `muted` `wash` `text`                                                                         | `--color-text-muted`                                         |
| State            | Interaction    | `hover` `active` `focus`                                                                      | `--color-interactive-primary-hover`                          |
|                  | Selection      | `selected` `on` `off` `dragged`                                                               | `--color-interactive-selected`                               |
|                  | Availability   | `disabled` `error`                                                                            | `--color-interactive-disabled`                               |
| Property / value | Colour         | hue · hue + step · step · `white` `black` `base`                                              | `--color-palette-blue-500`                                   |
|                  | Size           | `sm` `md` `lg` …                                                                              | `--shadow-md`, `--typography-base-product-body-sm-font-size` |
|                  | Shadow type    | `inner`                                                                                       | `--shadow-inner`                                             |
|                  | Elevation step | `0` to `6`                                                                                    | `--elevation-1`                                              |
|                  | Typography     | `font-family` `font-size` `font-weight` `line-height` `letter-spacing`                        | `--typography-base-product-title-md-line-height`             |

Tokens are generally named taking one value per segment, however a token may have multiple values in the variant segment, in this instance the values are applied in this order:

1. breakpoint or scope.
2. context (typeset or flow), layout or mode.

Where a semantic set has a default value, that value's name is dropped when no further segment follows it. `--color-border` is the default border colour and `--color-border-default` is not valid.

[Flow](#flow) is set by a context class (`.flow-spacious`, `.flow-standard` or `.flow-compact`), which assigns values to the steps (`tight`, `default`, `loose`, `section`). The tokens always name the context: `--flow-standard-tight`, `--flow-standard`, `--flow-standard-loose` and so on. **The utilities don't**: `.mt-flow-{step}` and `.gap-flow-{step}` resolve against the nearest context. The default step follows the implied-default rule, so the utility is `.mt-flow`, not `.mt-flow-default`.

#### Patterns per tier per category

##### Primitive

**Breakpoint:** `--primitive-breakpoint-{value}`

_Breakpoints: `base` <640, `sm` ≥640, `md` ≥768, `lg` ≥1024, `xl` ≥1280, `2xl` ≥1536._

**Color:** `--primitive-color-{variant}-{value}`

_`mode-light` `mode-dark` variants are only applicable on primitive tier._

**Typography:** `--primitive-typography-{property}[-{value}]`

**Spacing:** `--primitive-spacing-{value}`

##### Semantic

**Color:** `--color[-{variant}][-{concept}][-{role}][-{emphasis}][-{state}][-{value}]`

_Scope, mode and inverse are all variants: `--color-inverse-chart-axis`. A mode variant can be followed directly by a value: `--color-static-black`. `--color-interactive-disabled-muted` is an accepted outlier: it puts state before emphasis._

**Typography:** `--typography-{breakpoint}-{typeset}[-{role}][-{size}]-{property}`

_Every role has a size, `eyebrow` is the only role without one._

**Spacing:** `--spacing-{value}`

**Flow:** `--flow-{context}[-{step}]`

_(The context is `spacious`, `standard` or `compact`. Content outside any declared context takes standard. The bare `--flow-*` variables are internal.)_

**Shadow:** `--shadow[-{value}]`

**Elevation:** `--elevation-{value}`

_(Shadow tokens are still provided, but a stepped level of elevation is expressed with an elevation value from 0 to 6 rather than a shadow size.)_

##### Usage Alias Classes

We provide a small number of classes, that alias the tokens, as a convenience for people who use the CSS without working with tokens. These are named for where they are used, for example: `.card-title`, `.chart-tick`, `.dashboard-section-title`

Semantic tokens are named by _role_, **never** by component. The usage aliases are named for where they are _used_; cards, charts, dashboard sections etc. They are allowed because they are CSS classes that reference the system's tokens, not tokens themselves.

## Typography

Typography is fundamental to the design system anchoring our products' voice, legibility and visual consistency.

### Typeface

The typeface is **Inter**, everywhere except in code blocks where Source Code Pro is used. The typefaces are available as web-fonts.

| Purpose | Value           |
| ------- | --------------- |
| Display | Inter           |
| Default | Inter           |
| Code    | Source Code Pro |

_Display is intentionally specified as a purpose even though it has the same default value_

### Primitive Typography Scale

The scale comprises 17 steps, anchored at `0` = 16px (standard base body size). Negative = smaller/finer, positive = larger/more expressive.

| Step | Size (px) | Size (rem) |        |
| ---- | --------- | ---------- | ------ |
| 14   | 72        | 4.5rem     |        |
| 13   | 64        | 4rem       |        |
| 12   | 56        | 3.5rem     |        |
| 11   | 48        | 3rem       |        |
| 10   | 40        | 2.5rem     |        |
| 9    | 36        | 2.25rem    |        |
| 8    | 32        | 2rem       |        |
| 7    | 30        | 1.875rem   |        |
| 6    | 28        | 1.75rem    |        |
| 5    | 26        | 1.625rem   |        |
| 4    | 24        | 1.5rem     |        |
| 3    | 22        | 1.375rem   |        |
| 2    | 20        | 1.25rem    |        |
| 1    | 18        | 1.125rem   |        |
| 0    | 16        | 1rem       | ← base |
| -1   | 14        | 0.875rem   |        |
| -2   | 12        | 0.75rem    |        |

_rem values assume a 16px root font size._

#### Generative Logic

The scale is created from five base sizes: 12, 14, 16, 18, (doubled twice) and 20 (doubled once)

**Doubling chains:**

- 12 → 24 → 48
- 14 → 28 → 56
- 16 → 32 → 64
- 18 → 36 → 72
- 20 → 40 (→ 80 if extended)

**Exceptions (no chain membership):** 22, 26, 30 are the scale's three hand-placed values. They are deliberately included in the lower half of the scale as responsive intermediates. Below 32px, adjacent steps hold a near-constant ratio of ~1.07–1.17 (12→14→16→18→20→22→24→26→28→30→32). This close spacing gives fine-grained control in the UI-critical range, where a small perceptual step matters more than it does at display sizes.

**Extending the scale:**

- Above step 14 (72px): extend the doubling chain — 40 → 80, 48 → 96, 56 → 112 etc.
- Below step -2 (12px): continue the dense-region ratio, giving the next step ≈ 11px.

### Semantic Typesets

The system has two typesets: longform for reading, and product for interfaces, tables, charts and maps. Both use the same roles. A typeset can give a role its own font, weight, line height, letter-spacing or size; in practice the two differ mainly in line height. Longform is airier, which suits long passages of text, and product is tighter, which suits dashboards.

The typeset is chosen once, on a wrapper or app root:

```html
<body class="typeset-longform"></body>
```

where contexts are nested the inner context takes precedence:

```html
<article class="typeset-longform">
	<p class="body-md">I am set by the longform typeset</p>
	<div class="typeset-product">
		<p class="body-md">I am set by the product typeset</p>
	</div>
</article>
```

#### Roles

Roles are defined in sets of three: sm, md, lg in each set, with the exception of 'eyebrow' which is singular. Role sets are:

| Role     | Description                                                                                          |
| -------- | ---------------------------------------------------------------------------------------------------- |
| Display  | Expressive, high-impact type. Use sparingly.                                                         |
| Headline | Primary statement of a page or section. Sets topic and structure.                                    |
| Subhead  | Supporting statement paired with a headline or display.                                              |
| Title    | Names a discrete unit of context: block of prose or component such as a card, panel, chart or table. |
| Subtitle | Secondary context paired with a title.                                                               |
| Body     | Default reading for sustained running text. The baseline for other roles.                            |
| Label    | Functional text. Heavier than caption for recognition.                                               |
| Metric   | A figure presented as the content itself. Tabular numerals, quick comprehension.                     |
| Caption  | Subordinate annotation for images, charts, sources, and helper text. Smaller and tighter than body.  |
| Eyebrow  | Short signpost above a headline or title. Categorises or orients.                                    |

Distinctions:

- **Display vs Headline**: display is impact; headline is communication.
- **Label vs Caption**: labels are needed to use the interface; captions are optional commentary.
- **Headline vs Title**: headlines open a page or major section; titles name the smaller units within it, whether components or prose blocks.
- **Pairing**: subhead pairs with headline/display, subtitle with title.

Each role can be applied with a class named `.{role}-{size}`, such as `.body-md` or `.title-lg`. The eyebrow class is `.eyebrow`. A role class picks up the values for the current breakpoint and typeset, so there is no need to choose breakpoint tokens by hand.

We output a small set of [aliases](#Usage Aliases), but where possible, use the role classes directly, such as .title-md, because the roles are the system's stable, canonical API.

### Font Weight

The system has five font weights. No role uses light.

| Token                                          | Weight   | Numeral |
| ---------------------------------------------- | -------- | ------- |
| `--primitive-typography-font-weight-light`     | Light    | 300     |
| `--primitive-typography-font-weight-regular`   | Regular  | 400     |
| `--primitive-typography-font-weight-medium`    | Medium   | 500     |
| `--primitive-typography-font-weight-semi-bold` | Semibold | 600     |
| `--primitive-typography-font-weight-bold`      | Bold     | 700     |

#### Identity weight vs emphasis weight

- **Identity weight** is attached to [role](#roles) within a [typeset](#semantic-typesets)
- **Emphasis weight** is a separate modifier that can be applied as an over-ride to give emphasis.

### Per-role identity weights

Both typesets currently give each role the same weight.

| Role     | Weight         |
| -------- | -------------- |
| Display  | Bold (700)     |
| Headline | Bold (700)     |
| Subhead  | Regular (400)  |
| Title    | Semibold (600) |
| Subtitle | Regular (400)  |
| Body     | Regular (400)  |
| Label    | Medium (500)   |
| Metric   | Bold (700)     |
| Caption  | Regular (400)  |
| Eyebrow  | Medium (500)   |

##### Emphasis modifier

A small, role-agnostic layer that applies regardless of which role it is applied to:

```css
.text-strong {
	font-weight: var(--primitive-typography-font-weight-semi-bold);
} /* bump for emphasis */
.text-soft {
	font-weight: var(--primitive-typography-font-weight-regular);
} /* de-emphasize */
```

_Binding to a primitive token here is system css and not a pattern to copy_

### Line Height

Line height is defined in three steps based on a simple formula: `font-size + k`, where font-size and k are measured in px.

| tight           | default         | loose            |
| --------------- | --------------- | ---------------- |
| font-size + 4px | font-size + 8px | font-size + 12px |

#### typeset-longform full matrix

<!-- GEN:longform-matrix START -->

| Role          | base  | sm    | md    | lg    | xl    | Weight |
| ------------- | ----- | ----- | ----- | ----- | ----- | ------ |
| `display-sm`  | 32/40 | 36/44 | 40/48 | 48/56 | 56/64 | 700    |
| `display-md`  | 36/44 | 40/48 | 48/56 | 56/64 | 64/72 | 700    |
| `display-lg`  | 40/48 | 48/56 | 56/64 | 64/72 | 72/80 | 700    |
| `headline-sm` | 26/34 | 26/34 | 26/34 | 26/34 | 26/34 | 700    |
| `headline-md` | 28/36 | 28/36 | 30/38 | 30/38 | 30/38 | 700    |
| `headline-lg` | 30/38 | 32/40 | 36/44 | 36/44 | 40/48 | 700    |
| `subhead-sm`  | 22/30 | 22/30 | 22/30 | 22/30 | 22/30 | 400    |
| `subhead-md`  | 24/32 | 24/32 | 24/32 | 24/32 | 24/32 | 400    |
| `subhead-lg`  | 26/34 | 26/34 | 26/34 | 26/34 | 26/34 | 400    |
| `title-sm`    | 20/28 | 20/28 | 20/28 | 20/28 | 20/28 | 600    |
| `title-md`    | 22/30 | 22/30 | 22/30 | 22/30 | 22/30 | 600    |
| `title-lg`    | 24/32 | 24/32 | 24/32 | 24/32 | 24/32 | 600    |
| `subtitle-sm` | 18/26 | 18/26 | 18/26 | 18/26 | 18/26 | 400    |
| `subtitle-md` | 20/28 | 20/28 | 20/28 | 20/28 | 20/28 | 400    |
| `subtitle-lg` | 22/30 | 22/30 | 22/30 | 22/30 | 22/30 | 400    |
| `body-sm`     | 14/26 | 14/26 | 14/26 | 14/26 | 14/26 | 400    |
| `body-md`     | 16/28 | 16/28 | 16/28 | 16/28 | 16/28 | 400    |
| `body-lg`     | 18/30 | 18/30 | 18/30 | 18/30 | 18/30 | 400    |
| `label-sm`    | 12/20 | 12/20 | 12/20 | 12/20 | 12/20 | 500    |
| `label-md`    | 14/22 | 14/22 | 14/22 | 14/22 | 14/22 | 500    |
| `label-lg`    | 18/26 | 18/26 | 18/26 | 18/26 | 18/26 | 500    |
| `metric-sm`   | 20/24 | 20/24 | 20/24 | 20/24 | 20/24 | 700    |
| `metric-md`   | 24/28 | 24/28 | 24/28 | 24/28 | 24/28 | 700    |
| `metric-lg`   | 28/32 | 30/34 | 32/36 | 32/36 | 36/40 | 700    |
| `caption-sm`  | 12/16 | 12/16 | 12/16 | 12/16 | 12/16 | 400    |
| `caption-md`  | 14/18 | 14/18 | 14/18 | 14/18 | 14/18 | 400    |
| `caption-lg`  | 16/20 | 16/20 | 16/20 | 16/20 | 16/20 | 400    |
| `eyebrow`     | 14/18 | 14/18 | 14/18 | 14/18 | 14/18 | 500    |

_Font size / line height in px. Breakpoints: base <640, sm ≥640, md ≥768, lg ≥1024, xl ≥1280._

<!-- GEN:longform-matrix END -->

#### typeset-product full matrix

<!-- GEN:product-matrix START -->

| Role          | base  | sm    | md    | lg    | xl    | Weight |
| ------------- | ----- | ----- | ----- | ----- | ----- | ------ |
| `display-sm`  | 32/40 | 36/44 | 40/48 | 48/56 | 56/64 | 700    |
| `display-md`  | 36/44 | 40/48 | 48/56 | 56/64 | 64/72 | 700    |
| `display-lg`  | 40/48 | 48/56 | 56/64 | 64/72 | 72/80 | 700    |
| `headline-sm` | 26/34 | 26/34 | 26/34 | 26/34 | 26/34 | 700    |
| `headline-md` | 28/36 | 28/36 | 30/38 | 30/38 | 30/38 | 700    |
| `headline-lg` | 30/38 | 32/40 | 36/44 | 36/44 | 40/48 | 700    |
| `subhead-sm`  | 22/30 | 22/30 | 22/30 | 22/30 | 22/30 | 400    |
| `subhead-md`  | 24/32 | 24/32 | 24/32 | 24/32 | 24/32 | 400    |
| `subhead-lg`  | 26/34 | 26/34 | 26/34 | 26/34 | 26/34 | 400    |
| `title-sm`    | 20/28 | 20/28 | 20/28 | 20/28 | 20/28 | 600    |
| `title-md`    | 22/30 | 22/30 | 22/30 | 22/30 | 22/30 | 600    |
| `title-lg`    | 24/32 | 24/32 | 24/32 | 24/32 | 24/32 | 600    |
| `subtitle-sm` | 18/26 | 18/26 | 18/26 | 18/26 | 18/26 | 400    |
| `subtitle-md` | 20/28 | 20/28 | 20/28 | 20/28 | 20/28 | 400    |
| `subtitle-lg` | 22/30 | 22/30 | 22/30 | 22/30 | 22/30 | 400    |
| `body-sm`     | 14/22 | 14/22 | 14/22 | 14/22 | 14/22 | 400    |
| `body-md`     | 16/24 | 16/24 | 16/24 | 16/24 | 16/24 | 400    |
| `body-lg`     | 18/26 | 18/26 | 18/26 | 18/26 | 18/26 | 400    |
| `label-sm`    | 12/20 | 12/20 | 12/20 | 12/20 | 12/20 | 500    |
| `label-md`    | 14/22 | 14/22 | 14/22 | 14/22 | 14/22 | 500    |
| `label-lg`    | 18/26 | 18/26 | 18/26 | 18/26 | 18/26 | 500    |
| `metric-sm`   | 20/24 | 20/24 | 20/24 | 20/24 | 20/24 | 700    |
| `metric-md`   | 24/28 | 24/28 | 24/28 | 24/28 | 24/28 | 700    |
| `metric-lg`   | 28/32 | 30/34 | 32/36 | 32/36 | 36/40 | 700    |
| `caption-sm`  | 12/16 | 12/16 | 12/16 | 12/16 | 12/16 | 400    |
| `caption-md`  | 14/18 | 14/18 | 14/18 | 14/18 | 14/18 | 400    |
| `caption-lg`  | 16/20 | 16/20 | 16/20 | 16/20 | 16/20 | 400    |
| `eyebrow`     | 14/18 | 14/18 | 14/18 | 14/18 | 14/18 | 500    |

_Font size / line height in px. Breakpoints: base <640, sm ≥640, md ≥768, lg ≥1024, xl ≥1280._

<!-- GEN:product-matrix END -->

### Usage Aliases

A small number of usage aliases are provided for people who use the system's CSS without working with its tokens or typesets.

Each alias class points to an existing typeset role, and resolves against the nearest typeset context.

Aliases are named `{place}-{part}`, for example: `.card-title`, `.chart-tick`, `.dashboard-section-title`.

The set of aliases is defined in the `usage` style set in Figma. Adding an alias to be output from the system requires a recorded decision.

<!-- GEN:alias-table START -->

| Alias                         | Role           | Adds                           |
| ----------------------------- | -------------- | ------------------------------ |
| `.chart-title`                | `.title-sm`    |                                |
| `.chart-subtitle`             | `.subtitle-sm` | muted colour                   |
| `.chart-axis-title`           | `.label-md`    | muted colour                   |
| `.chart-label`                | `.label-md`    |                                |
| `.chart-tick`                 | `.caption-md`  | tabular numerals, muted colour |
| `.chart-tick-sm`              | `.caption-sm`  | tabular numerals, muted colour |
| `.chart-note`                 | `.caption-sm`  |                                |
| `.table-title`                | `.title-sm`    |                                |
| `.table-subtitle`             | `.subtitle-sm` | muted colour                   |
| `.table-col-head`             | `.label-md`    | tabular numerals               |
| `.table-col-head-sm`          | `.label-sm`    | tabular numerals               |
| `.table-cell`                 | `.body-sm`     | tabular numerals               |
| `.dashboard-main-title`       | `.headline-md` |                                |
| `.dashboard-main-subtitle`    | `.subhead-md`  | muted colour                   |
| `.dashboard-section-title`    | `.headline-sm` |                                |
| `.dashboard-section-subtitle` | `.subhead-sm`  | muted colour                   |
| `.header-title`               | `.title-sm`    |                                |
| `.sidebar-title`              | `.title-sm`    |                                |
| `.dialog-title`               | `.label-lg`    |                                |
| `.card-title`                 | `.title-sm`    |                                |
| `.card-subtitle`              | `.subtitle-sm` | muted colour                   |
| `.hint-text`                  | `.caption-sm`  |                                |
| `.input-label`                | `.label-md`    |                                |
| `.placeholder`                | `.body-sm`     |                                |
| `.field-value`                | `.body-sm`     |                                |
| `.button-label`               | `.label-md`    |                                |
| `.button-label-sm`            | `.label-sm`    |                                |

<!-- GEN:alias-table END -->

### Title Groups

A title group is the collection of text elements that appear at the top of a component such as a card, chart, table or panel. It can contain up to three parts, stacked in this order: an optional eyebrow, a title and a subtitle. Each part uses the role of the same name.

Components can contain other titled components. A card might hold a single chart, or a pair of charts, each of which has its own title group. If every group kept its full treatment, two or more titles of similar weight would compete for dominance.

When a component contains only one title group, that group can use all three parts.
The eyebrow is optional.

When a component contains two or more title groups, the designer chooses which should be dominant. A dominant group has a title and an optional subtitle, and no eyebrow. Demoted groups consist of an eyebrow only. The text that would have been the title is set as the eyebrow. A subtitle pairs only with a dominant title, never with an eyebrow, so a demoted group's subtitle is dropped.

A title group's title uses `title-sm` unless the design needs a larger one.

Worked examples:

- **A card containing text, with no titled element inside it.** The card's title
  group is the only one, so it can have an eyebrow, a title and a subtitle.
- **A card containing one chart, where the chart is the main subject.** The
  designer makes the chart's group dominant. The chart has a title and
  subtitle, and the card's title is set as an eyebrow. The eyebrow sits
  directly above the chart's title, but it is the card's demoted group, not
  part of the chart's group.
- **A card containing two related charts.** The designer makes the card's group
  dominant, so the card has a title and subtitle. Each chart's title is set as
  an eyebrow.

_In an article or marketing page block the eyebrow can be used as a purely stylistic kicker above display text or a headline._

## Spacing

Spacing uses a single numbered scale. The number is a multiple of 4px:
`--spacing-4` is 16px. Below 16px there are half steps for finer control
(`--spacing-1-5` is 6px), and `--spacing-px` is 1px.

Space does one of two jobs. Space that builds a component, such as padding or
an indent, uses the spacing scale. Space between blocks of content uses [flow](#flow) and changes with its context.

<!-- GEN:spacing-table START -->

| Token           | px  | rem       |
| --------------- | --- | --------- |
| `--spacing-1`   | 4   | 0.25rem   |
| `--spacing-2`   | 8   | 0.5rem    |
| `--spacing-3`   | 12  | 0.75rem   |
| `--spacing-4`   | 16  | 1rem      |
| `--spacing-5`   | 20  | 1.25rem   |
| `--spacing-6`   | 24  | 1.5rem    |
| `--spacing-7`   | 28  | 1.75rem   |
| `--spacing-8`   | 32  | 2rem      |
| `--spacing-10`  | 40  | 2.5rem    |
| `--spacing-12`  | 48  | 3rem      |
| `--spacing-14`  | 56  | 3.5rem    |
| `--spacing-16`  | 64  | 4rem      |
| `--spacing-20`  | 80  | 5rem      |
| `--spacing-24`  | 96  | 6rem      |
| `--spacing-px`  | 1   | 0.0625rem |
| `--spacing-0-5` | 2   | 0.125rem  |
| `--spacing-1-5` | 6   | 0.375rem  |
| `--spacing-2-5` | 10  | 0.625rem  |
| `--spacing-3-5` | 14  | 0.875rem  |

<!-- GEN:spacing-table END -->

## Flow

Flow is the vertical space between blocks of content, such as a heading and its paragraph, or one card and the next.

Flow is set on a container as a context: `flow-spacious`, `flow-standard` or `flow-compact`. Standard is the default. Each context gives a value to four steps: `tight`, `default`, `loose` and `section`. The same step is wider in a spacious context than in a compact one (see the table below).

`typeset-longform` adds `flow-spacious` automatically, and assigns steps to headings, captions and block elements from the markup.

Flow spaces only the direct children of its context, and each child gets the `default` step. An `mt-flow-{step}` or `gap-flow-{step}` class replaces the assigned step.

A component that declares its own flow context or spacing is sealed: the flow around it stops at its edge. A component keeps its density wherever it is placed only if it declares its own context.

<!-- GEN:flow-table START -->

| Step      | Utility            | spacious | standard | compact |
| --------- | ------------------ | -------- | -------- | ------- |
| `tight`   | `.mt-flow-tight`   | 4        | 4        | 4       |
| `default` | `.mt-flow`         | 16       | 8        | 4       |
| `loose`   | `.mt-flow-loose`   | 24       | 16       | 8       |
| `section` | `.mt-flow-section` | 40       | 24       | 8       |

_Values in px._

<!-- GEN:flow-table END -->

## Elevation

An interface is a stack. The canvas is at the base, and surfaces sit above it
at different levels of elevation. Each level is shown by a shadow.

Elevation runs from `elevation-0` to `elevation-6`. `elevation-0` sits on the
canvas and has no visual effect. Each step above it raises a surface further.

A surface's level is set by its colour and its elevation. The surface colour
is `--color-surface`, or `--color-surface-muted` to set it apart from what is
around it, and the elevation step is the level. There are no colour tokens for
levels.

Elevation is visual only. Stacking order is set by z-index, which is
independent of elevation.

## Visual Rules

Corners are square. The only exceptions are things that are actually round,
such as a circular avatar or a dot.

## Charts and Tables

Code is the source of truth for charts and tables. Figma versions are
representative: they are built to look right, not to be accurate to the data.

Chart text uses the product typeset roles or the usage aliases. Chart colours
use the `data` and `chart` colour tokens.

Series take `--color-data-primary`, `--color-data-secondary` and
`--color-data-tertiary`, in that order. In light mode these are the blue, dark
pink and orange of the categorical palette. In dark mode they are cyan, pink and
orange. To highlight one series against the rest, use `--color-data-primary` for
it and `--color-data-context` for the others.

Categories with no order or ranking can use the categorical palette,
`--color-data-categorical-{hue}`, instead of the series roles.

A chart that needs other colours takes them from the categorical palette,
`--color-data-categorical-{hue}`. Use two or three in a chart, not the whole
palette. Areas with no data use `--color-data-empty`.

The background, axes, grid lines and labels use the `chart` tokens.

# Addendum: suggested extensions

_This addendum is not part of the specification. It lists content the decision records support but this skeleton does not yet cover._

- **Layout grid, Colour and Accessibility** are listed in the scope above but have no decision record yet.
