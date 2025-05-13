---
'@ldn-viz/ui': minor
---

FIXED: `SidebarTabList` accessibility and styling

- applies orientation correctly for keyboard/screen reader accessibility when oriented horizontally
- applies correct styling by accepting `placement` prop and wrapping around new `SidebarTabLabel` component (instead of using `TabLabel` component)
