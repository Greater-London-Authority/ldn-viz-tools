---
'@ldn-viz/maps': major
---

CHANGED: refactored `Map` by splitting out core MapLibre stuff to `MapLibre` internal component.
CHANGED: updated `Map` to accept light and dark base map styles and toggle them based on theme mode.
CHANGED: removed `classes` property from `map`, pass classes as `class` attribute instead.
