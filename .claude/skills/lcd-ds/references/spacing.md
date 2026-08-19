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

Three owners. The test is **ownership**, not the gap's appearance:

> **Does this gap exist because two things sit next to each other, or because one
> thing has an inside?**

- **Vertical, between stacked siblings** → the **stack** owns it → a `flow` rung
  (`mt-flow-{rung}` / `gap-flow-{rung}`). See `references/flow.md`.
- **Horizontal, between tiled objects** (cards in a grid, side-by-side panels) →
  the **grid** owns it → `.grid-gutter` / `.grid-gutter-fluid`, **not** a hardcoded
  `gap-{n}`. See `references/layout-grid.md`.
- **Inside a component's box** — padding, border widths, list indents, cell padding
  → the **component** owns it → `--spacing-{n}` / `p-{n}` / `mt-{n}`.

Shorter form: **if the children are a stack of blocks it's flow; if they're a
structure it's construction.** A card's contents stack; a form's fields stack. A
table's cells don't; a button row doesn't.

This supersedes the older *rhythm-vs-construction* gate, which asked for a judgement
about a gap's *nature* and proved unanswerable in practice.

**Construction shortlist.** Real usage across `packages/ui/src` concentrates almost
entirely on five rungs — `4` (16px), `2` (8px), `6` (24px), `1` (4px), `8` (32px).
Reach for these first; anything outside the set is usually a flow gap in disguise,
or an alignment value that should derive from the element it aligns to.

Line-height governs space _within_ a text block; spacing tokens govern space
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
