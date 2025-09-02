# @ldn-viz/tables

## 5.0.0-svelte5.0

### Major Changes

- 628016d: CHANGED: update to use Svelte 5 and runes.

### Patch Changes

- Updated dependencies [7962ee6]
- Updated dependencies [953d10c]
- Updated dependencies [a81fb27]
- Updated dependencies [4f1111a]
- Updated dependencies [4046add]
- Updated dependencies [0879ce9]
- Updated dependencies [628016d]
- Updated dependencies [7962ee6]
  - @ldn-viz/ui@21.0.0-svelte5.0
  - @ldn-viz/charts@7.0.0-svelte5.0

## 3.2.0

### Minor Changes

- bf61efc: CHANGED: hints for Table columns can now be a component (rather than string), and can be rendered as a Tooltip, Overlap, or Modal

### Patch Changes

- Updated dependencies [212ff05]
- Updated dependencies [f2f5f63]
- Updated dependencies [bec155b]
  - @ldn-viz/ui@19.2.0

## 3.1.0

### Minor Changes

- be4b0fa: CHANGED: improve ARIA for table component

### Patch Changes

- Updated dependencies [c66b03b]
- Updated dependencies [de9b000]
  - @ldn-viz/ui@18.1.0

## 3.0.0

### Major Changes

- ee9b859: Major version bump to deal with fact that svelte5 tag was mistakenly published as 2.6.1.

### Patch Changes

- b06d59e: FIXED: the first 2 rows are no longer missing when a `Table` is paginated

## 2.6.0

### Minor Changes

- efe6ad0: CHANGED: the `TextCell` now allows conditional control of fontWeight

### Patch Changes

- Updated dependencies [2321866]
- Updated dependencies [dc63318]
- Updated dependencies [fec8705]
- Updated dependencies [8c07d92]
- Updated dependencies [824b681]
- Updated dependencies [11e1f97]
- Updated dependencies [8321585]
- Updated dependencies [1610465]
- Updated dependencies [4eac8b2]
- Updated dependencies [978beb6]
- Updated dependencies [a04846c]
- Updated dependencies [56718bf]
- Updated dependencies [ae6a3df]
- Updated dependencies [adb7e59]
- Updated dependencies [49fd045]
- Updated dependencies [d344f2c]
- Updated dependencies [d9f2aca]
- Updated dependencies [2557336]
- Updated dependencies [bdbedf3]
  - @ldn-viz/charts@5.1.0
  - @ldn-viz/ui@16.0.0
  - @ldn-viz/themes@5.0.0

## 2.5.0

### Minor Changes

- 3eb1836: ADDED: `Table` and `TableContainer` components now have a slot to accept content to be displayed between the title/subtitle and table

### Patch Changes

- aa611ef: CHANGED: change icons to indicate sort direction when table is sorted based on column
- Updated dependencies [33ce5a9]
- Updated dependencies [d588473]
  - @ldn-viz/ui@15.2.2

## 2.4.2

### Patch Changes

- 7d12227: FIXED: use `<button>` element rather than `<div>` for some clickable elements
- 6ff6d1e: CHANGED: default to hide SVG option in image download button, as this will not give the exported result of downloading an image of the entire table
- Updated dependencies [7d12227]
- Updated dependencies [c145cf7]
- Updated dependencies [25428ea]
- Updated dependencies [c08ce0a]
- Updated dependencies [2e42c23]
- Updated dependencies [5f566bc]
- Updated dependencies [c1d600c]
- Updated dependencies [721774d]
- Updated dependencies [8c31d1b]
- Updated dependencies [0056c95]
  - @ldn-viz/ui@15.2.0
  - @ldn-viz/themes@4.0.1
  - @ldn-viz/charts@4.0.0

## 2.4.1

### Patch Changes

- 89b89e0: FIXED: correctly set file names of downloaded data and image files
- Updated dependencies [89b89e0]
  - @ldn-viz/charts@3.8.1
  - @ldn-viz/ui@14.8.1

## 2.4.0

### Minor Changes

- f4e7e27: FIXED: add padding to images of charts or tables downloaded in png format using ImageDownloadButton

### Patch Changes

- Updated dependencies [f51bc23]
- Updated dependencies [f4e7e27]
  - @ldn-viz/ui@14.8.0
  - @ldn-viz/charts@3.8.0

## 2.3.0

### Minor Changes

- 6dffda1: CHANGED: individual columns can be specified as not sortable

### Patch Changes

- Updated dependencies [ebd6a57]
- Updated dependencies [3d9026c]
  - @ldn-viz/ui@14.6.0

## 2.2.0

### Minor Changes

- 5df1150: CHANGED: tweak appearance of the Table by adjusting padding, defaulting to left-alignment of headers, using the mini variant of the filter icon, and vertically centering cell content

## 2.1.0

### Minor Changes

- 38c1ad5: CHANGED: the `textSize` prop of `BarDivergingAxis` and `PairAwrrowAxis` now accepts a number (in pixels) rather than string
- 2bac145: CHANGED: the colors used in the `PairArrowCell` component can now be customized
- ba7417c: ADDED: table headers can now be left/right/center aligned

### Patch Changes

- f49f50e: CHANGED: the baseline of the `PairArrowAxis` now extends for the full width of the cell, rather than being shortened by the padding

## 2.0.0

### Major Changes

- 8e077bb: CHANGED: columns in the `Table` are now sized relatively, and by default respond by changing size so that the table fills
  the width of the parent container.

## 1.6.1

### Patch Changes

- 9dee938: FIXED: remove `border-b` class that should not have been applied to tabel header
- Updated dependencies [e9a98b1]
  - @ldn-viz/charts@3.3.0

## 1.6.0

### Minor Changes

- 510fa38: ADDED: `BarDivergingCell` renderer now accepts `textSize`/`positiveColor`/`negativeColor` props
- 9b7462a: CHANGED: update table container to match new chart container api
- 122ed51: CHANGED: `Table` now defaults to `showColSummaries` being `false`
- f649103: CHANGED: table no longer sets a fixed height unless the `virtualise` prop is true
- fcd3e47: CHANGED: in `Table` component, it is now possible to disable the horizontal rule above the header

### Patch Changes

- Updated dependencies [8aac39d]
  - @ldn-viz/charts@3.2.0

## 1.5.0

### Minor Changes

- 8424fed: CHANGED: allow axis renderers to be specified by name (as strings, rather than Svelte components) in table specifications

### Patch Changes

- Updated dependencies [e42e0fe]
  - @ldn-viz/ui@14.3.0

## 1.4.0

### Minor Changes

- aed4a52: ADDED: `BarDivergingCell` and `PairArrowCell` cell encodings

  FIXED: mis-alignment of header and data rows

  ADDED: ability to add an axis in the heading of tables

## 1.3.0

### Minor Changes

- 33a1934: CHANGED: remove `capitalization` class from header cells in Table

## 1.2.0

### Minor Changes

- 8ec03ca: FIXED: fix issue that caused two horizontal scrollbars to appear when embedding a wide table in a modal.

### Patch Changes

- a220cda: MINOR: update TableContainer to work with new export buttons.
- 18bea73: FIXED: table now updates when `data` prop is updated.

## 1.1.0

### Minor Changes

- 2fb99f4: ADDED: added `columnMapping` prop to `Table` component, to allow columns to be renamed before data download

### Patch Changes

- Updated dependencies [f11222c]
- Updated dependencies [2fb99f4]
- Updated dependencies [38ac6b1]
- Updated dependencies [fc08482]
- Updated dependencies [09e55ec]
- Updated dependencies [f11222c]
  - @ldn-viz/charts@3.1.0
  - @ldn-viz/ui@14.0.0

## 1.0.0

### Major Changes

- 9f1adf7: CHANGED: change how we handle color tokens

### Patch Changes

- Updated dependencies [9f1adf7]
- Updated dependencies [881aa44]
- Updated dependencies [9f1adf7]
- Updated dependencies [9f1adf7]
  - @ldn-viz/charts@2.0.0
  - @ldn-viz/themes@2.0.0
  - @ldn-viz/ui@11.0.0
  - @ldn-viz/utils@0.2.0

## 0.3.0

### Minor Changes

- 541e6e8: ADDED: it is now possible to display explanatory information about each column in a tooltip.

## 0.2.0

### Minor Changes

- ec1feea: FIXED: fix the rendering of wide tables
- 66d62ad: ADDED: the visual encoding applied to cells can also depend on the values in other column(s)

### Patch Changes

- 1a150e4: FIXED: changed color of text in popover menu so they are usable in dark mode
- Updated dependencies [71f1f62]
  - @ldn-viz/ui@9.1.1

## 0.1.0

### Minor Changes

- 2205146: ADDED: created `@ldn-viz/tables` package and `Table` component
