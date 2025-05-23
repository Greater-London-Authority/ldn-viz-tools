# ldn-viz-tools-maps

## 7.5.0

### Minor Changes

- 96ef243: FIXED: reduced the z-index of the `MapPopover`, so it appears behind a modal or sidebar.

## 7.4.0

### Minor Changes

- 41d345f: CHANGED: Steps down mid button size (40px) to match height of input elements.
  CHANGED: Adds borders and shadows to tooltips/popovers and improves contrast of overlay components - especially relevant in map context

## 7.3.0

### Minor Changes

- f952670: Accessibility: updated `Geolocator` component to announce state change and use `LoadingIndicator`

## 7.2.0

### Minor Changes

- 40410d8: CHANGED: the `MapPopover` now accept a `layer` prop

## 7.1.0

### Minor Changes

- 1610465: CHANGED: `Geocoder`, `MapControlGeocoder`, and `MapControlLocationSearch` accept a callback function to call when the user clears the search box
- d344f2c: CHANGED: Update to design tokens for color A11y. Component classes updated where neccesary. Button component api deprected 'condition' prop - now uses extended 'emphasis' options. Changes also reflected in Figma file

### Patch Changes

- ddb1dfc: CHANGED: shift position of `MapControlGroup` upwards if position is `BottomLeft`/`BottomCenter`/`BottomRight`, to avoid overlap with attribution statement

## 7.0.0

### Major Changes

- 677ca8d: CHANGED: refactored `Map` by splitting out core MapLibre stuff to `MapLibre` internal component.
  CHANGED: updated `Map` to accept light and dark base map styles and toggle them based on theme mode.
  CHANGED: removed `classes` property from `map`, pass classes as `class` attribute instead.

## 6.0.1

### Patch Changes

- 1184aa1: CHANGED: updated year in map copyright statement to 2025

## 6.0.0

### Major Changes

- 530d8de: REMOVED: removed `MappApp` component, which was replaced by `AppShell`

### Minor Changes

- 60ee6e5: CHANGED: add types to `MapControlZoom` component

### Patch Changes

- 6dc5105: Housekeeping: squash console warnings in storybook from unused props

## 5.3.0

### Minor Changes

- 77d6d14: ADDED: added `MapDeckOverlay` component

## 5.2.0

### Minor Changes

- e42e0fe: CHANGED: allow custom placeholder text in `Geocoder`, `MapControlGeocoder` and `MapControlLocationSearch` components

## 5.1.0

### Minor Changes

- 1f94ca5: FIXED: `GeoJSONFeature` to `GeoJSON.Feature` in `MapCursorEvent` for correct typing of `handlerArgTypes`

## 5.0.0

### Major Changes

- ae67f11: ADDED: `dataStore` prop to `GeoJSONMapLayerSource` for two way reactivity
  CHANGED: rename `data` prop to `initialData` in `GeoJSONMapLayerSource`

## 4.0.1

### Patch Changes

- 69686cf: FIXED: adds missing `@ldn-viz/util` dependency to `package.json` of `maps`, `ui`, and `charts` packages.

## 4.0.0

### Major Changes

- 9f1adf7: CHANGED: change how we handle color tokens

## 3.2.0

### Minor Changes

- cac8844: CHANGED: `BoroughsContextLayer` Storybook stories are now reactive to argument changes.

## 3.1.0

### Minor Changes

- edf2d78: ADDED: Add `MapControlBorough` component to zoom to a selected borough

## 3.0.2

### Patch Changes

- b04b40f: FIXED: fix `<MapControlGeolocator>` so the pin can be cleared as intended
- 9658b8c: CHANGED: Improved stories for `<MapControlGroup>` so they use the real `<MapControlLocationSearch>` rather than a dummy.

## 3.0.1

### Patch Changes

- f9bdc5b: FIXED: include `@turf/turf` as a dependency (rather than devDependency) of `@ldn-viz/maps`, to resolve import error when package is used

## 3.0.0

### Major Changes

- b9a6199: CHANGED: add TypeScript to `Map` component
  CHANGED: rename `map` context to `mapStore` in `Map` component
  CHANGED: add framework for map mouse and touch events to `Map` component (`MapCursor`)
  CHANGED: add `mapCursorStore` context to `Map` component
  CHANGED: add `mapStore` and `mapCursorStore` properties to `Map` component

### Minor Changes

- 1ef0fbb: ADDED: `BoroughsContextLayer` component as a context layer for borough boundaries.
- 03e8fda: ADDED: add `MapCursorEvent` component
- 76cfe28: ADDED: `MapLayerSource` component for specifying MapLibre data sources within a `<Map>`.
  ADDED: `GeoJSONMapLayerSource` component for wrapping `MapLayerSource` for specifying local or remote GeoJSON sources.
  ADDED: `MapLayerView` component for specifying MapLibre layers within a `<MapLayerSource>` or derived component.
- 45ff3ad: ADDED: `MapPopup` component for creating map tooltips and markers.
  ADDED: `MapPopupContainer` container component as the standard container for creating tooltips and markers.
  ADDED: `MapPopupStyledContainer` container component provides standard styling for tooltips and markers.
  ADDED: `MapPopupFlyToFeature` container component flys to a tooltip or marker and centers it on screen.
  ADDED: `MapPopupPlacement` container component provides various ways to layout and position a tooltip or marker.
  ADDED: `PlacementCenterAboveFeature` container component places a tooltip or marker such that the tip is in the center of the feature.
  ADDED: `PlacementFollowMouse` container component places a tooltip or marker such that it follows the users mouse movement.
- 03e8fda: CHANGED: add test data to map stories.

## 2.1.0

### Minor Changes

- 7b19981: CHANGED: determine left/right/center alignment on contents of `MapControlGroup` based on whether it is positioned to the Left/Rght/Center.

## 2.0.0

### Major Changes

- 2c164cf: CHANGED - map themes are now imported as objects directly from `@ldn-viz/maps`, rather than being imported as JSON files from `@ldn-viz/maps/themes`

### Minor Changes

- de6bfb2: ADDED `MapControlGeocoder`, `MapControlGeolocator`, and `MapControlLocationSearch` components to `@ldn-viz/maps`

  ADDED `Geocoder`, `Geolocator`, and `GeocoderSuggestionList` components to `@ldn-viz/ui`

## 1.4.0

### Minor Changes

- c703bb6: CHANGED - specify Svelte version as a range rather than pinning specific version.

## 1.3.0

### Minor Changes

- ae498d9: FIX - export of styles

## 1.2.0

### Minor Changes

- 35cdb77: adds index files to routes (stops warnings) adds tailwind to maps

### Patch Changes

- 55c3237: Fixes map sometimes failing to resize when container resizes.

## 1.1.0

### Minor Changes

- 40031d8: ADDED - added `MapControlFullscreen` component
  ADDED - added `MapControlGroup` component
  ADDED - added `MapControlPan` component
  ADDED - added `MapControlRefresh` component
  ADDED - added `MapControlZoom` component
  ADDED - added `animations` file for sharing MapLibre animation options

## 1.0.0

### Major Changes

- 0651ebb: CHANGED - update from Svelte 3 to Svelte 4 and update Storybook

## 0.1.1

### Patch Changes

- e7698cd: fix typo in README (charts -> maps)

## 0.1.0

### Minor Changes

- 750d139: expose the style files from maps package

## 0.0.3

### Patch Changes

- db4714c: Replace boilerplate README files

## 0.0.2

### Patch Changes

- ed854f2: Initial release

## 0.0.2

### Patch Changes

- Do initial release.
