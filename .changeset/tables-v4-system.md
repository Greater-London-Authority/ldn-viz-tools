---
'@ldn-viz/tables': major
---

- CHANGED: requires `@ldn-viz/themes` 10, now a peer dependency instead of a dependency, and its `index.css` (or `system.css`) loaded by the app. Tables use the `table-*` usage aliases; the cell alias is `table-body`.
- CHANGED: `BarDivergingCell`, `BarDivergingAxis` and `PairArrowAxis` labels use the `table-body` and `chart-tick-sm` aliases. `textSize` is an optional override with no default. Axis ticks grow from 8px to 12px, and the axes are 24px tall.
- CHANGED: the aggregate renderers' labels use `chart-tick-sm`.
- FIXED: `Table` no longer takes `display: table-cell` from a Tailwind utility of the same name as the old cell alias.
