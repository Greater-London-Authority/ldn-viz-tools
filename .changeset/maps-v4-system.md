---
'@ldn-viz/maps': major
---

- CHANGED: requires `@ldn-viz/themes` 10, now a peer dependency, and its `index.css` (or `system.css`) loaded by the app. Map controls, legends and markers use the v4 role classes and typesets, and the `surface` colours in place of `container`.
- FIXED: the cluster layers' outline and hole colours use `inverse.geo.feature`, the v4 name for `geo.inverse.feature`, which no longer resolved and logged a warning.
