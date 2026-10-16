# Migration

[packages/themes/MIGRATION.md](../../../../packages/themes/MIGRATION.md) is the full v3 to v4 guide for `@ldn-viz/themes` 10, including imports, every token rename and the type scale primitives. This file has the class mappings used most often, the older retired names, and how to migrate a component.

The design review in RFC 0002 may change a few of the class mappings. The structure and names on the right-hand side are set by the spec.

## Imports

The nine old stylesheet imports become `@import '@ldn-viz/themes/index.css';`. The Tailwind preset is `require('@ldn-viz/themes/tailwind')`. `styles/tw-extend/*`, `tailwind-custom/*`, `ldn-theme.cjs` and `styles/js/color-tokens.js` are gone; `colors.js` replaces the last.

## Typography classes

| v3 | v4 |
| --- | --- |
| `prose`, `prose flow-prose` | `typeset-longform` |
| `product` | `typeset-product` |
| `product` around Markdown or CMS output | `typeset-product--formatted` |
| `chart` as a type context | `typeset-product`, with the `chart-*` aliases |
| `not-prose` | `not-typeset`, or nothing beside a typeset class |
| `display`, `headline`, `subhead` | `display-lg`, `headline-lg`, `subhead-lg` |
| `title-1`, `title-2` | `headline-lg`, `headline-sm` |
| `title-3`, `title-4` | `title-lg`, `title-md` |
| `page-head`, `section-head` | `headline-md`, `title-lg` |
| `title`, `subtitle` | `title-sm`, `subtitle-sm` |
| `lead` | `body-lg text-color-text-muted` |
| `body`, `label`, `caption` | `body-md`, `label-md`, `caption-sm` |
| `metric` | `metric-lg` |
| `label-tight`, `label-sm-tight` | `label-md`, `label-sm`. No single-line variant: keep the role's line height and reduce padding where a control's height must not change |
| `axis-title`, `tick`, `tick-sm` | `chart-axis-title`, `chart-tick`, `chart-tick-sm` |

`body-sm`, `label-sm`, `metric-sm` and `eyebrow` keep their names.

The retired `.prose` class capped its own width. The v4 typesets cap each child instead (see the measure in [typography.md](typography.md)).

## Flow

| v3 | v4 |
| --- | --- |
| `.flow-prose`, `--flow-prose-*` | `.flow-spacious`, `--flow-spacious-*` |
| `.flow-product`, `--flow-product-*` | `.flow-standard`, `--flow-standard-*` |
| `--flow-{context}-default` | `--flow-{context}` |
| `.mt-flow-default`, `.gap-flow-default` | `.mt-flow`, `.gap-flow` |

Values are unchanged.

## Colour and grid

| v3 | v4 |
| --- | --- |
| `--color-container` | `--color-surface` |
| `--color-container-level-{1,2,3}` | `--color-surface-muted` |
| `--color-inverse-container[-level-*]` | `--color-inverse-surface[-muted]` |
| `--color-chart-inverse-*` | `--color-inverse-chart-*` |
| `--color-geo-inverse-*` | `--color-inverse-geo-*` |
| `--grid-spacing-{bp}-*` | `--grid-{bp}-*` |

The three container levels become one. A surface's level is set by its colour and an elevation class. The same renames apply to Tailwind colour classes, such as `bg-color-surface-muted`, and to `colors.js` keys: `surface.muted`, `inverse.chart.*`.

## Older retired names

These were retired before v4 and still appear in a few files.

| Retired | Replacement |
| --- | --- |
| `--spacing-{xxs…9xl}` | `xxs→1 xs→2 sm→3 md→4 lg→5 xl→6 2xl→7 3xl→8 4xl→10 5xl→12 6xl→14 7xl→16 8xl→20 9xl→24` |
| `{prefix}-typography-spacing-{size}` | `{prefix}-{n}` from the same map, so 4xl padding becomes `pt-10` |
| `chart.background`, `--color-chart-background` | `chart.surface`, `--color-chart-surface` |
| `data.categorical.grey` | `data.empty` |
| `format`, `responsive` classes | Remove |

## Migrating a component

1. Text. Choose each role by what the text does, not by its current size. `text-sm` is `label-md` on a button and `body-sm` on helper text. Remove `text-*`, `font-*` and `leading-*` utilities: the preset no longer defines them, so they produce nothing. If a role changes the size, record the before and after.
2. Typeset. Make sure the component, or a container above it, has a typeset class.
3. Vertical space. If the children are a stack of blocks, use a flow context and let the rules set the steps; use `mt-flow-*` only to override. If they are parts of one structure, keep spacing-scale utilities.
4. Horizontal space. Always spacing, or a grid gutter between tiled items.
5. Off-scale values. Snap `p-[15px]` and similar to the nearest spacing step, and record it.
6. Corners. Remove `rounded-*` unless the element is round.
7. Elevation. Replace `shadow-*` with the matching `elevation-*` class (see [elevation.md](elevation.md)).
8. Colour. Replace palette and hex colours with semantic tokens.

If no role fits, stop and ask rather than guessing.

Report every class change, every size change, how each spacing utility was classified, and anything left unmapped.

## Checking a sweep

- Use `perl` for word-boundary replacements. BSD `sed` on macOS has no `\b`.
- Limit class renames to `class` attributes when the old name is a common word. A global removal of `format` once broke `import { format } from 'd3-format'`.
- Check `class={…}` template literals and class names in data, not only `class="…"`.
- An `@apply` of a removed class fails the build. The same class in markup fails silently.
- Use `find -print0 | xargs -0`, because some paths contain spaces.
- Rebuild the packages you changed (see SKILL.md), then grep for the old names.
