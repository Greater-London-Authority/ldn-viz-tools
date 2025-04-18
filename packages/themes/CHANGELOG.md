# @ldn-viz/themes

## 6.0.0

### Major Changes

- ceaaf7a: CHANGED: Replace typography plugin with custom plugin implemtation that uses token values from Figma

## 5.0.0

### Major Changes

- d344f2c: CHANGED: Update to design tokens for color A11y. Component classes updated where neccesary. Button component api deprected 'condition' prop - now uses extended 'emphasis' options. Changes also reflected in Figma file

### Minor Changes

- 8c07d92: CHANGED: apply default colors to areas styled with tailwind typography prose class

### Patch Changes

- d9f2aca: CHANGED: alpha UI color token to improve contrast

## 4.0.1

### Patch Changes

- 25428ea: ADDED: add build task that creates JSON files to enable the auto-genereration of token documentation

## 4.0.0

### Major Changes

- b55dab9: CHANGED: moved `userThemeSelectionStore` and `currentThemeMode` from `theme` package to `ui` package

## 3.0.0

### Major Changes

- 758d638: CHANGED: Move `userPreference` from `utils` package to `ui` package

## 2.0.2

### Patch Changes

- 0353c42: CHANGED: set default theme selection to system

## 2.0.1

### Patch Changes

- 2e26abb: FIXED: include the generated CSS in published package

## 2.0.0

### Major Changes

- 9f1adf7: CHANGED: change how we handle color tokens

## 1.0.0

### Major Changes

- 0651ebb: CHANGED - update from Svelte 3 to Svelte 4 and update Storybook

## 0.3.0

### Minor Changes

- 79f514e: Includes tailwind forms and mini-svg-data-uri as named dependencies in package json

## 0.2.0

### Minor Changes

- 86513d1: CHANGED - apply Roboto typeface in theme

## 0.1.0

### Minor Changes

- 8c2b1fb: make color definitions accessible without needing Tailwind

## 0.0.2

### Patch Changes

- 63e36b3: Add package.json file to trigger publishing to NPM
