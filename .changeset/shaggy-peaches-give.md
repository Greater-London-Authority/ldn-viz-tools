---
'@ldn-viz/ui': minor
---

CHANGED: `RadioButton` uses `id` as the `id` of its `<input>` instead of `input-{id}`, matching `Checkbox`. An external `<label for={id}>` can now name the input. Anything that targets `#input-{id}` needs updating.

ADDED: `value` prop on `RadioButton`. It sets the input's `value` and defaults to `id`.

CHANGED: inputs in `RadioButtonGroup` use `{group id}-{option id}` as their `id`, so two groups with the same option ids no longer clash. `selectedId` still holds the option `id`.

FIXED: in a `LayerControl` with `mutuallyExclusive` set, the layer label now names the radio button, and clicking the label selects the layer.

FIXED: each `FillTypeControl` uses its own radio `name`, so its radio buttons no longer form one browser group with the fill controls of other layers.
