---
title: Elevation
description: Surfaces above the canvas
section: Foundations
navLabel: Elevation
order: 7
heroImage: header-foundations-overflow.svg
thumbnail: cta-foundations-3.svg
---

<script>
	import { Card } from '@ldn-viz/ui';
	import UsageTabs from '$lib/components/usageTabs/UsageTabs.svelte';
	import TokenReference from '$lib/components/tokenReference/TokenReference.svelte';
	import EnhancedImage from '$lib/components/enhancedImage/EnhancedImage.svelte';
</script>

<p class="lead text-color-text-muted">Elevation shows how far a surface sits above the canvas. Each level is shown by a shadow.</p>

Elevation runs from `elevation-0`, which sits on the canvas and has no shadow, to `elevation-6`.

## Use

<UsageTabs>
{#snippet full()}

The components set their own elevation. A card is at `elevation-1`, for example, and a modal at `elevation-5`.

For a surface of your own, use an elevation class, from `.elevation-0` to `.elevation-6`. Each class sets the box shadow from its token:

```html
<div class="panel elevation-2">…</div>
```

```css
.panel {
	padding: var(--spacing-4);
	background: var(--color-surface);
}
```

The elevation classes are in the theme package's CSS, so they work without Tailwind. In a Tailwind app, use the elevation class, not Tailwind's `shadow-*` utilities. The preset keeps those, but a shadow size doesn't say which level a surface is at.

{/snippet}
{#snippet adapting()}

Each level is a CSS custom property, `--elevation-{0–6}`, with a box shadow as its value:

```css
.panel {
	background: var(--color-surface);
	box-shadow: var(--elevation-2);
}
```

The classes `.elevation-0` to `.elevation-6` in `system.css` set the same shadows.

{/snippet}
{#snippet anywhere()}

The [reference](#reference) lists the shadow for each level as a CSS box shadow. Each layer is an x offset, a y offset, a blur, a spread and a colour. Black at an alpha of `1a` is 10% opacity.

The shadows are the same in light mode and dark mode.

{/snippet}
</UsageTabs>

## How it works

### The stack

An interface is a stack. The canvas is at the base, and surfaces sit above it at elevation steps 1 to 6. Text, labels, borders and interactive elements sit on a surface.

<figure class="width-content-wide">
	<EnhancedImage src="/design-tokens/concept.svg" alt="An interface drawn as layers: the canvas at elevation 0, surfaces at elevations 1 to 6, then text, labels and borders, with interactive elements at the top" />
</figure>

### The levels

Each step above `elevation-0` raises a surface further, with a larger and softer shadow:

```html
<div class="elevation-0">…</div>
<div class="elevation-1">…</div>
…
<div class="elevation-6">…</div>
```

<div class="not-typeset typeset-product my-4 grid grid-cols-4 gap-6 bg-color-canvas-muted p-6 sm:grid-cols-7">
	<div class="flex flex-col items-center gap-2"><div class="elevation-0 h-14 w-14 bg-color-surface"></div><code class="body-sm">0</code></div>
	<div class="flex flex-col items-center gap-2"><div class="elevation-1 h-14 w-14 bg-color-surface"></div><code class="body-sm">1</code></div>
	<div class="flex flex-col items-center gap-2"><div class="elevation-2 h-14 w-14 bg-color-surface"></div><code class="body-sm">2</code></div>
	<div class="flex flex-col items-center gap-2"><div class="elevation-3 h-14 w-14 bg-color-surface"></div><code class="body-sm">3</code></div>
	<div class="flex flex-col items-center gap-2"><div class="elevation-4 h-14 w-14 bg-color-surface"></div><code class="body-sm">4</code></div>
	<div class="flex flex-col items-center gap-2"><div class="elevation-5 h-14 w-14 bg-color-surface"></div><code class="body-sm">5</code></div>
	<div class="flex flex-col items-center gap-2"><div class="elevation-6 h-14 w-14 bg-color-surface"></div><code class="body-sm">6</code></div>
</div>

The components use these levels:

| Level         | Components                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------------- |
| `elevation-1` | Card, Callout and MapPointSearch                                                                |
| `elevation-2` | Map controls, the chart tooltip, MultipleActionButton, ThemeSwitcher and FileUpload             |
| `elevation-3` | The Select drop-down list                                                                       |
| `elevation-4` | Tooltip, Popover, Toast, the geocoder's suggestion list, LoginForm and the map marker container |
| `elevation-5` | Modal                                                                                           |
| `elevation-6` | Not used                                                                                        |

A card sets its own elevation, border and padding:

```svelte
<Card title="Population">…</Card>
```

<div class="not-typeset typeset-product my-4 bg-color-canvas-muted p-6">
	<Card title="Population">
		<p class="body-md">Placeholder content</p>
	</Card>
</div>

### Colour and elevation

A surface uses `--color-surface`, or `--color-surface-muted` to set it apart from what is around it. Its elevation step sets how far it sits above the canvas.

### Elevation and z-index

Elevation sets the shadow only. Stacking order is set by z-index.

### Shadow tokens

The shadow tokens, `--shadow-sm` to `--shadow-2xl`, are still published. Use an elevation step for a surface. `--elevation-1` to `--elevation-6` have the same values as `--shadow-sm`, `--shadow`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` and `--shadow-2xl`. `--shadow-inner` has no elevation step.

## Reference

### Elevation

<TokenReference group="elevation" />

### Shadow

<TokenReference group="shadow" />

The full rules for elevation are in the [specification](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/design-system-specification/design-system-specification.md#elevation).
