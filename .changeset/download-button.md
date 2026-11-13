---
'@ldn-viz/ui': minor
---

ADDED: `DownloadButton`, one button that opens a menu of data formats (CSV, JSON) and image formats (PNG, SVG). Set `compact` for an icon-only button.
ADDED: `downloadCSV`, `downloadJSON` and `downloadImage` are exported, for building a custom download control.
CHANGED: `ExportButtons` has a `variant` prop. `standard` (the default) shows a `DownloadButton` with the text "Download", `compact` shows an icon-only `DownloadButton`, and `separate` shows the previous data and image buttons.
DEPRECATED: `DataDownloadButton` and `ImageDownloadButton`. Use `DownloadButton` instead. They will be removed from the package exports in the next major version.
FIXED: `ExportButtons` is exported from the package again.
