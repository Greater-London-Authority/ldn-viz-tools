# Pending deprecations

## `DataDownloadButton` and `ImageDownloadButton` (`@ldn-viz/ui`)

Deprecated in the release after 10.0.0, to be removed from the package exports in the next major version.

`DownloadButton` replaces both. It opens one menu with a Data group (CSV, JSON) and an Image group (PNG, SVG).

| Old                                                    | New                                                    |
| ------------------------------------------------------ | ------------------------------------------------------ |
| `<DataDownloadButton {data} formats={['CSV']} />`      | `<DownloadButton {data} dataFormats={['CSV']} />`      |
| `<ImageDownloadButton {htmlNode} formats={['PNG']} />` | `<DownloadButton {htmlNode} imageFormats={['PNG']} />` |
| Both buttons side by side                              | One `DownloadButton` with `data` and `htmlNode`        |

`DownloadButton` does not have `variant`, `emphasis`, `size`, `beforeLabel` or `afterLabel`. It has two fixed styles: a text button, and an icon-only button set with `compact`.

`ExportButtons` with `variant="separate"` still uses both components, so they stay in the codebase after they are removed from the exports.
