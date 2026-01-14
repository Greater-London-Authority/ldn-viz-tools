---
title: Getting Started
description: Welcome. Here you will find information about getting up and running with the system.
section: Getting Started
navLabel: Getting Started
---

By working with the Design System you will be able to design and build user interfaces quickly and confidently to help Londoners gain insight and understand the city though data.

The design choices of the system have been made so that our work is consistently clean, clear, accessible and on brand. The components available though the @ldn-viz-tools packages are a distillation of this guidance.

If you have questions or feedback please contact us. [city-data@london.gov.uk](city-data@london.gov.uk)

## Installation

You can choose to install one or many of the packages, or you may only require the design tokens and css for theming.

### Via NPM

The system is available as node modules for installation using your favourite package manager:

<code>npm i @ldn-viz/ui</code> <p>general UI components like modals or sidebars</p>
<code>npm i @ldn-viz/charts</code> <p>components for visualizing data</p>
<code>npm i @ldn-viz/maps</code> <p>components for rendering maps</p>
<code>npm i @ldn-viz/tables</code> <p>components for rendering tables</p>
<code>npm i @ldn-viz/themes</code> <p>CSS and design tokens</p>
<code>npm i @ldn-viz/utils</code> <p>utility functions (such as for constructing color scales)</p>

### From a CDN

<div class="not-prose">

```html
<link
	href="https://cdn.jsdelivr.net/npm/@ldn-viz/themes@6.0.0/styles/global.min.css"
	rel="stylesheet"
/>
```

```html
<link
	href="https://cdn.jsdelivr.net/npm/@ldn-viz/themes@6.0.0/styles/dark.min.css"
	rel="stylesheet"
/>
```

```html
<link
	href="https://cdn.jsdelivr.net/npm/@ldn-viz/themes@6.0.0/styles/light.min.css"
	rel="stylesheet"
/>
```

</div>
