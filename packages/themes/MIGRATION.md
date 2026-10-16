# Migrating to `@ldn-viz/themes` 10

Version 10 rebuilds the token pipeline on the version 4 Figma export ([RFC 0003](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/design-system-specification/rfcs/0003-v4-token-pipeline-and-outputs.md)). Two things change for consumers: how the package is imported, and the names of some custom properties, classes and JavaScript keys.

## Imports

The package now has an `exports` map, and only the paths it lists can be imported. Three set-ups are supported:

| Set-up      | Import                                                                                              |
| ----------- | --------------------------------------------------------------------------------------------------- |
| Full system | `@import '@ldn-viz/themes/index.css';`, plus the Tailwind preset if the app uses Tailwind           |
| Tokens only | `@import '@ldn-viz/themes/tokens.css';`                                                             |
| Values only | `import colors from '@ldn-viz/themes/colors.js';`, or `@use '@ldn-viz/themes/tokens.scss';` in Sass |

`tokens.css` holds every custom property. `system.css` holds the classes the specification names: typesets, roles, usage aliases, flow, emphasis, elevation, the grid classes and the focus styles. `reset.css` sets element defaults at zero specificity, for apps without Tailwind's preflight. `index.css` imports all three, reset first.

The Tailwind preset only maps Tailwind's theme onto the custom properties: it adds no classes and no plugins, and `@tailwindcss/forms` is no longer a dependency. The `.form-*` classes, like the typography, flow, layout and base classes, are in `system.css`. A Tailwind app imports `index.css` (or `system.css`) as well as the preset, before the `@tailwind` directives, so a utility still wins over a system class. The preset also removes Tailwind's font sizes, weights and line heights, so `text-sm`, `font-semibold` and `leading-tight` no longer exist. Set type with a role class or a usage alias instead (see [Typography](#typography)).

Every path the package published before version 10 is removed. Replace each one as follows:

| Old path                                                                                                                                                                                     | New path                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `styles/primitives.css`, `styles/primitive-scale.css`, `styles/light.css`, `styles/dark.css`, `styles/spacing.css`, `styles/grid-spacing.css`, `styles/typography.css`, `styles/shadows.css` | `tokens.css`, or `index.css` for the full system                                                                                                                     |
| `styles/flow.css`                                                                                                                                                                            | `index.css` (properties in `tokens.css`, context classes in `system.css`)                                                                                            |
| `styles/js/color-tokens.js`                                                                                                                                                                  | `colors.js` (same shape: `mode.light`, `mode.dark`)                                                                                                                  |
| `ldn-theme`, `ldn-theme.cjs`                                                                                                                                                                 | `tailwind`                                                                                                                                                           |
| `styles/tw-extend/*.cjs`, `tailwind-custom/*`                                                                                                                                                | No replacement: use the preset at `tailwind`                                                                                                                         |
| `styles/sass/*.scss`                                                                                                                                                                         | `tokens.scss`: every custom property as a Sass variable with its resolved value, and maps by mode (`$modes`) and breakpoint (`$breakpoints`, `$typography`, `$grid`) |
| `docs/tokens/tokens.js`                                                                                                                                                                      | Same shape; dimensions now in rem (were the px number with `rem` appended), font weights unitless                                                                    |

The nine old imports in an `app.postcss` become one:

```css
@import '@ldn-viz/themes/index.css';
```

A Tailwind config changes its preset:

```js
presets: [require('@ldn-viz/themes/tailwind')];
```

## Custom properties

### Colour: `container` becomes `surface`

The container colours were removed in version 4. `surface` replaces them.

| Old                                                 | New                             |
| --------------------------------------------------- | ------------------------------- |
| `--color-container`                                 | `--color-surface`               |
| `--color-container-level-1`, `-level-2`, `-level-3` | `--color-surface-muted`         |
| `--color-inverse-container`                         | `--color-inverse-surface`       |
| `--color-inverse-container-level-1`, `-2`, `-3`     | `--color-inverse-surface-muted` |

The three levels collapse into one. A surface's level is now set by its colour and an elevation class (`elevation-1` to `elevation-6`).

The same rule applies to Tailwind classes (`bg-color-container-level-1` → `bg-color-surface-muted`, `ring-color-container-level-1` → `ring-color-surface-muted`) and to JavaScript keys (`mode.light.container.default` → `mode.light.surface.default`, `mode.light.container['level-1']` → `mode.light.surface.muted`).

### Colour: `inverse` comes first

`inverse` is a variant, and variants come before the scope.

| Old                                                           | New                                   |
| ------------------------------------------------------------- | ------------------------------------- |
| `--color-chart-inverse-{label,label-muted,axis,grid,surface}` | `--color-inverse-chart-{…}`           |
| `--color-geo-inverse-feature[-muted]`                         | `--color-inverse-geo-feature[-muted]` |

In JavaScript, `mode.light.chart.inverse.*` becomes `mode.light.inverse.chart.*`, and `mode.light.geo.inverse.*` becomes `mode.light.inverse.geo.*`.

### Grid

`spacing` is dropped from the grid tokens.

| Old                                                                | New                                                        |
| ------------------------------------------------------------------ | ---------------------------------------------------------- |
| `--grid-spacing-{bp}-{contained,fluid}-{container-padding,gutter}` | `--grid-{bp}-{contained,fluid}-{container-padding,gutter}` |

`{bp}` is `base`, `sm`, `md`, `lg`, `xl` or `2xl`.

### Flow

The flow contexts are renamed, and the `default` step is implied.

| Old                                    | New                                     |
| -------------------------------------- | --------------------------------------- |
| `.flow-prose`                          | `.flow-spacious`                        |
| `.flow-product`                        | `.flow-standard`                        |
| `.flow-compact`                        | `.flow-compact` (unchanged)             |
| `--flow-prose-{tight,loose,section}`   | `--flow-spacious-{tight,loose,section}` |
| `--flow-prose-default`                 | `--flow-spacious`                       |
| `--flow-product-{tight,loose,section}` | `--flow-standard-{tight,loose,section}` |
| `--flow-product-default`               | `--flow-standard`                       |
| `--flow-compact-default`               | `--flow-compact`                        |
| `.mt-flow-default`                     | `.mt-flow`                              |
| `.gap-flow-default`                    | `.gap-flow`                             |

The values are unchanged. `--flow-{tight,default,loose,section}` and the other `mt-flow-*` and `gap-flow-*` utilities are unchanged.

### Typography

The type sets are renamed and every role gains a size. Names follow `--typography-{bp}-{set}-{role}-{size}-{property}`.

| Old                                                       | New                                                  |
| --------------------------------------------------------- | ---------------------------------------------------- |
| `--typography-{bp}-prose-{role}-{prop}`                   | `--typography-{bp}-longform-{role}-{size}-{prop}`    |
| `--typography-{bp}-product-{role}-{prop}`                 | `--typography-{bp}-product-{role}-{size}-{prop}`     |
| `--typography-{bp}-chart-{role}-{prop}`                   | No equivalent: the version 4 export has no chart set |
| `--typography-{bp}-prose-readable-width`                  | `--measure-text` (see below)                         |
| `--typography-{bp}-prose-{display,headline}-space-before` | No equivalent                                        |

The roles in each set are `display`, `headline`, `title`, `subtitle`, `subhead`, `body`, `label`, `caption` and `metric`, each in `sm`, `md` and `lg`, plus `eyebrow`, which has no size. `subhead`, `subtitle` and `eyebrow` are set in the muted text colour, as before.

The classes change as follows. These are placeholder mappings until RFC 0002's design review.

| Old class                        | New class                                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `prose`, `prose flow-prose`      | `typeset-longform` (brings `flow-spacious`)                                                                  |
| `product`                        | `typeset-product` (type only)                                                                                |
| `product` around Markdown or CMS | `typeset-product--formatted` (adds `flow-standard` and content styles)                                       |
| `flow-prose`, `flow-product`     | `flow-spacious`, `flow-standard`                                                                             |
| `not-prose`                      | `not-typeset`, or nothing beside a typeset class                                                             |
| `display`, `headline`, `subhead` | `display-lg`, `headline-lg`, `subhead-lg`                                                                    |
| `title-1`, `title-2`             | `headline-lg`, `headline-sm`                                                                                 |
| `title-3`, `title-4`             | `title-lg`, `title-md`                                                                                       |
| `page-head`, `section-head`      | `headline-md`, `title-lg`                                                                                    |
| `title`, `subtitle`              | `title-sm`, `subtitle-sm`                                                                                    |
| `lead`                           | `body-lg text-color-text-muted`                                                                              |
| `body`, `label`, `caption`       | `body-md`, `label-md`, `caption-sm`                                                                          |
| `metric`                         | `metric-lg`                                                                                                  |
| `label-tight`, `label-sm-tight`  | `label-md`, `label-sm`: controls take the role's line height, so adjust padding where a fixed height matters |
| `axis-title`, `tick`, `tick-sm`  | `chart-axis-title`, `chart-tick`, `chart-tick-sm`                                                            |
| `chart` (as a type context)      | `typeset-product`, with the `chart-*` aliases                                                                |

`body-sm`, `label-sm`, `metric-sm` and `eyebrow` keep their names.

`.prose` capped its own width. `typeset-longform` and `typeset-product--formatted` cap each of their children instead, at one of three widths:

| Width                        | At 16px body | Default for                                                 | Class                 |
| ---------------------------- | ------------ | ----------------------------------------------------------- | --------------------- |
| `--measure-text` (38 × body) | 608px        | running text                                                | `.width-content`      |
| `--measure-wide` (56 × body) | 896px        | figures, images, video, embeds, tables, code blocks, charts | `.width-content-wide` |
| `--measure-full`             | no cap       | nested typesets, `.not-typeset`                             | `.width-content-full` |

Content styles for unclassed markup (Markdown, CMS output) now apply inside `typeset-longform` and `typeset-product--formatted`, not only inside `prose`. `typeset-product` on its own sets type only. The escape class is renamed.

| Old          | New            |
| ------------ | -------------- |
| `.not-prose` | `.not-typeset` |

The type scale primitives are now numbered by step rather than by pixel size.

| Old                                   | New                                                  |
| ------------------------------------- | ---------------------------------------------------- |
| `--primitive-typography-font-family`  | `--primitive-typography-font-family-default`         |
| `--primitive-typography-font-size-12` | `--primitive-typography-scale--2`                    |
| `--primitive-typography-font-size-14` | `--primitive-typography-scale--1`                    |
| `--primitive-typography-font-size-16` | `--primitive-typography-scale-0`                     |
| `--primitive-typography-font-size-18` | `--primitive-typography-scale-1`                     |
| `--primitive-typography-font-size-20` | `--primitive-typography-scale-2`                     |
| `--primitive-typography-font-size-22` | `--primitive-typography-scale-3`                     |
| `--primitive-typography-font-size-24` | `--primitive-typography-scale-4`                     |
| `--primitive-typography-font-size-26` | `--primitive-typography-scale-5`                     |
| `--primitive-typography-font-size-28` | `--primitive-typography-scale-6`                     |
| `--primitive-typography-font-size-30` | `--primitive-typography-scale-7`                     |
| `--primitive-typography-font-size-32` | `--primitive-typography-scale-8`                     |
| `--primitive-typography-font-size-36` | `--primitive-typography-scale-9`                     |
| `--primitive-typography-font-size-40` | `--primitive-typography-scale-10`                    |
| `--primitive-typography-font-size-48` | `--primitive-typography-scale-11`                    |
| `--primitive-typography-font-size-56` | `--primitive-typography-scale-12`                    |
| `--primitive-typography-font-size-64` | `--primitive-typography-scale-13`                    |
| `--primitive-typography-font-size-76` | No equivalent: the largest step, `scale-14`, is 72px |
