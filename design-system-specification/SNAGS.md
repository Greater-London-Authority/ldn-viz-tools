# Snags

Differences between the spec, the build and the code, found while rewriting the `lcd-ds` and `ds-writing` skills on 2026-10-16. Remove a row when it is fixed.

## Components

| Snag | Where | Notes |
| --- | --- | --- |

## After the v4 release

Deferred on purpose. Each has a GitHub issue.

| Snag | Where | Notes |
| --- | --- | --- |
| ColorLegend ticks are 10px | `packages/ui/src/lib/colorLegends/ColorLegend.svelte`: the d3 axis ticks keep the generator's `font-size="10"` | Below the 12px minimum (ADR 0019). At `chart-tick-sm` (12px), ordinal scale ticks overlap. Left at 10px for the v4 release; fix the tick spacing or labelling after it |
| Elevation levels by component aren't decided | Tooltip, Popover, Toast, GeocoderSuggestionList and MapMarkerStyledContainer at `elevation-4`; Modal at `elevation-5`; map controls, ThemeSwitcher and MultipleActionButton at `elevation-2`; Callout and MapPointSearch at `elevation-1`; Card at `elevation-1` | The levels carry over the shadows the components had. ADR 0011 sets the scale but not which component sits where. Decide a level for each kind of component |

## Figma

| Snag | Where | Notes |
| --- | --- | --- |
| One `brand` `sm` button variant is 28px in Figma | Figma ver 4.0, Buttons: the other `sm` variants are 32px, as in code | Found in the Buttons pilot, 2026-10-20. Fix the variant in Figma |
| The expanded Menu Sub Item is a separate component in Figma | Figma ver 4.0, Components - Ui, Navigation menu: `Menu Sub Item Expanded` | Figma no longer allows a variant to contain instances of its own set, so `Children=true, Expanded=true` couldn't stay in the `Menu Sub Item` set. Found on paste, 2026-10-21. The set has two variants; code may still treat expanded as a state |
| The Pos Neg Bar kit has no background track | Figma ver 4.0, Components - Tables: `Mini chart - Pos Neg Bar` | `BarDivergingCell` draws a `surface.neutral` track behind the bar, and puts a long bar's label inside it in `inverse.text`. Add both to the kit, or record why Figma leaves them out |
| Metric and Chrome are on the Typography page | Figma ver 4.0, Typography: `Metric`, `Chrome` | Both are components, not type foundations. Move them when the page structure is settled: Chrome with the chart, table and card components it wraps, Metric with the UI components. `ChromeHeader` and `ChromeFooter` were made local components on 2026-10-21, with their properties recreated |
| Work In Progress on the Charts page still uses other libraries | Figma ver 4.0, Components - Charts, `Work In Progress` section: `Toggle` (16), `System Icons` (6); the `Community examples` frame uses `Label/*`, `Body Text Medium/Medium`, `Heading Large/Regular` and `color/text/primary` | Not in 3.1 or v4. Rebuild with system components or delete the section |
| Chrome usage guidance is v3 | Figma ver 4.0, Typography: `Chrome` | Rewrite it. `ChromeHeader`, `ChromeFooter` and `TitleGroup` in `packages/ui/src/lib/chrome/` are used by `Card` and `ChartContainer`; no table component uses them yet. The rules belong in the spec or the docs as well as in Figma |
| The Maps page has no documentation | Figma ver 4.0, Components - Maps | It is a working canvas: dated screenshots, unnamed groups and frames, several `MapDrawingNav Track` drafts, and components without descriptions (Basemaps, London Borough TopoJSON, Air quality base map, PointSearch, SearchPoint, London Basemap). `.grid-indicator` inside Basemaps comes from a library outside 3.1. Needs a documentation pass against `packages/maps` |
| The Application Shells page has no documentation | Figma ver 4.0, Application Shells | 23 example groups (sidebar, tabbed sidebar, footer and header combinations, and mode examples) with no intro or descriptions. Code has `AppShell` in `packages/ui/src/lib/appShell/`. Needs a doc frame that links the examples to `AppShell` and `Sidebar` |
| The Dashboard Layouts page has no documentation | Figma ver 4.0, Dashboard Layouts | Seven tabbed-sidebar dashboards at each breakpoint, the fluid frames, and the `Section/*` layouts (1-up, 2-up, 2-up-left, 2-up-right, 3-up, 4-up) with slot properties. The section descriptions assume a 12-column grid; ADR 0017 has no column tokens and leaves columns to each page. Needs a doc frame |
| Metric has no translation hero | Figma ver 4.0, `Metric` component set | `Metric.svelte` has `hero="translation"`. Figma's `Hero` has Value and Change only |
| Typography needs a final design pass | Figma ver 4.0, Typography and the title components | The roles, matrices and title components were migrated and checked against the spec on 2026-10-21, not designed. Review them once the rest of the system is in v4 and can be seen together, including the longform and product examples. The Patterns and Screens mockups were moved from an older marketing type scale (display 96px, headline 56px) to the nearest longform roles, so they are smaller than they were designed |

## Docs

| Snag | Where | Notes |
| --- | --- | --- |
| Foundation page links point at the site root | `apps/storybook/src/content/{Typography,Flow}.mdx` | Waits for the site structure (RFC 0002 workstream 4) |
| The CDN link has no version | `apps/web/src/content/design-system/getting-started/index.md` | It serves the latest published version, so it only gives v4 once `@ldn-viz/themes` 10 is released. Pin it then |
| Demo prose has em dashes and a slogan | `packages/ui/src/lib/layoutExamples/Typography.stories.svelte` | Sample content, so left. Rewrite if it is read as guidance |
| Unchecked claims kept from older pages | `apps/web/.../application-design/theming.md` (Header, Footer and Sidebar stay dark in light mode); `layout.md` column counts; `typography.md` legend guidance (`chart-label` for legend entries) | Verify or remove |

## Spec and governance

| Snag | Where | Notes |
| --- | --- | --- |
| The scope list and the sections don't match | `design-system-specification.md`, top | Scope lists Layout grid, Colour and Accessibility, which have no section. Sections include Visual Rules and Charts and Tables, which aren't in the scope list |
| Figma measure variables aren't in an ADR | `semantic-typography`: `{longform,product}/measure/{text,wide}`; `packages/themes/sd/normalise.js` step 5 | Added 2026-10-21 so designers can bind a frame's max width to the measure. They are copies (38 and 56 × body-md), dropped by the normaliser and checked against `system.config.js` in `normalise.test.js`. Amend ADR 0015 |
| `check_spec.py` can't check skill files | `scripts/check_spec.py` | The RULES.md name check was run over the skills from a scratch script that also handles Tailwind utilities, `system.css` custom properties and old names in migration tables. Could become a `--skills` option |
