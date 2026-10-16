# Colour

The spec has no Colour section or ADR yet. The naming grammar is in [tokens.md](tokens.md). This file describes the build: `--color-*` in `tokens.css` and `colors.js`.

## Modes

Every semantic colour has a light and a dark value. Light is on `:root`, dark on `.dark`. A component that uses semantic tokens switches mode without any change.

## Groups

Choose the token by what the element is.

| Group | Tokens | Use for |
| --- | --- | --- |
| Text | `--color-text`, `--color-text-muted`, `--color-text-wash` | Text, in decreasing emphasis |
| Label | `--color-label`, `--color-label-muted` | Labels on controls |
| Canvas | `--color-canvas`, `--color-canvas-muted` | The page background |
| Surface | `--color-surface`, `--color-surface-muted`, `--color-surface-accent`, `--color-surface-{status}`, `--color-surface-alpha`, `--color-surface-beta`, each with a `-muted` version | Backgrounds of cards, panels and status areas |
| Border | `--color-border`, `--color-border-muted` | Borders and dividers |
| Interactive | `--color-interactive-*` | Controls (below) |
| Inverse | `--color-inverse-text`, `--color-inverse-surface`, `--color-inverse-canvas`, `--color-inverse-border`, `--color-inverse-chart-*`, `--color-inverse-geo-*` | Content on an inverse background |
| Static | `--color-static-white`, `--color-static-black`, `--color-static-brand` | Colours that don't change with mode |
| Data | `--color-data-primary`, `--color-data-secondary`, `--color-data-tertiary`, `--color-data-categorical-{hue}`, `--color-data-{status}`, `--color-data-neutral-0`, `--color-data-neutral-1`, `--color-data-empty`, `--color-data-context`, `--color-data-male`, `--color-data-female` | Chart and map data |
| Chart | `--color-chart-axis`, `--color-chart-grid`, `--color-chart-label`, `--color-chart-label-muted`, `--color-chart-surface` | Chart furniture |
| Geo | `--color-geo-feature`, `--color-geo-label`, `--color-geo-annotation`, each with a `-muted` version, and `--color-geo-interactive-*` | Maps |
| Palette | `--color-palette-{hue}-{step}` | Not for components. Use a semantic group |

`{status}` is positive, negative, caution, neutral or empty for surfaces, and positive or negative for data.

The categorical hues are blue, darkpink, green, orange, pink, purple, red, turquoise and yellow. There is no grey; use `--color-data-empty` for no data.

## Data colours

For chart and map series:

| Need | Tokens |
| --- | --- |
| One to three series | `--color-data-primary`, then `--color-data-secondary`, then `--color-data-tertiary` |
| One series highlighted against the rest | `--color-data-primary` for it, `--color-data-context` for the others |
| More series, or a series with its own meaning | Two or three of `--color-data-categorical-{hue}`, never the whole palette |
| No data | `--color-data-empty` |

Primary, secondary and tertiary reference the categorical blue, dark pink and orange. `--color-data-context` is a grey.

The docs page `apps/web/src/content/design-system/data-visualisation/quick-guide.md` covers sequential and diverging scales.

## Interactive tokens

`--color-interactive-{intent}[-muted][-{state}]`:

- Intents: primary, secondary, positive, negative and caution.
- `-muted` is the lower-emphasis version of the same intent.
- States: `-hover` and `-active`. Positive, negative and caution also have `-focus`, as in `--color-interactive-positive-focus`.
- Primary also has `--color-interactive-primary-text` with hover and active states, for links and text buttons.
- Standalone states: `--color-interactive-selected`, `--color-interactive-on`, `--color-interactive-off`, `--color-interactive-dragged`, `--color-interactive-focus`, `--color-interactive-error`, `--color-interactive-disabled` and `--color-interactive-disabled-muted`.

A disabled fill uses `--color-interactive-disabled-muted`. Disabled text or icons use `--color-interactive-disabled`.

Text or an icon on a filled control uses `--color-inverse-text`.

## In Tailwind

The preset adds each token without its leading dashes as a Tailwind colour, so `--color-text-muted` is available as `text-color-text-muted`, and `--color-surface` as `bg-color-surface`.

## In JavaScript

`colors.js` default-exports the resolved values as a tree: `mode.light.chart.surface`, `mode.dark.data.primary`. Only the group and role are nested. Emphasis and state stay joined, as in `surface['accent-muted']` and `interactive.primary['muted-hover']`. A group's own value is under `default`: `text.default`.

In components, read colours through the theme so they follow the mode:

```js
theme.tokenNameToValue('data.primary');
theme.currentTheme.chart.surface;
```

`tokenNameToValue` (`packages/utils/src/colors/tokenNameToValue.ts`) walks a dotted path and falls back to `default` at each level. A path that doesn't exist logs `Color name "…" not defined in theme.` and returns `undefined`. Check a path against `mode.light` in `colors.js`.
