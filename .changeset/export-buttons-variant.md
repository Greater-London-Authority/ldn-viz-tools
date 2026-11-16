---
'@ldn-viz/charts': major
'@ldn-viz/tables': major
---

CHANGED: the footer of `ChartContainer` and `TableContainer` shows one `DownloadButton` that opens a menu of every format, instead of separate data and image buttons.
CHANGED: `exportButtonsVariant` is renamed `downloadButtonVariant`. Its values are `standard` (the default), `compact` and `outline`. The `separate` value is removed. `ObservablePlot` and `Chart` pass `downloadButtonVariant` to `ChartContainer`.
