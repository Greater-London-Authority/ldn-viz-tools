# Elevation and visual rules

Spec sections: Elevation, Visual rules. ADRs: [0011](../../../../design-system-specification/decisions/0011-elevation.md), [0006](../../../../design-system-specification/decisions/0006-visual-rules.md).

## Elevation

An interface is a stack: the canvas at the bottom, surfaces above it. `.elevation-0` to `.elevation-6` set a box shadow from `--elevation-0` to `--elevation-6`. `elevation-0` sits on the canvas and has no shadow.

A surface's level is set by its colour and its elevation step. The colour is `--color-surface`, or `--color-surface-muted` to set it apart from its surroundings. There are no level colour tokens.

Elevation is visual only. Stacking order is set with z-index, separately.

Use an elevation class, not a shadow utility. The `--shadow-*` tokens and Tailwind's `shadow-*` classes still exist. `--elevation-1` to `--elevation-6` have the same values as `--shadow-sm`, `--shadow`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` and `--shadow-2xl`, so `shadow-sm` becomes `elevation-1`.

`--shadow-inner` has no elevation equivalent.

## Corners

Corners are square. Only round things, such as a circular avatar or a dot, have a radius. Bars, cards, cells, buttons, inputs and containers don't.

The preset keeps Tailwind's `rounded-*` classes for things that are round, so this isn't enforced. Remove `rounded-*` from anything that isn't round.
