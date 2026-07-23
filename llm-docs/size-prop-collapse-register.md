# Size / level / variant prop collapse register

Components whose size/level/variant prop used to vary **type** (font-size and/or
weight per value) where migration to a fixed semantic role collapses that
differentiation. Tracked here for a separate later sweep — do NOT resolve inline
during migration; apply the fixed role and log a row.

| component | prop + values | old per-value type | collapsed to | still differentiates | date | status |
|---|---|---|---|---|---|---|
| NavigationMenuItem | `level` (1 / 2+) | L1 `text-base` 16/400 · L2+ `text-sm` 14/400 | `product/label` via `label-tight` (14/500) | colour (L1 `text-color-text` · L2+ `text-color-text-muted`); L2 indent `pl-4` | 2026-07-23 | OPEN |
