# ldn-viz-tools-ui

## 3.5.0

### Minor Changes

- 5f4de0a: CHANGED: `Select` component now exposes a `justValue` prop that can be bound to

## 3.4.0

### Minor Changes

- a1f130a: ADDED: `ColorLegend`, `ColorLegendOrdinalHorizontal` and `ColorLegendOrdinalHorizontalAlt` components

## 3.3.0

### Minor Changes

- d42c49b: ADDED - add a `NonIdealState` component to explain why content is unavailable
- 35cdb77: adds index files to routes (stops warnings) adds tailwind to maps

### Patch Changes

- 3d2918e: Fix MapApp layout sizing and lack of overflow hidden for Map.
- 1d0f93b: \* Export `Input` and `InputWrapper` components
- a988817: FIXED - Unused space within map controls interfering with map interactions.

## 3.2.0

### Minor Changes

- 10f9fca: CHANGED: `DataDownloadButton` now accepts a prop defining a mapping from the names of fields in the provided data object, and the names that should be used in the downloaded file

### Patch Changes

- 94dee5e: Changed: Spinner updated with dark mode

## 3.1.0

### Minor Changes

- cc6960a: fix specification of svelte-select as a dependency

## 3.0.0

### Major Changes

- d9c32c7: CHANGED - the select component is now based on the `svelte-select` library
- d9c32c7: ADDED - a new `Tooltip` component allows the display of help tooltips when an icon is hovered over
- d9c32c7: ADDED - an `InputWrapper` provides consisten chrome (such as help text or error messages) around input elements

### Minor Changes

- 71bb3e8: ADDED - `title` property to `Button` component so that quick accessible tooltips can be added.
- 5d7a227: CHANGED - provide a default light theme for tabs

## 2.0.0

### Major Changes

- 3c90996: CHANGED - switch from using `@rgossiaux/svelte-heroicons` to using `@steeze-ui/heroicons` as an icon library
- 3c90996: CHANGED - `TabbedSidebarWrapper`'s `tab` prop now includes `@steeze-ui/heroicons` `IconThemeSource` objects as the `icon` prop (or raw Svelte components as the `rawIcon` prop)

### Minor Changes

- 1713d79: ADDED - added `PlacardButton` component

## 1.0.0

### Major Changes

- 0651ebb: CHANGED - update from Svelte 3 to Svelte 4 and update Storybook

## 0.8.0

### Minor Changes

- 7bcd033: ADDED - add a `LogoByCIU` component that says "City Intelligence \n Designed and developed by GLA City Intelligence"
- a93fbb1: CHANGED - in CheckboxGroup, replace Select/Clear All buttons with a checkbox
- 29c372c: ADDED - `Header` component
- 8e603ac: ADDED - added a `Spinner` component to show that something is loading
- b8b34b9: CHANGE - change appearance and properties of `Button` component
- 3f7fa59: CHANGE - fix sizing of `RadioButtonSolid` when the number of buttons in a group is not 3

## 0.7.0

### Minor Changes

- 22cf480: CHANGED - Added a `width` prop to the `Modal` component

## 0.6.0

### Minor Changes

- e081448: FIXED actually export the RadioButtonSolid and RadioButtonGroupSolid components

## 0.5.0

### Minor Changes

- e7698cd: refactor - REMOVED `TabSelector` and ADDED a new `RadioButtonSolidGroup` component

## 0.4.0

### Minor Changes

- 750d139: FIXED - fix styling of buttons in CheckboxGroup
- fb5eaed: CHANGED - allow checkboxes in a checkboxGroup to be initially checked
- 750d139: ADDED - generate CSS file containing directives for the Tailwind classes that are used
- 0821c2e: CHANGED - rename "style" prop of Button to "variant"

## 0.3.0

### Minor Changes

- 32b9dd7: FIXED - allow checkboxes in a checkboxGroup to be initially checked
- 32b9dd7: CHANGED - rename "style" prop of Button to "variant"

## 0.2.0

### Minor Changes

- f74b4cc: ADDED - `TabbedSidebar` component with tab icons on the left
- d6ffe1e: ADDED - add custom colored `Checkbox`/`CheckboxGroup` and `RadioButton`/`RadioButtonGroup` compoents

## 0.1.0

### Minor Changes

- d5434ea: ADDED - `Button` component
- 99de4e1: ADDED - `ImageDownloadButton`
- 1c76060: FIXED - prevent interaction with disabled Button component
- 29a2beb: ADDED - `DataDownloadButton` component
- e960b60: ADDED - `TabSelector` component

### Patch Changes

- db4714c: CHANGED - Replace boilerplate README files

## 0.0.3

### Patch Changes

- df43eb9: FIXED - export Modal and Select from ui package.

## 0.0.2

### Patch Changes

- ed854f2: Initial release

## 0.0.2

### Patch Changes

- Do initial release.
