---
'@ldn-viz/tables': patch
---

FIXED: the `ColSpec.href` type is a function that takes the row and returns a string, which is how `DataCell` calls it
