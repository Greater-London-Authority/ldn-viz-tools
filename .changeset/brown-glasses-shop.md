---
'@ldn-viz/ui': minor
---

CHANGED: `CheckboxGroup`, `LayerControl` and `LayerControlGroup` components for better accessibility

- `LayerControlGroup` now passes `name` into `LayerControl`
- `LayerControl` now passes `name` into `Checkbox`, in addition to `Radio`
- `LayerControlGroup` and `CheckboxGroup` now have an `aria-controls` attribute on the checkbox that toggles all controls, with a value equal to the ids for all controls
