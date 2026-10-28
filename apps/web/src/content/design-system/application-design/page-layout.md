---
title: Page layout
description: Coherent presentation structure
section: Application design
navLabel: Page layout
heroImage: header-application-design-overflow.svg
thumbnail: cta-application-design-2.svg
order: 2
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

Space on a page has determining factors, and spacing decisions should become straightforward once it is clear which one applies. The gaps between blocks, whether stacked one above another or tiled across a width, come from [content flow](/design-system/foundations/flow). The container sets the space at the page edge, from the padding values below. The component determines the space inside its own box — padding, borders, indents — which comes from the [spacing scale](/design-system/foundations/design-tokens).

A page built this way contains very few chosen measurements. Where a number is being picked by hand, it is usually a sign that one of the three systems has been bypassed.

### Grids

There are two distinct types of grid, with their own values, determined by the kind of surface that they appear on.

The **contained** grid is centred and limited in width, with edge space that grows as the viewport widens. It suits document-like surfaces: reading content, guidance, settings and forms, where content should not stretch across a wide screen.

| Breakpoint | Columns | Edge space |
| ---------- | ------- | ---------- |
| base       | 4       | 16px       |
| `sm`       | 6       | 32px       |
| `md`       | 8       | 32px       |
| `lg`       | 12      | 64px       |
| `xl`       | 12      | 80px       |
| `2xl`      | 12      | 96px       |

The **fluid** grid runs full width, with columns that stretch and edge space that stays constant. It suits dashboards and application shells, where the canvas should use the width available.

| Breakpoint | Columns | Edge space |
| ---------- | ------- | ---------- |
| base       | 4       | 16px       |
| `sm`       | 6       | 16px       |
| `md`       | 8       | 24px       |
| `lg`       | 12      | 24px       |
| `xl`       | 12      | 24px       |
| `2xl`      | 12      | 24px       |

In both cases the edge space is the padding of the containing frame, and the grid's own margin is zero. The grid describes the columns within the padded width rather than insetting from the edge a second time.

Cards in a row are spaced by the same flow step as cards in a stack, so a grid of cards has one gap in both directions. In the standard context of a dashboard that is 8px; in a spacious context it is 16px.

The side panel of a dashboard sits outside the canvas grid. A control panel is application chrome rather than a grid column, so the fluid grid applies to the canvas region only and the canvas fills whatever width remains beside the panel.

### Anatomy

#### Header

The header sits at the top of the page and contains the application title and highest level of inter page navigation (if applicable).

![A typical dashboard style application with header highlighted](/layout/layout-header.png)

#### Footer

The footer is used to root the base of application page and can contain secondary/ tertiary navigation elements as well as branding and links to user preference settings.

![A typical dashboard style application with footer highlighted](/layout/layout-footer.png)

#### Sidebar

The sidebar contains top level navigation and filters for the app. Depending on the context this could be a simple page navigation list or a complex set of grouped filters. When used for filters care should be taken so that the filters are at a global level. For example if a filter only effects a single chart on the canvas it would usually be better to co-locate the filter closer to the chart.

![A typical dashboard style application with sidebar highlighted](/layout/layout-sidebar.png)

#### Canvas

The canvas is the main area of the application.

![A typical dashboard style application with canvas area highlighted](/layout/layout-canvas.png)

### Layers

If the canvas exists on the lowest layer of the application we can think of things placed upon the canvas as being at points of increased elevation. This is achieved with subtle use of colour and shadow in give a sense of height. If we think of three ui elements, a **Card**, a **Tooltip** and a **Modal**, The card element sits at a level just above the canvas. The Tooltip is slightly elevated above the card, and the Modal is at the highest level of elevation. [See Ui component section for individual component usage](/design-system/foundations/elevation)

## Practice

### AppShell

The @ldn-viz-tools library contains a AppShell svelte component that orchestrates sidebar positioning across breakpoints.

![A typical dashboard style application with app-shell area highlighted](/layout/layout-appshell.png)

Sidebars can be positioned `top`, `bottom`, `left`, `right`

```html
<Appshell sidebarPlacement={{ initial: 'top', md: 'bottom', lg: 'left' }} >
```

you can find more information on component usage in [our storybook ](https://greater-london-authority.github.io/ldn-viz-tools/?path=/docs/ui-components-layout-and-themes-appshell--documentation)

### Space between tiled blocks

`gap-flow` on a grid sets the space between its items to the default flow step of the context.

```html
<div class="container-fluid flow-standard">
	<div class="gap-flow grid grid-cols-3">…</div>
</div>
```

Setting a gap by hand, such as `gap-4`, is worth avoiding: it doesn't change with the context, so the grid drifts from the space around it.

### Vertical rhythm on a canvas

The space between blocks within a section comes from a [flow](/design-system/foundations/flow) context rather than from margins set on each element. Declaring the context on the section is usually enough; a relationship is stated explicitly only where nothing could infer it.

```html
<section class="flow-standard typeset-product">
	<h2 class="title-lg">Rough sleeping</h2>
	<p class="subtitle-sm">Quarterly</p>

	<div class="gap-flow mt-flow-section grid grid-cols-3">
		<!-- cards -->
	</div>

	<p class="caption-sm">Source: CHAIN</p>
</section>
```

`typeset-product` sets the typeset, so `title-lg` and `subtitle-sm` take their product values. `flow-standard` sets how far apart the blocks sit.
