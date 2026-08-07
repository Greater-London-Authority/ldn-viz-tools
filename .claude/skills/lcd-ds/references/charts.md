# Charts

Distilled from the spec's _Semantic Layer: Chart typography_. Implementation:
`packages/charts/src/lib/observablePlotFragments/observablePlotFragments.ts`
(default styles), `.../observablePlotFragments/plot.ts` (the `Plot` wrapper),
`.../observablePlot/ObservablePlot.svelte` + `ObservablePlotInner.svelte`.
Read `references/colour.md` for the colour tokens and `references/typography.md`
for the object-tier aliases.

## Chart is a full context

Charts carry a complete `Chart/*` vocabulary so they can be **consumed standalone**
(teams outside this one build against them without the product set). Observable
Plot is authoritative for real charts; Figma chart specimens are representative.

**Eight roles, two tiers:**

- **Object tier — pure aliases of product roles (cannot drift, inherit responsive):**
  `Chart Title` = `product/title` (20/600), `Chart Subtitle` = `product/subtitle`
  (16/400), `Chart Eyebrow` = `product/eyebrow` (14/500). Primary-slot rule binds
  `Chart Title` when the chart owns the slot, `Chart Eyebrow` when it yields.
- **Chart-internal tier — own values (Regular except axis titles):**
  `axis-title` 14/500, `label` 14/400 (data/value labels, annotations, **legend
  entries**), `tick` 14/1.0-lh, `tick-sm` 12/1.0-lh, `note` 12 (footer source/citation).

Notes: there is **no `Chart Legend` role** — legend entries take `Chart Label`,
legend _titles_ take `Chart Axis Title`. Default tick density is 14/12; a
compressed density drops to 12/11 (11 is the sub-floor — never below 11).

## Colour in charts — resolved at runtime

Chart marks resolve colours via `theme.tokenNameToValue('<dotted.path>')` (see
`packages/ui/src/lib/theme/themeState.svelte.ts`), NOT via CSS utility classes.
The default plot styles in `observablePlotFragments.ts` use:

- data marks → `data.primary` (line/dot/area stroke/fill), also `data.secondary`,
  `data.context`, `data.categorical.{hue}`
- chart chrome → `chart.grid`, `chart.axis`, `chart.label`, **`chart.surface`**
  (the plot background), `border.muted`
- CSS side: `ObservablePlotInner.svelte` sets `--plot-background: var(--color-chart-surface)`.

Typical spec:

```js
Plot.line(data, {
	x: 'Month',
	y: 'Value',
	stroke: theme.currentTheme.data.primary, // or theme.tokenNameToValue('data.primary')
	tip: true
});
```

## Gotchas (these have bitten us)

- **`chart.background` → `chart.surface`.** The token was renamed. Any lingering
  `tokenNameToValue('chart.background')` (or CSS `--color-chart-background`) is stale.
- **`tokenNameToValue` used to THROW on a missing path**, taking down the _entire_
  chart render (`TypeError: Cannot read properties of undefined (reading '<leaf>')`),
  because it did `val.default[part]` without guarding `val.default`. It now
  degrades: logs `Color name "…" not defined in theme.` and returns `undefined`
  (mark falls back to a Plot default). So a stale token now shows as a console
  error + wrong/absent colour, not a blank chart. See `packages/utils/src/colors/tokenNameToValue.ts`.
- **`@ldn-viz/charts` is consumed via `dist`.** After editing chart source,
  `npm run build -w @ldn-viz/charts` (build `utils` first if you touched it), or
  the ui/web Storybook keeps the old code. Chart _example stories_ import from
  source and refresh live; the built package does not.
- When validating a token path, resolve it against the emitted tree:
  `packages/themes/styles/js/color-tokens.js` → `mode.light` (or `.dark`).
