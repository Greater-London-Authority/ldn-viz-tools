---
'@ldn-viz/ui': major
---

- CHANGED: requires `@ldn-viz/themes` 10, now a peer dependency, and its `index.css` (or `system.css`) loaded by the app. Components set type with v4 role classes and usage aliases (`label-md`, `button-label`, `dashboard-main-title`), typesets with `typeset-product` and `typeset-longform`, and flow with `flow-standard` and `gap-flow`. See the themes `MIGRATION.md`.
- CHANGED: `Card` spaces its header, content and footer with `gap-flow`: 8px in a standard flow context, as before, and 4px in a compact one.
- CHANGED: the parts of a title group have no space between them, in `TitleGroup` and in `DashboardTitle`, `DashboardSectionTitle`, `PageTitle` and `PageSectionBreak`.
- CHANGED: `DashboardTitle` and `DashboardSectionTitle` use the dashboard usage aliases, as Figma does: the section title is `headline-sm`, and the subtitles are `subhead-md` and `subhead-sm`. `PageSectionBreak` has a `size` prop (`sm`, `md`, `lg`) that sets `title-{size}` and `subtitle-{size}`; the default, `lg`, replaces `headline-lg`.
- CHANGED: `Button` `lg` (not square) is 48px tall, down from 64px. The positive, negative and caution variants use `text-color-inverse-text`.
- CHANGED: `Select`, `Input` and the other form controls are 40px tall, to line up with the default `Button`. `Select` options are 40px, with the control's padding.
- CHANGED: `ColorLegend`'s title is `caption-sm` semi-bold and its end labels `chart-tick-sm`.
- FIXED: `AppShell`'s main area can shrink below the width of its widest content.
