# Typography

Spec section: Typography. ADRs: [0003](../../../../design-system-specification/decisions/0003-typography.md), [0012](../../../../design-system-specification/decisions/0012-title-groupings.md), [0015](../../../../design-system-specification/decisions/0015-system-classes.md).

Code: `typesets`, `roles`, `content`, `measure` and `usage` in `packages/themes/sd/system.config.js`. Output: the Typesets, Measure, Typeset text, Element aliases, Content styles, Usage aliases, Roles and Emphasis sections of `system.css`.

## Typesets

A typeset gives every role its values. There are two:

| Class | For | Flow context | Content styles | Measure |
| --- | --- | --- | --- | --- |
| `typeset-longform` | Reading: articles, docs, reports | `flow-spacious` | Yes | Yes |
| `typeset-product` | Interfaces, tables, charts, maps | None | No | No |
| `typeset-product--formatted` | Markdown or CMS output inside a product setting | `flow-standard` | Yes | Yes |

Set the typeset once, on a container. Text takes its values from the nearest typeset, so a typeset nested inside another wins. `typeset-product--formatted` works on its own or beside `typeset-product`.

Product is the default. Its role properties are also set on `:root`, so a role class outside any typeset still works.

Each typeset sets unclassed text inside it to `body-md`, so rendered Markdown needs no classes.

The two typesets differ in body line heights and in the larger subheads. `body-sm`, `body-md` and `body-lg` are 14/26, 16/28 and 18/30 in longform, and 14/22, 16/24 and 18/26 in product. At `lg` and `xl`, longform `subhead-md` and `subhead-lg` are one step larger than in product. The full values are in the spec's generated matrices.

## Roles

A role class is `{role}-{size}`, with sizes `sm`, `md` and `lg`. `eyebrow` has no size. Choose the role for what the text does; the role sets size, weight, line height and letter spacing, at every breakpoint.

| Role | Use for |
| --- | --- |
| `display` | High-impact text. Use sparingly |
| `headline` | The main statement of a page or major section |
| `subhead` | Supporting line under a headline or display |
| `title` | The name of a unit within the page: a card, panel, chart, table or block of prose |
| `subtitle` | Supporting line under a title |
| `body` | Running text |
| `label` | Text needed to use the interface: buttons, inputs, tabs |
| `metric` | A figure shown as the content itself |
| `caption` | Optional notes: image and chart captions, sources, helper text |
| `eyebrow` | Short signpost above a headline or title |

Headlines open a page or section; titles name the units inside it. Labels are needed to use the interface; captions aren't.

`subhead`, `subtitle` and `eyebrow` are set in `--color-text-muted`. `metric` uses tabular numerals.

The role set is closed. Adding a role needs an ADR.

The preset has no Tailwind size, weight or line-height utilities, so `text-sm`, `font-bold` and `leading-none` produce nothing. Change the role instead, or use an emphasis class.

No title role is smaller than 20px. A heading inside a small container, such as a popover, a sidebar section or a panel, takes a label role: `label-lg`, or `label-md` one level down. `.dialog-title` is `label-lg` for the same reason.

## Emphasis

`.text-strong` sets the semi-bold weight and `.text-soft` sets regular, on any role.

## Weights and line heights

Weights are light 300, regular 400, medium 500, semi-bold 600 and bold 700, as `--primitive-typography-font-weight-{name}`. No role uses light. The weight name is hyphenated: semi-bold.

Line heights are the font size plus 4px (tight), 8px (default) or 12px (loose).

## Element aliases

Inside `typeset-longform` and `typeset-product--formatted`, headings and some elements take a role without a class. Each typeset uses its own sizes. Plain `typeset-product` doesn't style them, so a heading there needs a role class or a usage alias:

| Element | Role |
| --- | --- |
| `h1` | `headline-lg` |
| `h2` | `headline-sm` |
| `h3` | `title-lg` |
| `h4` | `title-md` |
| `h5` | `title-sm` |
| `p.lead` | `body-lg`, muted |
| `figcaption` | `caption-sm` |

These have zero added specificity, so a role class on the element wins.

## Content styles

Inside `typeset-longform` and `typeset-product--formatted`, `sd/content.css` styles unclassed links, inline text (`b`, `i`, `mark`, `abbr`, `small`, `kbd`), code blocks, lists, description lists, blockquotes, `hr`, tables, `figcaption` and `summary`.

Content styles and element aliases stop at `.not-typeset` and at a nested typeset. `typeset-product` on its own has no content styles, so component markup inside it isn't restyled.

## Measure

Inside `typeset-longform` and `typeset-product--formatted`, each direct child has a maximum width:

| Width | Value | Applies to |
| --- | --- | --- |
| `--measure-text` | 38 × body size (608px at 16px) | Running text |
| `--measure-wide` | 56 × body size (896px at 16px) | `figure`, `img`, `video`, `iframe`, `table`, `pre`, `.chart` |
| `--measure-full` | none | Nested typesets, `.not-typeset` |

`.width-content`, `.width-content-wide` and `.width-content-full` set a child's width directly. A Tailwind `max-w-*` utility wins over both.

The multiples are set in `packages/themes/sd/system.config.js`, not in the export ([0015](../../../../design-system-specification/decisions/0015-system-classes.md)).

## Usage aliases

Each alias applies a role, sometimes with tabular numerals or the muted colour. Use the role class where you can; the aliases are for people using the CSS without the roles.

| Place | Aliases |
| --- | --- |
| Charts | `.chart-title`, `.chart-subtitle`, `.chart-axis-title`, `.chart-label`, `.chart-tick`, `.chart-tick-sm`, `.chart-note` |
| Tables | `.table-title`, `.table-subtitle`, `.table-col-head`, `.table-col-head-sm`, `.table-body` |
| Dashboards | `.dashboard-main-title`, `.dashboard-main-subtitle`, `.dashboard-section-title`, `.dashboard-section-subtitle` |
| Interface | `.header-title`, `.sidebar-title`, `.dialog-title`, `.card-title`, `.card-subtitle`, `.input-hint`, `.input-label`, `.input-placeholder`, `.input-value`, `.button-label`, `.button-label-sm` |

The role each alias uses is in the spec's alias table. Adding an alias needs an ADR and a change to the Figma `usage` set.

## Title groups

A title group is an optional eyebrow, a title and a subtitle, at the top of a card, chart, table or panel.

A group on its own can have all three parts. When a component contains two or more title groups, the designer makes one dominant. The dominant group has a title and an optional subtitle, and no eyebrow. Each other group becomes an eyebrow, using the text that would have been its title.

For example, a card holding one chart, where the chart is the subject: the chart has the title and subtitle, and the card's title becomes an eyebrow.

The parts have no space between them, in either typeset. Their line heights separate them.

In `@ldn-viz/ui`, `TitleGroup` in `packages/ui/src/lib/chrome/` renders a group with `eyebrow`, `title-sm` and `subtitle-sm`. `Card`, `ChartContainer` and `TableContainer` use it through `ChromeHeader`.
