---
title: Layout
description: Coherent presentation structure
section: Application design
navLabel: Layout
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

Although it can be tempting to compress a lot into a small space we strive to let our applications 'breathe' by allowing for whitespace and page rhythm. Start with spacing in units divisible by 8. (8 point grid) This can also be achieved though consistent application of [spacing tokens](/design-system/foundations/design-tokens)

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
