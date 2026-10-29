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
	import EnhancedImage from '$lib/components/enhancedImage/EnhancedImage.svelte';
</script>

<p class="lead text-color-text-muted">Design tokens are named values for the decisions in the system: colours, type, spacing, flow, the layout grid, shadows and elevation.</p>

The tokens are defined in Figma and published in the `@ldn-viz/themes` package. Each semantic token is named for its purpose, such as `--color-text-muted` for secondary text. When a token's value changes, everything that uses the token takes the new value.

## Use

<UsageTabs>
{#snippet full()}

The components use the tokens already. In your own markup, the system's classes set type and flow. A role class such as `body-md` or `title-sm` sets the font family, size, weight, line height and letter spacing of the text. A flow context such as `flow-standard` sets the space between the blocks inside it. [Typography](/design-system/foundations/typography) and [Flow](/design-system/foundations/flow) describe them.

```html
<section class="flow-standard">
	<h2 class="title-sm">Housing completions</h2>
	<p class="body-md">…</p>
</section>
```

For other values, use the custom properties:

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

Tokens are in two tiers. A primitive token is a raw value, named by its value or its step on a scale, such as the grey at step 900 of the palette. A semantic token says what a value is for, such as `--color-text`.

<figure class="width-content-wide">
	<EnhancedImage src="/design-tokens/tiers.svg" alt="A semantic token, color-surface-accent, points to color-palette-blue-700, which points to a primitive for each mode: #0067B4 in light mode and #4C9FEA in dark mode" />
</figure>

Use semantic tokens only. The components do. Primitive custom properties start with `--primitive-`, so a use of one is easy to spot.

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

An interface is a stack. The canvas is at the base, and surfaces sit above it at elevation steps 1 to 6, each shown by a shadow. A surface is coloured `surface`, or `surface-muted` to set it apart from what is around it. There are no colour tokens for elevation levels. Text, labels, borders and interactive elements sit on a surface.

<figure class="width-content-wide">
	<EnhancedImage src="/design-tokens/concept.svg" alt="An interface drawn as layers: the canvas at elevation 0, surfaces at elevations 1 to 6, then text, labels and borders, with interactive elements at the top" />
</figure>

### Inverse

The inverse variant is for content on an inverse background. The inverse surface is dark in light mode and light in dark mode. Use inverse tokens together, such as `--color-inverse-text` on `--color-inverse-surface`.

<figure class="width-content-wide">
	<EnhancedImage src="/design-tokens/inverse-variant.svg" alt="color-text, color-inverse-surface and color-inverse-text in light mode and dark mode. The inverse surface and inverse text swap between dark and light" />
</figure>

### Usage aliases

A usage alias is a class named for the place it's used, such as `card-title` or `chart-tick`. Each one applies a type role. Aliases are classes, not tokens, so their names can include a component, as in `card-title`. [Typography](/design-system/foundations/typography) lists them.

## Reference

These tables list every published semantic token, with its value.

### Colour

The colour tokens are grouped by concept. Each has a value for light mode and dark mode. [Colour](/design-system/foundations/colour) explains how to choose one.

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

#### Palette

The palette is for quantitative colour scales only.

<TokenReference group="color-palette" />

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
