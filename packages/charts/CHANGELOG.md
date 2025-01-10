# ldn-viz-tools-charts

## 3.8.2

### Patch Changes

- 6dc5105: Housekeeping: squash console warnongs in storybook from unsed props
- Updated dependencies [1c134d6]
- Updated dependencies [a3726bf]
- Updated dependencies [4e4f7c5]
- Updated dependencies [0313649]
- Updated dependencies [09fa609]
- Updated dependencies [6dc5105]
- Updated dependencies [e397e35]
- Updated dependencies [68780ea]
  - @ldn-viz/ui@15.1.0

## 3.8.1

### Patch Changes

- 89b89e0: FIXED: correctly set file names of downloaded data and image files
- Updated dependencies [89b89e0]
  - @ldn-viz/ui@14.8.1

## 3.8.0

### Minor Changes

- f4e7e27: FIXED: add padding to images of charts or tables downloaded in png format using ImageDownloadButton

### Patch Changes

- Updated dependencies [f51bc23]
  - @ldn-viz/ui@14.8.0

## 3.7.0

### Minor Changes

- 72db5e6: FIXED: addEventHandlerInner no longer expects x and y values (fixes regression in 3.5.0)

## 3.6.0

### Minor Changes

- a8170bb: CHANGED: improve footer in `ChartContainer` component

### Patch Changes

- a581914: FIXED: fix regression that caused width of `ObservablePlot`/`ObservablePlotInner` to not respond to changes in width of parent container

## 3.5.0

### Minor Changes

- d36a893: ADDED: `ObservablePlot` now applies a `ChartContainer` wrapper around a separate `ObservablePlotInner` components and accepts a `controls` slot

## 3.4.0

### Minor Changes

- eff5d0e: ADDED: `ChartContainer` component now accepts a `controls` slot
- 04e407a: Adjust reponisve layout of export buttons

### Patch Changes

- Updated dependencies [e4b3ff7]
- Updated dependencies [e62fd68]
  - @ldn-viz/ui@14.4.0

## 3.3.0

### Minor Changes

- e9a98b1: FIXED: support event handlers for marks that have `x1`/`x2`/`cx` attributes instead of `x`, and `y1`/`y2`/`cy` attributes instead of `y`

## 3.2.0

### Minor Changes

- 8aac39d: FIXED: export `addEventHandler` and `registerTooltip`

## 3.1.1

### Patch Changes

- 9f5ab57: MINOR: fixed use of MultiActionButton props form ImageDownloadButton and DataDownloadButton.
- Updated dependencies [9f5ab57]
- Updated dependencies [40c49a5]
  - @ldn-viz/ui@14.1.0

## 3.1.0

### Minor Changes

- f11222c: CHANGED: update design of `ChartContainer` component, and refactor props that specify the footer
- 2fb99f4: ADDED: added `columnMapping` prop to `ExportBtns` component, to allow columns to be renamed before data download

### Patch Changes

- Updated dependencies [38ac6b1]
- Updated dependencies [fc08482]
- Updated dependencies [09e55ec]
- Updated dependencies [f11222c]
  - @ldn-viz/ui@14.0.0

## 3.0.0

### Major Changes

- b55dab9: CHANGED: moved `userThemeSelectionStore` and `currentThemeMode` from `theme` package to `ui` package

### Patch Changes

- Updated dependencies [b55dab9]
  - @ldn-viz/ui@13.0.0

## 2.0.2

### Patch Changes

- 69686cf: FIXED: adds missing `@ldn-viz/util` dependency to `package.json` of `maps`, `ui`, and `charts` packages.
- 4c860bc: FIXED: update path used to import theme package
- Updated dependencies [69686cf]
  - @ldn-viz/ui@11.0.1

## 2.0.1

### Patch Changes

- ddbae5c: FIXED: export the exports from observablePlotFragments.ts from package

## 2.0.0

### Major Changes

- 9f1adf7: CHANGED: change how we handle color tokens

### Patch Changes

- Updated dependencies [9f1adf7]
- Updated dependencies [881aa44]
- Updated dependencies [9f1adf7]
  - @ldn-viz/ui@11.0.0

## 1.5.0

### Minor Changes

- 9a5f3ef: CHANGED: allow custom Tooltip components to be used with `ObservablePlot` component
- 0bd025a: ADDED: fragments of Observable Plot specifications encoding default styling
  ADDED: `preprocessOptions` function for creating multiple marks with different values of options
  ADDED: functions for adding registering event handlers for observable plot marks

### Patch Changes

- Updated dependencies [ffffac0]
- Updated dependencies [ae07a91]
- Updated dependencies [c0814a6]
- Updated dependencies [bcf8773]
- Updated dependencies [129cf32]
- Updated dependencies [628ae2c]
- Updated dependencies [e4fc1dc]
- Updated dependencies [8d57614]
- Updated dependencies [7ded8e8]
- Updated dependencies [12f8b2a]
  - @ldn-viz/ui@9.0.0

## 1.4.0

### Minor Changes

- c703bb6: CHANGED - specify Svelte version as a range rather than pinning specific version.

### Patch Changes

- Updated dependencies [c703bb6]
  - @ldn-viz/ui@5.2.0

## 1.3.0

### Minor Changes

- 48b02df: ADDED - color theme object and functions for generating color scales

### Patch Changes

- Updated dependencies [74db575]
- Updated dependencies [030c002]
  - @ldn-viz/ui@3.6.0

## 1.2.0

### Minor Changes

- 35cdb77: adds index files to routes (stops warnings) adds tailwind to maps

### Patch Changes

- Updated dependencies [3d2918e]
- Updated dependencies [d42c49b]
- Updated dependencies [1d0f93b]
- Updated dependencies [a988817]
- Updated dependencies [35cdb77]
  - @ldn-viz/ui@3.3.0

## 1.1.0

### Minor Changes

- 6df130b: Added: `ObservablePlot` component for rendering a chart using Observable's Plot library
  Changed: Updated the `ChartContainer` component

### Patch Changes

- Updated dependencies [10f9fca]
- Updated dependencies [94dee5e]
  - @ldn-viz/ui@3.2.0

## 1.0.0

### Major Changes

- 0651ebb: CHANGED - update from Svelte 3 to Svelte 4 and update Storybook

### Patch Changes

- Updated dependencies [0651ebb]
  - @ldn-viz/ui@1.0.0

## 0.0.3

### Patch Changes

- db4714c: Replace boilerplate README files
- Updated dependencies [db4714c]
- Updated dependencies [d5434ea]
- Updated dependencies [99de4e1]
- Updated dependencies [1c76060]
- Updated dependencies [29a2beb]
- Updated dependencies [e960b60]
  - @ldn-viz/ui@0.1.0

## 0.0.2

### Patch Changes

- ed854f2: Initial release

## 0.0.2

### Patch Changes

- Do initial release.
