---
title: Visual rules
description: Corners and shape
section: Foundations
navLabel: Visual rules
order: 8
heroImage: header-foundations-overflow.svg
thumbnail: cta-foundations-4.svg
---

<script>
	import { Button, Checkbox, RadioButton } from '@ldn-viz/ui';
	import UsageTabs from '$lib/components/usageTabs/UsageTabs.svelte';
</script>

<p class="lead text-color-text-muted">Corners are square: the radius is 0 everywhere.</p>

Only things that are round, such as a circular avatar or a dot, have a radius. Bars, cards, cells, buttons, inputs and containers are never rounded.

## Use

<UsageTabs>
{#snippet full()}

The components have square corners. In your own markup, don't set a radius, except on something that is round:

```css
.status-dot {
	width: 0.5rem;
	height: 0.5rem;
	border-radius: 50%;
	background: var(--color-data-positive);
}
```

If your app uses Tailwind, the preset keeps Tailwind's `rounded-*` utilities for things that are round, such as `rounded-full` on an avatar. Don't use them on bars, cards, cells, buttons, inputs or containers.

{/snippet}
{#snippet adapting()}

The form classes in `system.css`, such as `.form-input` and `.form-checkbox`, set `border-radius: 0`. Set the same on your own bars, cards, cells, buttons, inputs and containers. If your system has radius tokens, set them to 0.

Use a radius only on something that is round, such as `border-radius: 50%` on an avatar.

{/snippet}
{#snippet anywhere()}

Draw bars, cards, cells, buttons, inputs and containers with square corners. Round only the things that are round, such as an avatar or a dot.

{/snippet}
</UsageTabs>

## How it works

### Square corners

Every rectangle in the system has square corners: bars in a chart, cards, table cells, buttons, inputs and containers.

A shape that is round, such as a circular avatar, a dot on a map or the mark of a radio button, keeps its radius.

```svelte
<Button emphasis="primary">Square button</Button>
<Checkbox id="square-checkbox" label="Square checkbox" checked={true} />
<RadioButton id="round-radio" name="shapes" label="Round radio button" selectedId="round-radio" />
```

<div class="border border-color-border-wash p-4 my-4 not-typeset">
	<div class="typeset-product flex flex-wrap items-center gap-6">
		<Button emphasis="primary">Square button</Button>
		<Checkbox id="square-checkbox" label="Square checkbox" checked={true} />
		<RadioButton id="round-radio" name="shapes" label="Round radio button" selectedId="round-radio" />
	</div>
</div>

A card, a bar and a dot, with their corners:

<div class="border border-color-border-wash p-4 my-4 not-typeset">
	<div class="typeset-product flex flex-wrap items-end gap-6 body-sm">
		<div class="elevation-1 border border-color-border-wash bg-color-surface p-4">A card</div>
		<div class="flex items-end gap-1">
			<div class="h-8 w-6 bg-color-data-primary"></div>
			<div class="h-12 w-6 bg-color-data-primary"></div>
			<div class="h-6 w-6 bg-color-data-primary"></div>
		</div>
		<div class="flex items-center gap-2"><span class="inline-block h-3 w-3 rounded-full bg-color-data-positive"></span>A dot</div>
	</div>
</div>

<div class="my-4 border border-dashed border-color-border p-4 body-sm text-color-text-muted">Placeholder: a do and don't image of a card and a button, square and rounded, from Figma.</div>

The full visual rules are in the [specification](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/design-system-specification/design-system-specification.md#visual-rules).
