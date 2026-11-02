# @ldn-viz/themes

## 10.0.0

### Major Changes

- 257b51d: CHANGED: every class the specification names (typesets, roles, usage aliases, flow, emphasis, elevation, `.container` and the other grid classes, and focus styles) is now generated as plain CSS in `system.css`, and the Tailwind preset no longer adds them. The preset is generated and only maps Tailwind's theme onto the custom properties; the `.form-*` classes are plain CSS in `system.css`, and `@tailwindcss/forms` is no longer a dependency. Tailwind apps import `index.css` as well as the preset. A new `reset.css` (imported first by `index.css`) ports Tailwind's preflight at zero specificity. Unclassed markup (Markdown, CMS output) gets content styles inside `typeset-longform` and `typeset-product--formatted`; `.not-prose` becomes `.not-typeset`. Responsive and state variants of system classes (`md:mt-flow-loose`) are no longer available. See `MIGRATION.md`. The preset exposes semantic colours only: the `seed` and palette-ramp colour utilities are removed. Each font-family custom property now ends in a fallback stack. The grid gutter tokens and the `.grid-gutter` and `.grid-gutter-fluid` classes are removed: space tiled blocks with `gap-flow`. The parts of a title group have no flow step between them. Form controls are 40px tall, with the border inside their padding. The `table/cell` usage alias is renamed `table/body` (`.table-body`), because `.table-cell` is also a Tailwind display utility.
- eaca94a: CHANGED: rebuild the token pipeline on the version 4 Figma export and publish named outputs through an `exports` map: `index.css`, `tokens.css`, `system.css`, `colors.js` and the Tailwind preset at `@ldn-viz/themes/tailwind`. The per-category `styles/*.css` files, `styles/js/color-tokens.js` and `ldn-theme.cjs` are removed. Several custom properties, classes and JavaScript keys are renamed, including `container` → `surface`, `--grid-spacing-*` → `--grid-*`, `flow-prose`/`flow-product` → `flow-spacious`/`flow-standard`, and the typography set and scale names. See `MIGRATION.md` for the full list.

## 9.2.0

### Minor Changes

- 861cf62: CHANGED: Apply correct CSS variables to `form-label` class

### Patch Changes

- 5f02903: Update Interactive geo token value for better contrast

## 9.1.0

### Minor Changes

- 47c3895: Extends interactive-primary token set with -text to address color contrast issues in dark mode.
- af4d3bd: CHANGED: to styledictionary process updated to add flow to emitted styles.

## 9.0.0

### Major Changes

- e1e3928: CHANGED: update typography to use new approach from design system 3.1

## 8.0.0

### Major Changes

- 9269ac2: CHANGED: Update tokens to new design system

## 7.0.0

### Major Changes

- 09ba55a: CHANGED: update to use Svelte 5 and runes.

### Minor Changes

- a01e1a5: Updated defaults for container class padding

## 6.1.0-svelte5.0

### Minor Changes

- 0998f50: Updated defaults for container class padding

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
