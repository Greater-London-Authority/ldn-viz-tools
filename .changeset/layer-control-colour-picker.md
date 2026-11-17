---
'@ldn-viz/ui': patch
---

FIXED: `Trigger` adds its `!justify-end` class to a `class` passed by the caller. Before, it replaced the caller's classes.
FIXED: the `ColorPicker` swatches are white circles with the colour centred, and a ring marks the selected colour. Each swatch has the colour name as its accessible name, and `aria-pressed` on the selected one. The colour name no longer shows as a tooltip on hover.
FIXED: the `LayerControl` popover arrows point at the centre of their trigger. The colour chip is centred in its focus outline.
