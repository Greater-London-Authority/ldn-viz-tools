---
title: Design Tokens
description: A single source of truth
navLabel: Design Tokens
heroImage: header-foundations-overflow.svg
thumbnail: cta-foundations-3.svg
order: 1
---

<script>
	import UsageTabs from '$lib/components/usageTabs/UsageTabs.svelte';
	import TokenReference from '$lib/components/tokenReference/TokenReference.svelte';
	import TokenDiagram from '$lib/components/tokenReference/TokenDiagram.svelte';
	import TokenConcept from '$lib/components/tokenReference/TokenConcept.svelte';
</script>

<p class="lead">Design tokens are named values for the decisions in the system: colours, type, spacing, flow, the layout grid, shadows and elevation.</p>

The tokens are defined in Figma and published in the `@ldn-viz/themes` package. Each semantic token is named for its purpose, such as `--color-text-muted` for secondary text. When a token's value changes, everything that uses the token takes the new value.

## Use

<UsageTabs>
{#snippet full()}

The components use the tokens already. In your own markup, each token is a CSS custom property:

```css
.summary {
	color: var(--color-text-muted);
	padding: var(--spacing-4);
}
```

If your app uses Tailwind, as the component library does, the theme package's preset makes each token a utility. The utility's prefix comes first, then the token name without the `--`, so `bg-color-surface` sets the background to `--color-surface`. Spacing utilities use the numbered scale, so `p-4` is 16px of padding.

To use a colour in JavaScript, for example to pass it to a chart library, use `theme` from `@ldn-viz/ui`. It returns the value for the current mode:

```js
import { theme } from '@ldn-viz/ui';

const seriesColour = theme.tokenNameToValue('data.primary');
```

Use a class for typography and flow tokens. A type role, such as `title-md`, is set by five tokens: font family, size, weight, line height and letter spacing. Each of those tokens has a value for each typeset and breakpoint. The class sets the text to the values for the typeset and breakpoint it's in, so use the class rather than the tokens. A flow token, such as `--flow-section`, takes its value from the nearest flow context class, such as `flow-standard`. See [Typography](/design-system/foundations/typography) and [Flow](/design-system/foundations/flow) for more detail.

```html
<section class="flow-standard">
	<h2 class="title-md">Housing completions</h2>
	<p class="body-md">…</p>
</section>
```

{/snippet}
{#snippet adapting()}

Each token is a CSS custom property:

```css
.panel {
	color: var(--color-text-muted);
	padding: var(--spacing-4);
	box-shadow: var(--elevation-2);
}
```

Colour tokens have a value for each mode. The light values are set on `:root`, and the dark values on `.dark`, so an element inside `.dark` takes the dark value of the same token.

`var(--flow-section)` and the other flow steps take their value from the nearest flow context, set with a class such as `.flow-standard`.

{/snippet}
{#snippet anywhere()}

The [reference](#reference) lists every token with its value. Colour tokens have a value for light mode and a value for dark mode.

To use the values in code, take them from the theme package:

- `@ldn-viz/themes/colors.js` has every colour for each mode, such as `mode.light.text.default`.
- `@ldn-viz/themes/tokens.scss` has every token as a Sass variable, such as `$color-text`.

{/snippet}
</UsageTabs>

## How it works

### Primitive and semantic tokens

Tokens are in two tiers. A primitive token is named by its value or its step on a scale, such as a light mode or dark mode blue at step 700.
A semantic is an alias to a primitive token and says what a value is for, such as `--color-surface-accent`.

<TokenDiagram diagram="tiers" />

Use semantic tokens only. In the example above the semantic token `--color-palette-blue-700` aliases a different primitive depending on the user preference for light or dark mode. This lets us adjust colours to be accessible in different [modes](/design-system/application-design/modes). Primitive custom properties start with `--primitive-`, so a use of one is easy to spot.

### Reading a token name

A token name is built from segments, from general to specific:

`category → variant → concept → role → emphasis → state → value`

A segment that doesn't apply is left out, and the rest keep their order. `--color-interactive-primary-hover` is the category `color`, the concept `interactive`, the role `primary` and the state `hover`.

| Segment  | What it says                                    | Examples                                                          |
| -------- | ----------------------------------------------- | ----------------------------------------------------------------- |
| Category | The kind of value                               | `color` `spacing` `typography` `flow` `grid` `shadow` `elevation` |
| Variant  | A mode, scope, breakpoint, typeset or context   | `inverse` `static` `chart` `geo` `md` `product` `standard`        |
| Concept  | The thing the value is for                      | `canvas` `surface` `interactive` `text` `border` `data`           |
| Role     | Its place in a hierarchy, or what it signals    | `primary` `secondary` `positive` `negative` `caution` `title`     |
| Emphasis | Less contrast than the default                  | `muted` `wash`                                                    |
| State    | An interaction, selection or availability state | `hover` `active` `selected` `disabled`                            |
| Value    | A size, step or property                        | `sm` `md` `lg` `4` `font-size`                                    |

Names are lowercase, with hyphens between words. A fractional step uses a hyphen, so `--spacing-0-5` is 2px.

A default token has no `-default` suffix. `--color-border` is the default border colour, and there's no `--color-border-default`. A flow context and a size are always named, as in `--flow-standard-loose` and `--shadow-md`.

Typography tokens have a breakpoint and a size in the same name. In `--typography-md-product-title-md-font-size`, the first `md` is the breakpoint and the second is the size of the title. The smallest breakpoint is `base`, which covers widths below `sm`.

### Concepts

An interface is a stack. The canvas is at the base, and surfaces sit above it at elevation steps 1 to 6. A surface is coloured `surface`, or `surface-muted` to set it apart from what is around it. Text, labels, borders and interactive elements sit on a surface.

<figure class="width-content-wide">
	<TokenConcept />
</figure>

### Inverse

The inverse variant is for content on an inverse background. The inverse surface is dark in light mode and light in dark mode. Use inverse tokens together, such as `--color-inverse-text` on `--color-inverse-surface`.

<TokenDiagram diagram="inverse" />

### Usage aliases

We provide a set of usage aliases for users who aren't fully engaged with the system and just want to know "what's the right class for a card title". A usage alias is a class named for the place it's used, such as `card-title` or `chart-tick`. These classes are an extra layer of semantic sugar. Each one applies a type role for a specific component, as in `card-title`. [Typography](/design-system/foundations/typography) lists them.

## Reference

These tables list every published semantic token, with its value.

### Colour

The colour tokens are grouped by concept. Each has a value for light mode and dark mode. [Colour](/design-system/foundations/colour) explains how to choose one.

#### Palette

The palette provides the lowest level semantic tokens. Many of the other semantic tokens are aliases of values within the palette. Each color has values at `100` - `1100`

Quantitative colour scales can be based on the palette colors. See [Quantitative colour](/design-system/data-visualisation/quantitative-colour).

<TokenReference group="color-palette" />

#### Canvas

<TokenReference group="color-canvas" />

#### Surface

<TokenReference group="color-surface" />

#### Text

<TokenReference group="color-text" />

#### Label

<TokenReference group="color-label" />

#### Border

<TokenReference group="color-border" />

#### Interactive

<TokenReference group="color-interactive" />

#### Inverse

<TokenReference group="color-inverse" />

#### Static

<TokenReference group="color-static" />

#### Data

<TokenReference group="color-data" />

#### Chart

<TokenReference group="color-chart" />

#### Geo

<TokenReference group="color-geo" />

### Typography

Choose a typeset and a breakpoint to see the values for each role. [Typography](/design-system/foundations/typography) explains the roles and typesets.

<TokenReference group="typography" />

### Spacing

[Spacing](/design-system/foundations/spacing) explains the scale.

<TokenReference group="spacing" />

### Flow

[Flow](/design-system/foundations/flow) explains the contexts and steps.

<TokenReference group="flow" />

### Layout grid

These tokens set the padding at the edge of a container, for each breakpoint and layout. [Layout grid](/design-system/foundations/layout-grid) explains the layouts.

<TokenReference group="grid" />

### Elevation

[Elevation](/design-system/foundations/elevation) explains the levels.

<TokenReference group="elevation" />

### Shadow

To set a level of elevation, use an elevation token. `--shadow-inner` has no elevation step.

<TokenReference group="shadow" />

### Breakpoints

Breakpoints are used in media queries and as Tailwind prefixes, such as `md:`. A custom property can't be used in a media query, so breakpoints have no semantic tokens. Write the width in the media query.

<TokenReference group="breakpoint" />

The full rules for tokens are in the [specification](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/design-system-specification/design-system-specification.md#design-tokens).
