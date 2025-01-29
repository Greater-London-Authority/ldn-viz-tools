# ldn-viz-tools-ui

## 15.3.0

### Minor Changes

- 028ad2f: ADDED: `randomId` generator to `@ldn-viz/ui` exports
- 4556f05: ADDED: ARIA label to `Callout` component for accessibility
- f5de052: FIXED: updated `Checkbox` component to use explicit input labels to fix duplicate announcements by screen reader
- 7487cd8: FIXED: accessibility issues in `MultipleActionButton` component
  ADDED: pass Melt-UI actions down to `Button` component for proper ARIA semantics
- 028ad2f: Add currentTheme store to ui package and use in chart examples. Implement accessibility improvements in charts and illustrate withc line chart example

### Patch Changes

- 7dc2bfb: Added alt text to logo components
- Updated dependencies [5c06c36]
- Updated dependencies [0ea3bc4]
  - @ldn-viz/utils@1.1.0

## 15.2.2

### Patch Changes

- 33ce5a9: CHANGED: made color chip in `LayerControl` round by applying `rounded-full` class
- d588473: CHANGED: removed hard-coded border color of "Show all" checkbox for `LayerControlGroup`

## 15.2.1

### Patch Changes

- bcb194c: FIXED: increase z-index of Popover to ensure it renders above sidebar

## 15.2.0

### Minor Changes

- c145cf7: CHANGED: `ColorLegend` now accepts a `reverse` prop, allowing the direction of the legend to flipped left-right
- c08ce0a: ADDED: as an alternative to providing `DataDownloadButton` with a prop containing `data`, you can provide a function
  that returns an array of data
- 5f566bc: CHANGED: switch from `html2canvas` to `html-to-image` in the `ImageDownloadButton`
- c1d600c: CHANGED: changed the appearance of the `LayerControl` and its sub-controls (`OpacityControl`, `ColorPicker`, `ResizeControl`)
- 0056c95: CHANGED: use `Popover` component in `ColorPicker`/`OpacityControl`/`ResizeControl`, rather than duplicating implementation

### Patch Changes

- 7d12227: FIXED: use `<button>` element rather than `<div>` for some clickable elements
- 2e42c23: FIXED: prevent Chrome drawing a second clear icon in `Geocoder` when used in a map
- 721774d: FIXED: include `name` in the `id` of `RadioButtonSolid`, preventing interference with different
  `RadioButtonGroupSolid`s that include options with the same `id`.

## 15.1.0

### Minor Changes

- 1c134d6: ADDED: add `Callout` component
- a3726bf: FIXED: allow `value` of an option in the `Select` component to be an empty string.
- 4e4f7c5: FIXED: increase z-index of popover controls in `LayerControl` component so that they do not open behind sidebars
- 0313649: ADDED: add `addMultipleEventHandlers` function for registering multiple event handlers to the same Observable Plot mark(s)
- 09fa609: FIXED: avoid unnecessary re-renders of the plot within `ObservablePlotInner`

### Patch Changes

- 6dc5105: Housekeeping: squash console warnongs in storybook from unsed props
- e397e35: FIXED: fix spacing between `RadioButton`s and `Checkbox`es when inside a `SidebarSection`
- 68780ea: FIXED: fix bug that caused `AppShell` to always acts as if the `startOpen` prop was `false`

## 15.0.0

### Major Changes

- a6dca7f: CHANGED: change the interface of the `LayerControlGroup` to separate the fixed configuration of the layers and their current state
  CHANGED: rename the `helpText` prop on the `LayerControl` to `hint` for consistency with other components

## 14.9.0

### Minor Changes

- aa341ff: ADDED: added `LayerControlGroup` component
  CHANGED: `LayerControl` now supports a `disabled` state

### Patch Changes

- 7aeb3b0: FIXED: updated `AnalyticsAndCookieConsent` and `CookieControlSettings` components to avoid errors if they are rendered
  before `window.CookieControl` is initialized

## 14.8.1

### Patch Changes

- 89b89e0: FIXED: correctly set file names of downloaded data and image files

## 14.8.0

### Minor Changes

- f51bc23: ADDED: `RadioButtonGroup` component now accepts an `orientation` prop

## 14.7.0

### Minor Changes

- 3dea9ca: ADDED: `RadioButtonGroup` component now accepts an `orientation` prop

## 14.6.1

### Patch Changes

- 5d77717: CHANGED: wrap entries in the `CurrentLengendOrginalChips` when width of parent container is too narrow to fit them
- 471c1cf: FIXED hintLabel prop is now optional

## 14.6.0

### Minor Changes

- ebd6a57: ADDED: added a `LayerControl` component
- 3d9026c: CHANGED: pinned the @steeze-ui/svelte-icon dependency to exactly 1.5.0, as subsequent versions are incompatible with Svelte 4

## 14.5.0

### Minor Changes

- ba7c31c: FIXED: fixed issue with content disappearing behind sidebar when screen size reduced

## 14.4.0

### Minor Changes

- e4b3ff7: ADDED: `Button` now has a prop to specify link should be opened in a new tab
- e62fd68: CHANGED: when using the `RadioButtonGroup`, the `color` attribute for options is now optional
- 0050885: CHANGED: the `isOpen` store on the `AppShell` component can now be externally updated to open or close the sidebar

## 14.3.0

### Minor Changes

- e42e0fe: CHANGED: allow custom placeholder text in `Geocoder`, `MapControlGeocoder` and `MapControlLocationSearch` components

## 14.2.0

### Minor Changes

- 5472861: CHANGED: update highlighting of tab icons inside a `TabList` or `SidebarTabList` when the selected item is changed externally

## 14.1.0

### Minor Changes

- 40c49a5: CHANGED: Header and Modal Header are now themed dark as default, but this can be overridden with a prop

### Patch Changes

- 9f5ab57: MINOR: fixed use of MultiActionButton props form ImageDownloadButton and DataDownloadButton.

## 14.0.0

### Major Changes

- 09e55ec: ADDED: added `MultipleActionButton` that allows user to select the nature of the operation that will be triggered when they click on the button
  CHANGED: the `ImageDownloadButton` amd `DataDownloadButton` now use the `MultipleActionButton` - rather than accepting a single file format as a prop, they accept an array containing a list of file formats from which the user can choose

### Minor Changes

- 38ac6b1: CHANGED: `Geocoder` selected location now appears as query text on selection.
  CHANGED: adds reactively updating `selected` property to `Geocoder`.
  CHANGED: `GeocoderSuggestionList` now highlights the currently selected item when the list is reopened.
- fc08482: CHANGED: `<Input>` to add explicit `placeholder` prop.
- f11222c: CHANGED: Allows custom event to be passed to sidebarTabLabel

## 13.0.0

### Major Changes

- b55dab9: CHANGED: moved `userThemeSelectionStore` and `currentThemeMode` from `theme` package to `ui` package

## 12.0.0

### Major Changes

- bfad1da: CHANGED: Move `userPreference` from `utils` package to `ui` package

### Patch Changes

- Updated dependencies [bfad1da]
  - @ldn-viz/utils@1.0.0

## 11.0.1

### Patch Changes

- 69686cf: FIXED: adds missing `@ldn-viz/util` dependency to `package.json` of `maps`, `ui`, and `charts` packages.

## 11.0.0

### Major Changes

- 9f1adf7: CHANGED: change how we handle color tokens

### Minor Changes

- 9f1adf7: ADDED: add `Theme` and `ThemeSwitcher` components

### Patch Changes

- 881aa44: fix text color of input when disabled

## 10.1.0

### Minor Changes

- 35eeb55: ADDED: adds `AsyncButton` that wraps `Button` for asynchronous operations.
- af5c364: CHANGED: `Select` now correctly sets `justValue` prop when `multiple` is enabled
- 1ce5711: ADDED: adds `FormBackButton` for consistent easy to use back button on multipage forms.
- 773cbee: FIXED: Reinstate select chevron
- b52a596: FIXED: correct vertical spacing for `InputGroup` and `CheckboxGroup`
- 3ce331e: CHANGED: changes hint icons to be mini theme

## 10.0.0

### Major Changes

- 8fc59bf: CHANGEE: removed some props from the Select componennt, and renamed two: `labelField` -> `itemLabelField`, `itemId` -> `itemValueField`

### Minor Changes

- 56370a9: ADDED: add `CookieControlSettings` and `PrivacyPolicyLink` components
- 6ce827e: CHANGED: simplify the `MergeValuesControl` component.
- 82b10d8: ADDED: `Flag` component for displaying banner messages (e.g. to indicate that a site is in beta)
- 4da0c67: CHANGED: the `<SidebarSection>` component can now accept a `<SidebarSectionTitle>` component inside the `title` slot.
- d24b4c4: CHANGED: `RadioButtons` now accept a `hint` and `hintLabel` prop (like the `Checkbox` component)

### Patch Changes

- 09410e2: FIXED: fix alignment of tooltip trigger button
- 281c4e0: CHANGED: the default hintLabel for an input is now "what is this?" (rather than an empty string)

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
