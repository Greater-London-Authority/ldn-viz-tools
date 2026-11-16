---
'@ldn-viz/ui': patch
---

FIXED: `RadioButtonSolidProps` names the icon prop `RawIcon`, which is the prop `RadioButtonSolid` reads. Options passed to `RadioButtonGroupSolid` and `CheckboxGroupSolid` still use `rawIcon`.
