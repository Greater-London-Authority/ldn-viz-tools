---
title: Layout
description: Coherent presentation structure
section: Application design
navLabel: Layout
heroImage: header-application-design-overflow.svg
thumbnail: cta-application-design-2.svg
---

## Principles

Design for small screens first, starting with a single-column layout.

<table>
<thead>
<tr class="text-left">
<th>Breakpoint prefix</th>
<th>Minimum width</th>
<th>CSS</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>sm</code></td>
<td>640px</td>
<td><code>@media (min-width: 640px)</code></td>
</tr>
<tr>
<td><code>md</code></td>
<td>768px</td>
<td><code>@media (min-width: 768px)</code></td>
</tr>
<tr>
<td><code>lg</code></td>
<td>1024px</td>
<td><code>@media (min-width: 1024px) </code></td>
</tr>
<tr>
<td><code>xl</code></td>
<td>1280px</td>
<td><code>@media (min-width: 1280px) </code></td>
</tr>
<tr>
<td><code>2xl</code></td>
<td>1536px</td>
<td><code>@media (min-width: 1536px) </code></td>
</tr>
</tbody>
</table>

Our layouts follow an adaptive pattern going from 6 columns (sm) 8 columns (md) 12 columns (lg and up)

### Spacing

Although it can be tempting to compress a lot into a small space we strive to let our applications 'breathe' by allowing for whitespace and page rhythm.

Space on a page has three owners, and most spacing decisions become straightforward once it is clear which one applies. The stack owns the vertical gaps between blocks that sit one above another, which come from [content flow](/design-system/foundations/flow). The grid owns the horizontal gaps between objects tiled across a width, which come from the gutter values below. The component owns the space inside its own box — padding, borders, indents — which comes from the [spacing scale](/design-system/foundations/design-tokens).

A page built this way contains very few chosen measurements. Where a number is being picked by hand, it is usually a sign that one of the three systems has been bypassed.

### Grids

There are two column grids, chosen by the kind of surface. They are distinct grids with their own values rather than one grid stretched to serve both.

The **contained** grid is centred and limited in width, with edge space that grows as the viewport widens. It suits document-like surfaces: reading content, guidance, settings and forms, where content should not sprawl across a wide screen.

| Breakpoint | Columns | Edge space | Gutter |
| ---------- | ------- | ---------- | ------ |
| base       | 4       | 16px       | 16px   |
| `sm`       | 6       | 32px       | 20px   |
| `md`       | 8       | 32px       | 24px   |
| `lg`       | 12      | 64px       | 24px   |
| `xl`       | 12      | 80px       | 32px   |
| `2xl`      | 12      | 96px       | 32px   |

The **fluid** grid runs full width, with columns that stretch and edge space that stays constant. It suits dashboards and application shells, where the canvas should use the width available.

| Breakpoint | Columns | Edge space | Gutter |
| ---------- | ------- | ---------- | ------ |
| base       | 4       | 16px       | 16px   |
| `sm`       | 6       | 16px       | 16px   |
| `md`       | 8       | 24px       | 16px   |
| `lg`       | 12      | 24px       | 16px   |
| `xl`       | 12      | 24px       | 16px   |
| `2xl`      | 12      | 24px       | 16px   |

In both cases the edge space is the padding of the containing frame, and the grid's own margin is zero. The grid describes the columns and the gutters within the padded width rather than insetting from the edge a second time.

The fluid gutter is held at sixteen pixels at every width so that cards tile at a consistent density. It runs a little looser than the eight-pixel vertical rhythm of a product surface, so that cards sit slightly further apart horizontally than content stacks within them, which is the conventional dashboard reading. Two relationships keep a field of cards reading as tiled rather than loose: the gutter should not exceed a card's own interior padding, and the edge space should sit at or above the gutter so that it frames the field against the viewport.

Cards span whole columns by default. A card that genuinely needs a width the columns do not offer may take one, in the same way a figure breaks out of a reading column — a deliberate and occasional exception. If such exceptions run past roughly one card in ten, the column count is the thing to reconsider.

The side panel of a dashboard sits outside the canvas grid. A control panel is application chrome rather than a grid column, so the fluid grid applies to the canvas region only and the canvas fills whatever width remains beside the panel. When the panel is dismissed the canvas reflows into the reclaimed width, because the grid fills its container rather than assuming a fixed panel width.

### Anatomy

#### Header

The header sits at the top of the page and carries the application title and highest level of inter page navigation (if applicable).

![A typical dashboard style application with header highlighted](/layout/layout-header.png)

#### Footer

The footer is used to root the base of application page and can carry secondary/ tertiary navigation elements as well as branding and links to user preference settings.

![A typical dashboard style application with footer highlighted](/layout/layout-footer.png)

#### Sidebar

The sidebar contains top level navigation and filters for the app. Depending on the context this could be a simple page navigation list or a complex set of grouped filters. When used for filters care should be taken so that the filters are at a global level. For example if a filter only effects a single chart on the canvas it would usually be better to co-locate the filter closer to the chart.

![A typical dashboard style application with sidebar highlighted](/layout/layout-sidebar.png)

#### Canvas

The canvas is the main area of the application.

![A typical dashboard style application with canvas area highlighted](/layout/layout-canvas.png)

### Layers

If the canvas exists on the lowest layer of the application we can think of things placed upon the canvas as being at points of increased elevation. This is achieved with subtle use of color and shadow in give a sense of height. If we think of three ui elements, a **Card**, a **Tooltip** and a **Modal**, The card element sits at a level just above the canvas. The Tooltip is slightly elevated above the card, and the Modal is at the highest level of elevation. [See Ui component section for individual component usage](/design-system/application-design/ui-components)

## Practice

### AppShell

The @ldn-viz-tools library contains a AppShell svelte component that orchestrates sidebar positioning across breakpoints.

![A typical dashboard style application with app-shell area highlighted](/layout/layout-appshell.png)

Sidebars can be positioned `top`, `bottom`, `left`, `right`

```html
<Appshell sidebarPlacement={{ initial: 'top', md: 'bottom', lg: 'left' }} >
```

you can find more information on component usage in [our storybook ](https://greater-london-authority.github.io/ldn-viz-tools/?path=/docs/ui-components-layout-and-themes-appshell--documentation)

### Gutters

Two classes apply the gutter values, and carry their breakpoint changes with them.

```html
<!-- A dashboard canvas: the gutter stays at 16px across every width -->
<div class="grid-gutter-fluid grid grid-cols-3">…</div>

<!-- A document-like surface: the gutter grows from 16px to 32px -->
<div class="grid-gutter grid grid-cols-12">…</div>
```

Setting a gap by hand is worth avoiding here even where it produces the right result today. On a fluid surface `gap-4` happens to match the gutter at every width, so the error is invisible until the value is adjusted. On a contained surface it is already too narrow at four of the six breakpoints.

### Vertical rhythm on a canvas

The space between blocks within a section comes from a [flow](/design-system/foundations/flow) context rather than from margins set on each element. Declaring the context on the section is usually enough; a relationship is stated explicitly only where nothing could infer it.

```html
<section class="flow-product product">
	<h2 class="section-head">Rough sleeping</h2>
	<p class="subtitle">Quarterly</p>

	<div class="mt-flow-section grid-gutter-fluid grid grid-cols-3">
		<!-- cards -->
	</div>

	<p class="caption">Source: CHAIN</p>
</section>
```

Two context classes and one stated relationship, with no chosen measurements. The `product` class establishes the type set, so that `section-head` and `subtitle` resolve correctly; `flow-product` establishes how far apart the blocks sit.

A few things are worth knowing when working this way. An element wrapped around two blocks takes their place in the sequence, so their spacing then has to be set by hand — flattening the wrapper is usually the fix. The classes `product` and `flow-product` are separate and most surfaces want both. And a gap utility should not be placed on an element that already declares a flow context, since the context is already separating that element's children.
