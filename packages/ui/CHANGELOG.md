# ldn-viz-tools-ui

## 9.2.0

### Minor Changes

- c13d8c5: CHANGED: the `PlaceholderImage` component now contains a small fixed-size icon within a container. It no longer accepts props to control its styling.
- 7472916: ADDED: Add `Form` component for creating forms containing fields and buttons.
  ADDED: Add `FormField` component for slotted use exclusively within `Form`.
  ADDED: Add `AsyncButton` component as a base for some async and slow processing form buttons.
  ADDED: Add `FormSubmitButton` component for slotted use exclusively within `Form`.
- 6fdd818: ADDED: Add `SchemaForm` component for creating a `Form` from schema.
  ADDED: Add `SchemaFormField` (internal) used by `SchemaForm` that renders both library and custom input types.
- 5ac83d9: ADDED: Add `UniformInput` component as a single component (API) encapsulating all input components.

### Patch Changes

- 4c430cd: FIXED: fix styling of `Input` element when `type='range'`
- 5094d7d: CHANGED: fix errors that occured when using components in non-secure context without specifying an id
- 1a37060: CHANGED: update `Switch` component to add control of size, and which size label is displayed on

## 9.1.1

### Patch Changes

- 71f1f62: FIXED: `AnalyticsAndCookieConsent` component that when embedded due to tighter main website polices.

## 9.1.0

### Minor Changes

- d23b8b7: FIXED: update visual appearance of `CheckboxGroup` component when bound `selectedOptions` prop is externally updated

## 9.0.1

### Patch Changes

- 6493853: FIXED: include `@turf/turf` as a dependency (rather than devDependency) of `@ldn-viz/maps`, to resolve import error when package is used

## 9.0.0

### Major Changes

- ffffac0: CHANGED: rename the `ColorLegendOrdinalHorizontal` component to `ColorLegendOrdinalChips`, and allos `orientation` to be set to `vertical`

### Minor Changes

- ae07a91: FIXED: fix highlighting in `NavLink` component.
- bcf8773: FIXED: fix location searching on mobile devices in `Geolocator` component.
  ADDED: add modal popup when `Geolocator` component error occurs.
  ADDED: add reactive props to `Geolocator` component that communicate its changing state.
- 129cf32: CHANGED: increased z-index for geolocation suggestions so it sits above sidebar.
- 628ae2c: ADDED - add a `MergeValuesControl` that allows users to define how different values of a categorical variable should be merged into new categories
- e4fc1dc: CHANGED: make text in `SidebarTabLabel` component non-selectable.
- 8d57614: ADDED: added `Popover` component as an alternative to `Modal` and `Tooltip`
- 7ded8e8: ADDED: add a new `<Switch>` component
- 12f8b2a: CHANGED: unfix `SidebarHeader` component so it scrolls with other sidebar content.

### Patch Changes

- c0814a6: CHANGED: Fix an issue in `<AnalyticsAndCookieConsent>` where an application embedded in a non-london.gov.uk website wouldn't load cookie consent properly.
  CHANGED: Move general comments in `<AnalyticsAndCookieConsent>` to Svelte module script as comments in head tag scripts are not stripped by the Svelte compiler.
  CHANGED: Optimised code in `<AnalyticsAndCookieConsent>` to be more concise and readable.

## 8.0.0

### Major Changes

- 7b19981: CHANGED: update `Input` to allow textarea type.
  CHANGED: update `Input` to pass `$restProps` to the input element to account for differences in properties for different input types.
  CHANGED: update `Input` to export the bindable input element value.
  CHANGED: update `Input` to allow a format value function to be passed that formats the value when unfocusing the input.
  CHANGED: update `InputWrapper` to allow tooltip hints in the label.
  CHANGED: update `Input` and `InputWrapper` with aria and accessibility attributes.
  CHANGED: update `Select` with `InputWrapper` changes.
  CHANGED: changed props relating to tooltips - removed boolean `hint` prop, renamed `hintTooltipContent` -> `hint`, renamed `hintText` -> `hintLabel`
- 11aac47: CHANGED: removed `hasError` prop from `Select` component

### Minor Changes

- 7b19981: CHANGED: allow tooltips to be added to `Checkbox` and `CheckboxGroup`.
- 7b19981: ADDED: `<AnalyticsAndCookieConsent />` that adds analytics and cookie consent to a page.
- 7b19981: ADDED: `CopyButton` that copies content to clipboard on click.
- 7b19981: CHANGED: changed alignment of help icon in `Tooltip` trigger
- 7b19981: CHANGED: Increase Tooltip component text size for accessibility.
- 7b19981: ADD: PageMetadata component providing OpenGraph and other head tag info.
- 7b19981: ADDED: `PlaceholderImage` component to show while waiting for the real image to load or where an image is expected but not available.
- 7b19981: CHANGED: add optional `name` prop to `Checkbox` and to `options` props of `CheckboxGroup` so their values can be included with form submissions.

### Patch Changes

- 7b19981: CHANGED: added key to `#each` in `CheckboxGroup` to avoid checkboxes being duplicated if options changes.

## 7.0.0

### Major Changes

- 1b13246: CHANGED `NavLink` and `HeaderTitle` to receive SvelteKit stores as props rather than importing directly

## 6.0.0

### Major Changes

- a1c1c84: CHANGED - sidebar elements now accept `SidebarHint` component as a slot

### Minor Changes

- de6bfb2: ADDED `MapControlGeocoder`, `MapControlGeolocator`, and `MapControlLocationSearch` components to `@ldn-viz/maps`

  ADDED `Geocoder`, `Geolocator`, and `GeocoderSuggestionList` components to `@ldn-viz/ui`

- 47613aa: CHANGED - `AppShell` waits for innerWidth to be available before showing sidebar, to avoid an initial flash of incorrect layout

## 5.2.0

### Minor Changes

- c703bb6: CHANGED - specify Svelte version as a range rather than pinning specific version.

## 5.1.0

### Minor Changes

- 94a96f2: Fixes sidebar modal after Modal component update. Fixes docs after switch to index.ts
- 702f0f3: CHANGED - updates to sidebar following initial use feedback

## 5.0.0

### Major Changes

- 2049d5b: CHANGED - modify `Modal` component to use `@melt-ui/svelte-ui` rather than `@rgossiaux/svelte-headlessui`. The `isOpen` prop is now a store rather than a Boolean.

### Minor Changes

- 71a6bb4: CHANGED - modify appearance of the `Header` component (make background darker, and blue brand flash wider).

## 4.1.0

### Minor Changes

- cb2d96f: ADDED - export the `Tooltip` component.

## 4.0.0

### Major Changes

- 4192681: ADDED - `AppShell` and `Sidebar` components.
- 4192681: CHANGED - increased z-index of `Modal`.
- 4192681: CHANGED - `TabList` component now accpts an `orientation` prop.
- 4192681: REMOVED - `TabbedSidebar` component (and `TabbedSidebarTabLabel`, `TabbedSidebarTabList`, `TabbedSidebarWrapper`)

## 3.6.1

### Patch Changes

- 258bed8: FIXED List dependencies for `ColorLegend` component.

## 3.6.0

### Minor Changes

- 030c002: ADDED `Toaster` component for toast messages
  ADDED `newToastMessage` creating and posting toasts

### Patch Changes

- 74db575: CHANGE checkbox - set name attribute on generated input element

## 3.5.1

### Patch Changes

- 4fbbae0: FIXED: `ColorLegend` component now correctly updates when domain of threshold scale is updated

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
