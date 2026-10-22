# Spacing

Spec section: Spacing. ADR: [0004](../../../../design-system-specification/decisions/0004-spacing.md).

## The scale

`--spacing-{n}` is `n` × 4px. `--spacing-4` is 16px.

| Steps | Values |
| --- | --- |
| Whole | 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24 (4px to 96px) |
| Half and pixel | `px` (1px), `0-5` (2px), `1-5` (6px), `2-5` (10px), `3-5` (14px) |

Each `--spacing-{n}` references `--primitive-spacing-{n}`. Use the semantic token, never the primitive.

In Tailwind, the preset maps these steps to `var(--spacing-{n})`, so `p-4` and `gap-2` use the scale. Half steps keep Tailwind's dot: `mt-1.5`. Tailwind's own steps that aren't on the scale, such as `9`, `11` and anything above `24`, still work and aren't tokens. Don't use them.

## Spacing or flow

Space inside a component, such as padding, a border or an indent, uses the spacing scale. Space between blocks of content uses [flow](flow.md), which changes with the context.

To decide, ask whether the children are a stack of blocks or parts of one structure. A card's contents and a form's fields are stacks, so they use flow. A table's cells and a row of buttons are structure, so they use spacing.

The gap between tiled cards is flow too: `gap-flow` on the grid ([layout-grid.md](layout-grid.md)). The gap between a button's icon and its label is spacing.

There are no named spacing sets apart from flow and the grid.
