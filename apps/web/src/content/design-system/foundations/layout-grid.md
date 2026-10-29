---
title: Layout grid
description: Contained and fluid page layouts
navLabel: Layout grid
order: 5
heroImage: header-foundations-overflow.svg
thumbnail: cta-foundations-2.svg
---

<script>
	import UsageTabs from '$lib/components/usageTabs/UsageTabs.svelte';
	import TokenReference from '$lib/components/tokenReference/TokenReference.svelte';
</script>

<p class="lead text-color-text-muted">A page uses one of two layouts: contained, for pages people read, or fluid, for dashboards and application shells.</p>

The layout's container sets the width of the page and the padding at its edge. The space between tiled blocks, such as cards, is the default [flow](/design-system/foundations/flow) step of the context.

## Use

<UsageTabs>
{#snippet full()}

Put a layout class on the element that holds the page content. Use `.container` for an article, documentation or a form, and `.container-fluid` for a dashboard or an application shell:

```html
<main class="container-fluid">…</main>
```

To tile cards or panels, put `gap-flow` on the grid or flex container. The gap is the default flow step of the context, so it changes when the grid moves into a different context:

```html
<section class="flow-standard">
	<div class="gap-flow grid grid-cols-1 md:grid-cols-3">
		<Card title="Population">…</Card>
		<Card title="Housing">…</Card>
		<Card title="Transport">…</Card>
	</div>
</section>
```

The layout classes and `gap-flow` are in the theme package's CSS, so they work without Tailwind. The example sets columns with Tailwind's grid utilities, which the component library uses. CSS grid works as well.

{/snippet}
{#snippet adapting()}

The layout classes are plain CSS in `system.css`. Put one on the element that holds the page content:

```html
<main class="container">…</main>
```

To write your own container, use the padding token for each breakpoint and layout:

```css
.page {
	padding-inline: var(--grid-base-fluid-container-padding);
}

@media (min-width: 768px) {
	.page {
		padding-inline: var(--grid-md-fluid-container-padding);
	}
}
```

For the space between tiled blocks, use `gap: var(--flow-default)`, or the `gap-flow` class. It takes its value from the nearest flow context.

{/snippet}
{#snippet anywhere()}

The [reference](#reference) lists the width and padding of each layout at each breakpoint.

Space tiled blocks with the default flow step of the context they sit in: 16px for spacious content, 8px for standard and 4px for compact. In Sass, the padding tokens are variables such as `$grid-md-fluid-container-padding`.

{/snippet}
</UsageTabs>

## How it works

### Contained and fluid

The contained layout is for document-like pages, such as articles, documentation and forms. Its width steps up at each breakpoint, it is centred, and its padding grows with the viewport.

The fluid layout is for dashboards and application shells. It fills the width of the viewport, and its padding stays between 16px and 24px.

<div class="my-4 border border-dashed border-color-border p-4 body-sm text-color-text-muted">Placeholder: a diagram of the contained and fluid layouts at the base, md and xl breakpoints, showing the container width and padding. The breakpoint frames on the Figma Spacing page show these as layout grids, which don't export.</div>

| Breakpoint | Minimum width | Contained width | Contained padding | Fluid padding |
| ---------- | ------------- | --------------- | ----------------- | ------------- |
| `base`     | None          | 100%            | 16px              | 16px          |
| `sm`       | 640px         | 640px           | 32px              | 16px          |
| `md`       | 768px         | 768px           | 32px              | 24px          |
| `lg`       | 1024px        | 1024px          | 64px              | 24px          |
| `xl`       | 1280px        | 1280px          | 80px              | 24px          |
| `2xl`      | 1536px        | 1536px          | 96px              | 24px          |

### The page edge

The container's padding sets the page edge. Components don't add padding at the page edge. A component's own padding comes from the [spacing scale](/design-system/foundations/spacing), whatever layout it sits in.

### Space between tiled blocks

The space between tiled blocks is the default flow step of the context, set with `gap-flow`. A row of cards and a stack of cards then have the same space between them.

Here the same three panels are tiled in a standard context and then in a spacious one:

```html
<div class="flow-standard">
	<div class="gap-flow grid grid-cols-3">…</div>
</div>

<div class="flow-spacious">
	<div class="gap-flow grid grid-cols-3">…</div>
</div>
```

<div class="not-typeset typeset-product my-4 flex flex-col gap-4 border border-color-border-wash p-4">
	<div class="flow-standard">
		<div class="grid grid-cols-3 gap-flow">
			<div class="h-16 border border-color-border-wash bg-color-surface-muted"></div>
			<div class="h-16 border border-color-border-wash bg-color-surface-muted"></div>
			<div class="h-16 border border-color-border-wash bg-color-surface-muted"></div>
		</div>
	</div>
	<p class="body-sm text-color-text-muted">Standard: 8px between panels</p>
	<div class="flow-spacious">
		<div class="grid grid-cols-3 gap-flow">
			<div class="h-16 border border-color-border-wash bg-color-surface-muted"></div>
			<div class="h-16 border border-color-border-wash bg-color-surface-muted"></div>
			<div class="h-16 border border-color-border-wash bg-color-surface-muted"></div>
		</div>
	</div>
	<p class="body-sm text-color-text-muted">Spacious: 16px between panels</p>
</div>

A fixed gap, such as `gap-4`, doesn't follow the context. Use `gap-flow`.

### Columns

There are no column tokens. The number of columns depends on the content of each page, so each page sets its own with CSS grid or Tailwind's grid utilities.

## Reference

### Container padding

<TokenReference group="grid" />

### Breakpoints

<TokenReference group="breakpoint" />

The full rules for the layout grid are in the [specification](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/design-system-specification/design-system-specification.md#layout-grid).
