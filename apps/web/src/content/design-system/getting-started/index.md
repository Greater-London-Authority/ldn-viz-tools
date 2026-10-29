---
title: Getting Started
description: Getting up and running with the system.
navLabel: Getting Started
order: 1
heroImage: header-design-system-overflow.svg
thumbnail: cta-design-system.svg
layout: 'page'
---

<script>
	import UsageTabs from '$lib/components/usageTabs/UsageTabs.svelte';
</script>

<p class="lead text-color-text-muted">By working with the London City Data Design System (LCD-DS) you will be able to design and build user interfaces quickly and confidently to help Londoners understand the city through data.</p>

LCD-DS is a set of design tokens, CSS classes and guidance, with a library of Svelte components built on them. You can use it in three ways:

- **The full system** for products built with our component library.

- **Adapting an existing system**, for products built with other tools, which use the system's CSS.

- **Anywhere**, for work in Figma, print or any other medium, which uses the system's values.

The tokens and classes don't need Svelte or Tailwind. Our component library uses both, but components built in other ways can follow the same tokens and classes.

## Use

<UsageTabs>
{#snippet full()}

Install the theme package and the component packages you need:

| Package           | Contains                                          |
| ----------------- | ------------------------------------------------- |
| `@ldn-viz/themes` | The design tokens and CSS                         |
| `@ldn-viz/ui`     | Interface components, such as modals and sidebars |
| `@ldn-viz/charts` | Chart components                                  |
| `@ldn-viz/maps`   | Map components                                    |
| `@ldn-viz/tables` | Table components                                  |
| `@ldn-viz/utils`  | Utility functions, such as for colour scales      |

```sh
npm i @ldn-viz/themes @ldn-viz/ui
```

Each component package needs `@ldn-viz/themes` and Svelte 5.33 or later. `@ldn-viz/maps` also needs `@ldn-viz/ui`.

Import the CSS in your app's main stylesheet, before the Tailwind directives:

```css
@import '@ldn-viz/themes/index.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

The components are styled with Tailwind 3 classes, so add the theme package's preset to your Tailwind config. Include the component packages in `content`, so that Tailwind generates the classes they use:

```js
module.exports = {
	presets: [require('@ldn-viz/themes/tailwind')],
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/@ldn-viz/*/dist/**/*.{js,svelte}']
};
```

Add the `Theme` component to your app's top-level layout. It applies light or dark mode from the user's preference, which they can change with the `ThemeSwitcher` component.

{/snippet}
{#snippet adapting()}

Import the tokens as CSS custom properties:

```css
@import '@ldn-viz/themes/tokens.css';
```

Light values are set on `:root`, and dark values on `.dark`. To switch to dark mode, add the `dark` class to the root element.

To use the system's classes as well, such as the typesets, flow contexts and `.container`, import `index.css` in place of `tokens.css`. These classes are plain CSS and don't need Tailwind. `index.css` includes a reset. If your app has its own, import `tokens.css` and `system.css` instead.

You can also link to `index.css` from a CDN:

```html
<link href="https://cdn.jsdelivr.net/npm/@ldn-viz/themes/styles/index.css" rel="stylesheet" />
```

{/snippet}
{#snippet anywhere()}

The values are published in two forms:

- `@ldn-viz/themes/colors.js` has every colour, with the colours for each mode under `mode.light` and `mode.dark`.
- `@ldn-viz/themes/tokens.scss` has every token as a Sass variable.

Designers can use the [Design System ver 4.0](https://www.figma.com/design/lIzrJTQTBAt9tu9SYAXeTE/) library in Figma. The tokens are exported from its variables.

{/snippet}
</UsageTabs>

### Load the font

All three ways use the Inter typeface. The theme package doesn't load it, so add it to your app or install it, for example from [Google Fonts](https://fonts.google.com/specimen/Inter). Without it, text falls back to the system's sans-serif font.

## How it works

The theme package has four CSS files:

| File         | Contains                                                                         |
| ------------ | -------------------------------------------------------------------------------- |
| `tokens.css` | Every design token as a CSS custom property                                      |
| `system.css` | The system's classes, such as the typesets, type roles, flow contexts and layout |
| `reset.css`  | Default styles for HTML elements                                                 |
| `index.css`  | All three, in the order reset, tokens, classes                                   |

Any class overrides the rules in `reset.css`. In a Tailwind app, importing `index.css` before the Tailwind directives means a Tailwind utility class also overrides a system class.

The Tailwind preset doesn't add classes of its own. It sets Tailwind's colours, spacing, shadows and font families to the custom properties, so `bg-color-surface` uses `--color-surface`. It also removes Tailwind's font sizes, weights and line heights, because the system's role classes, such as `body-md`, set type.

With `index.css` or `system.css`, every page starts in the product typeset, which is for applications and dashboards. A page of reading content, such as an article or documentation, sets `typeset-longform` once on its outermost container. The [Typography](/design-system/foundations/typography) page explains the typesets.

## Upgrading from version 3

Version 4 changes how the theme package is imported, and renames some tokens and classes. The [migration guide](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/packages/themes/MIGRATION.md) lists each change and what replaces it.

## Next steps

- The [Foundations](/design-system/foundations) pages describe each part of the system, such as tokens, type and colour.
- The [Application design](/design-system/application-design) pages describe how to use the foundations in a product.
- [Storybook](https://greater-london-authority.github.io/ldn-viz-tools) has the props and states of each component.
