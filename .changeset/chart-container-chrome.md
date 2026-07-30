---
'@ldn-viz/charts': major
---

CHANGED: `ChartContainer` is now constructed using the `ChromeHeader` and `ChromeFooter` from `@ldn-viz/ui`.
CHANGED: `ChartContainer` now accepts `eyebrow`, `emphasis` (`primary`/`secondary`) and `hint`/`hintType`/`hintTitle` props
CHANGED: `ChartContainer` props have been renamed: `subtitle` replaces `subTitle`, and `description` replaces `chartDescription`
REMOVED: `ExportBtns` has been moved to `@ldn-viz/ui` and renamed to `ExportButtons`; its `chartToCapture` prop has been renamed to `elementToCapture`
REMOVED: `Title`/`Subtitlte`/`Footer` have been removed - use the `ChromeHeader` and `ChromeFooter` from `@ldn-viz/ui` instead.
