---
'@ldn-viz/ui': major
---

ADDED: added `MultipleActionButton` that allows user to select the nature of the operation that will be triggered when they click on the button
CHANGED: the `ImageDownloadButton` amd `DataDownloadButton` now use the `MultipleActionButton` - rather than accepting a single file format as a prop, they accept an array containing a list of file formats from which the user can choose
