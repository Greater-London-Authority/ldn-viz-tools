## [0001 — Sources of truth](./decisions/0001-sources-of-truth.md)

- **Figma leads design work.** New values and new thinking start in Figma, so a temporary mismatch between Figma and code is accepted.
- **Values flow from Figma to the spec.** Figma exports the variables, the build transforms them, and the spec's value tables are generated from the build. The tables are never edited by hand. The spec can be out of date after a change in Figma, and a rerun of the scripts fixes that, but it must never be silently wrong.
- **The ADRs and the spec are authoritative for the rules of typography, spacing, flow, grid and colour.** Their prose, which states intent and rules, is written by hand.
- **When Figma and the spec disagree, Figma wins on values and the spec wins on rules.** A Figma design that breaks a rule is either progression, which needs an ADR before the spec changes, or regression, which is fixed in Figma. A difference can also be accepted where matching Figma to code one to one makes no sense.
- **Code and Storybook are authoritative for tables and charts**, because they are behavioural and driven by data. Figma is representative, not a reimplementation.

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

- **Typesets share the same ten roles:** display, headline, subhead, title, subtitle, body, label, metric, caption and eyebrow. Each has the sizes `sm`, `md` and `lg`, except eyebrow, which has one. The spec describes what each role is for. A subhead pairs with a headline or display, and a subtitle with a title.

- **Small headings can take label roles.** No title role is smaller than 20px. A heading inside a small container, such as a popover, a sidebar section or a panel, can take `label-lg`, or `label-md` one level down. `.dialog-title` uses `label-lg` for this reason.

- **Role sets are closed.** Adding a role needs a decision. Alias to reuse an existing role first.

- **Set the context on the container, not on the text.** Text takes its type from the nearest declared context, and the innermost context wins. Layout components such as `Sidebar` set no typeset. They take product from `:root`, and the content passed into them sets its own typeset where it needs another.

- **Typesets are referenced as `typeset-{name}`:** `typeset-longform` and `typeset-product`. The `typeset-product--formatted` modifier is for content from a CMS or Markdown in a product setting ([0015](./decisions/0015-system-classes.md)).

- **Longform and formatted product typesets also define flow. Plain product does not.** `typeset-product--formatted` adds the `flow-standard` context and styles unclassed HTML elements. `typeset-product` sets no flow. Applying `typeset-longform` automatically adds the `flow-spacious` context ([0005](./decisions/0005-flow.md)), so the space before each element comes from the corresponding flow-spacious step defined in CSS. Typography tokens carry no spacing: `--typography-spacing-*` and the `space-before` property are retired.

- **Line height comes from the role.** There are no line-height utilities. A control whose height must not change keeps its role's line height and reduces its padding. This holds for every control, including the `slim` button, which has no padding: its label keeps the role's line height.
- **Type changes at five breakpoints:** `base`, `sm`, `md`, `lg` and `xl`. There are no `2xl` typography tokens, so type at `2xl` is the same as at `xl`.

- **Line height is the font size plus 4px (tight), 8px (default) or 12px (loose).**

- **Every role is set in Inter, with a fallback stack.** If Inter fails to load, text falls back through this stack: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`. Figma holds only `Inter`, so the stack is added at build time.

- **Aliases provided.** A small set of component-level semantic aliases is output to make the system easier to communicate to users who only consume the CSS and don't work with the token layer directly. These aliases are defined in the `usage` style set in Figma. They are a convenience only; where possible use the typeset-role classes directly.

## [0004 — Spacing](./decisions/0004-spacing.md)

- **Decide the job first.** Space that builds a component, such as padding, borders or indents, uses the spacing scale. Space between blocks of content uses flow ([0005](./decisions/0005-flow.md)).
- **Use `--spacing-{n}`, never the primitive.**
- **There is one scale, numbered in 4px steps.** `--spacing-4` is 16px. There are no named spacing sets apart from flow and grid.

## [0005 — Flow](./decisions/0005-flow.md)

- **Flow sets the space between blocks.** Typography does not set space itself: `typeset-longform` automatically adds the `flow-spacious` context, and flow supplies the space ([0003](./decisions/0003-typography.md)).
- **There are three flow contexts:** `flow-spacious`, `flow-standard` and `flow-compact`. Standard is the default. `typeset-longform` sets `flow-spacious`, and `typeset-product--formatted` sets `flow-standard`.
- **The context defines the value of the step.** There are four steps: `tight`, `default`, `loose` and `section`.
- **Choose the context by the space available.** `flow-compact` is for surfaces too small to show four distinct gaps, such as control panels, map overlays, tooltips and dense sidebars. Other product surfaces use `flow-standard`, and reading content uses `flow-spacious` through `typeset-longform`.
- **Flow assigns steps from the markup in every flow context.** Any child takes `default`. A block object (`figure`, `img`, `table`, `pre`, `blockquote`, `.chart`) and the child after it take `loose`. Major headings (`h1`, `h2`, `display-*`, `headline-*`) take `section`, and minor headings (`h3` to `h5`, `title-*`) take `loose`. Headings below `h5` are discouraged and have no rule. The spec has the full table.
- **The parts of a title group take no step** ([0012](./decisions/0012-title-groupings.md)). An eyebrow before a major heading takes `section`.
- **A caption is coupled to what it captions at the `tight` step:** `figcaption`, a table `caption`, and a caption role or `.chart-note` after a block object.
- **There is no separate hero spacing.** The space above display type is the `section` step, or comes from the layout.
- **Authors override a step with a utility.** `mt-flow-{step}` sets the space above one element. `gap-flow-{step}` sets the gap between the children of a flex or grid container that is not a flow context.
- **Flow spaces only the direct children of its context.** Outer flow spaces a component's root and goes no further, so no class is needed to seal a component. A component declares its own context only to set the density of its own children.

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
- **`ChartContainer` is fixed chrome around the chart.** A `ChromeHeader` sits above, with a title and an optional eyebrow, subtitle and hint. A `ChromeFooter` sits below, with the byline, source and note, a link to the chart description, and the data and image download buttons. The hint is an optional help overlay, not a typography role.
- **The designer composes the middle of the container for each chart.** It has slots for controls, the legend and the plot. The legend has its own slot so that plots side by side stay aligned when their legends wrap to different heights.
- **Category and x-axis labels sit below the baseline.** Y-axis ticks sit to the left of the plot.
- **A chart is on-system when its text uses the product typeset roles or the usage aliases, and its colours use `data/*` and `chart/*` tokens, or the palette ramps for a quantitative scale.** Both are valid for chart text ([0003](./decisions/0003-typography.md)).
- **Series take the data roles in order:** `--color-data-primary`, `--color-data-secondary`, then `--color-data-tertiary`. In light mode they are categorical blue, dark pink and orange. In dark mode they are cyan, pink and orange. Each role has a value for each mode, so a chart switches without changes.
- **Categories with no order or ranking can use the categorical palette instead.** Such a chart can colour them with `--color-data-categorical-{hue}` rather than the series roles.
- **To highlight one series, set it in `--color-data-primary` and the rest in `--color-data-context`.** Context is grey.
- **A chart uses no more than three categorical colours.** A chart that needs colours beyond the three series roles takes them from `--color-data-categorical-{hue}`, choosing hues with the most contrast against the background. Where more categories need telling apart, use labels, line styles or small multiples.
- **Common encodings have their own roles:**
  - `--color-data-positive` (blue) and `--color-data-negative` (red), for diverging data such as opinion, and for good and bad. Blue and red avoid the red–green pair that many readers can't tell apart.
  - `--color-data-neutral-0` for "neither" and `--color-data-neutral-1` for "don't know".
  - `--color-data-male` (green) and `--color-data-female` (purple), for sex in demographic data.
  - `--color-data-empty`, for missing or filtered-out data.
- **Quantitative scales are built from the palette ramps. There are no scale tokens.** A sequential scale uses up to five steps of one hue, `--color-palette-blue-{step}` by default, with the higher value on the higher step. Palette steps rise in contrast against the background in both modes, so the scale reverses in dark mode without changes. A diverging scale uses the red ramp for negative values and the blue ramp for positive values, and can add a grey step for values that are exactly zero. A scale that needs more than one hue uses an established perceptually even ramp, such as viridis.
- **Chart chrome uses the `chart` tokens:** `--color-chart-surface`, `--color-chart-axis`, `--color-chart-grid`, `--color-chart-label` and `--color-chart-label-muted`.

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

- **Dominant and demoted treatments.** A title group on its own takes the dominant treatment: 'Eyebrow' (optional), 'Title', 'Subtitle'. When a component contains two or more title groups, the designer chooses which should be dominant. A dominant group has a title and an optional subtitle, and no eyebrow. Demoted groups consist of an eyebrow only. The text that would have been the title is set as the eyebrow. A subtitle pairs only with a dominant title, never with an eyebrow, so a demoted group's subtitle is dropped.
- **Titles default to `title-sm`.** A title group's title uses `title-sm` unless the design needs a larger one.
- **The parts of a title group have no space between them.** The eyebrow, title and subtitle sit directly on one another, in every typeset and flow context, and their line heights separate them. Flow gives no step between them ([0005](./decisions/0005-flow.md)).

Worked examples:

- **A card containing text, with no titled element inside it.** The card's title
  group is the only one, so it can have an eyebrow, a title and a subtitle.
- **A card containing one chart, where the chart is the main subject.** The
  designer makes the chart's group dominant. The chart has a title and
  subtitle, and the card's title is set as an eyebrow. The eyebrow sits
  directly above the chart's title, but it is the card's demoted group, not
  part of the chart's group.
- **A card containing two related charts.** The designer makes the card's group
  dominant, so the card has a title and subtitle. Each chart's title is set as
  an eyebrow.

## [0013 — Token export and parsing](./decisions/0013-token-export-and-parsing.md)

- **The token source is `packages/themes/tokens/lcd-ds.tokens.json`, as Figma exports it.** It is normalised in one step before Style Dictionary filters or formats any token.
- **Emitted names follow the naming grammar ([0002](./decisions/0002-token-naming-grammar.md)).** Colour modes move from the name to the selector. A trailing `default` is dropped from semantic tokens and kept on primitives.
- **Filters select tokens by type and path. One transform sets units by path:** font weights are unitless, breakpoints are `px`, and other dimensions are `rem`.
- **Tests check that every reference resolves, and that every emitted name is unique and follows the grammar.**

## [0014 — Distribution and outputs](./decisions/0014-distribution-and-outputs.md)

- **CSS custom properties are the public surface.** Every other output is a window onto them or an export of their resolved values.
- **Only the paths in the package's `exports` map can be imported:** `reset.css`, `tokens.css`, `system.css`, `index.css`, `tailwind`, `colors.js`, `tokens.scss` and `docs/tokens/tokens.js`.
- **There are three set-ups:** the full system (`index.css`, plus the preset with Tailwind), tokens only (`tokens.css`), and values only (`colors.js` or `tokens.scss`).
- **Typography and flow are in one file**, because a typeset class turns on a flow context.

## [0015 — System classes](./decisions/0015-system-classes.md)

- **Every class the spec names is generated into `system.css` as plain CSS**, with its name taken from `sd/system.config.js`. No class is written by hand, and the Tailwind preset adds none.
- **A typeset publishes its roles' properties on itself, and role classes read them**, so the innermost typeset wins. Product is the default and is also set on `:root`.
- **`system.css` is unlayered and is imported before Tailwind's directives**, so a Tailwind utility wins at equal specificity.
- **`reset.css` removes browser defaults at zero specificity.** A typeset restores what its content needs.
- **Plain `typeset-product` sets type only.** `typeset-product--formatted` adds `flow-standard` and content styles for unclassed markup. `typeset-longform` always brings both. `.not-typeset` stops content styles.
- **A formatted typeset caps each child at one of three widths:** text (about 80 characters), wide and full. `.width-content`, `.width-content-wide` and `.width-content-full` set a child's width explicitly.
- **Secondary roles (`subhead`, `subtitle` and `eyebrow`) use the muted text colour.** Aliases for figures in columns or on axes use tabular numerals.
- **The build fails if a class reads a custom property that isn't a token.**

## [0016 — Flow in system.css](./decisions/0016-flow-in-system-css.md)

Amends [0005](./decisions/0005-flow.md).

- **The flow context classes, rules and utilities are generated into `system.css`.** The values stay in `tokens.css`. There are no Tailwind variants of the utilities, such as `md:mt-flow-loose`.
- **A flow context never sets a typeset.** `typeset-longform` sets `flow-spacious` as well as the typeset.
- **A context sets its ramp on its children**, so the space above a nested context comes from the outer context.
- **Flow sets its children's block margins to zero at zero specificity**, so a browser margin can't collapse with a flow step.

## [0017 — Layout grid](./decisions/0017-layout-grid.md)

- **A page uses one of two layouts.** `.container` is contained, for document-like pages: its width steps up with the breakpoints and it is centred. `.container-fluid` is fluid, for dashboards and application shells: it fills the viewport.
- **The container's padding sets the page edge.** Components don't add padding at the page edge. The padding is set for each breakpoint and layout by `--grid-{breakpoint}-{contained|fluid}-container-padding`.
- **Tiled blocks, such as cards, are spaced with `gap-flow`**, the flow step of the context. There are no gutter tokens or classes, and no column tokens.
- **Both layout classes are in `system.css`**, so the contained layout works without Tailwind.

## [0018 — Colour](./decisions/0018-colour.md)

- **Every semantic colour has a light and a dark value**, on `:root` and `.dark`. A component that uses semantic tokens changes mode with no changes of its own.
- **Choose a token by the role of the element:** text, label, canvas, surface, border, interactive, inverse, static, data, chart or geo. The palette is used only for quantitative scales in charts and maps.
- **Canvas and surface have the same value.** Elevation sets a surface apart from the canvas, and `--color-surface-muted` sets a region apart inside a surface.
- **Interactive tokens are chosen by intent, then emphasis, then state:** `--color-interactive-{intent}[-muted][-{state}]`.
- **Text and icons on a filled control use `--color-inverse-text`**, except on `primary`, which uses `--color-static-white`. Disabled text uses `--color-interactive-disabled`, and a disabled fill `--color-interactive-disabled-muted`.
- **`static` colours don't change with the mode:** `--color-static-white`, `--color-static-black`, `--color-static-brand` and `--color-static-gla-{hue}`.

## [0019 — Accessibility](./decisions/0019-accessibility.md)

- **The target is WCAG 2.2 AA**, for components, documentation pages and the Figma library.
- **Focus has one colour, `--color-interactive-focus`, and two forms:** an outline on `:focus-visible` by default, and an inset ring on filled controls. There are no focus-ring tokens. Figma's `focus` effect style follows the code.
- **Contrast is 4.5:1 for text, 3:1 for large text, and 3:1 for interface components and meaningful chart parts.** `--color-data-context` and `--color-data-categorical-yellow` are stated exceptions. Disabled controls are exempt. In dark mode, the primary hover and active fills are below 3:1 against the surfaces. This is accepted because the label passes 4.5:1 on each fill.
- **No text is smaller than 12px, and running text is no wider than 80 characters.**
