# ldn-viz-tools-charts

## 5.3.0

### Minor Changes

- 8bde3bc: CHANGED: defaultArea plot fragment uses fillOpacity instead of opacity for consistency with other plot fragments

## 5.2.0

### Minor Changes

- 885ecf1: FIXED: fixed custom tooltips in ObservablePlot component
- 41d345f: CHANGED: Steps down mid button size (40px) to match height of input elements.
  CHANGED: Adds borders and shadows to tooltips/popovers and improves contrast of overlay components - especially relevant in map context

### Patch Changes

- ceaaf7a: CHANGED: Replace typography plugin with custom plugin implemtation that uses token values from Figma
- Updated dependencies [6e75123]
- Updated dependencies [aae5771]
- Updated dependencies [41d345f]
  - @ldn-viz/ui@17.1.0

## 5.1.0

### Minor Changes

- 2321866: CHANGED: add ability to align the sub-components of two or more `ChartContainers` placed side-by-side
- 56718bf: FIXED: order of alt and description in `ChartContainer` component and removed 'View description' button from image capture on download
- d344f2c: CHANGED: Update to design tokens for color A11y. Component classes updated where neccesary. Button component api deprected 'condition' prop - now uses extended 'emphasis' options. Changes also reflected in Figma file

### Patch Changes

- Updated dependencies [dc63318]
- Updated dependencies [fec8705]
- Updated dependencies [824b681]
- Updated dependencies [11e1f97]
- Updated dependencies [8321585]
- Updated dependencies [1610465]
- Updated dependencies [4eac8b2]
- Updated dependencies [978beb6]
- Updated dependencies [a04846c]
- Updated dependencies [ae6a3df]
- Updated dependencies [adb7e59]
- Updated dependencies [49fd045]
- Updated dependencies [d344f2c]
- Updated dependencies [2557336]
- Updated dependencies [bdbedf3]
  - @ldn-viz/ui@16.0.0

## 5.0.1

### Patch Changes

- 9c33886: ADDED: export the `plot` and `getDefault` functions, and `Plot` object

## 5.0.0

### Major Changes

- 028ad2f: ADDED: `currentTheme` store to `ui` package and use in `chart` examples. Implement accessibility improvements in charts and illustrate with line chart example

### Minor Changes

- 028ad2f: ADDED: ARIA attributes and global ariaHidden for accessibility
- 028ad2f: ADDED: chartDescription modal to Footer for use in chart and chartDescription for accessibility to ChartContainer

### Patch Changes

- Updated dependencies [028ad2f]
- Updated dependencies [4556f05]
- Updated dependencies [5c06c36]
- Updated dependencies [f5de052]
- Updated dependencies [7487cd8]
- Updated dependencies [0ea3bc4]
- Updated dependencies [7dc2bfb]
- Updated dependencies [028ad2f]
  - @ldn-viz/ui@15.3.0
  - @ldn-viz/utils@1.1.0

## 4.0.0

### Major Changes

- 8c31d1b: CHANGED: `ObservablePlot` and `ObservablePlotInner` now default to using a wrapper about Observable Plot;s `Plot.plot()` that applies default chart styling
- 8c31d1b: ADDED: wrapper functions that wrap Observable Plot's mark functions and apply default styling

### Minor Changes

- 5f566bc: CHANGED: switch from `html2canvas` to `html-to-image` in the `ImageDownloadButton`

### Patch Changes

- Updated dependencies [7d12227]
- Updated dependencies [c145cf7]
- Updated dependencies [c08ce0a]
- Updated dependencies [2e42c23]
- Updated dependencies [5f566bc]
- Updated dependencies [c1d600c]
- Updated dependencies [721774d]
- Updated dependencies [0056c95]
  - @ldn-viz/ui@15.2.0

## 3.8.2

### Patch Changes

- 6dc5105: Housekeeping: squash console warnings in storybook from unused props
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
