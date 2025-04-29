---
'@ldn-viz/ui': minor
---

Refactored `LayerControlGroup`, `CheckboxGroup` and `Checkbox` components for accessibility.

`LayerControlGroup` and `CheckboxGroup` now have:

- `id` and `role="group"` attributes on the div that wraps around the `LayerControl` or `Checkbox` inputs
- `ariaLabel` prop to describe the purpose of the components to screen reader users
- `<ul>` element surrounding the options, with each option nested in an `<li>` element so screen reader users know the options are connected
