---
title: Page layout
description: Coherent presentation structure
section: Application design
navLabel: Page layout
heroImage: header-application-design-overflow.svg
thumbnail: cta-application-design-2.svg
order: 2
---

<script>
	import { Card, DashboardSectionTitle, DashboardTitle, PlaceholderImage } from '@ldn-viz/ui';
	import EnhancedImage from '$lib/components/enhancedImage/EnhancedImage.svelte';
	import UsageTabs from '$lib/components/usageTabs/UsageTabs.svelte';
</script>

<p class="lead text-color-text-muted">An application page is built from a header, a sidebar, a canvas and a footer. The layout grid sets the space at the edge of the page, and flow sets the space between the blocks on it.</p>

Design for small screens first, starting with a single-column layout, and add columns as the screen widens.

## Choose a layout

A page uses one of two layouts:

- **Contained** is for document-like pages, such as articles, documentation, guidance and forms, where content should not stretch across a wide screen. It is centred, its width steps up with the breakpoints, and its padding grows as the viewport widens.
- **Fluid** is for dashboards and application shells, where the canvas should use the width available. It fills the width of the viewport, and its padding stays between 16px and 24px.

[Application types](/design-system/application-design/application-types) says which layout each type of application uses.

<UsageTabs>
{#snippet full()}

Put the page content in `.container` or `.container-fluid`. Both classes are in the system's CSS, so they work without Tailwind:

```html
<main class="container-fluid">…</main>
```

In a dashboard or map, [`AppShell`](#appshell) positions the sidebar, and the fluid container goes on the canvas beside it.

{/snippet}
{#snippet adapting()}

Use the `.container` or `.container-fluid` class from `system.css`:

```html
<main class="container">…</main>
```

To build your own container, set its padding from the grid tokens, `--grid-{breakpoint}-{contained|fluid}-container-padding`, in a media query for each breakpoint:

```css
@media (min-width: 1024px) {
	.page {
		padding-inline: var(--grid-lg-fluid-container-padding);
	}
}
```

{/snippet}
{#snippet anywhere()}

Use the padding in the table below at the edge of each frame. In the contained layout, the content is no wider than the contained width for the breakpoint, and is centred.

{/snippet}
</UsageTabs>

| Breakpoint | Contained width | Contained padding | Fluid padding |
| ---------- | --------------- | ----------------- | ------------- |
| `base`     | 100%            | 16px              | 16px          |
| `sm`       | 640px           | 32px              | 16px          |
| `md`       | 768px           | 32px              | 24px          |
| `lg`       | 1024px          | 64px              | 24px          |
| `xl`       | 1280px          | 80px              | 24px          |
| `2xl`      | 1536px          | 96px              | 24px          |

In both layouts, the padding is on the container itself, so components don't add their own padding at the page edge.

There are no column tokens, because the number of columns depends on the content of each page. Set the columns with CSS grid or Tailwind's grid utilities. The [layout grid](/design-system/foundations/layout-grid) page has the breakpoints.

## Space on a page

Although it can be tempting to compress a lot into a small space, we let our applications 'breathe' by allowing for whitespace and page rhythm.

Each space on a page comes from one of three places:

- The space between blocks, stacked or tiled, comes from [flow](/design-system/foundations/flow).
- The space at the page edge comes from the container's padding.
- The space inside a component, such as its padding and indents, comes from the [spacing scale](/design-system/foundations/spacing).

A number picked by hand is usually a sign that one of the three has been bypassed.

### Space between tiled blocks

`gap-flow` on a grid sets the space between its items to the default flow step of the context. Cards in a row then have the same space between them as cards in a stack. In the standard context that is 8px, and in the spacious context 16px.

```html
<div class="flow-standard">
	<div class="gap-flow grid grid-cols-2">
		<!-- cards -->
	</div>
</div>
```

<div class="border border-color-border-wash p-4 my-4 bg-color-canvas-muted">
	<div class="flow-standard">
		<div class="grid grid-cols-2 gap-flow">
			<Card title="Completions"><div class="h-24"><PlaceholderImage /></div></Card>
			<Card title="Approvals"><div class="h-24"><PlaceholderImage /></div></Card>
			<Card title="Starts"><div class="h-24"><PlaceholderImage /></div></Card>
			<Card title="Pipeline"><div class="h-24"><PlaceholderImage /></div></Card>
		</div>
	</div>
</div>

A gap set by hand, such as `gap-4`, doesn't change with the context, so the grid drifts from the space around it.

### Vertical rhythm on a canvas

The space between blocks within a section comes from a [flow](/design-system/foundations/flow) context, not from margins set on each element. Declaring the context on the section is usually enough. Set a step explicitly only where nothing else would choose it.

```html
<section class="flow-standard typeset-product">
	<h2 class="title-lg">Rough sleeping</h2>
	<p class="subtitle-sm">Quarterly</p>

	<div class="mt-flow-section gap-flow grid grid-cols-3">
		<!-- cards -->
	</div>

	<p class="caption-sm">Source: CHAIN</p>
</section>
```

`typeset-product` sets the typeset, so `title-lg` and `subtitle-sm` take their product values. `flow-standard` sets how far apart the blocks sit.

## Dashboards

A dashboard has a title at the top of the canvas, then sections, each with a section title and a grid of cards. `DashboardTitle` and `DashboardSectionTitle` render headings with the `dashboard-main-title` and `dashboard-section-title` classes.

<figure class="width-content-wide">
	<EnhancedImage src="/page-layout/dashboard-fluid-xl.png" alt="A dashboard at 1280px: a dashboard title and subtitle, a full-width block, then a section title and subtitle above two cards side by side" />
</figure>

```svelte
<div class="flow-standard">
	<DashboardTitle title="Dashboard title" subtitle="A subtitle for this dashboard" />
	<DashboardSectionTitle title="Dashboard section title" subtitle="A subtitle for this section" />
	<div class="gap-flow grid grid-cols-2">
		<Card title="Title" subtitle="Subtitle">…</Card>
		<Card title="Title" subtitle="Subtitle">…</Card>
	</div>
</div>
```

<div class="border border-color-border-wash p-4 my-4 bg-color-canvas-muted">
	<div class="flow-standard">
		<DashboardTitle title="Dashboard title" subtitle="A subtitle for this dashboard" />
		<DashboardSectionTitle title="Dashboard section title" subtitle="A subtitle for this section" />
		<div class="grid grid-cols-2 gap-flow">
			<Card title="Title" subtitle="Subtitle"><div class="h-24"><PlaceholderImage /></div></Card>
			<Card title="Title" subtitle="Subtitle"><div class="h-24"><PlaceholderImage /></div></Card>
		</div>
	</div>
</div>

<div class="my-4 border border-dashed border-color-border p-4 body-sm text-color-text-muted">Placeholder: the space between the dashboard title, the sections and the card grid needs checking against the Figma Dashboard Layouts frames.</div>

## Anatomy

### Header

The header sits at the top of the page. It contains the application title and the highest level of navigation between pages, if there is one.

<figure class="width-content-wide">
	<EnhancedImage src="/layout/layout-header.png" alt="A typical dashboard style application with header highlighted" />
</figure>

### Footer

The footer sits at the base of the page. It can contain secondary and tertiary navigation, branding, and links to user preference settings.

<figure class="width-content-wide">
	<EnhancedImage src="/layout/layout-footer.png" alt="A typical dashboard style application with footer highlighted" />
</figure>

### Sidebar

The sidebar contains the top-level navigation and filters for the application. Depending on the context, this could be a simple list of pages or a complex set of grouped filters. Filters in the sidebar should apply to the whole page. Place a filter that affects only one chart next to that chart.

The sidebar sits beside the canvas. The canvas fills the rest of the width, and the fluid layout applies only to the canvas.

<figure class="width-content-wide">
	<EnhancedImage src="/layout/layout-sidebar.png" alt="A typical dashboard style application with sidebar highlighted" />
</figure>

### Canvas

The canvas is the main area of the application.

<figure class="width-content-wide">
	<EnhancedImage src="/layout/layout-canvas.png" alt="A typical dashboard style application with canvas area highlighted" />
</figure>

### Layers

The canvas is the lowest layer of the application, and the things placed on it sit at higher levels of [elevation](/design-system/foundations/elevation). Each level is shown by a shadow. A card sits just above the canvas at `elevation-1`, a tooltip above it at `elevation-4`, and a modal at `elevation-5`. [Surfaces and chrome](/design-system/application-design/surfaces-and-chrome) describes cards.

## AppShell

`AppShell`, in `@ldn-viz/ui`, sets where the sidebar sits at each breakpoint, whether it is always open and whether opening it pushes the content aside.

<figure class="width-content-wide">
	<EnhancedImage src="/layout/layout-appshell.png" alt="A typical dashboard style application with app-shell area highlighted" />
</figure>

The sidebar can sit at the `top`, `bottom`, `left` or `right`. `sidebarPlacement` sets the position from each breakpoint up:

```svelte
<AppShell sidebarPlacement={{ initial: 'top', md: 'bottom', lg: 'left' }}>
	{#snippet sidebar()}…{/snippet}
	{#snippet main()}…{/snippet}
</AppShell>
```

[Storybook](https://greater-london-authority.github.io/ldn-viz-tools/?path=/docs/ui-components-layout-and-themes-appshell--documentation) lists its props.
