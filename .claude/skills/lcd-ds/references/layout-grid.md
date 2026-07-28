# Layout grid

Distilled from the spec's *Layout Grid*. Sits one level above type, independent of
it. Grid tokens: `--grid-spacing-{mode}-{contained|fluid}-{gutter|container-padding}`
(emitted `packages/themes/styles/grid-spacing.css`, `tw-extend/gridspacing.cjs`),
resolving from `--primitive-spacing-{n}`.

## Core rule

A column grid is a **placement** tool (where a block sits, how wide), not a
spacing tool. Grid styles apply to **top-level container/page frames**, not to
component frames. Components use Auto Layout with padding/gap bound to
**spacing tokens**, constant regardless of grid context.

- Edge space is always the **container's padding**; the grid's own margin is **0**
  (avoids double-counting the edge). This matches Tailwind's `container`.
- `flow` governs vertical rhythm; grid tokens govern horizontal structure. Both
  resolve to `--primitive-spacing-{n}` but retune independently.

## Two archetypes (distinct grids, not one stretched)

**Contained** — centred, max-width, edge space grows with viewport. For
document-like surfaces (prose, marketing, settings, forms).

| bp | cols | container padding | gutter |
|---|---|---|---|
| base | 4 | 16 | 16 |
| sm | 6 | 32 | 20 |
| md | 8 | 32 | 24 |
| lg | 12 | 64 | 24 |
| xl | 12 | 80 | 32 |
| 2xl | 12 | 96 | 32 |

**Fluid** — full-bleed, columns stretch, **constant** modest edge space. For
dashboards and app shells.

| bp | cols | container padding | gutter |
|---|---|---|---|
| base | 4 | 16 | 16 |
| sm | 6 | 16 | 16 |
| md | 8 | 24 | 16 |
| lg–2xl | 12 | 24 | 16 |

The uniform 16px gutter is a deliberate card-tiling gap (looser than the 8px
product vertical flow). Keep **gutter ≤ card interior padding**, and edge padding
≥ gutter. Card gutter (owned by the grid) and card padding (owned by the card) are
separate values — tune horizontal density via the gutter, not the padding.

## Dashboard specifics

- **The side panel sits outside the canvas grid** — it's app chrome. The fluid
  grid applies to the canvas region only, which fills the width beside the panel
  and reflows when the panel is dismissed (grid fills its container).
- **Cards bind to columns** (span whole columns by default). A card needing an
  off-grid width may span explicitly — the same breakout exception as a prose
  figure. If >~1 in 10 cards need it, revisit the column count.
