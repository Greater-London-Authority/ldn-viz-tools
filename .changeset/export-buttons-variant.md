---
'@ldn-viz/charts': minor
'@ldn-viz/tables': minor
---

CHANGED: the footer of `ChartContainer` and `TableContainer` shows one Download button that opens a menu of every format, instead of separate data and image buttons. Set `exportButtonsVariant="separate"` for the previous buttons, or `"compact"` for an icon-only button. `ObservablePlot` and `Chart` pass `exportButtonsVariant` to `ChartContainer`.
