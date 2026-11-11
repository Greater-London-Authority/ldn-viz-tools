# Suggested tests for the `@ldn-viz/maps` package

This document lists tests that would be useful additions to the `maps` package. It
was produced by reviewing the current test suite against the components and
logic modules that ship in `src/lib`. This package wraps MapLibre GL and
Deck.gl (map controls, layers, markers, popovers/tooltips, drawing tools,
geocoding), so almost everything eventually touches a `Map`/`mapStore` object;
the notes below call out where a plain mock object (as already used in
`MapCursor.test.js`) is enough, versus where a real browser-mounted component
is needed.

## Current state

The package currently has only a handful of tests:

| File                                              | What it covers                                                                                                                                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/themes/bounds.test.ts`                   | `centerOfBounds` midpoint calculation; `scaleBounds` for width-only, height-only, quadruple, and half-size scale factors                                                              |
| `src/lib/map/mapCursor/HandlerCollection.test.js` | `add`/`remove`/`clear` update `entries` and `layerIds` correctly; removing one of several entries removes only the matching one                                                       |
| `src/lib/map/mapCursor/MapCursor.test.js`         | `on`/`off` register/unregister the three underlying MapLibre listeners (`touchstart`/`mousemove`/`click`) via a call-count mock; `offLayer` does the same for all handlers of a layer |
| `src/index.test.ts`                               | Placeholder (`1 + 2 === 3`)                                                                                                                                                           |
| `src/routes/page.svelte.test.ts`                  | Demo route renders an `<h1>`                                                                                                                                                          |
| `tests/demo.test.ts`                              | Playwright smoke test (home page has an `<h1>`)                                                                                                                                       |

Notably, none of the existing `MapCursor.test.js` tests exercise the actual
cursor/feature-diffing logic described in the module's own docstring (the
enter/leave/click firing order) — only the registration bookkeeping. That
leaves roughly **48 `.svelte` components and ~14 logic modules** with no
behavioural coverage. The suggestions below are ordered by value-for-effort,
starting with pure-logic modules (fast, no DOM, high signal) and moving to
component behaviour and cross-cutting concerns.

Tests use `vitest` with `vitest-browser-svelte` (browser mode via Playwright/
chromium) for `*.svelte.test.ts` files, and plain `node` environment for
`*.test.ts`/`*.test.js` files. Pure-logic modules should be tested as
`*.test.ts` so they run in the fast server project; anything that mounts a
component or touches the DOM must be a `*.svelte.test.ts`.

---

## Tier 1 — Pure logic / utilities (fast, deterministic, highest ROI)

### `themes/animations.ts` → `animations.test.ts`

`easeOutQuad`/`easeOutQuart` are plain easing functions with no coverage.

- `easeOutQuad(0) === 0` and `easeOutQuad(1) === 1`.
- `easeOutQuart(0) === 0` and `easeOutQuart(1) === 1`.
- Both are monotonically increasing over `[0, 1]` (sample several points).
- `easeOutQuart` decelerates faster than `easeOutQuad` at the same `t` (documents why two easings exist for zoom vs glide/fly).

### `map/util.ts` → `util.test.ts`

`appendOSKeyToUrl` is a pure `transformRequest` factory, easy to pin down.

- For a non-`api.os.uk` host, returns `{ url }` unchanged (no `key`/`srs` appended).
- For `https://api.os.uk/...`, appends `srs=3857` and `key=<osKey>` as query params.
- Existing query parameters on an `api.os.uk` URL are preserved alongside the new ones.
- Returns a fresh factory function per call to `appendOSKeyToUrl(osKey)` (no shared mutable state between two different keys).

### `mapDraw/utils.ts` → `utils.test.ts`

`fixImportedGeoJSON` mutates an imported `FeatureCollection` in place and has several distinct branches worth pinning down individually.

- Assigns a new (valid, per `uuid4.valid`) id when a feature has no `id`.
- Assigns a new id when the existing `id` is not a valid UUID (e.g. a numeric or arbitrary string id), and leaves an already-valid UUID untouched.
- Creates an empty `properties` object when a feature has none.
- Defaults `properties.mode` to `'polygon'` only when not already set; an existing `mode` value is left untouched.
- For `Polygon` geometries, rounds every coordinate in the exterior ring to 9 decimal places.
- For non-`Polygon` geometries (e.g. `Point`, `LineString`), coordinates are left untouched (the rounding branch is `Polygon`-only — worth a regression test since it would be easy to assume all geometries are rounded).

### `mapControlLocationSearch/MapGeocoderAdapterMapBox.ts` → `MapGeocoderAdapterMapBox.test.ts`

The class wraps private URL-building/transform functions that are only reachable through its public methods, but are still pure enough to test with a mocked `global.fetch`.

- `setResultCount` clamps values `> 10` down to `10` and values `< 1` up to `1` (and logs a `console.warn` in both cases) — returns `this` for chaining.
- `search(text)` fetches a `suggest` URL containing the URL-encoded query text, the `session_token`, and a `bbox` derived from `GREATER_LONDON_BOUNDS_PADDED`; the resolved suggestions are mapped from `{ mapbox_id, name, place_formatted }` to `{ id, name, address }`.
- `retrieve(id)` fetches a `retrieve` URL for the given id and maps only the **first** feature in the response to `{ id, name, address, center }` (`center` taken from `geometry.coordinates`).
- `attribution()` returns the fixed MapBox attribution text/link.
- Constructing two adapters (or calling internal `resetSessionToken` twice) produces different session tokens (mock `crypto.randomUUID`).

### `mapControlLocationSearch/MapGeocoderAdapterOSPlaces.ts` → `MapGeocoderAdapterOSPlaces.test.ts`

- `search(text)` fetches a `find` URL containing `query`, `key`, `maxresults`, `dataset=LPI`, and a `bbox` derived from `GREATER_LONDON_BOUNDS_BNG_PADDED`.
- Transform logic: when a result has both `DPA` and `LPI`, `DPA` is preferred; when only `LPI` is present, it is used as a fallback.
- Returns `[]` when the response has no `results` key (documents defensive handling of malformed responses).
- Maps `{ UPRN, ADDRESS, LNG, LAT }` to `{ id, address, center: [LNG, LAT] }`.
- `retrieve(id)` resolves the matching entry from the **previous** `search()` call's results (it has no independent API call), and resolves `undefined` when there is no match — document this as current behaviour, since the commented-out rejection path shows it was previously intended to reject instead.
- `setResultCount` does **not** clamp its input (unlike the MapBox adapter) — worth a test that pins down this asymmetry so it isn't "fixed" by accident in one adapter but not the other.

### `mapControlLocationSearch/map-layer.ts` → `map-layer.test.ts`

Exported functions (`initMapLayer`, `setFeature`, `clearFeature`) take a MapLibre `Map` object and can be tested with a lightweight mock object in the same style as `MapCursor.test.js`'s `MockMap` (track calls to `addSource`/`addLayer`/`removeLayer`/`removeSource`/`getSource().setData`/`flyTo`/`fitBounds`, and stub `maplibre_gl.Marker`).

- `initMapLayer` is a no-op when passed a falsy `map`.
- `initMapLayer` removes any pre-existing layer/source with the same ids before re-adding them (idempotent re-initialisation).
- `setFeature` builds a `Point` feature when `location.center` is set without `bounds`, and a `Polygon` feature from `location.bounds` when present.
- `setFeature` calls `flyToCoords` (`map.flyTo`) when there are no bounds, and `flyToBounds` (`map.fitBounds`) when bounds are present; both merge `GLIDE_ANIMATION_OPTIONS`.
- Calling `setFeature` twice for the same `ref` removes the previous marker before adding the new one (only one marker per `ref` at a time).
- `clearFeature` removes the marker for `ref` and resets the source back to an empty `FeatureCollection`.
- `setFeature`/`clearFeature` are no-ops when passed a falsy `map`.

### `mapDeckPopovers/stores.ts` and `mapDeckTooltips/stores.ts` → `stores.test.ts`

Small but real store-mutation logic, cheap to pin down.

- `onClickPopoverHandler(ev)` sets `clickedFeature` to `ev.object` and `clickedLayer` to `ev.layer.id`.
- `onMouseOverTooltipHandler(ev)` sets `mousedOverObject` to `{ feature: ev.object, layer: { id: ev.layer.id } }`.
- Both stores are `undefined`/`''` before any handler has fired (initial store values).

### `isConstructor` (duplicated inline in `MapDeckPopovers.svelte` and `MapDeckTooltips.svelte`)

The same small predicate — `!!obj.prototype && !!obj.prototype.constructor.name` — is defined independently in both components to distinguish a Svelte component constructor from a plain string/function-as-formatter. It's a good candidate to extract into a shared, unit-testable utility (e.g. under `mapDeckPopovers/` or a shared `utils.ts`):

- Returns `true` for a class/component constructor.
- Returns `false` for a plain object literal.
- Returns `false` for a string.
- Returns `true`/`false` correctly for a plain arrow function vs. a `function` declaration, if both are meant to be treated as "formatter functions" rather than components (documents the boundary this predicate is actually drawing).

---

## Tier 2 — Component behaviour (browser tests)

Follow the existing `*.svelte.test.ts` pattern (`render` from
`vitest-browser-svelte`, assertions via `page.getBy*` and `expect.element`).
Most of these components read `mapStore`/`mapCursorStore` via `getContext`, so
tests will need to `render(Component, { context: new Map([...]) })` with a
mocked map/store object rather than a real MapLibre instance.

### `map/mapCursor/MapCursor.js` (extend existing coverage)

The existing test only counts `map.on`/`map.off` calls. The actual cursor
logic — the reason this module exists — has no coverage at all:

- Simulating a `mousemove` where `queryRenderedFeatures` returns a new feature fires `enterFeature` and `enterTopFeature` for it.
- Moving off a feature (next `queryRenderedFeatures` call returns `[]`) fires `leaveFeature` and `leaveTopFeature`.
- When the top feature changes from A to B in one move, `leaveTopFeature(A)` fires before `enterTopFeature(B)`.
- Moving between events for the _same_ feature (`featuresEqual` true) does **not** re-fire `enterTopFeature`/`leaveTopFeature`.
- `onClickMap` fires `clickMap` handlers first, then `clickFeature` for the current top feature (if any); no `clickFeature` fires when there is no active feature.
- `self.activeFeatures()` / `self.topFeature()` reflect the most recent `mousemove` result (`topFeature()` returns `null` when there are none).
- Re-entrant guards: a `mousemove` handler that is still "in flight" (`isHandlingMove`) ignores a nested call; likewise for `isHandlingClick`.
- `destroy()` clears handlers and nulls out the map reference so subsequent events are safely ignored.

### `map/mapCursor/HandlerCollection.js` (extend existing coverage)

- `findAll(eventType)` with no `layerId` returns all entries for that type; passing a `layerId` filters to matching entries only.
- `size()` reflects the number of unique layer ids across all event types, not the total entry count.
- `add` throws for an empty-string or non-string `layerId`, an unknown `eventType`, and a non-function `handler` (three distinct `Error` messages).
- Calling `add` twice with the same `eventType`/`layerId`/`handler` does not create a duplicate entry (the implicit `removeHandler` before `addHandler`).
- `layerIds` stays de-duplicated when the same `layerId` is registered under multiple event types.

### `MapControlZoom` / `MapControlPan` → `*.svelte.test.ts`

- Clicking zoom-in/zoom-out calls `$mapStore.zoomIn`/`zoomOut` with `ZOOM_ANIMATION_OPTIONS` (mock `mapStore` context).
- Clicking each pan direction button calls `$mapStore.panBy` with a vector derived from the mocked container's `getBoundingClientRect()` (14% of width/height, signed per direction) and `FLY_ANIMATION_OPTIONS` — pins down `calcMoveAmount`.
- Buttons are inert (no map calls) when `$mapStore` is falsy.
- A synthetic click with `event.detail > 0` (i.e. not a keyboard-triggered click) refocuses `$mapStore.getCanvas()` afterwards.

### `MapControlRefresh` → `MapControlRefresh.svelte.test.ts`

- Clicking the button calls `window.location.reload()` (mock `window.location`).

### `MapControlFullscreen` → `MapControlFullscreen.svelte.test.ts`

- When `isPageEmbedded()` is true (`window !== window.top`, mocked), uses `MODE_EMBED` — clicking navigates `window.top.location.href`.
- When not embedded and `document.fullscreenEnabled` is true, uses `MODE_API` — clicking toggles between `requestFullscreen`/`exitFullscreen` (mocked) and updates the `isFullscreen` store/icon/title accordingly.
- Renders nothing (no button) when neither embedding nor the Fullscreen API is available.
- A `fullscreenchange` event firing with no `document.fullscreenElement` resets `isFullscreen` to `false` even if the user pressed Esc/F11 rather than the button.

### `MapControlGroup` → `MapControlGroup.svelte.test.ts`

- Each value of `MapControlGroupPositions` renders its corresponding Tailwind position classes (e.g. `TopLeft` → `top-6 left-6`, `BottomCenter` → the centred bottom classes).
- Custom `classes` are appended alongside the position classes.

### `MapControlBorough` → `MapControlBorough.svelte.test.ts`

- The options list is sorted alphabetically by borough `label`, with a `'Show all of Greater London'` option first.
- Selecting `'GREATER LONDON'` calls `map.fitBounds(GREATER_LONDON_BOUNDS)`.
- Selecting a named borough calls `map.fitBounds` with that borough's `bounds` from `boroughs.json`.
- `selectedBorough` is bindable and defaults to `'London Borough of Barnet'`.

### `MapLegend` → `MapLegend.svelte.test.ts`

- Renders the "Legend" button (labelled `Show legend`) when `isOpen` is `false`; renders the panel and close button (labelled `Close legend`) when `true`.
- Clicking either button toggles the bound `isOpen` value.
- `width` is updated via `bind:clientWidth` when the panel is open.

### `MapLayerSource` / `MapLayerView` / `GeoJSONMapLayerSource` → `*.svelte.test.ts`

Core plumbing for every layer in the package; test against a mocked `mapStore`.

- `MapLayerSource`: on `$mapStore` becoming truthy, calls `addSource(id, safeSpec)` and sets the `mapLayerSourceLoaded` context store to `true`; `safeSpec` is a frozen clone of `spec` with `generateId: true` forced on.
- `onLoad`/`onUnload` callbacks receive `{ id, spec }`; unloading removes any layers whose id starts with `${id}/` before removing the source.
- `MapLayerView`: `doLoad` calls `$mapStore.addLayer(safeSpec, beforeId)` only once `mapLayerSourceLoaded` is true; `safeSpec.source`/`safeSpec.id` are populated from context.
- `MapLayerView` renders an internal `MapMarker` only when `tooltip` or `popup` is supplied.
- `GeoJSONMapLayerSource`: without a `url`, `onLoad` fires immediately with `initialData`; with a `url`, fetches, applies `transform`, updates the internal data store, then fires `onLoad` with the transformed GeoJSON.
- `GeoJSONMapLayerSource`: a fetch response with an `error` field, or a rejected fetch, calls `onError(err, ctx)` instead of `onLoad` (and logs via `console.error` when no `onError` is supplied).

### `MapDeckOverlay` → `MapDeckOverlay.svelte.test.ts`

- On `$mapStore` becoming available, constructs a `DeckOverlay` with `{ layers, interleaved: false, ...options }` and calls `$mapStore.addControl(deckOverlay, 'top-left')`.
- Changing the `layers` prop calls `deckOverlay.setProps({ layers })` without recreating the overlay.
- When `$mapStore` becomes falsy after being loaded, calls `$mapStore.removeControl(deckOverlay)`.

### `MapMarker` → `MapMarker.svelte.test.ts`

- Hovering a feature (`enterTopFeature`) with a `popup` configured sets the cursor to `'pointer'`; with only a `tooltip`, sets it to `'default'`.
- Hovering the same feature twice in a row does not re-mount the tooltip (`featuresEqual` short-circuit).
- Leaving the top feature (`leaveTopFeature`) resets the cursor and unmounts the tooltip.
- Clicking a feature mounts the `popup` component with `mapMarkerFeature`/`mapMarkerLayerId`/`mapMarkerMaplibrePopup` in context; clicking the _same_ feature again does not remount it.
- Clicking elsewhere on the map (`clickMap`) with a different feature than the current popup's removes the popup.
- `noCursorStyle` suppresses all cursor style changes.
- `featuresEqual` also matches on `cluster_id` when neither `id` nor `objectid` are present (clustered points) — worth a dedicated case since this differs from `MapCursor`'s own `featuresEqual`.

### `MapPopover` → `MapPopover.svelte.test.ts`

- Mounts `popup` into a MapLibre popup positioned at the feature's `centroid` on mount.
- Changing `feature` (or `popup`) unmounts the previous instance and mounts a new one.
- Unmounting the component removes the MapLibre popup and the mounted instance.

### `MapDrawControls` (via `MapDraw.svelte.test.ts`, exercising the exported control functions)

This is the richest piece of untested state-machine logic in the package — worth mocking `TerraDraw` and driving the exported `clickEdit`/`clickMode`/`clickSelect`/`clickClear`/`clickCancel`/`clickDone`/`clickUpload` functions directly.

- `clickEdit` moves `mapDraw.controlMode.current` to `'edit'`, selects `drawModes.mode.previous` if set (else the first enabled mode), snapshots `mapDraw.features.current` into `mapDraw.features.previous` as a JSON string, and calls `onStart()`.
- `clickMode(mode)` sets the TerraDraw mode and records it as both `.selected` and `.previous`.
- `clickClear` clears TerraDraw, resets the snapshot from `terraDraw.getSnapshot()`, and reverts `.selected` to `.previous`.
- `clickCancel` restores `mapDraw.features.current` from the JSON snapshot taken in `clickEdit`, re-adds those features to TerraDraw, sets mode back to `'default'`, and calls `onCancel()`.
- `clickDone` sets TerraDraw to `'render'` mode, sets `controlMode.current` back to `'default'`, calls `onDone(mapDraw.features.current)`, and copies `.current` into `.saved`.
- `clickUpload` switches to `'select'` mode and sets `controlMode.current` to `'upload'` (renders `FileUpload` instead of the draw controls).
- The "Select"/"Clear all" buttons are `disabled` when there are no current features; "Upload"/"Download" only render according to the `uploadDownload` tuple.

### `FileUpload` → `FileUpload.svelte.test.ts`

- Dropping or selecting a file whose name does not end in `.geojson` is ignored (`readFile` is never called).
- A valid `.geojson` drop/selection parses the file, runs `fixImportedGeoJSON`, calls `terraDraw.addFeatures`, and moves `upload.state` to `'success'`.
- Malformed JSON moves `upload.state` to `'error'` (and logs via `console.error`) without touching TerraDraw.
- Dragging a file over the drop zone sets/unsets the `isDragging` highlight class on `dragenter`/`dragleave`/`drop`.
- Pressing Enter/Space while the drop zone is focused opens the file picker (`inputRef.click()`).
- Clicking "Cancel" restores `mapDraw.features.current` from `upload.previousFeatures` and re-populates TerraDraw; clicking "Add area" (disabled until `state === 'success'`) calls `onLoad` and sets `controlMode.current` back to `'edit'`.

### `mapDraw/MapDrawState.svelte.ts` (`Modes`, `MapDraw` classes) → `MapDrawState.svelte.test.ts`

- Setting `Modes.enabled` also updates `.options` to the same array.
- `Modes.modes` always appends the `select` and `render` mode instances after the mapped `enabled` modes, in that order.
- `MapDraw`'s default state: `controlMode.current === 'default'`, and `features` is `{ current: [], saved: [], previous: '' }`.

### `Map.svelte` → `Map.svelte.test.ts` (mock `mode-watcher`'s `mode`, disable actual MapLibre init via `disabled`)

Targets the internal `identifyStyle` logic by asserting the `style` ultimately forwarded to `MapLibre`:

- `lightStyle`/`darkStyle` both `null` → falls back to `theme_os_light_vts`.
- Only `darkStyle` set → always uses it, regardless of `mode.current`.
- Only `lightStyle` set → always uses it, regardless of `mode.current`.
- Both set → picks `darkStyle` when `mode.current === 'dark'`, `lightStyle` otherwise.
- `mapStore`/`mapCursorStore` bindable props: when not supplied, the component creates its own writable stores and sets them into context under `'mapStore'`/`'mapCursorStore'`.

### `MapCursorEvent` → `MapCursorEvent.svelte.test.ts`

- While both `$mapStore` and `$mapCursorStore` are set, registers each supplied handler (`enterFeature`, `leaveFeature`, `enterTopFeature`, `leaveTopFeature`, `clickMap`, `clickFeature`) against `layerId` via `mapCursorStore.on`.
- Handlers left as `null` are not registered.
- When either store becomes falsy, or on component destroy, calls `mapCursorStore.offLayer(layerId)`.

---

## Tier 3 — Cross-cutting & accessibility

- **Context wiring**: several components (`MapControlZoom`, `MapControlPan`, `MapLayerSource`, `MapDeckOverlay`, `MapMarker`, …) assume they are rendered inside a `<Map>` and read `getContext('mapStore')` at the top level of `<script>`. A shared test helper that renders a component inside a minimal `Map`-shaped context (writable store + mocked map object) would remove a lot of duplication across the Tier 2 suggestions above and is worth building once, early.
- **Theme/dark-mode**: `Map.svelte`'s style selection and `mapDraw/MapDrawState.svelte.ts`'s `themeStyle` (via `theme.tokenNameToValue`) both branch on the current theme; verify both light and dark render without throwing and pick the expected colours/styles.
- **Accessibility**: `MapLegend`'s show/hide buttons have distinct `aria-label`s worth asserting directly; `FileUpload`'s drop zone (`role="button"`, `tabindex="0"`, `aria-describedby`) should be keyboard-operable (Enter/Space); the various square icon buttons (`MapControlZoom`, `MapControlPan`, `MapControlFullscreen`, `MapControlRefresh`) rely on their `title` attribute as the only accessible name — worth confirming this resolves to a sensible accessible name via the accessibility tree, not just the DOM attribute.
- **SSR/no-map safety**: most control components silently no-op when `$mapStore` is falsy (`if (!$mapStore) return`); a shared test across `MapControlZoom`/`MapControlPan`/`MapControlBorough`/`MapControlFullscreen` confirming they render without throwing and don't call any map methods before the map is ready would catch a common class of regression cheaply.
- **Animation options**: `ZOOM_ANIMATION_OPTIONS`/`GLIDE_ANIMATION_OPTIONS`/`FLY_ANIMATION_OPTIONS` are spread into various MapLibre calls (`zoomIn`, `panBy`, `flyTo`, `fitBounds`, `easeTo`). A single test per animation-options constant asserting its shape (`animate`, `duration`, `easing` are the right type) would catch accidental breakage without needing per-caller duration assertions.

---

## Housekeeping (not new coverage, but worth doing)

- Remove or replace the placeholder `src/index.test.ts` (`1 + 2 === 3`) — it provides no signal.
- The existing `MapCursor.test.js` tests only assert `map.on`/`map.off` call counts; they do not exercise any of the enter/leave/click feature logic that the module's docstring describes as its whole purpose. This is the single highest-value gap to close (see Tier 2 above).
- Consider whether `tests/demo.test.ts` and `src/routes/page.svelte.test.ts` (both demo-route smoke tests) should remain or be replaced with a test that renders a real exported component (e.g. `<Map disabled>` plus a control) so a build-breaking regression in the package's public API is caught.
- Add a coverage target/report (`test:coverage` script already exists) so gaps are visible over time.

---

## Notable gaps not itemised above

The following areas ship real logic or substantial component trees with no
tests and are worth scoping separately if time allows:

- `mapMarker/elements/mapMarkerFlyToFeature/MapMarkerFlyToFeature.svelte`'s module-scope `findFlyPoint`/`findElementHeight` functions contain real geometry/DOM-measurement logic (computing where to re-center the map so a marker's content fits on screen) but are not exported, so they can currently only be exercised indirectly by mounting the component with a mocked map/container. Extracting them to a plain, exported module would make them Tier-1-testable and is worth doing alongside adding coverage.
- `mapMarker/elements/mapMarkerPlacement/PlacementCenterAboveFeature.svelte` and `PlacementFollowMouse.svelte` — positioning logic driven by `getContext('mapMarkerFeature'/'mapMarkerMaplibrePopup'/'mapStore')` and `@turf/turf`'s `pointOnFeature`; would need a mocked map/context to test the "follow mouse" vs "static point on feature" behaviours.
- `mapControlLocationSearch/MapControlGeocoder.svelte` / `MapControlGeolocator.svelte` / `MapControlLocationSearch.svelte` largely delegate to `@ldn-viz/ui`'s `Geocoder`/`Geolocator`/`GeocoderSuggestionList`; the maps-specific behaviour worth testing here is the glue (`setFeature`/`clearFeature` calls on selection/clear, the `showClearButton` effect), already covered indirectly by the `map-layer.ts` suggestions above.
- `mapDeckTooltips/MapDeckTooltips.svelte`'s floating-ui positioning (`createFloatingActions`, `arrow` middleware, `onComputed` static-side calculation) is display logic that would need real DOM measurement via a browser test; lower priority than the `isConstructor`/store logic already itemised.
- `mapContextLayers/boroughsContextLayer/BoroughsContextLayer.svelte` and the `os_*.json` theme style files are largely static configuration; a schema/shape check (e.g. that each `os_*.json` is a minimally valid MapLibre style) would be low-effort insurance but isn't behavioural logic.
- `mapControlBorough/boroughs.json` — a data file, not logic, but `MapControlBorough`'s reliance on every entry having `properties.name`/`properties.borough`/`bounds` means a "shape of `boroughs.json`" smoke test could catch a corrupted data update independently of the component test suggested above.
