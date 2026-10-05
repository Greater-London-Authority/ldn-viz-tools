# Suggested tests for the `@ldn-viz/charts` package

This document lists tests that would be useful additions to the `charts`
package. It was produced by reviewing the current test suite against the
components and logic modules that ship in `src/lib` and `src/data`.

## Current state

| File                                                        | What it covers                                                                                                                                              |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/observablePlotFragments/preprocessOptions.test.ts` | Thorough: mark-per-datum creation, `filter`, static `options`, function-valued `dy`/`textAnchor`, `optionsToEval`, combinations, empty data, missing config |
| `src/lib/chartContainer/ChartContainer.svelte.test.ts`      | Title/subtitle/source/byline render into `#captureElement`; `alt` renders into `.sr-only`; export buttons show/hide via `imageDownloadButton`               |
| `src/routes/page.svelte.test.ts`                            | Demo route renders an `<h1>` (placeholder)                                                                                                                  |
| `tests/demo.test.ts`                                        | Playwright smoke test (home page has an `<h1>`)                                                                                                             |

There is no `src/index.test.ts` in this package (unlike `ui`), so there is no
placeholder file to clean up there.

That leaves the bulk of the package's actual chart-building logic —
`observablePlotFragments.ts`, `plot.ts`, `ObservablePlot.svelte`/
`ObservablePlotInner.svelte` (tooltip wiring, resize handling), `ExportBtns.svelte`,
`Footer.svelte`, `Title.svelte`, `SubTitle.svelte` — with **no coverage at all**.
`preprocessOptions` is already well tested; `ChartContainer` has good prop-driven
render coverage but no interaction/accessibility tests. The suggestions below
are ordered by value-for-effort, starting with pure-logic modules (fast, no DOM,
high signal) and moving to component behaviour and cross-cutting concerns.

Tests use `vitest` with `vitest-browser-svelte` (browser mode via Playwright/
chromium) for `*.svelte.test.ts` files, and plain `node` environment for
`*.test.ts` files. Pure-logic modules should be tested as `*.test.ts` so they
run in the fast server project; anything that mounts a component or touches the
DOM must be a `*.svelte.test.ts`.

---

## Tier 1 — Pure logic / utilities (fast, deterministic, highest ROI)

### `observablePlotFragments/observablePlotFragments.ts` → `observablePlotFragments.test.ts`

This module has no tests at all, despite containing the default styling logic
that every chart in the package depends on.

- `getDefaultPlotStyles()` returns an object with one entry per key in
  `defaultPlotStyleFunctions`, each resolved by calling the corresponding
  function (i.e. it is not returning the functions themselves).
- Each `default*` value that calls `theme.tokenNameToValue(...)` (`defaultStyle`,
  `defaultGridX`/`defaultGridY`, `defaultLine`, `defaultDot`, `defaultPoint`,
  `defaultArea`, `defaultRule`, `defaultTip`, `defaultAnnotationTip`,
  `defaultAnnotationText`, `defaultAnnotationRange`, `defaultBar`,
  `defaultRect`) resolves to a value derived from the current theme (mock
  `theme.tokenNameToValue` and assert it's called with the documented token
  names, e.g. `'chart.label'`, `'chart.background'`, `'data.primary'`).
- `defaultDashedLine` documents a latent bug: it spreads `defaultLine` (the
  _function_, not `defaultLine()`) into an object, so `stroke`/`strokeWidth`
  are never actually applied — only `strokeDasharray: '5,5'` survives. Worth a
  regression test that pins (or forces a fix of) this behaviour so it isn't
  silently "fixed" or further broken later.
- `defaultSize` vs `defaultSizeFacet`: confirm the two objects have the
  documented shape (`height: 440` vs `660`, differing margins, and `fx`/`fy`
  padding only on the facet variant).

### `observablePlotFragments/plot.ts` → `plot.test.ts`

Also completely untested; this is the central wrapper every example chart
imports as `Plot`.

- `plot(options)`:
  - When `options.fx`, `options.fy`, or `options.facet` is set, uses
    `defaultSizeFacet` for `height`/margins; otherwise uses `defaultSize`.
  - Explicit `height`/`marginTop`/`marginLeft`/`marginRight`/`marginBottom` in
    `options` override the corresponding default (`??` fallback semantics —
    confirm `0` is respected as an explicit override, not treated as falsy).
  - `style` as a string is concatenated _after_ the generated default style
    string (`defaultStyleString + style`); `style` as an object is
    shallow-merged over `defaultStyle`.
  - `color` is `undefined` in the output spec when no `color` option is
    supplied (not merged with `defaultColor` unless the caller passes
    something); when supplied, `defaultColor` is merged underneath it.
  - `x`/`y` scale options are always merged with `defaultXScale`/`defaultYScale`
    (present even when the caller passes `{}`).
  - Unrecognised keys (`...rest`, e.g. `marks`, `facet`) pass through
    unchanged.
  - Mock/spy `ObservablePlot.plot` (or assert on the constructed spec directly
    if `ObservablePlot.plot` is easy to stub) to confirm the final merged
    object is what's passed through, without needing a real DOM render.
- `getDefault(element)`: returns the resolved value for a given key in
  `defaultPlotStyleFunctions` (e.g. `getDefault('defaultDot')` returns an
  object, not a function).
- The `Plot` object's mark wrappers (`Plot.area`, `Plot.dot`, `Plot.line`,
  `Plot.barX`/`barY`, `Plot.rect*`, `Plot.tip`, `Plot.annotationTip`,
  `Plot.annotationText`, `Plot.ruleX`/`ruleY`, `Plot.gridX`/`gridY`,
  `Plot.axisX`/`axisY`, `Plot.point*`, `Plot.dashedLine*`): for at least a
  representative subset, assert that calling `Plot.X(data, options)` calls the
  underlying `ObservablePlot.X` with `{ ...defaultForX, ...options }` (caller
  options win over defaults) — this can be done by spying on the
  `ObservablePlot` module's exports.
- `Plot.axisX`/`Plot.axisY`/`Plot.gridX`/`Plot.gridY` have an overloaded
  `(data?, options?) | (options?)` signature based on `args.length` — test
  both call shapes.
- Note the existing typo: `Plot.axisY` looks up `getDefault('defaultYaxis')`
  (lowercase `axis`) when called with `(data, options)`, which does not match
  any key in `defaultPlotStyleFunctions` (`defaultYAxis`) and will throw. A
  test calling `Plot.axisY(data, options)` (2-arg form) would surface this
  real bug immediately.
- `Plot.text`/`Plot.textX`/`Plot.textY` do **not** apply any default styling
  (just pass `options` through) — document this asymmetry with the other mark
  wrappers in a test.

### `data/monthlyData.ts` (transform at module scope)

- The trailing `.map((d) => ({ ...d, Year: d.Month.slice(0, 4), Month: new
Date(d.Month) }))` is a small but real transform. A quick test importing
  `monthlyData` and asserting `Year` is a 4-digit string derived from the
  original `Month` string, and `Month` is a `Date` instance, would catch a
  regression if the shape of the source data or the transform changes.
  (`demoData.ts`/`yearlyData.ts` are static fixtures with no transform logic —
  not worth testing directly.)

---

## Tier 2 — Component behaviour (browser tests)

Follow the existing `*.svelte.test.ts` pattern (`render` from
`vitest-browser-svelte`, assertions via `page.getBy*` and `expect.element`).

### `ExportBtns.svelte` → `ExportBtns.svelte.test.ts`

No tests currently; this is the button-selection logic feeding into `ui`'s
`DataDownloadButton`/`ImageDownloadButton`.

- Renders `DataDownloadButton` only when `dataDownloadButton` is truthy **and**
  `dataForDownload` is defined (both conditions in the template's `{#if}` —
  test that a truthy `dataDownloadButton` with `dataForDownload={undefined}`
  hides the button).
- `dataDownloadButton === true` passes `formats={['CSV', 'JSON']}` to
  `DataDownloadButton`; a custom array (e.g. `['CSV']`) is passed through
  unchanged.
- `imageDownloadButton` renders unconditionally on any truthy value (does not
  depend on `dataForDownload`); `imageDownloadButton === true` maps to
  `formats={['PNG', 'SVG']}`; a custom array passes through unchanged.
- `imageDownloadButton === false` hides the `ImageDownloadButton`.
- `filename` and `columnMapping` are forwarded to the underlying buttons
  unchanged.

### `ChartContainer.svelte` (extend existing coverage)

Current tests cover title/subtitle/source/byline/alt text and export-button
visibility. Add:

- `note` renders in the footer (untested prop).
- `chartDescription` renders the "View description" trigger and, when opened,
  shows the description text inside the `Modal` (exercises `Footer.svelte`'s
  modal-open logic — currently completely untested).
- The whole `Footer` is omitted from the DOM when `source`, `byline`, `note`,
  `chartDescription`, `dataDownloadButton`, and `imageDownloadButton` are all
  falsy (the container-level `{#if}` gating `<Footer>`).
- `alignMultiple` toggles the `contents`/`min-w-0` classes vs the
  `flex flex-col`/no `min-w-0` classes.
- `chartWidth`/`chartHeight`/`overrideClass` are reflected in the rendered
  class list (via the `classNames` derivations).
- Custom `id` prop is applied to the outer container div (default is
  `'captureElement'`, used by the existing tests via `#captureElement`
  selector — a test should assert this explicitly rather than relying on
  the default).
- `children`, `controls`, and `legend` snippets each render in their expected
  position in the DOM (controls before the chart body, legend between
  controls and the chart body).

### `Footer.svelte` → `Footer.svelte.test.ts`

- Renders nothing (empty `<ul>`) when `byline`/`source`/`note`/`chartDescription`
  are all unset, but still renders `exportBtns` if provided.
- `source` is prefixed with a bold "Source:" label; `note` with "Note:".
- `byline`/`source`/`note` are rendered via `{@html ...}` — confirm embedded
  markup (e.g. a link) actually renders as an element rather than escaped
  text, since these are raw HTML injection points.
- The "View description" button opens the `Modal` (`isOpen` toggling) and the
  modal shows the `chartDescription` text.
- `exportBtns` snippet area gets `ml-auto` class only when there is no
  byline/source/note.

### `Title.svelte` / `SubTitle.svelte` → simple render tests

- Each renders its `children` snippet inside the documented wrapper element
  (`Title` → `text-xl font-bold`, `SubTitle` → `text-color-text-muted`).
- Renders nothing but the empty wrapper when no children are passed (documents
  current behaviour, since neither guards on `children` being set).

### `ObservablePlot.svelte` / `ObservablePlotInner.svelte` → `ObservablePlotInner.svelte.test.ts`

The core rendering component is entirely untested. A real Observable Plot spec
can be rendered in the browser test environment since `vitest-browser-svelte`
runs in real Chromium.

- Given a minimal valid `spec` (e.g. `{ marks: [Plot.dot(data)] }`) and `data`,
  renders an `<svg>` (or whatever root node Observable Plot produces) inside
  the container div, with the container's `id` set from the `id` prop.
- `ariaHidden` prop controls the `aria-hidden` attribute on the container div
  (defaults to `true`).
- `ariaDescribedBy` prop is reflected as `aria-describedby` on the container.
- `applyDefaults={false}` uses `ObservablePlot.plot` directly rather than the
  wrapped `Plot.plot` (assert some default styling — e.g. the themed
  background/margins from `defaultSize` — is _not_ applied; this can be probed
  indirectly by checking computed style or spec-derived DOM attributes rather
  than mocking imports, given ESM import mocking constraints).
- Setting `tooltipStore` to a value referencing a valid `data` index renders
  the tooltip `<pre>{JSON.stringify(...)}</pre>` fallback when no `tooltip`
  snippet is supplied, and renders the custom `tooltip` snippet instead when
  one is passed (mirrors what `DemoTooltip.svelte` exercises manually in
  Storybook).
- Setting `tooltipStore` to `undefined` hides the tooltip entirely.
- Tooltip positioning: `style:top`/`style:left` reflect `$tooltipStore.layerY
  - tooltipOffset`/`$tooltipStore.layerX`(custom`tooltipOffset`changes the
computed`top`).
- Resize handling: `onMount` attaches a `resize` listener that calls
  `updateDimensions`, which re-renders the plot via `renderPlot` only when
  `spec.width !== width` (can be tested by resizing the container / firing a
  `resize` event and checking that `spec.width` is mutated to match
  `clientWidth`).
- The `{#key spec}` block causes a full remount (fresh DOM) when a _new_ `spec`
  object is passed, even if content is equivalent — verify old DOM nodes are
  replaced rather than patched.

### `registerTooltip` / `addEventHandler` / `addMultipleEventHandlers` (in `ObservablePlotInner.svelte`'s `<script module>`)

These exported functions are pure-ish (they close over DOM event wiring) and
could be tested directly against a fake `RenderFunction`/mocked SVG elements
rather than a full component render:

- `registerTooltip(posStore)` returns a render function that, when invoked with
  a `next` producing an element containing `markShape` children (default
  `'circle'`), attaches `mouseenter`/`mouseleave` listeners to each match; the
  `mouseenter` handler calls `posStore.set` with the datum plus
  `clientX/clientY/pageX/pageY/layerX/layerY`, and `mouseleave` calls
  `posStore.set(undefined)`.
- `addEventHandlerInner` correctly reads `x/x1/x2/cx` and `y/y1/y2/cy` channel
  values per-index from `values.channels`, defaulting to `undefined` for
  channels that are absent.
- `addMultipleEventHandlers` dispatches `'tooltip'`-typed events to the
  three-listener tooltip wiring (`mouseenter`/`mousemove`/`mouseout`) and any
  other event `type` to a single listener via `addEventHandlerInner`, using
  each event's own `markShape` (default `'rect'` here, vs `'circle'` for the
  other two helpers — worth pinning down this default difference).
- Returns `null` (not `undefined`) when `next` is not provided, and does not
  throw when the element produced has zero matching marks.

### `DemoTooltip.svelte` → `DemoTooltip.svelte.test.ts`

- Renders nothing when the `tooltipData` context value is falsy.
- Renders the `Value` field from context when set (a good template for how
  `tooltip` snippets consuming the `tooltipData` context should behave; can
  double as documentation for maintainers writing custom tooltips).

---

## Tier 3 — Cross-cutting

- **Theme/dark-mode**: `observablePlotFragments.ts` pulls colours from
  `theme.tokenNameToValue(...)` at call time (not just at module load) for
  every default style. A test switching `theme`'s mode between light/dark and
  re-calling `getDefaultPlotStyles()` should confirm the resolved colours
  change accordingly — this is exactly the kind of thing the inline comment in
  `defaultGridX`/`defaultAnnotationRange` ("this reactive var not updating
  reactively in chart itself...") flags as a known trouble spot worth
  regression-testing.
- **Resize/SSR safety**: `ObservablePlotInner.svelte` calls
  `window.addEventListener('resize', ...)` in `onMount` and removes it on
  unmount — verify no listener leak across repeated mount/unmount cycles.
- **Large/empty data**: rendering `ObservablePlotInner` with an empty `data`
  array and a spec with no marks should not throw (defensive test, since
  several examples derive marks from data with `d3.groups`/`d3.hierarchy`
  which can behave oddly on empty input).
- **Accessibility**: `chartDescription` + `aria-describedby` wiring between
  `ObservablePlot.svelte` and its generated `<p class="sr-only" id="{id}-description">`
  is the primary accessible-description mechanism for the whole package —
  worth an end-to-end test confirming the `id`s actually match up (currently
  only indirectly implied by reading the source, not tested).

---

## Housekeeping (not new coverage, but worth doing)

- `src/routes/page.svelte.test.ts` and `tests/demo.test.ts` are both
  demo-route smoke tests with no real signal about the package's exported
  components; consider whether they should be replaced with a demo route that
  actually renders a `ChartContainer`/`ObservablePlot` example, or left purely
  as infra smoke tests and documented as such.
- The known bugs surfaced above while reading the source
  (`defaultDashedLine` spreading a function instead of calling it;
  `Plot.axisY`'s `getDefault('defaultYaxis')` key-name mismatch) are good
  candidates to fix alongside adding the corresponding regression tests in
  `observablePlotFragments.test.ts` / `plot.test.ts`, rather than leaving them
  latent.
- Add a coverage target/report so gaps in this substantial package (currently
  effectively two tested files) are visible over time.

---

## Notable gaps not itemised above

The `src/lib/examples/` directory (`barCharts/`, `lineCharts/`, `histograms/`,
`scatterPlots/`, `treemaps/`, `SlopeCharts/`) consists entirely of
`*.stories.svelte` Storybook demos and is not a unit-testing target in itself.
However, some of these stories contain non-trivial inline logic that has no
test coverage anywhere and would benefit from being extracted into a testable
module:

- `examples/treemaps/CentreTextTreemap.stories.svelte` (and the sibling
  `TopLeftTextTreemap*` stories) define local `toTitleCase(str)` and
  `group(data, [name, ...path])` helpers, plus a `leaves(root, width, height)`
  function wrapping `d3.hierarchy`/`d3.treemap`. `group`'s recursive
  grouping-by-path and the text-fit truncation logic used in the `Plot.text`
  `text:` callbacks (measuring `textValue.length` against node width/height)
  are exactly the kind of pure logic that's currently only exercised visually
  in Storybook — worth pulling into `src/lib/examples/treemaps/treemapUtils.ts`
  with unit tests if these treemap patterns are meant to be reused rather than
  copy-pasted.
- Several bar/line/scatter stories construct `tickFormat`/`tip.format`
  callbacks inline (e.g. `(d) => '£' + format(',.4~s')(d)`); these are small
  enough that extraction is optional, but any story with more than a
  one-line formatter is a signal the formatter belongs in a shared,
  tested utility rather than being reimplemented per-story.
