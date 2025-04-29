---
'@ldn-viz/ui': minor
---

CHANGED: applied `name` attribute to `Checkbox` components within `LayerControl` and `LayerControlGroup` for better accessibility

- `LayerControlGroup` now passes `name` into `LayerControl`
- `LayerControl` now passes `name` into `Checkbox`, in addition to `Radio`
