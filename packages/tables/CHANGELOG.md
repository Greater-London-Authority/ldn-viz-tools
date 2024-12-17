# @ldn-viz/tables

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
