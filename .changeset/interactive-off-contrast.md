---
'@ldn-viz/themes': patch
'@ldn-viz/ui': patch
---

FIXED: `interactive-off` is grey-500 in both modes, so the switch track and thumb reach 3:1 against the surface. `interactive-secondary-muted`, `-hover` and `-active` move to grey 200, 300 and 400. `CheckboxSolid`, `RadioButtonSolid` and `TabLabel` use `interactive-secondary-muted` for unselected items, selected `CheckboxSolid` and `RadioButtonSolid` labels are semibold, `NavigationMenu`'s active item is semibold (it used a font-weight utility the v4 preset doesn't generate), and the sidebar Close button's text darkens on hover.
