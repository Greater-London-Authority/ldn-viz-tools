---
title: Colour
description: Contrast and differentiation
section: Foundations
navLabel: Colour
heroImage: header-foundations-overflow.svg
thumbnail: cta-foundations-2.svg
order: 6
---

<script>
	import { Button, Callout, theme } from '@ldn-viz/ui';
	import tokens from '@ldn-viz/themes/docs/tokens/tokens.js';
	import UsageTabs from '$lib/components/usageTabs/UsageTabs.svelte';
	import TokenReference from '$lib/components/tokenReference/TokenReference.svelte';
	import SwatchGrid from '$lib/components/swatch/SwatchGrid.svelte';

	const hues = [
		['grey', 'Grey'],
		['blue', 'Blue'],
		['green', 'Green'],
		['yellow', 'Yellow'],
		['orange', 'Orange'],
		['red', 'Red'],
		['pink', 'Pink'],
		['darkpink', 'Dark pink'],
		['purple', 'Purple'],
		['turquoise', 'Turquoise']
	];

	let palette = $derived(tokens.mode[theme.currentMode ?? 'light'].palette);
</script>

<p class="lead text-color-text-muted">Colour tokens are named for the role of the element they colour, such as text, a surface or a control. Every semantic colour has a light and a dark value.</p>

Our colour system is rooted in the GLA brand palette. The GLA Brand palette consists of 12 different colours. Using these colours as 'seeds' the design system defines a set of colours that balance the requirements of GLA brand recognition, colour differentiation, contrast and interoperability between light and dark themes.

**Note** Throughout the documentation we use the British spelling 'colour'. In code we use the international spelling 'color' as this is the accepted standard.

## Use

<UsageTabs>
{#snippet full()}

The components use the colour tokens already. In your own markup, use the custom property for the role of the element:

```css
.summary {
	background: var(--color-surface);
	border: 1px solid var(--color-border-wash);
	color: var(--color-text);
}

.summary-note {
	color: var(--color-text-muted);
}
```

<div class="border border-color-border-wash p-4 my-4 not-typeset">
	<div class="typeset-product p-4" style="background: var(--color-surface); border: 1px solid var(--color-border-wash); color: var(--color-text)">
		<p class="body-md">Text on a surface</p>
		<p class="body-sm" style="color: var(--color-text-muted)">Secondary text, such as a source</p>
	</div>
</div>

If your app uses Tailwind, as the component library does, the preset makes each colour token a utility, such as `bg-color-surface`, `border-color-border-wash` and `text-color-text-muted`.

For buttons and links, use the components. Each one uses the interactive tokens for its emphasis and state:

```svelte
<Button emphasis="primary">Apply filters</Button>
<Button emphasis="secondary" variant="outline">Clear</Button>
```

<div class="border border-color-border-wash p-4 my-4 not-typeset">
	<div class="typeset-product flex flex-wrap gap-2">
		<Button emphasis="primary">Apply filters</Button>
		<Button emphasis="secondary" variant="outline">Clear</Button>
	</div>
</div>

To use a colour in JavaScript, for example to pass it to a chart library, use `theme` from `@ldn-viz/ui`. It returns the value for the current mode:

```js
import { theme } from '@ldn-viz/ui';

const background = theme.tokenNameToValue('surface');
const note = theme.tokenNameToValue('text.muted');
```

{/snippet}
{#snippet adapting()}

Import the tokens as CSS custom properties, and use the one for the role of each element:

```css
@import '@ldn-viz/themes/tokens.css';

.panel {
	background: var(--color-surface);
	color: var(--color-text);
}

.panel a {
	color: var(--color-interactive-primary-text);
}
```

Light values are set on `:root`, and dark values on `.dark`. Add the `dark` class to the root element to switch the page to dark mode. An element inside `.dark` takes the dark value of each token.

{/snippet}
{#snippet anywhere()}

The [reference](#reference) lists each colour token with its light and dark value. Choose the token for the role of the element, as in [Choosing a colour](#choosing-a-colour), and use its value.

To use the values in code, take them from the theme package:

- `@ldn-viz/themes/colors.js` has every colour for each mode, such as `mode.light.surface.default`.
- `@ldn-viz/themes/tokens.scss` has every colour as a Sass variable, such as `$color-surface`.

The `static` colours, including the GLA brand colours, have the same value in both modes.

{/snippet}
</UsageTabs>

## How it works

### Light and dark

Colours are available in two sets specially tuned for light or dark themed applications. [Modes](/design-system/application-design/modes) explains how an app switches between them.

### Choosing a colour

Colours should be referenced using token names. Hex values are provided here only for reference. Choose a token by the role of the element:

| Group       | Tokens                                                                                             | Use for                                        |
| ----------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Text        | `--color-text`, `--color-text-muted`, `--color-text-wash`                                          | Text, in decreasing emphasis                   |
| Label       | `--color-label`, `--color-label-muted`                                                             | Labels on controls                             |
| Canvas      | `--color-canvas`, `--color-canvas-muted`                                                           | The page background                            |
| Surface     | `--color-surface` and `--color-surface-{role}`, each with a `-muted` version                       | Cards, panels and status areas                 |
| Border      | `--color-border`, `--color-border-muted`, `--color-border-wash`                                    | Borders, in decreasing emphasis                |
| Interactive | `--color-interactive-*`                                                                            | Controls, links and their states               |
| Inverse     | `--color-inverse-*`                                                                                | Content on an inverse background               |
| Static      | `--color-static-white`, `--color-static-black`, `--color-static-brand`, `--color-static-gla-{hue}` | Colours that don't change with the mode        |
| Data        | `--color-data-*`                                                                                   | Chart and map data                             |
| Chart       | `--color-chart-surface`, `-axis`, `-grid`, `-label`, `-label-muted`                                | Chart backgrounds, axes, grid lines and labels |
| Geo         | `--color-geo-*`                                                                                    | Maps                                           |

The data, chart and geo colours are described in [Data visualisation](/design-system/data-visualisation/colour-foundations).

### Text and labels

Text has three levels of emphasis: `--color-text` for most text, `--color-text-muted` for secondary text such as a source, and `--color-text-wash` for the least important text. Labels on controls use `--color-label` and `--color-label-muted`.

```html
<p style="color: var(--color-text)">Text</p>
<p style="color: var(--color-text-muted)">Secondary text, such as a source</p>
<p style="color: var(--color-text-wash)">The least important text</p>
```

<div class="border border-color-border-wash p-4 my-4 not-typeset">
	<div class="typeset-product flow-compact">
		<p class="body-md" style="color: var(--color-text)">Text</p>
		<p class="body-md" style="color: var(--color-text-muted)">Secondary text, such as a source</p>
		<p class="body-md" style="color: var(--color-text-wash)">The least important text</p>
	</div>
</div>

### Canvas and surface

The canvas is the page background. A surface is a card or panel on it. The two have the same value in each mode, and [elevation](/design-system/foundations/elevation) sets a surface apart from the canvas. `--color-surface-muted` sets a region apart inside a surface.

```html
<div class="elevation-2" style="background: var(--color-surface)">
	<p>A panel</p>
	<div style="background: var(--color-surface-muted)">A region inside the panel</div>
</div>
```

<div class="border border-color-border-wash p-4 my-4 not-typeset" style="background: var(--color-canvas)">
	<div class="typeset-product elevation-2 p-4 flow-compact" style="background: var(--color-surface)">
		<p class="body-md">A panel</p>
		<div class="body-sm p-4" style="background: var(--color-surface-muted)">A region inside the panel</div>
	</div>
</div>

The surface roles are `accent`, `alpha`, `beta`, `positive`, `negative`, `caution`, `neutral` and `empty`. Each has a `-muted` version. The `Callout` component uses the muted version as its fill and the role colour as its border:

```svelte
<Callout status="positive">
	{#snippet title()}Filters saved{/snippet}
	{#snippet body()}Your filters will be applied next time you open the dashboard.{/snippet}
</Callout>
```

<div class="border border-color-border-wash p-4 my-4 not-typeset">
	<div class="typeset-product flex flex-col gap-4">
		<Callout status="notice">
			{#snippet title()}Notice{/snippet}
			{#snippet body()}Uses <code>--color-surface-accent-muted</code> and <code>--color-surface-accent</code>.{/snippet}
		</Callout>
		<Callout status="positive">
			{#snippet title()}Positive{/snippet}
			{#snippet body()}Uses <code>--color-surface-positive-muted</code> and <code>--color-surface-positive</code>.{/snippet}
		</Callout>
		<Callout status="caution">
			{#snippet title()}Caution{/snippet}
			{#snippet body()}Uses <code>--color-surface-caution-muted</code> and <code>--color-surface-caution</code>.{/snippet}
		</Callout>
		<Callout status="negative">
			{#snippet title()}Negative{/snippet}
			{#snippet body()}Uses <code>--color-surface-negative-muted</code> and <code>--color-surface-negative</code>.{/snippet}
		</Callout>
	</div>
</div>

### Borders

Borders have three levels of emphasis, from `--color-border`, the strongest, to `--color-border-wash`. `--color-border-muted` is the edge of a control, such as a field or a checkbox, and keeps a contrast of 3:1 on `--color-surface`. `--color-border-wash` is for dividers and the edges of containers.

<div class="border border-color-border-wash p-4 my-4 not-typeset">
	<div class="typeset-product grid grid-cols-3 gap-4 body-sm">
		<div class="p-4" style="border: 1px solid var(--color-border)">--color-border</div>
		<div class="p-4" style="border: 1px solid var(--color-border-muted)">--color-border-muted</div>
		<div class="p-4" style="border: 1px solid var(--color-border-wash)">--color-border-wash</div>
	</div>
</div>

### Interactive colours

Interactive tokens are chosen by intent, then emphasis, then state: `--color-interactive-{intent}[-muted][-{state}]`. The intents are `primary`, `secondary`, `positive`, `negative` and `caution`. The states are `hover` and `active`.

<div class="border border-color-border-wash p-4 my-4 not-typeset">
	<div class="typeset-product flex flex-wrap gap-2">
		<Button emphasis="primary">Primary</Button>
		<Button emphasis="secondary">Secondary</Button>
		<Button emphasis="positive">Positive</Button>
		<Button emphasis="negative">Negative</Button>
		<Button emphasis="caution">Caution</Button>
	</div>
</div>

Text and icons on a filled control use `--color-inverse-text`. The exception is `primary`, whose fill stays dark in both modes. Its text uses `--color-static-white`.

`--color-interactive-primary-text`, with hover and active states, is for links and text buttons. The selection and availability states, such as `--color-interactive-selected` and `--color-interactive-error`, are tokens of their own. Disabled text and icons use `--color-interactive-disabled`, and a disabled fill uses `--color-interactive-disabled-muted`.

Focus has one colour, `--color-interactive-focus`. [Accessibility](/design-system/foundations/accessibility#focus) describes how focus is shown.

### Inverse and static colours

Content on an inverse background uses the `inverse` tokens, such as `--color-inverse-text` on `--color-inverse-surface`. [Design tokens](/design-system/foundations/design-tokens#inverse) shows how they change between modes.

`static` colours don't change with the mode. They are for content that must look the same in both modes: `--color-static-white`, `--color-static-black`, `--color-static-brand`, and the GLA brand hues as `--color-static-gla-{hue}`.

### Palette

The colour palette consists of 10 colours, each available in 11 different tints and shades: (color-100 to color-1100).

Perceptual uniformity is maintained within each hue in the colour palette. As a result, colours like blue-600 and darkPink-600 have nearly identical contrast ratios when paired with the same colour.

The palette is used only for a quantitative scale in a chart or map, described in [Quantitative colour](/design-system/data-visualisation/quantitative-colour). For any other colour, use a semantic token.

**Do:**

```css
p {
	color: var(--color-text);
}
```

**Don't:**

```css
p {
	color: var(--color-palette-grey-900);
}
```

### Contrast

Text needs a contrast of at least 4.5:1 with its background, and large text 3:1. Controls and the parts of a chart that show data need 3:1. [Accessibility](/design-system/foundations/accessibility#contrast) lists the exceptions.

## Reference

These tables list the colour tokens for interfaces, with their light and dark values. The data, chart and geo tokens are in the [Design tokens reference](/design-system/foundations/design-tokens#data).

### Canvas

<TokenReference group="color-canvas" />

### Surface

<TokenReference group="color-surface" />

### Text

<TokenReference group="color-text" />

### Label

<TokenReference group="color-label" />

### Border

<TokenReference group="color-border" />

### Interactive

<TokenReference group="color-interactive" />

### Inverse

<TokenReference group="color-inverse" />

### Static

<TokenReference group="color-static" />

### Palette

The swatches show the palette in the current mode.

<div class="not-typeset width-content-wide py-6">
{#each hues as [key, label]}
<SwatchGrid tokenData={palette[key]} title={label} size="xs" />
{/each}
</div>

The full rules for colour are in the [specification](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/design-system-specification/design-system-specification.md#colour).
