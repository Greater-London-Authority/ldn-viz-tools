# Spacing

Distilled from the spec's _Spacing Scale_. Emitted: `packages/themes/styles/spacing.css`
(+ `tw-extend/spacing.cjs`). Independent of the type scale.

## The numbered scale (what authors use)

The index encodes the multiplier of a 4px unit: `--spacing-4` = 4×4 = 16px.
Tailwind utilities compile to the alias: **`mt-{n}` → `margin-top: var(--spacing-{n})`**,
so `mt-4` = 16px, `p-2` = 8px. Fractional sub-steps keep Tailwind's dot on the
class: `mt-1.5` → `var(--spacing-1-5)` (6px).

Common rungs: 1=4, 2=8, 3=12, 4=16, 5=20, 6=24, 7=28, 8=32, 9=36, 10=40, 11=44,
12=48, 14=56, 16=64, 20=80, 24=96 … up to 96=384. Sub-steps: `px`=1, `0.5`=2,
`1.5`=6, `2.5`=10, `3.5`=14.

## Two tiers — never bind the private one

- **`--primitive-spacing-{n}`** — the private source (the one place a value is
  defined). Only `flow`, `grid-spacing`, and the `--spacing-{n}` alias reference it.
- **`--spacing-{n}`** — a thin public alias, a pure `var(--primitive-spacing-{n})`
  reference (the colour `outputReferences` pattern). **Authored code and components
  bind here (via `mt-{n}` etc.), never to `--primitive-*`.**

There is deliberately **no** named spacing-role set beyond `flow` (vertical rhythm)
and `grid-spacing` (layout structure). A numbered alias carries no decision and is
free; a named role must earn a one-sentence job those two don't cover.

## Which system for which job

- **Rhythm** — space _between_ stacked blocks → `flow` (context ramp). See `references/flow.md`.
- **Construction** — padding, border widths, list indents, cell padding, gaps →
  `--spacing-{n}` / `p-{n}` / `gap-{n}`.
- **Layout structure** — grid gutters, container padding → `grid-spacing` tokens.
  See `references/layout-grid.md`.
- Line-height governs space _within_ a text block; spacing tokens govern space
  _between_ elements. Whitespace around text uses the spacing scale, not the
  font-size/line-height primitives.

## Retired: the t-shirt scale (migration mapping)

The old `--spacing-{xxs…9xl}` and the em-relative `--typography-spacing-*` are
**retired** — neither is emitted. Every value was an exact rung, so migration is a
rename-by-alias (no re-scaling):

```
xxs→1  xs→2  sm→3  md→4  lg→5  xl→6  2xl→7  3xl→8  4xl→10  5xl→12  6xl→14  7xl→16  8xl→20  9xl→24
```

`--typography-spacing-*` was construction spacing (padding/borders), so it maps to
numbered `--spacing-{n}` (NOT to `flow`). E.g. `!my-typography-spacing-sm` →
`!my-3`; `pt-typography-spacing-4xl` → `pt-10`. Full migration recipe (and the
"scope class removals to `class=` attributes" footgun): `references/migration.md`.
