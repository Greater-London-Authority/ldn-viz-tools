# Snags

Differences between the spec, the build and the code, found while rewriting the `lcd-ds` and `ds-writing` skills on 2026-10-16. Remove a row when it is fixed.

## Components

| Snag | Where | Notes |
| --- | --- | --- |
| SVG and canvas text sets sizes and weights directly | `font-size="12px"` in `packages/tables/src/lib/core/aggregateRenderers/{StackedBar,BarChart,Histogram}.svelte`; `textSize` props in `BarDivergingCell`, `BarDivergingAxis`, `PairArrowAxis`; `fontWeight` prop in `TextCell`; deck.gl `fontWeight: 600` in `packages/maps/src/lib/mapDeckLayers/clusterLayer/renderers/`; Plot `fontSize`/`fontWeight` options in `ObservablePlotInner.stories.svelte` and the treemap stories | Read the role custom properties (`--caption-sm-font-size` and so on) where the renderer accepts CSS, or resolve them once in JavaScript |
| Role classes have no font fallback | `font-family` on every role in `system.css` is `var(--primitive-typography-font-family-default, Inter)` | The full stack is only on `body` in `reset.css` and in the preset's `font-sans`. If Inter fails to load, role text falls back to the browser default |
| Components still space children with spacing utilities, not flow | `Card.svelte` (`gap-2`), `InputWrapper` (`space-y-1`), `CheckboxGroup` (`space-y-1`), `Toast` (`mb-1`, no flow context); card grids on `gap-4` | Removed from Flow.mdx, which presented it as done. Moving card grids to `grid-gutter` changes the layout from `sm` up and needs a visual review |
| Some layouts have no typeset class | `Sidebar`; the main areas of the `LeggiExplorer`, `PopulationProjection` and `MenuDashboard` layout examples | Roles still resolve from `:root`. Decide whether `Sidebar` sets `typeset-product` |
| `Button` `slim` grew from 14px to 22px | `packages/ui/src/lib/button/Button.svelte` | It has no padding to reduce. Every other button size keeps its height |
| Figma and code disagree on large button height | Figma ver 4.0, Buttons: non-square `lg` is 48px; `Button.svelte` `lg` is `min-h-16` (64px). One `brand` `sm` variant is 28px, the rest 32px | Found in the Buttons pilot, 2026-10-20. Predates v4. Decide which is right |
| The expanded Menu Sub Item is a separate component in Figma | Figma ver 4.0, Components - Ui, Navigation menu: `Menu Sub Item Expanded` | Figma no longer allows a variant to contain instances of its own set, so `Children=true, Expanded=true` couldn't stay in the `Menu Sub Item` set. Found on paste, 2026-10-21. The set has two variants; code may still treat expanded as a state |
| Heights after the type migration are calculated, not measured | Buttons, tabs, menu items, geocoder suggestions | Check in Storybook |

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
| Data colour guidance is in the spec without an ADR | Spec, Charts and Tables | Added from the docs quick guide. Consider amending ADR 0008 so RULES.md can cite it |
| RULES.md names the Figma file as "Design System ver 3.1" | `RULES.md`, 0001 | Update when the new Figma file is in use |
| Class mappings are marked as placeholders | `rfcs/0003-…md:41`, `packages/themes/MIGRATION.md:114` | Kept until RFC 0002's design review |
| Two caption couplings in ADR 0005 are not built | `packages/themes/sd/content.css` (`caption`), `flow` in `packages/themes/sd/system.config.js` | A table `caption` uses `padding-bottom: var(--spacing-2)` rather than the `tight` step. A caption role or `.chart-note` after a block object takes `loose` rather than `tight`. Fix with W3 T6 |
| `check_spec.py` can't check skill files | `scripts/check_spec.py` | The RULES.md name check was run over the skills from a scratch script that also handles Tailwind utilities, `system.css` custom properties and old names in migration tables. Could become a `--skills` option |
