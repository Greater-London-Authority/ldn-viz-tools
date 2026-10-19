## [0001 — Sources of truth](./decisions/0001-sources-of-truth.md)

- Figma file: "Design System ver 3.1" (was "3.0 Agent Enhanced"). Dynamic-page file. Desktop Bridge on port 9223.
- Figma leads the typography and colour cutover ahead of the repo. Temporary Figma↔code mismatch is accepted.
- Figma-only sessions have no repo access. Nothing decided in one is verified against emitted output until a rebuild.
- Spec is authoritative for typography, spacing, flow, grid and colour — design-system-specification.md.
- Code/Storybook is authoritative for tables and charts (behavioural, data-driven). Figma is representative, not a reimplementation.
- The spec is downstream of the build. Value tables are generated from emitted styles/; only intent and rationale prose is hand-written. The spec may be out of date against a change from figma, a rerun fixes that, but it must never be silently wrong.

## [0002 — Token Naming Grammar](./decisions/0002-token-naming-grammar.md)

- **Two tiers:** primitive → semantic. Primitives hold values. Semantic tokens say what a value is for. Components use semantic tokens only, never primitives or raw values.
  - Primitives carry the `primitive-` prefix and are named by their value, or by their step on a scale.
    --primitive-typography-scale-14 (step 14, 72px) · --primitive-typography-font-weight-semi-bold · --primitive-spacing-4 (4 × 4px)
  - Semantic tokens drop the tier segment (it is inferred after being output from Figma), and are named by their role, never by value or component.
    `title` (role), not 20 (value) and not card-panel-title (component).
- **One grammar for every token, general to specific:** `(tier) → category → variant → concept → role → emphasis → state → property/value`. Segments that don't apply are left out; the rest never change order.
- **Minimum:** a category plus at least one more segment.
- Each segment has a fixed set of values, listed in the spec. A new value needs a spec change.
- The grammar applied to each category:

| Category   | Pattern                                                                   | Example                                                       |
| ---------- | ------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Typography | --typography-{breakpoint}-{context}[-{role}][-{size}]-{property}          | --typography-base-product-title-md-font-size                  |
| Colour     | --color[-{variant}][-{concept}][-{role}][-{emphasis}][-{state}][-{value}] | --color-interactive-primary-muted-hover, --color-static-black |
| Spacing    | --spacing-{value}                                                         | --spacing-4                                                   |
| Flow       | --flow-{context}[-{step}]                                                 | --flow-spacious-loose, --flow-standard                        |
| Shadow     | --shadow[-{value}]                                                        | --shadow, --shadow-md, --shadow-inner                         |
| Elevation  | --elevation-{value}                                                       | --elevation-0, --elevation-1                                  |

- **More than one variant:** breakpoint or scope first, then context, layout or inverse.
- **One accepted outlier:** --color-interactive-disabled-muted puts state before emphasis.
- **The context segment decides the family.** In typography it is longform or product ([0003](./decisions/0003-typography.md)); in flow it is spacious, standard or compact ([0005](./decisions/0005-flow.md)). chart is not a typography context, only a scope in colour. Families never mix: a Product/\* component uses product tokens only. Charts and tables use the product typeset, or the usage aliases provided for them.
- **Role names are the shared role vocabulary of [0003](./decisions/0003-typography.md):** display, headline, subhead, title, subtitle, body, label, metric, caption and eyebrow. Both typesets use the same names. They say what the text does, not which component it sits in.
- **Accepted exception to role-only naming:** the usage aliases in [0003](./decisions/0003-typography.md) are component-level names. They are allowed because they are classes, not tokens, and they are a convenience layer over the typeset roles, which remain the canonical API.
- **Implied defaults:** For a semantic token a default is a value that can be omitted when it is last; a context or a size is never omitted.
  - where a set has a default value, that value's name is dropped when no further segment follows it. `--color-border` is the default border colour and `--shadow` is the default shadow.
  - **Flow:** Flow is set by a context class (`.flow-spacious`, `.flow-standard` or `.flow-compact`), which assigns values to the steps (`tight`, `default`, `loose`, `section`). The tokens always name the context: `--flow-standard-tight`, `--flow-standard`, `--flow-standard-loose`, `--flow-standard-section` and so on. **The utilities don't**: `.mt-flow-{step}` and `.gap-flow-{step}` resolve against the nearest context. The default step follows the implied-default rule, so the utility is `.mt-flow`, not `.mt-flow-default`.
  - **Typography:** role sizes are a fixed range (`sm`, `md`, `lg`) and are always written, as in `title-md`. `md` is not a default; it is one of three sizes. `eyebrow` has no size. `base` is the default breakpoint, but it is written whenever more segments follow it, as in `--typography-base-product-title-md-font-size`.
- Shadow tokens are still emitted, but stepped elevation uses `elevation-{0–6}` ([0011](./decisions/0011-elevation.md)), not a shadow size.
- The same word can fill two slots: text is a concept in color-text and an emphasis in interactive-primary-text.
- **Spelling:** lowercase kebab-case throughout. Multi-word values are hyphenated (semi-bold, line-height). Context classes put the kind first: `typeset-longform`, `typeset-product`, `flow-spacious`. Fractional steps use a hyphen, because dots aren't valid in CSS names: --spacing-0-5, not --spacing-0.5

## [0003 — Typography](./decisions/0003-typography.md)

- **There are two contexts: Longform and Product.** Longform is for reading, Product is for interfaces, tables, charts and maps. Each context has a typeset that defines semantic roles.

- **Bind to a role, never a size.** Pick the role for what the text does. Size, line height and weight are determined by role.

- **Typesets share the same role vocabulary.** Roles are defined in sets of three: sm, md, lg in each set, with the exception of 'eyebrow' which is singular. Role sets are:

  | Role     | Description                                                                                          |
  | -------- | ---------------------------------------------------------------------------------------------------- |
  | Display  | Expressive, high-impact type. Use sparingly.                                                         |
  | Headline | Primary statement of a page or section. Sets topic and structure.                                    |
  | Subhead  | Supporting statement paired with a headline or display.                                              |
  | Title    | Names a discrete unit of context: block of prose or component such as a card, panel, chart or table. |
  | Subtitle | Secondary context paired with a title.                                                               |
  | Body     | Default reading for sustained running text. The baseline for other roles.                            |
  | Label    | Functional text. Heavier than caption for recognition.                                               |
  | Metric   | A figure presented as the content itself. Tabular numerals, quick comprehension.                     |
  | Caption  | Subordinate annotation for images, charts, sources, and helper text. Smaller and tighter than body.  |
  | Eyebrow  | Short signpost above a headline or title. Categorises or orients.                                    |

  Distinctions:
  - **Display vs Headline**: display is impact; headline is communication.
  - **Label vs Caption**: labels are needed to use the interface; captions are optional commentary.
  - **Headline vs Title**: headlines open a page or major section; titles name the smaller units within it, whether components or prose blocks.
  - **Pairing**: subhead pairs with headline/display, subtitle with title.

- **Role sets are closed.** Adding a role needs a decision. Alias to reuse an existing role first.

- **Set the context on the container, not on the text.** Text takes its type from the nearest declared context, and the innermost context wins.

- **Typesets are referenced as `typeset-{name}`:** `typeset-longform` and `typeset-product`.

- **Longform typeset also defines flow. Product typeset does not.** Applying `typeset-longform` automatically adds the `flow-spacious` context ([0005](./decisions/0005-flow.md)), so the space before each element comes from the corresponding flow-spacious step defined in CSS. Typography tokens carry no spacing: `--typography-spacing-*` and the `space-before` property are retired.

- **Line heights in three ratios.** Line height is defined in three ratios based on a simple formula: `font-size + k`, where font-size and k are measured in px.
  The ratios are:

| tight           | default         | loose            |
| --------------- | --------------- | ---------------- |
| font-size + 4px | font-size + 8px | font-size + 12px |

- **Aliases provided.** A small set of component-level semantic aliases is output to make the system easier to communicate to users who only consume the CSS and don't work with the token layer directly. These aliases are defined in the `usage` style set in Figma. They are a convenience only; where possible use the typeset-role tokens directly.

## [0004 — Spacing](./decisions/0004-spacing.md)

- **Decide the job first.** Space that builds a component, such as padding, borders or indents, uses the spacing scale. Space between blocks of content uses flow ([0005](./decisions/0005-flow.md)).
- **Use `--spacing-{n}`, never the primitive.**
- **There is one scale, numbered in 4px steps.** `--spacing-4` is 16px. There are no named spacing sets apart from flow and grid.

## [0005 — Flow](./decisions/0005-flow.md)

- **Flow sets the space between blocks.** Typography does not set space itself: `typeset-longform` automatically adds the `flow-spacious` context, and flow supplies the space ([0003](./decisions/0003-typography.md)).
- **There are three flow contexts:** `flow-spacious`, `flow-standard` and `flow-compact`. Standard is the default.
- **The context defines the value of the step.** There are four steps: `tight`, `default`, `loose` and `section`.
- **Flow assigns steps based on markup, and authors can override them using utility classes.** When a flow context is initiated, its direct children are spaced vertically to the default step of that context. In a `typeset-longform` context, where `flow-spacious` is applied automatically, headings, captions and block objects are assigned a step from the markup without extra classes.
  Where an override is needed, or a context cannot infer spacing from markup alone, an `mt-flow-{step}` or `gap-flow-{step}` class replaces the assigned step.
- **Flow spaces only the direct children of its context.**
- **A component that declares its own context or spacing is sealed.** Outer flow stops at it. To keep its density wherever it is placed, a component must declare its own context.

## [0006 — Visual rules](./decisions/0006-visual-rules.md)

- **Corners are square.** The radius is 0 everywhere. Only things that are genuinely round, such as a circular avatar or a dot, are round. Bars, cards, cells, buttons, inputs and containers never are.

## [0007 — Tables](./decisions/0007-tables.md)

_The following decisions relate to Figma_

- **Figma tables are a kit, and code is authoritative.** The kit is built from cells, rows and header rows.
- **Cells have fixed widths, and everything above them hugs.** A width change shows straight away in the row and the table. Columns line up because the header and body cells use the same width.
- **The cell is the unit you swap.** Its renderer (text, number, boolean or mini-chart) is swapped in, and alignment belongs to the renderer.
- **Widths are xs 64, sm 88, md 120, lg 220, xl 300, or fill.** Fill is set on the instance. It is not a variant.

## [0008 — Charts](./decisions/0008-charts.md)

- **Observable Plot or D3 draws real charts. Figma charts are representative.** They are built to look right, not to be accurate to the data.
- **`ChartContainer` is fixed chrome around a slot.** It has a header (title, with an optional eyebrow, subtitle and hint), a `Content` slot, and actions such as download and export. The hint is an optional Svelte slot for a hint/overlay component, not a typography role.
- **The designer composes what goes in the slot for each chart.** The legend, plot and footer (notes and citation) are not built into the container or into the plot.
- **Category and x-axis labels sit below the baseline.** Y-axis ticks sit to the left of the plot.
- **A chart is on-system when its text uses the product typeset roles or the usage aliases, and its colours use `data/*` and `chart/*` tokens.** Both are valid for chart text ([0003](./decisions/0003-typography.md)).

## [0009 — Documentation](./decisions/0009-documentation.md)

- **AI can be used to assist in documentation, but every output must be read and checked** Ai generated output has proven to be verbose and confusing for human readable docs. It's ok to use AI to scaffold component documentation, but it _must_ be verified by a human.
- **Sweeps only do the basics.** While sweeping a component, we fill in its metadata and description and add an intro doc frame. Usage guidance, accessibility notes and full strips of states are left for a separate documentation pass.
- **All doc frames follow the same pattern.** The pattern is written up in the `ds-doc-frame` skill. Text in a doc frame uses the `Doc/*` styles rather than the product typography roles.
- **Foundation doc frames go on the page for that foundation.** We haven't yet agreed where component doc frames should live, so until we do, we'll place them together in batches rather than one at a time wherever they happen to land.

## [0010 — Figma Conventions](./decisions/0010-figma-conventions.md)

- **Names starting with `.DS-` are documentation scaffolding.** We only audit these on the Get Started page. `.DS-Page-Head` is just a page marker and can be ignored.
- **Names starting with a single `.` are private sub-components.** They aren't published, but they are real components.
- **Documentation text uses the `Doc/*` text styles.** This is a separate family of styles kept only for documentation: `Doc/Title`, `Doc/Heading`, `Doc/Subheading`, `Doc/Body`, `Doc/Body-sm`, `Doc/Caption` and `Doc/Mono`. They are for the doc frame itself, meaning its title, intro and captions. Components shown as examples inside a doc frame keep their own styles. `Doc/*` styles are never used in product designs, and product roles are never used for documentation text.
- **We never skip a real component during a sweep**, whether it is published or private.
- **The component archive page is not audited.**

## [0011 — Elevation](./decisions/0011-elevation.md)

- **An elevation class adds a corresponding shadow.**
- **Elevation runs on a numbered scale from 0 to 6.** `elevation-0` is 'on the canvas' and has no visual effect. `elevation-1` through `elevation-6` raise elements up off the canvas step by step.
- **Elevation is visual, z-index is architectural.**

## [0012 — Title Groupings](./decisions/0012-title-groupings.md)

- **Dominant and demoted treatments.** A title group on its own takes the dominant treatment: 'Eyebrow' (optional), 'Title', 'Subtitle'. When a component contains two or more title groups, the designer chooses which should be dominant. A dominant group has a title and an optional subtitle, and no eyebrow. Demoted groups consist of an eyebrow only. The text that would have been the title is set as the eyebrow.

Worked examples:

- **A card containing text, with no titled element inside it.** The card's title
  group is the only one, so it can have an eyebrow, a title and a subtitle.
- **A card containing one chart, where the chart is the main subject.** The
  designer makes the chart's group dominant. The chart has a title and
  subtitle, and the card's title is set as an eyebrow.
- **A card containing two related charts.** The designer makes the card's group
  dominant, so the card has a title and subtitle. Each chart's title is set as
  an eyebrow.
