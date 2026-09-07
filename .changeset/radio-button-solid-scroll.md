---
'@ldn-viz/ui': minor
---

FIXED: if no name is provided to `RadioButtonGroupSolid`, generate a random id rather than falling back on empty string (if a page included two `RadioButtonGroupSolid` with no `name` then clicking the second would scroll to the first)
