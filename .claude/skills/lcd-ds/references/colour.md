# Colour

Distilled from the spec's *Semantic Layer: Colour*. Emitted tokens:
`packages/themes/styles/js/color-tokens.js` (JS tree, keyed by `mode.light`/`mode.dark`)
and `packages/themes/styles/{light,dark}.css` (CSS custom props `--color-*`).

## Principle

Two tiers: a **primitive palette** (never referenced directly) feeds a **semantic
layer** of role-named tokens. Components bind to semantic tokens only — never a
primitive, never a raw hex. One theme, two **modes** (light/dark); every semantic
token carries a value per mode, so a bound component themes automatically.

- Ten hues (grey, blue, green, yellow, orange, red, pink, darkpink, + purple &
  turquoise in the data set), each 100–1100.

## Semantic groups (choose by what the element *is*)

| Group | Tokens (shape) | Job |
|---|---|---|
| **Text** | `text`, `text-muted`, `text-wash`, `label`, `label-muted` | Foreground text/labels, descending emphasis |
| **Surface** | `surface`, `surface-muted`, `surface-accent`, `surface-{negative,positive,caution,neutral,empty}(-muted)`, `surface-alpha,beta` | Fills/backgrounds incl. status tints |
| **Container** | `container`, `container-level-1,2,3` | Layered container backgrounds (elevation/nesting) |
| **Canvas** | `canvas`, `canvas-muted` | Base page background |
| **Border** | `border`, `border-muted` | Strokes/dividers |
| **Interactive** | `interactive/{intent}[-muted][-state]` | All control colours — the systematic core (below) |
| **Inverse** | `inverse/text(-muted,-wash)`, `inverse/surface(-muted)`, `inverse/container[-level-N]` | Content on an inverse surface |
| **Static** | `static/brand,white,black` | Mode-independent fixed colours (rare) |
| **Data** | `data/categorical/{hue}`, `data/{primary,secondary,tertiary}`, `data/{positive,negative,neutral/0,neutral/1,empty,context}`, `data/{male,female}` | Chart/series colours |
| **Chart chrome** | `chart/{axis,grid,surface,label,label-muted}` (+ `chart/inverse/*`) | Non-data chart furniture |
| **Geo** | `geo/{feature,label,annotation}(-muted)`, `geo/interactive[-state]` | Map colours |

## Interactive token logic

`interactive/{intent}[-muted][-state]`:
- **intent**: `primary`, `secondary`, `positive`, `negative`, `caution` (+ standalone
  states `selected`, `on`, `off`, `dragged`, `focus`, `error`, `disabled`).
- **variant**: base or `-muted` (lower-emphasis fill of same intent).
- **state**: base (rest), `-hover`, `-active`.

So a primary button: `interactive/primary` → `-primary-hover` → `-primary-active`
(muted twin via `-muted-*`). **One `interactive/{intent}` serves both fill and
text** — the bound property decides application. `disabled` splits: fill →
`interactive/disabled-muted`, text/icon → `interactive/disabled`.

## Applying in components

- Bind fills/strokes/text to semantic tokens — never primitives or hex.
- By role: label → `label`/`text`; control fill → `interactive/{intent}`;
  card bg → `container`/`surface`; status tint → `surface-{status}`.
- Text/icon on a filled control → `inverse/text` (themes against the fill).
- Prefer themed tokens; reserve `static/*` for genuine fixed-contrast needs.

## Utility / runtime forms

- **Tailwind:** `text-color-{token}`, `bg-color-{token}`, `border-color-{token}`,
  from `packages/themes/styles/tw-extend/color.cjs`. CSS var form is `--color-{token}`
  with `/` → `-` (e.g. `chart/surface` → `--color-chart-surface`).
- **Runtime (charts/JS):** `theme.tokenNameToValue('data.primary')` resolves a
  dotted path against `theme.currentTheme`. See `references/charts.md` and
  `references/tokens.md`.

## Gotchas

- **`chart.background` was renamed to `chart.surface`** (both the token path and
  the CSS var `--color-chart-surface`). Old name is gone. If you see
  `Cannot read properties of undefined (reading 'background')` from a chart, it's
  a stale `chart.background` lookup — see `references/migration.md`.
- `label-muted` in a grep is often part of `text-color-label-muted` (a colour
  token), not the typography `label` role — don't confuse the two.
