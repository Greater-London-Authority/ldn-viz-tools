---
id: '0003'
title: Typography
status: accepted
date: 2026-09-30
released-in: null
deciders: [Chris Knight, James Scott-Brown]
areas: [Typography]
breaking: false
supersedes: []
superseded-by: null
amends: []
amended-by: []
spec: []
pr_url: ''
---

# 0003 — Typography

## Context

Text in the design system appears on two kinds of surface: long-form reading content, product interfaces such as dashboards or maps or charts. Each needs its own size, leading and density, yet they draw on one type scale and often nest inside each other, as when a chart sits in a card on a page of prose.

We needed a system that sets type by what text does and the context in which it sits, and that works with the spacing rules to keep layouts balanced.

## Decision

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

- **Small headings can take label roles.** No title role is smaller than 20px. A heading inside a small container, such as a popover, a sidebar section or a panel, can take `label-lg`, or `label-md` one level down. `.dialog-title` uses `label-lg` for this reason.

- **Role sets are closed.** Adding a role needs a decision. Alias to reuse an existing role first.

- **Set the context on the container, not on the text.** Text takes its type from the nearest declared context, and the innermost context wins. Layout components such as `Sidebar` set no typeset. They take product from `:root`, and the content passed into them sets its own typeset where it needs another.

- **Typesets are referenced as `typeset-{name}`:** `typeset-longform` and `typeset-product`. The `typeset-product--formatted` modifier is for content from a CMS or Markdown in a product setting ([0015](./0015-system-classes.md)).

- **Longform and formatted product typesets also define flow. Plain product does not.** `typeset-product--formatted` adds the `flow-standard` context and styles unclassed HTML elements. `typeset-product` sets no flow. Applying `typeset-longform` automatically adds the `flow-spacious` context ([0005](./0005-flow.md)), so the space before each element comes from the corresponding flow-spacious step defined in CSS. Typography tokens carry no spacing: `--typography-spacing-*` and the `space-before` property are retired.

- **Line height comes from the role.** There are no line-height utilities. A control whose height must not change keeps its role's line height and reduces its padding. This holds for every control, including the `slim` button, which has no padding: its label keeps the role's line height.

- **Type changes at five breakpoints:** `base`, `sm`, `md`, `lg` and `xl`. There are no `2xl` typography tokens, so type at `2xl` is the same as at `xl`.

- **Line heights in three ratios.** Line height is defined in three ratios based on a simple formula: `font-size + k`, where font-size and k are measured in px.
  The ratios are:

| tight           | default         | loose            |
| --------------- | --------------- | ---------------- |
| font-size + 4px | font-size + 8px | font-size + 12px |

- **Every role is set in Inter, with a fallback stack.** If Inter fails to load, text falls back through this stack: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`. Figma holds only `Inter`, so the stack is added at build time.

- **Aliases provided.** A small set of component-level semantic aliases is output to make the system easier to communicate to users who only consume the CSS and don't work with the token layer directly. These aliases are defined in the `usage` style set in Figma.

## Consequences

**Usage aliases are a convenience only**; where possible, the typeset-role classes should be used directly, as they are the stable, canonical API of the system. (This does not violate [0002](./0002-token-naming-grammar.md) as these are classes and not tokens)

- The label set steps from 14px (`label-md`) to 18px (`label-lg`) with no 16px role. That is deliberate.
