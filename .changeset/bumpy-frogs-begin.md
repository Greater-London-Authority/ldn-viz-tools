---
'@ldn-viz/charts': minor
---

FIXED: The `ObservablePlot` component no longer re-renders the `controls` snippet when the `spec` is updated. Previously a slider control that updated the chart would be re-created when its value channged, preventing it from being smoothly adjusted.
