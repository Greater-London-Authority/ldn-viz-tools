---
title: Spacing
description: One scale for the space inside components
section: Foundations
navLabel: Spacing
order: 3
heroImage: header-foundations-overflow.svg
thumbnail: cta-foundations-1.svg
---

<script>
	import UsageTabs from '$lib/components/usageTabs/UsageTabs.svelte';
	import TokenReference from '$lib/components/tokenReference/TokenReference.svelte';
</script>

<p class="lead text-color-text-muted">Spacing is one numbered scale for the space inside a component, such as padding, a border or an indent.</p>

Each step is a multiple of 4px, so `--spacing-4` is 16px. The space between blocks of content, such as between two paragraphs or two cards, uses [flow](/design-system/foundations/flow) instead.

## Use

<UsageTabs>
{#snippet full()}

The components use the spacing scale already. In your own components, use the custom properties:

```css
.legend-item {
	display: flex;
	gap: var(--spacing-2);
	padding: var(--spacing-1-5) var(--spacing-3);
}
```

If your app uses Tailwind, as the component library does, the theme package's preset sets Tailwind's spacing utilities to the scale. `p-4` is `var(--spacing-4)`, and a half step keeps Tailwind's dot, as in `mt-1.5`.

Tailwind's own steps that aren't on the scale, such as `p-9` or `p-28`, still work, but they aren't tokens. Use a step from the scale.

{/snippet}
{#snippet adapting()}

Each step is a CSS custom property, `--spacing-{n}`:

```css
.legend-item {
	display: flex;
	gap: var(--spacing-2);
	padding: var(--spacing-1-5) var(--spacing-3);
}
```

A half step has a hyphen in place of the decimal point, so `--spacing-1-5` is 6px.

{/snippet}
{#snippet anywhere()}

The [reference](#reference) lists every step in px and rem. The px values assume a root font size of 16px.

In Sass, each step is a variable, such as `$spacing-4`, in `@ldn-viz/themes/tokens.scss`.

{/snippet}
</UsageTabs>

## How it works

### The scale

The whole steps run from `--spacing-1` (4px) to `--spacing-8` (32px), then 10, 12, 14, 16, 20 and 24, up to 96px.

Below 16px there are half steps for finer control: `--spacing-0-5` (2px), `--spacing-1-5` (6px), `--spacing-2-5` (10px) and `--spacing-3-5` (14px). `--spacing-px` is 1px.

<div class="not-typeset typeset-product my-4 flex flex-col gap-2 border border-color-border-wash p-4">
	<div class="flex items-center gap-4"><code class="body-sm w-32">--spacing-1</code><span class="h-4 bg-color-surface-accent" style="width: var(--spacing-1)"></span><span class="body-sm text-color-text-muted">4px</span></div>
	<div class="flex items-center gap-4"><code class="body-sm w-32">--spacing-2</code><span class="h-4 bg-color-surface-accent" style="width: var(--spacing-2)"></span><span class="body-sm text-color-text-muted">8px</span></div>
	<div class="flex items-center gap-4"><code class="body-sm w-32">--spacing-3</code><span class="h-4 bg-color-surface-accent" style="width: var(--spacing-3)"></span><span class="body-sm text-color-text-muted">12px</span></div>
	<div class="flex items-center gap-4"><code class="body-sm w-32">--spacing-4</code><span class="h-4 bg-color-surface-accent" style="width: var(--spacing-4)"></span><span class="body-sm text-color-text-muted">16px</span></div>
	<div class="flex items-center gap-4"><code class="body-sm w-32">--spacing-6</code><span class="h-4 bg-color-surface-accent" style="width: var(--spacing-6)"></span><span class="body-sm text-color-text-muted">24px</span></div>
	<div class="flex items-center gap-4"><code class="body-sm w-32">--spacing-8</code><span class="h-4 bg-color-surface-accent" style="width: var(--spacing-8)"></span><span class="body-sm text-color-text-muted">32px</span></div>
	<div class="flex items-center gap-4"><code class="body-sm w-32">--spacing-12</code><span class="h-4 bg-color-surface-accent" style="width: var(--spacing-12)"></span><span class="body-sm text-color-text-muted">48px</span></div>
	<div class="flex items-center gap-4"><code class="body-sm w-32">--spacing-16</code><span class="h-4 bg-color-surface-accent" style="width: var(--spacing-16)"></span><span class="body-sm text-color-text-muted">64px</span></div>
	<div class="flex items-center gap-4"><code class="body-sm w-32">--spacing-24</code><span class="h-4 bg-color-surface-accent" style="width: var(--spacing-24)"></span><span class="body-sm text-color-text-muted">96px</span></div>
</div>

Use the semantic token, `--spacing-{n}`, not the primitive it points to.

### Spacing or flow

Space that builds a component, such as padding, a border or an indent, uses the spacing scale. Space between blocks of content uses flow, which changes with its context.

To decide, ask whether the space is inside a block or between blocks. The space between a form field's label, input and hint builds the field, so it uses spacing. The space between one field and the next is flow, and so is the gap between tiled cards. The gap between a button's icon and its label is spacing.

In this card, the padding is spacing and the space between the title and the paragraph is flow:

```html
<div class="card flow-standard">
	<h3 class="card-title">Housing completions</h3>
	<p class="body-md">Net additional homes in each borough, 2015 to 2025.</p>
</div>
```

```css
.card {
	padding: var(--spacing-4);
	border: 1px solid var(--color-border-wash);
	background: var(--color-surface);
}
```

<div class="not-typeset typeset-product my-4 border border-color-border-wash p-4">
	<div class="flow-standard border border-color-border-wash bg-color-surface p-4">
		<h3 class="card-title">Housing completions</h3>
		<p class="body-md">Net additional homes in each borough, 2015 to 2025.</p>
	</div>
</div>

The flow between the card's blocks comes from `flow-standard`, which the card sets.

## Reference

<TokenReference group="spacing" />

The full rules for spacing are in the [specification](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/design-system-specification/design-system-specification.md#spacing).
