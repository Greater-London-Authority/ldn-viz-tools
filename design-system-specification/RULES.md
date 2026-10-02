## [0001 — Sources of truth](./decisions/0001-sources-of-truth)

- Figma file: "Design System ver 3.1" (was "3.0 Agent Enhanced"). Dynamic-page file. Desktop Bridge on port 9223.
- Figma leads the typography and colour cutover ahead of the repo. Temporary Figma↔code mismatch is accepted.
- Figma-only sessions have no repo access. Nothing decided in one is verified against emitted output until a rebuild.
- Spec is authoritative for typography, spacing, flow, grid and colour — design-system-specification.md.
- Code/Storybook is authoritative for tables and charts (behavioural, data-driven). Figma is representative, not a reimplementation.
- The spec is downstream of the build. Value tables are generated from emitted styles/; only intent and rationale prose is hand-written. The spec may be out of date against a change from figma, a rerun fixes that, but it must never be silently wrong.

## [0002 — Token Naming Grammar](./decisions/0002-token-naming-grammar)

- Two tiers: primitive → semantic. Primitives hold values. Semantic tokens say what a value is for. Components use semantic tokens only, never primitives or raw values.
- Primitives are named by their value.
  --primitive-typography-font-size-14 · --primitive-typography-font-weight-semi-bold · --primitive-spacing-4 (4 × 4px)
- Semantic tokens are named by their role, never by value or component.
  title, not 20 (value) and not card-panel-title (component).
- One pattern per category:

| Category   | Pattern                                     | Example                                   |
| ---------- | ------------------------------------------- | ----------------------------------------- |
| Typography | --typography-{mode}-{context}-{role}-{prop} | --typography-base-product-title-font-size |
| Colour     | --color-{group}[-{variant}][-{state}]       | --color-interactive-primary-muted-hover   |
| Spacing    | --spacing-{n}                               | --spacing-4                               |
| Flow       | --flow-[{context}-]{step}                   | --flow-prose-loose, --flow-loose          |

- The context segment decides the family. It is prose, product or chart, and families never mix: a Product/\* component uses product tokens only.
- Role names are generic within a context. Product names say where something sits in the hierarchy (page-head, section-head, title). Chart names say which part of the chart it is (axis-title, tick), because that's the vocabulary chart users already have.
- Name segments run from general to specific, and modifiers go last. label-sm, primary-muted-hover.
- The default has no modifier: title and --flow-{step} are the plain forms.
- Spelling: lowercase kebab-case throughout. Multi-word values are hyphenated (semi-bold, page-head). Fractional steps use a hyphen, because dots aren't valid in CSS names: --spacing-0-5, not --spacing-0.5

## [0003 — Typography](./decisions/0003-typography)

- **There are three contexts: prose, product and chart.** Prose is for reading, product is for interfaces, and chart is for data graphics. Every piece of text belongs to one of them.
- **Bind to a role, never a size.** Pick the role for what the text does. Size, line height and weight are determined by role.
- **Set the context on the container, not on the text.** Text takes its type from the nearest declared context, and the innermost context wins.
- **A nested context overrides only the roles it defines.** Everything else comes from the context around it. Body text inside a chart is still the surrounding body.
- **A role name means the same thing everywhere.** The chart roles `title`, `subtitle` and `eyebrow` are aliases of the product roles with the same names, so they always have the same values. If two contexts give different values for a shared name, that is a bug.
- **Role sets are closed.** Adding a role needs a decision. Reuse an existing role first: a legend entry is a chart `label`.
- **Hierarchy follows structure.** In prose, h1–h4 map to Title 1–4, and Display and Headline are for heroes only. In product, the order is page-head → section-head → title.
- **A title group has one dominant title.** When the title gives way, it becomes an eyebrow. A subtitle is a separate slot, not a weaker title.
- **Variants change treatment, not size.** Tight label (line height 1) is for single-line controls and adds no new size.
- **Typography sets type, not space.** The vertical space between pieces of text is set by flow.

## [0004 — Spacing](./decisions/0004-spacing)

- **Decide the job first.** Space that builds a component, such as padding, borders or indents, uses the spacing scale. Space between blocks of content uses flow ([0005-flow](./decisions/0005-flow)).
- **Use `--spacing-{n}`, never the primitive.**
- **There is one scale, numbered in 4px steps.** `--spacing-4` is 16px. There are no named spacing sets apart from flow and grid.

## [0005 — flow](./decisions/0005-flow)

- **Flow sets the space between blocks. Typography never does.**
- **The context defines the value of the step.** There are four steps: `tight`, `default`, `loose` and `section`. `flow-prose`, `flow-product` and `flow-compact` each give them their own values. Product is the default.
- **Flow assigns steps based on markup, and authors can override them.** Headings, captions and block objects get a step without extra classes. An `mt-flow-{step}` or `gap-flow-{step}` class replaces the assigned step.
- **Flow spaces only the direct children of its context.**
- **A component that declares its own context or spacing is sealed.** Outer flow stops at it. To keep its density wherever it is placed, a component declares a context. It does not fix individual gaps.

## [0006 — Visual rules](./decisions/0006-visual-rules)

- **Corners are square.** The radius is 0 everywhere. Only things that are genuinely round, such as a circular avatar or a dot, are round. Bars, cards, cells, buttons, inputs and containers never are.

## [0007 — Tables](./decisions/0007-tables)

_The following decisions relate to Figma_

- **Figma tables are a kit, and code is authoritative.** The kit is built from cells, rows and header rows.
- **Cells have fixed widths, and everything above them hugs.** A width change shows straight away in the row and the table. Columns line up because the header and body cells use the same width.
- **The cell is the unit you swap.** Its renderer (text, number, boolean or mini-chart) is swapped in, and alignment belongs to the renderer.
- **Widths are xs 64, sm 88, md 120, lg 220, xl 300, or fill.** Fill is set on the instance. It is not a variant.

## [0008 — Charts](./decisions/0007-charts)

- **Observable Plot draws real charts. Figma charts are representative.** They are built to look right, not to be accurate to the data.
- **`ChartContainer` is fixed chrome around a slot.** It has a header (title, with an optional eyebrow, subtitle and hint), a `Content` slot, and actions such as download and export.
- **The designer composes what goes in the slot for each chart.** The legend, plot and footer (notes and citation) are not built into the container or into the plot.
- **Category and x-axis labels sit below the baseline.** Y-axis ticks sit to the left of the plot.
- **A chart is on-system when its text uses `Chart/*` roles and its colours use `data/*` and `chart/*` tokens.**
