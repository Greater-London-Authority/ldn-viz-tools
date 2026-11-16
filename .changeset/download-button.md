---
'@ldn-viz/ui': major
---

ADDED: `DownloadButton`, one button that opens a menu of data formats (CSV, JSON) and image formats (PNG, SVG). Set `compact` for an icon-only button, or `outline` for an outline button.
ADDED: `downloadCSV`, `downloadJSON` and `downloadImage` are exported, for building a custom download control.
ADDED: `resolveDownloadFormats` converts `dataDownload` and `imageDownload` values (`true`, `false` or an array of formats) into the format lists that `DownloadButton` takes. The types `DataFormat`, `ImageFormat`, `DataDownloadOption` and `ImageDownloadOption` are exported with it.
REMOVED: `ExportButtons`, `DataDownloadButton` and `ImageDownloadButton`. Use `DownloadButton` instead.
