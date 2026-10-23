# London City Data Design System specification

LCD-DS is a shared set of foundations for the products we build at the GLA. It brings together patterns, components and guidance so that the people who use our work find it consistent and clear, and that while making the work we don't have to solve the same problems from scratch each time.

This specification is for designers and developers who build products with the London City Data Design System (LCD-DS), and for teams who adapt it to other tools. It states the [RULES](./RULES.md) that form the system.

Each rule rests on a [decision](./decisions). The link after a rule points to its decision record.

## Scope

The system can be used in three ways:

- **The full system:** the tokens, classes and components that make up our digital products.
- **Adapting existing systems:** the custom properties, classes, specification and guidance, used outside our core technology stack.
- **Anywhere:** the values, specification and guidance, used in any medium.

This specification covers:

- outputs and set-ups
- design tokens
- typography
- spacing
- flow, the vertical space between blocks
- the layout grid
- colour
- elevation
- visual rules
- charts and tables
- accessibility

## Outputs and set-ups

The system is published as the `@ldn-viz/themes` package. Its CSS custom properties are the public interface. The other outputs either read the custom properties or export their resolved values ([0014](./decisions/0014-distribution-and-outputs.md)).

You can import only the paths listed in the package's `exports` map:

| Output                  | Contains                                                                      |
| ----------------------- | ----------------------------------------------------------------------------- |
| `reset.css`             | Element defaults at zero specificity                                          |
| `tokens.css`            | Every custom property. Light values are on `:root` and dark values on `.dark` |
| `system.css`            | Every class this specification names, as plain CSS                            |
| `index.css`             | Imports `reset.css`, `tokens.css` and `system.css`, in that order             |
| `tailwind`              | The Tailwind preset, which maps Tailwind's theme onto the custom properties   |
| `colors.js`             | Resolved colour values for light and dark mode                                |
| `tokens.scss`           | Sass variables and maps with resolved values                                  |
| `docs/tokens/tokens.js` | Every token with its metadata, for the documentation site                     |

- **The full system:** Import `index.css`, and optionally `tailwind` in a Tailwind app.
- **Adapting existing systems:** Import `tokens.css` and use the CSS custom properties following this specification.
- **Anywhere:** Import `colors.js` or `tokens.scss` and use the resolved values.

The Tailwind preset doesn't add any classes, so `index.css` works without Tailwind ([0015](./decisions/0015-system-classes.md)).

`reset.css` removes browser defaults. All its selectors have zero specificity, so any class overrides them. To use the classes without the reset, import `tokens.css` and `system.css` instead of `index.css` ([0015](./decisions/0015-system-classes.md)).

## Design tokens

Design tokens are defined in Figma as variables. Every token follows the same naming grammar, so that they are simple, flexible and easy to understand ([0002](./decisions/0002-token-naming-grammar.md)).

Tokens are defined in two tiers: primitive and semantic. A primitive token holds a raw value and is named by that value, for example `--primitive-spacing-4`. A semantic token says what a value is for and is named by its role, for example `--semantic-flow-spacious-section`. Components use semantic tokens only ([0002](./decisions/0002-token-naming-grammar.md)).

Figma exports the tokens as JSON, and the Style Dictionary pipeline turns them into CSS custom properties. The pipeline removes the `semantic` segment to keep names short, so `semantic/flow/spacious/section` becomes `--flow-spacious-section`. Primitives keep their `--primitive` prefix, as a guard against using them directly ([0013](./decisions/0013-token-export-and-parsing.md)).

_Note: In the documentation of token patterns below, square brackets `[...]` indicate optional modifiers, and curly braces `{...}` mark a segment that takes one of a set of values._

### Token naming grammar

Every token name is built from the same ordered segments, running from general to specific:

`(tier) → category → variant → concept → role → emphasis → state → property/value`

Segments that don't apply are left out, the rest never change order.

As a minimum a token name contains a category and at least one more segment.
For example: `--color-border` is `--{category}[-{role}]` ([0002](./decisions/0002-token-naming-grammar.md)).

Token names are in lowercase kebab-case. Multi-word values are hyphenated (`semi-bold`, `line-height`). Dots are not valid in CSS names, so fractional steps use a hyphen: `--spacing-0-5`.

#### Segment values

Each segment has a fixed set of values. Within a segment, values are grouped by function. A new value needs a change to this specification ([0002](./decisions/0002-token-naming-grammar.md)).

| Segment          | Group          | Values                                                                                        | Example                                                      |
| ---------------- | -------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Category         |                | `color` `spacing` `typography` `flow` `grid` `shadow` `elevation` `breakpoint`                | `--spacing-4`                                                |
| Variant          | Mode           | `inverse` `static` `mode-light` `mode-dark`                                                   | `--color-inverse-surface`                                    |
|                  | Breakpoint     | `base` `sm` `md` `lg` `xl` `2xl`                                                              | `--typography-md-product-title-md-font-size`                 |
|                  | Scope          | `chart` `geo`                                                                                 | `--color-chart-axis`                                         |
|                  | Typeset        | `longform` `product`                                                                          | `--typography-base-longform-body-md-font-size`               |
|                  | Flow context   | `spacious` `standard` `compact`                                                               | `--flow-spacious-loose`                                      |
|                  | Layout         | `fluid` `contained`                                                                           | `--grid-md-contained-container-padding`                      |
| Concept          | Interface      | `canvas` `surface` `interactive` `text` `label` `border`                                      | `--color-surface`                                            |
|                  | Visualisation  | `data` `feature` `annotation` `axis` `grid`                                                   | `--color-geo-feature`                                        |
|                  | Colour sets    | `palette` `brand` `gla`                                                                       | `--color-static-brand`                                       |
| Role             | Hierarchy      | `primary` `secondary` `tertiary`                                                              | `--color-interactive-primary`                                |
|                  | Feedback       | `positive` `negative` `caution` `neutral`                                                     | `--color-surface-caution`                                    |
|                  | Surface        | `accent` `alpha` `beta` `empty`                                                               | `--color-surface-accent`                                     |
|                  | Data           | `categorical` `context` `male` `female`                                                       | `--color-data-categorical-blue`                              |
|                  | Typography     | `display` `headline` `subhead` `title` `subtitle` `body` `label` `metric` `caption` `eyebrow` | `--typography-base-product-caption-sm-font-size`             |
| Emphasis         | Contrast       | `muted` `wash` `text`                                                                         | `--color-text-muted`                                         |
| State            | Interaction    | `hover` `active` `focus`                                                                      | `--color-interactive-primary-hover`                          |
|                  | Selection      | `selected` `on` `off` `dragged`                                                               | `--color-interactive-selected`                               |
|                  | Availability   | `disabled` `error`                                                                            | `--color-interactive-disabled`                               |
| Property / value | Colour         | hue · hue + step · step · `white` `black` `base`                                              | `--color-palette-blue-500`                                   |
|                  | Size           | `sm` `md` `lg` …                                                                              | `--shadow-md`, `--typography-base-product-body-sm-font-size` |
|                  | Shadow type    | `inner`                                                                                       | `--shadow-inner`                                             |
|                  | Elevation step | `0` to `6`                                                                                    | `--elevation-1`                                              |
|                  | Typography     | `font-family` `font-size` `font-weight` `line-height` `letter-spacing`                        | `--typography-base-product-title-md-line-height`             |
|                  | Layout         | `container-padding`                                                                           | `--grid-base-fluid-container-padding`                        |

A token takes one value for each segment, except the variant segment, which can take two. The first is a breakpoint or a scope, and the second is a typeset, flow context, layout or mode.

Where a semantic set has a default value, that value's name is dropped when no further segment follows it. `--color-border` is the default border colour and `--color-border-default` is not valid. A context or a size is never dropped ([0002](./decisions/0002-token-naming-grammar.md), [0013](./decisions/0013-token-export-and-parsing.md)).

[Flow](#flow) is set by a context class (`.flow-spacious`, `.flow-standard` or `.flow-compact`), which assigns values to the steps (`tight`, `default`, `loose`, `section`). The tokens always name the context: `--flow-standard-tight`, `--flow-standard`, `--flow-standard-loose` and so on. **The utilities don't**: `.mt-flow-{step}` and `.gap-flow-{step}` resolve against the nearest context. The default step follows the implied-default rule, so the utility is `.mt-flow`, not `.mt-flow-default` ([0002](./decisions/0002-token-naming-grammar.md)).

#### Accepted exceptions to the grammar

These names don't follow the grammar exactly. They are accepted ([0002](./decisions/0002-token-naming-grammar.md)).

- **Typography tokens have two property segments.** A role's size (`sm`, `md` or `lg`) comes before the typography property, as in `--typography-base-product-title-md-font-size`.
- **`md` is both a breakpoint and a size.** In `--typography-md-product-title-md-font-size` the first `md` is the breakpoint and the second is the size.
- **Some words are in two segments.** `label` is a concept in `--color-label` and a role in typography. `text` is a concept in `--color-text` and an emphasis in `--color-interactive-primary-text`. `grid` is a category in `--grid-*` and a concept in `--color-chart-grid`.
- **Primitives are named by their step on a scale.** `--primitive-typography-scale-14` is 72px, and `--primitive-spacing-4` is 16px.
- **`base` has no breakpoint token.** It is the range below `sm`, so it has no minimum width. Tokens that vary by breakpoint still include it, as in `--typography-base-product-title-md-font-size`.
- `--color-interactive-disabled-muted` puts state before emphasis.

#### Patterns per tier per category

##### Primitive

**Breakpoint:** `--primitive-breakpoint-{value}`. The breakpoints are `base` below 640px, `sm` from 640px, `md` from 768px, `lg` from 1024px, `xl` from 1280px and `2xl` from 1536px.

**Color:** `--primitive-color-{variant}-{value}`. The `mode-light` and `mode-dark` variants are used only in primitives.

**Typography:** `--primitive-typography-{property}[-{value}]`

**Spacing:** `--primitive-spacing-{value}`

##### Semantic

**Color:** `--color[-{variant}][-{concept}][-{role}][-{emphasis}][-{state}][-{value}]` Scope, mode and inverse are all variants: `--color-inverse-chart-axis`. A mode variant can be followed directly by a value: `--color-static-black`. `--color-interactive-disabled-muted` is an accepted outlier: it puts state before emphasis.

**Typography:** `--typography-{breakpoint}-{typeset}[-{role}][-{size}]-{property}`
Every role has a size except `eyebrow`.

**Spacing:** `--spacing-{value}`

**Flow:** `--flow-{context}[-{step}]` The context is `spacious`, `standard` or `compact`.

**Grid:** `--grid-{breakpoint}-{layout}-container-padding`

**Shadow:** `--shadow[-{value}]`

**Elevation:** `--elevation-{value}`

The system also publishes a small set of classes named for where they are used, such as `.card-title`. They are classes, not tokens, so they are allowed to name a component ([0002](./decisions/0002-token-naming-grammar.md)). They are described in [Usage aliases](#usage-aliases).

## Typography

Typography sets the system's voice and keeps text legible and consistent across our products ([0003](./decisions/0003-typography.md)).

### Typeface

The typeface is **Inter**. Code is set in Source Code Pro. Both are available as web fonts.

| Purpose | Value           |
| ------- | --------------- |
| Display | Inter           |
| Default | Inter           |
| Code    | Source Code Pro |

Display is listed as its own purpose, although it has the same value as the default, so that a display face can be added later without renaming tokens.

If Inter fails to load, text falls back through this stack: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`. Code falls back to the system monospace fonts. The Figma variables have only the first name in each stack. The build adds the rest to the font-family tokens ([0003](./decisions/0003-typography.md)).

### Primitive typography scale

The scale has 17 steps. Step `0` is 16px, the base body size. Negative steps are smaller and positive steps are larger.

| Step | Size (px) | Size (rem) |        |
| ---- | --------- | ---------- | ------ |
| 14   | 72        | 4.5rem     |        |
| 13   | 64        | 4rem       |        |
| 12   | 56        | 3.5rem     |        |
| 11   | 48        | 3rem       |        |
| 10   | 40        | 2.5rem     |        |
| 9    | 36        | 2.25rem    |        |
| 8    | 32        | 2rem       |        |
| 7    | 30        | 1.875rem   |        |
| 6    | 28        | 1.75rem    |        |
| 5    | 26        | 1.625rem   |        |
| 4    | 24        | 1.5rem     |        |
| 3    | 22        | 1.375rem   |        |
| 2    | 20        | 1.25rem    |        |
| 1    | 18        | 1.125rem   |        |
| 0    | 16        | 1rem       | ← base |
| -1   | 14        | 0.875rem   |        |
| -2   | 12        | 0.75rem    |        |

_rem values assume a 16px root font size._

#### Generative logic

The scale is built from five base sizes: 12, 14, 16, 18, (doubled twice) and 20 (doubled once)

**Doubling chains:**

- 12 → 24 → 48
- 14 → 28 → 56
- 16 → 32 → 64
- 18 → 36 → 72
- 20 → 40 (→ 80 if extended)

22, 26 and 30 belong to no chain. They are hand-placed values, included in the lower half of the scale as intermediate sizes for responsive type. Below 32px, each step is about 1.07 to 1.17 times the one before (12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32). The close steps give fine control at interface sizes, where a small difference in size is easier to see than it is at display sizes.

**Extending the scale:**

- Above step 14 (72px): extend the doubling chain — 40 → 80, 48 → 96, 56 → 112 etc.
- Below step -2 (12px): continue the dense-region ratio, giving the next step ≈ 11px.

### Typesets

The system has two typesets: longform for reading, and product for interfaces, tables, charts and maps. Both use the same roles. A typeset can give a role its own font, weight, line height, letter-spacing or size. Longform is airier, which suits long passages of text, and product is tighter, which suits dashboards ([0003](./decisions/0003-typography.md)).

Apart from line height, the only difference is that `subhead-md` and `subhead-lg` are larger in longform at `lg` and `xl`. The [full matrices](#line-height) give every value.

| Class                        | For                                                 | Flow context    | Content styles and widths |
| ---------------------------- | --------------------------------------------------- | --------------- | ------------------------- |
| `typeset-longform`           | Articles, reports and documentation                 | `flow-spacious` | Yes                       |
| `typeset-product`            | Interfaces, tables, charts and maps                 | None            | No                        |
| `typeset-product--formatted` | Content from a CMS or Markdown in a product setting | `flow-standard` | Yes                       |

Plain `typeset-product` sets type only. It is used on component roots, whose markup must not pick up content styles. `typeset-product--formatted` works on its own or beside `typeset-product` ([0015](./decisions/0015-system-classes.md)).

The typeset is chosen once, on a wrapper or app root:

```html
<div class="typeset-longform"></div>
```

where contexts are nested the inner context takes precedence ([0015](./decisions/0015-system-classes.md)):

```html
<article class="typeset-longform">
	<p class="body-md">I am set by the longform typeset</p>
	<div class="typeset-product">
		<p class="body-md">I am set by the product typeset</p>
	</div>
</article>
```

Product is the default typeset. Its role values are also set on `:root`, so a role class outside any typeset still works.

Type changes at five breakpoints: `base`, `sm`, `md`, `lg` and `xl`. There are no `2xl` typography tokens, so type at `2xl` is the same as at `xl` ([0003](./decisions/0003-typography.md)).

#### Content styles

Rendered Markdown and CMS output can't have classes. Inside `typeset-longform` and `typeset-product--formatted`, the system styles these unclassed elements: links, emphasis, inline and block code, lists to three levels, description lists, quotes, rules, tables, figures and disclosure. Print and forced-colours modes have their own rules ([0015](./decisions/0015-system-classes.md)).

Headings and a few other elements also take a role without a class. These element aliases use the sizes of the typeset they are in:

| Element      | Role                       |
| ------------ | -------------------------- |
| `h1`         | `headline-lg`              |
| `h2`         | `headline-sm`              |
| `h3`         | `title-lg`                 |
| `h4`         | `title-md`                 |
| `h5`         | `title-sm`                 |
| `p.lead`     | `body-lg`, in muted colour |
| `figcaption` | `caption-sm`               |

An `h1` in plain `typeset-product` stays unstyled. It needs a role class or a usage alias ([0015](./decisions/0015-system-classes.md)).

Content styles and element aliases have zero specificity of their own, so any class on the element wins. They stop at a `.not-typeset` block and at a different typeset nested inside ([0015](./decisions/0015-system-classes.md)).

#### Content widths

A formatted typeset (`typeset-longform` or `typeset-product--formatted`) sets a maximum width on each of its direct children. The typeset itself has no maximum width ([0015](./decisions/0015-system-classes.md)).

| Width            | Value                  | Applies to                                                      |
| ---------------- | ---------------------- | --------------------------------------------------------------- |
| `--measure-text` | 38 × body size (608px) | Running text                                                    |
| `--measure-wide` | 56 × body size (896px) | `figure`, `img`, `video`, `iframe`, `table`, `pre` and `.chart` |
| `--measure-full` | None                   | Nested typesets and `.not-typeset` blocks                       |

The pixel values are at the 16px body size. `--measure-text` gives about 79 characters of Inter, inside the 80 that WCAG 1.4.8 allows. The widths are multiples of the body size, so the number of characters stays the same if body text grows.

`.width-content`, `.width-content-wide` and `.width-content-full` set a child's width explicitly. A `max-width` utility wins over both the defaults and these classes. The widths are also set on `:root`, so the classes work outside a formatted typeset ([0015](./decisions/0015-system-classes.md)).

#### Roles

Each role has three sizes, `sm`, `md` and `lg`, except `eyebrow`, which has one ([0003](./decisions/0003-typography.md)).

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
| Eyebrow  | Short signpost above a headline or title. Categorises or orientates.                                 |

Distinctions:

- **Display vs Headline**: display is impact; headline is communication.
- **Label vs Caption**: labels are needed to use the interface; captions are optional commentary.
- **Headline vs Title**: headlines open a page or major section; titles name the smaller units within it, whether components or prose blocks.
- **Pairing**: subhead pairs with headline/display, subtitle with title.

No title role is smaller than 20px. A heading inside a small container, such as a popover, a sidebar section or a panel, can use `label-lg`, or `label-md` one level down ([0003](./decisions/0003-typography.md)).

The role set is closed. Adding a role needs a decision record, so reuse an existing role through an alias first ([0003](./decisions/0003-typography.md)).

Each role can be applied with a class named `.{role}-{size}`, such as `.body-md` or `.title-lg`. The eyebrow class is `.eyebrow`. A role class picks up the values for the current breakpoint and typeset, so there is no need to choose breakpoint tokens by hand ([0015](./decisions/0015-system-classes.md)).

The `metric` roles use tabular numerals. `subhead`, `subtitle` and `eyebrow` use the muted text colour, `--color-text-muted`, on the role class and on every alias of it ([0015](./decisions/0015-system-classes.md)).

The system also publishes [usage aliases](#usage-aliases), but use the role classes where you can, because the roles are the system's stable API ([0003](./decisions/0003-typography.md)).

### Font weight

The system has five font weights. No role uses light.

| Token                                          | Weight   | Numeral |
| ---------------------------------------------- | -------- | ------- |
| `--primitive-typography-font-weight-light`     | Light    | 300     |
| `--primitive-typography-font-weight-regular`   | Regular  | 400     |
| `--primitive-typography-font-weight-medium`    | Medium   | 500     |
| `--primitive-typography-font-weight-semi-bold` | Semibold | 600     |
| `--primitive-typography-font-weight-bold`      | Bold     | 700     |

#### Identity weight vs emphasis weight

- **Identity weight** is attached to [role](#roles) within a [typeset](#typesets)
- **Emphasis weight** is a separate modifier that can be applied as an over-ride to give emphasis.

#### Per-role identity weights

Both typesets give each role the same weight.

| Role     | Weight         |
| -------- | -------------- |
| Display  | Bold (700)     |
| Headline | Bold (700)     |
| Subhead  | Regular (400)  |
| Title    | Semibold (600) |
| Subtitle | Regular (400)  |
| Body     | Regular (400)  |
| Label    | Medium (500)   |
| Metric   | Bold (700)     |
| Caption  | Regular (400)  |
| Eyebrow  | Medium (500)   |

#### Emphasis modifier

Two classes change the weight of any role:

```css
.text-strong {
	font-weight: var(--primitive-typography-font-weight-semi-bold);
} /* bump for emphasis */
.text-soft {
	font-weight: var(--primitive-typography-font-weight-regular);
} /* de-emphasize */
```

These classes are part of `system.css`. Components don't bind to primitive tokens this way.

### Line height

Line height is defined in three steps based on a simple formula: `font-size + k`, where font-size and k are measured in px.

| tight           | default         | loose            |
| --------------- | --------------- | ---------------- |
| font-size + 4px | font-size + 8px | font-size + 12px |

Line height comes from the role. There are no line-height utilities. ([0003](./decisions/0003-typography.md)).

#### typeset-longform full matrix

<!-- GEN:longform-matrix START -->

| Role          | base  | sm    | md    | lg    | xl    | Weight |
| ------------- | ----- | ----- | ----- | ----- | ----- | ------ |
| `display-sm`  | 32/40 | 36/44 | 40/48 | 48/56 | 56/64 | 700    |
| `display-md`  | 36/44 | 40/48 | 48/56 | 56/64 | 64/72 | 700    |
| `display-lg`  | 40/48 | 48/56 | 56/64 | 64/72 | 72/80 | 700    |
| `headline-sm` | 26/34 | 26/34 | 26/34 | 26/34 | 26/34 | 700    |
| `headline-md` | 28/36 | 28/36 | 30/38 | 30/38 | 30/38 | 700    |
| `headline-lg` | 30/38 | 32/40 | 36/44 | 36/44 | 40/48 | 700    |
| `subhead-sm`  | 20/28 | 20/28 | 20/28 | 20/28 | 20/28 | 400    |
| `subhead-md`  | 22/30 | 22/30 | 22/30 | 24/32 | 24/32 | 400    |
| `subhead-lg`  | 24/32 | 24/32 | 24/32 | 26/34 | 26/34 | 400    |
| `title-sm`    | 20/28 | 20/28 | 20/28 | 20/28 | 20/28 | 600    |
| `title-md`    | 22/30 | 22/30 | 22/30 | 22/30 | 22/30 | 600    |
| `title-lg`    | 24/32 | 24/32 | 24/32 | 24/32 | 24/32 | 600    |
| `subtitle-sm` | 16/24 | 16/24 | 16/24 | 16/24 | 16/24 | 400    |
| `subtitle-md` | 18/26 | 18/26 | 18/26 | 18/26 | 18/26 | 400    |
| `subtitle-lg` | 20/28 | 20/28 | 20/28 | 20/28 | 20/28 | 400    |
| `body-sm`     | 14/26 | 14/26 | 14/26 | 14/26 | 14/26 | 400    |
| `body-md`     | 16/28 | 16/28 | 16/28 | 16/28 | 16/28 | 400    |
| `body-lg`     | 18/30 | 18/30 | 18/30 | 18/30 | 18/30 | 400    |
| `label-sm`    | 12/20 | 12/20 | 12/20 | 12/20 | 12/20 | 500    |
| `label-md`    | 14/22 | 14/22 | 14/22 | 14/22 | 14/22 | 500    |
| `label-lg`    | 18/26 | 18/26 | 18/26 | 18/26 | 18/26 | 500    |
| `metric-sm`   | 20/24 | 20/24 | 20/24 | 20/24 | 20/24 | 700    |
| `metric-md`   | 24/28 | 24/28 | 24/28 | 24/28 | 24/28 | 700    |
| `metric-lg`   | 28/32 | 30/34 | 32/36 | 32/36 | 36/40 | 700    |
| `caption-sm`  | 12/16 | 12/16 | 12/16 | 12/16 | 12/16 | 400    |
| `caption-md`  | 14/18 | 14/18 | 14/18 | 14/18 | 14/18 | 400    |
| `caption-lg`  | 16/20 | 16/20 | 16/20 | 16/20 | 16/20 | 400    |
| `eyebrow`     | 14/18 | 14/18 | 14/18 | 14/18 | 14/18 | 500    |

_Font size / line height in px. Breakpoints: base <640, sm ≥640, md ≥768, lg ≥1024, xl ≥1280._

<!-- GEN:longform-matrix END -->

#### typeset-product full matrix

<!-- GEN:product-matrix START -->

| Role          | base  | sm    | md    | lg    | xl    | Weight |
| ------------- | ----- | ----- | ----- | ----- | ----- | ------ |
| `display-sm`  | 32/40 | 36/44 | 40/48 | 48/56 | 56/64 | 700    |
| `display-md`  | 36/44 | 40/48 | 48/56 | 56/64 | 64/72 | 700    |
| `display-lg`  | 40/48 | 48/56 | 56/64 | 64/72 | 72/80 | 700    |
| `headline-sm` | 26/34 | 26/34 | 26/34 | 26/34 | 26/34 | 700    |
| `headline-md` | 28/36 | 28/36 | 30/38 | 30/38 | 30/38 | 700    |
| `headline-lg` | 30/38 | 32/40 | 36/44 | 36/44 | 40/48 | 700    |
| `subhead-sm`  | 20/28 | 20/28 | 20/28 | 20/28 | 20/28 | 400    |
| `subhead-md`  | 22/30 | 22/30 | 22/30 | 22/30 | 22/30 | 400    |
| `subhead-lg`  | 24/32 | 24/32 | 24/32 | 24/32 | 24/32 | 400    |
| `title-sm`    | 20/28 | 20/28 | 20/28 | 20/28 | 20/28 | 600    |
| `title-md`    | 22/30 | 22/30 | 22/30 | 22/30 | 22/30 | 600    |
| `title-lg`    | 24/32 | 24/32 | 24/32 | 24/32 | 24/32 | 600    |
| `subtitle-sm` | 16/24 | 16/24 | 16/24 | 16/24 | 16/24 | 400    |
| `subtitle-md` | 18/26 | 18/26 | 18/26 | 18/26 | 18/26 | 400    |
| `subtitle-lg` | 20/28 | 20/28 | 20/28 | 20/28 | 20/28 | 400    |
| `body-sm`     | 14/22 | 14/22 | 14/22 | 14/22 | 14/22 | 400    |
| `body-md`     | 16/24 | 16/24 | 16/24 | 16/24 | 16/24 | 400    |
| `body-lg`     | 18/26 | 18/26 | 18/26 | 18/26 | 18/26 | 400    |
| `label-sm`    | 12/20 | 12/20 | 12/20 | 12/20 | 12/20 | 500    |
| `label-md`    | 14/22 | 14/22 | 14/22 | 14/22 | 14/22 | 500    |
| `label-lg`    | 18/26 | 18/26 | 18/26 | 18/26 | 18/26 | 500    |
| `metric-sm`   | 20/24 | 20/24 | 20/24 | 20/24 | 20/24 | 700    |
| `metric-md`   | 24/28 | 24/28 | 24/28 | 24/28 | 24/28 | 700    |
| `metric-lg`   | 28/32 | 30/34 | 32/36 | 32/36 | 36/40 | 700    |
| `caption-sm`  | 12/16 | 12/16 | 12/16 | 12/16 | 12/16 | 400    |
| `caption-md`  | 14/18 | 14/18 | 14/18 | 14/18 | 14/18 | 400    |
| `caption-lg`  | 16/20 | 16/20 | 16/20 | 16/20 | 16/20 | 400    |
| `eyebrow`     | 14/18 | 14/18 | 14/18 | 14/18 | 14/18 | 500    |

_Font size / line height in px. Breakpoints: base <640, sm ≥640, md ≥768, lg ≥1024, xl ≥1280._

<!-- GEN:product-matrix END -->

### Usage aliases

Usage aliases are classes for people who use the system's CSS without working with its tokens or typesets. Each alias applies an existing role, sometimes with tabular numerals or the muted colour, and resolves against the nearest typeset ([0003](./decisions/0003-typography.md), [0015](./decisions/0015-system-classes.md)).

Aliases are named `{place}-{part}`, for example `.card-title`, `.chart-tick` and `.dashboard-section-title`.

The aliases are defined in the `usage` style set in Figma, and the classes are generated from its export. Adding an alias needs a decision record ([0003](./decisions/0003-typography.md), [0015](./decisions/0015-system-classes.md)).

<!-- GEN:alias-table START -->

| Alias                         | Role           | Adds                           |
| ----------------------------- | -------------- | ------------------------------ |
| `.chart-title`                | `.title-sm`    |                                |
| `.chart-subtitle`             | `.subtitle-sm` | muted colour                   |
| `.chart-axis-title`           | `.label-md`    | muted colour                   |
| `.chart-label`                | `.label-md`    |                                |
| `.chart-tick`                 | `.caption-md`  | tabular numerals, muted colour |
| `.chart-tick-sm`              | `.caption-sm`  | tabular numerals, muted colour |
| `.chart-note`                 | `.caption-sm`  |                                |
| `.table-title`                | `.title-sm`    |                                |
| `.table-subtitle`             | `.subtitle-sm` | muted colour                   |
| `.table-col-head`             | `.label-md`    | tabular numerals               |
| `.table-col-head-sm`          | `.label-sm`    | tabular numerals               |
| `.table-body`                 | `.body-sm`     | tabular numerals               |
| `.dashboard-main-title`       | `.headline-md` |                                |
| `.dashboard-main-subtitle`    | `.subhead-md`  | muted colour                   |
| `.dashboard-section-title`    | `.headline-sm` |                                |
| `.dashboard-section-subtitle` | `.subhead-sm`  | muted colour                   |
| `.header-title`               | `.title-sm`    |                                |
| `.sidebar-title`              | `.title-sm`    |                                |
| `.dialog-title`               | `.label-lg`    |                                |
| `.card-title`                 | `.title-sm`    |                                |
| `.card-subtitle`              | `.subtitle-sm` | muted colour                   |
| `.input-hint`                 | `.caption-sm`  |                                |
| `.input-label`                | `.label-md`    |                                |
| `.input-placeholder`          | `.body-sm`     |                                |
| `.input-value`                | `.body-sm`     |                                |
| `.button-label`               | `.label-md`    |                                |
| `.button-label-sm`            | `.label-sm`    |                                |

<!-- GEN:alias-table END -->

### Title groups

A title group is the text at the top of a component such as a card, chart, table or panel. It has up to three parts, stacked in this order: an optional eyebrow, a title and an optional subtitle. Each part uses the role of the same name ([0012](./decisions/0012-title-groupings.md)).

A component can contain other titled components. A card might hold one chart, or a pair of charts, each with its own title group. If every group kept all its parts, two or more titles of similar weight would compete.

When a component contains one title group, that group can use all three parts.

When a component contains two or more title groups, the designer chooses one to be dominant. The dominant group has a title and an optional subtitle, and no eyebrow. Each other group is demoted to an eyebrow, which holds the text that would have been its title. A subtitle pairs only with a dominant title, so a demoted group has no subtitle ([0012](./decisions/0012-title-groupings.md)).

A title group's title uses `title-sm` unless the design needs a larger one ([0012](./decisions/0012-title-groupings.md)).

The parts of a title group have no space between them, in every typeset and flow context. Their line heights separate them ([0005](./decisions/0005-flow.md), [0012](./decisions/0012-title-groupings.md)).

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

_In an article or marketing page block the eyebrow can be used as a purely stylistic kicker above display text or a headline._

[Chrome](#chrome) describes the components that render a title group.

## Spacing

Spacing uses one numbered scale. The number is a multiple of 4px, so `--spacing-4` is 16px. Below 16px there are half steps for finer control (`--spacing-1-5` is 6px), and `--spacing-px` is 1px. Use `--spacing-{n}`, never the primitive. There are no named spacing sets apart from flow ([0004](./decisions/0004-spacing.md)).

Space does one of two jobs. Space that builds a component, such as padding, borders or an indent, uses the spacing scale. Space between blocks of content uses [flow](#flow), which changes with its context ([0004](./decisions/0004-spacing.md)).

<!-- GEN:spacing-table START -->

| Token           | px  | rem       |
| --------------- | --- | --------- |
| `--spacing-1`   | 4   | 0.25rem   |
| `--spacing-2`   | 8   | 0.5rem    |
| `--spacing-3`   | 12  | 0.75rem   |
| `--spacing-4`   | 16  | 1rem      |
| `--spacing-5`   | 20  | 1.25rem   |
| `--spacing-6`   | 24  | 1.5rem    |
| `--spacing-7`   | 28  | 1.75rem   |
| `--spacing-8`   | 32  | 2rem      |
| `--spacing-10`  | 40  | 2.5rem    |
| `--spacing-12`  | 48  | 3rem      |
| `--spacing-14`  | 56  | 3.5rem    |
| `--spacing-16`  | 64  | 4rem      |
| `--spacing-20`  | 80  | 5rem      |
| `--spacing-24`  | 96  | 6rem      |
| `--spacing-px`  | 1   | 0.0625rem |
| `--spacing-0-5` | 2   | 0.125rem  |
| `--spacing-1-5` | 6   | 0.375rem  |
| `--spacing-2-5` | 10  | 0.625rem  |
| `--spacing-3-5` | 14  | 0.875rem  |

<!-- GEN:spacing-table END -->

## Flow

Flow is the vertical space between blocks of content, such as a heading and its paragraph, or one card and the next ([0005](./decisions/0005-flow.md)).

### Contexts and steps

Flow is set on a container by a context class: `flow-spacious`, `flow-standard` or `flow-compact`. Each context gives a value to four steps: `tight`, `default`, `loose` and `section`. The step says how closely two blocks are related. The context sets the distance ([0005](./decisions/0005-flow.md)).

Choose the context by the space available. `flow-compact` is for surfaces too small to show four distinct gaps, such as control panels, map overlays, tooltips and dense sidebars. In it, `tight` equals `default` and `loose` equals `section`. Other product surfaces use `flow-standard`. Reading content uses `flow-spacious`, which `typeset-longform` sets ([0005](./decisions/0005-flow.md)).

`typeset-longform` sets `flow-spacious`, and `typeset-product--formatted` sets `flow-standard`. Plain `typeset-product` sets no flow, and a flow context never sets a typeset. Outside any context, the steps take the standard values ([0005](./decisions/0005-flow.md), [0016](./decisions/0016-flow-in-system-css.md)).

<!-- GEN:flow-table START -->

| Step      | Utility            | spacious | standard | compact |
| --------- | ------------------ | -------- | -------- | ------- |
| `tight`   | `.mt-flow-tight`   | 4        | 4        | 4       |
| `default` | `.mt-flow`         | 16       | 8        | 4       |
| `loose`   | `.mt-flow-loose`   | 24       | 16       | 8       |
| `section` | `.mt-flow-section` | 40       | 24       | 8       |

_Values in px._

<!-- GEN:flow-table END -->

### Which step each child takes

A flow context spaces only its direct children. It sets their margins to zero, then gives each child, after the first, a top margin. The size of the margin comes from the value that the step receives from the context.

The same rules apply in every context ([0005](./decisions/0005-flow.md), [0016](./decisions/0016-flow-in-system-css.md)), they are:

- Any child is spaced at `default`.
- A block object, and the child after it, are spaced at `loose`.
- A major heading is spaced at `section`, and a minor heading at `loose`. Headings below `h5` are discouraged, so `h6` has no rule and is spaced at `default`.
- The parts of a title group have no step: a heading straight after another heading, a subtitle or subhead straight after its heading, and a heading straight after its eyebrow. An eyebrow before a major heading is spaced at `section`, so the group is set off as one ([0012](./decisions/0012-title-groupings.md)).
- A caption is coupled to what it captions at the `tight` step: `figcaption` in a `figure`, `caption` in a `table`, and a caption role or `.chart-note` straight after a block object.
- Inside a child, list items and nested lists are spaced at `tight`. In a `dl`, each `dd` is spaced at `tight`, and each `dt` after the first at `default`.

The table below gives the step for each element:

<!-- GEN:flow-map START -->

| Element                            | After          | Step      |
| ---------------------------------- | -------------- | --------- |
| any element                        | any element    | `default` |
| a block object                     | any element    | `loose`   |
| any element                        | a block object | `loose`   |
| a major heading                    | any element    | `section` |
| a minor heading                    | any element    | `loose`   |
| a heading                          | a heading      | none      |
| a subtitle or subhead              | a heading      | none      |
| a heading                          | an eyebrow     | none      |
| an eyebrow, before a major heading | any element    | `section` |
| `figure > figcaption`              | —              | `tight`   |
| a caption                          | a block object | `tight`   |
| `:is(ul, ol) li + li`              | —              | `tight`   |
| `:is(ul, ol) li > :is(ul, ol)`     | —              | `tight`   |
| `dl > dd`                          | —              | `tight`   |
| `dl > dt`                          | —              | `default` |
| `dl > dt:first-child`              | —              | none      |

_Later rows win. A heading is a role class, a usage alias or an element alias on that role: major is display and headline (`h1`, `h2`), minor is title (`h3` to `h5`). A block object is `figure`, `img`, `table`, `pre`, `blockquote` or `.chart`._

<!-- GEN:flow-map END -->

Children with `.sr-only` or `hidden`, and `template` elements, are skipped, and nothing is spaced from them.

### Utilities

`mt-flow-{step}` sets the space above one element, and replaces the step the rules gave it. `gap-flow-{step}` sets the gap between the children of a flex or grid container that is not itself a flow context. Both resolve against the nearest context, and their names don't include the context ([0005](./decisions/0005-flow.md)).

There are no responsive or state variants of the flow utilities, such as `md:mt-flow-loose` ([0016](./decisions/0016-flow-in-system-css.md)).

A context class and `gap-flow-*` on the same element add together, so don't combine them ([0005](./decisions/0005-flow.md)).

### Components and nesting

Flow spaces only the direct children of its context. ([0005](./decisions/0005-flow.md)).

A component that needs its own density declares its own flow context ([0005](./decisions/0005-flow.md)).

The space above a nested context comes from the outer context ([0016](./decisions/0016-flow-in-system-css.md)).

## Layout grid

A page uses one of two layouts ([0017](./decisions/0017-layout-grid.md)):

- **Contained**, with `.container`, is for document-like pages such as articles, documentation and forms. Its width steps up with the breakpoints, it is centred, and its padding grows with the viewport.
- **Fluid**, with `.container-fluid`, is for dashboards and application shells. It fills the width of the viewport, and its padding stays between 16px and 24px.

The padding for each breakpoint and layout is set by `--grid-{breakpoint}-{contained|fluid}-container-padding`.

<!-- GEN:grid-table START -->

| Breakpoint | Contained width | Contained padding | Fluid padding |
| ---------- | --------------- | ----------------- | ------------- |
| `base`     | 100%            | 16                | 16            |
| `sm`       | 640             | 32                | 16            |
| `md`       | 768             | 32                | 24            |
| `lg`       | 1024            | 64                | 24            |
| `xl`       | 1280            | 80                | 24            |
| `2xl`      | 1536            | 96                | 24            |

_Values in px. The fluid layout is always the full width._

<!-- GEN:grid-table END -->

The space between tiled blocks, such as cards or panels, is the default flow step of the context, set with `gap-flow` on the grid or flex container. A row of blocks and a stack of blocks then have the same space between them, and both follow the density of the context ([0017](./decisions/0017-layout-grid.md)).

There are no column tokens. Columns are set with CSS grid, or Tailwind's grid utilities, on each page ([0017](./decisions/0017-layout-grid.md)).

Both layout classes are in `system.css`, so the contained layout works without Tailwind ([0017](./decisions/0017-layout-grid.md)).

## Colour

Every semantic colour has a light and a dark value. Light values are set on `:root` and dark values on `.dark`. A component that uses semantic tokens changes mode with no changes of its own ([0018](./decisions/0018-colour.md)).

### Choosing a colour

Choose a token by the role of the element ([0018](./decisions/0018-colour.md)):

| Group       | Tokens                                                                                                           | Use for                                                      |
| ----------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Text        | `--color-text`, `--color-text-muted`, `--color-text-wash`                                                        | Text, in decreasing emphasis                                 |
| Label       | `--color-label`, `--color-label-muted`                                                                           | Labels on controls                                           |
| Canvas      | `--color-canvas`, `--color-canvas-muted`                                                                         | The page background                                          |
| Surface     | `--color-surface` and `--color-surface-{role}`, each with a `-muted` version                                     | Cards, panels and status areas                               |
| Border      | `--color-border`, `--color-border-muted`                                                                         | Borders and dividers                                         |
| Interactive | `--color-interactive-*`                                                                                          | Controls, links and their states                             |
| Inverse     | `--color-inverse-*`                                                                                              | Content on an inverse background                             |
| Static      | `--color-static-white`, `--color-static-black`, `--color-static-brand`, `--color-static-gla-{hue}`               | Colours that don't change with the mode                      |
| Data        | `--color-data-*`                                                                                                 | Chart and map data ([Charts and tables](#charts-and-tables)) |
| Chart       | `--color-chart-surface`, `-axis`, `-grid`, `-label`, `-label-muted`                                              | Chart backgrounds, axes, grid lines and labels               |
| Geo         | `--color-geo-feature`, `-label` and `-annotation`, each with a `-muted` version, and `--color-geo-interactive-*` | Maps                                                         |

The surface roles are `accent`, `alpha`, `beta`, `positive`, `negative`, `caution`, `neutral` and `empty`.

The palette, `--color-palette-{hue}-{step}`, is not used in components. Its one use is a quantitative scale in a chart or map ([0018](./decisions/0018-colour.md), [0008](./decisions/0008-charts.md)).

### Canvas and surface

The canvas is the page background. A surface is a card or panel on it. [Elevation](#elevation) sets a surface apart from the canvas. ([0018](./decisions/0018-colour.md), [0011](./decisions/0011-elevation.md)).

### Interactive colours

Interactive tokens are chosen by intent, then emphasis, then state: `--color-interactive-{intent}[-muted][-{state}]`. The intents are `primary`, `secondary`, `positive`, `negative` and `caution`. The states are `hover` and `active` ([0018](./decisions/0018-colour.md)).

`--color-interactive-primary-text`, with hover and active states, is for links and text buttons. The selection and availability states, such as `--color-interactive-selected` and `--color-interactive-error`, are tokens of their own. Focus has one colour, `--color-interactive-focus` ([0019](./decisions/0019-accessibility.md)).

Text and icons on a filled control use `--color-inverse-text`. The exception is `primary`, whose fill stays dark in both modes. Its text uses `--color-static-white` ([0018](./decisions/0018-colour.md)).

Disabled text and icons use `--color-interactive-disabled`. A disabled fill uses `--color-interactive-disabled-muted` ([0018](./decisions/0018-colour.md)).

### Inverse and static colours

Content on an inverse background uses the `inverse` tokens, such as `--color-inverse-text` on `--color-inverse-surface` ([0018](./decisions/0018-colour.md)).

`static` colours don't change with the mode. They are for the few places that must look the same in both: `--color-static-white`, `--color-static-black`, `--color-static-brand`, and the GLA brand hues as `--color-static-gla-{hue}` ([0018](./decisions/0018-colour.md)).

## Elevation

An interface is a stack. The canvas is at the base, and surfaces sit above it at different levels of elevation. Each level is shown by a shadow ([0011](./decisions/0011-elevation.md)).

Elevation runs from `elevation-0` to `elevation-6`. `elevation-0` sits on the canvas and has no visual effect. Each step above it raises a surface further. An elevation class sets the box shadow from its token, `--elevation-{0–6}` ([0011](./decisions/0011-elevation.md)).

A surface's level is set by its colour and its elevation. The surface colour is `--color-surface`, or `--color-surface-muted` to set it apart from what is around it, and the elevation step is the level. There are no colour tokens for levels ([0011](./decisions/0011-elevation.md)).

Elevation is visual only. Stacking order is set by z-index, which is independent of elevation ([0011](./decisions/0011-elevation.md)).

The shadow tokens are still published, but a level of elevation uses an elevation step, not a shadow size ([0002](./decisions/0002-token-naming-grammar.md)). `--elevation-1` to `--elevation-6` have the same values as `--shadow-sm`, `--shadow`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` and `--shadow-2xl`. `--shadow-inner` has no elevation step.

## Visual rules

Corners are square. The radius is 0 everywhere. Only things that are round, such as a circular avatar or a dot, have a radius. Bars, cards, cells, buttons, inputs and containers are never rounded ([0006](./decisions/0006-visual-rules.md)).

## Charts and tables

Code is the source of truth for charts and tables. Figma versions are
representative: they are built to look right, not to be accurate to the data ([0001](./decisions/0001-sources-of-truth.md), [0008](./decisions/0008-charts.md)). Observable Plot or D3 draws the real charts.

Chart text uses the product typeset roles or the usage aliases. Chart colours
use the `data` and `chart` colour tokens ([0008](./decisions/0008-charts.md)).

Category and x-axis labels sit below the baseline. Y-axis ticks sit to the left of the plot ([0008](./decisions/0008-charts.md)).

### Chrome

Cards, charts and tables share the same chrome: a header above the content and a footer below it. `Card`, `ChartContainer` and `TableContainer` in the component library each build from the same three parts ([0008](./decisions/0008-charts.md)):

- **`ChromeHeader`** holds a [title group](#title-groups), rendered by `TitleGroup`, and an optional hint at the right. The hint is a help overlay, not a typography role.
- **`ChromeFooter`** holds the footnotes at the left (byline, source, note, and a button that opens a chart's or table's description) and the actions at the right, such as the data and image download buttons. The footnotes use `caption-sm` in the muted text colour.
- **`TitleGroup`** renders the eyebrow, title and subtitle, or only an eyebrow when the group is demoted.

`Card` is a surface: it has the surface colour, a muted border, `elevation-1` and padding, and spaces its header, content and footer with `gap-flow`.

The designer composes the middle of `ChartContainer` for each chart. It has slots for the controls, the legend and the plot. The legend has its own slot so that plots side by side stay aligned when their legends wrap to different heights ([0008](./decisions/0008-charts.md)).

### Data colour

Series take the data roles in order: `--color-data-primary`, `--color-data-secondary`, then `--color-data-tertiary`.

To highlight one series, set it in `--color-data-primary` and the rest in `--color-data-context`, which is grey ([0008](./decisions/0008-charts.md)).

Categories with no order or ranking can use the categorical palette, `--color-data-categorical-{hue}`, instead of the series roles. ([0008](./decisions/0008-charts.md)).

A chart uses no more than three categorical colours. A chart that needs colours beyond the three series roles takes them from the categorical palette, choosing hues with the most contrast against the background. Where more categories need telling apart, use labels, line styles or small multiples ([0008](./decisions/0008-charts.md)).

Common encodings have their own roles ([0008](./decisions/0008-charts.md)):

| Token                                            | Use for                                                                                                                           |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `--color-data-positive`, `--color-data-negative` | Diverging data such as opinion, and good and bad. Blue and red, which avoid the red–green pair that many readers can't tell apart |
| `--color-data-neutral-0`                         | "Neither"                                                                                                                         |
| `--color-data-neutral-1`                         | "Don't know"                                                                                                                      |
| `--color-data-male`, `--color-data-female`       | Sex in demographic data. Green and purple                                                                                         |

### Quantitative scales

Quantitative scales are built from the palette ramps. There are no scale tokens ([0008](./decisions/0008-charts.md)).

A sequential scale uses up to five steps of one hue, `--color-palette-blue-{step}` by default, with the higher value on the higher step. Palette steps rise in contrast against the background in both modes, so the scale reverses in dark mode with no changes.

A diverging scale uses the red ramp for negative values and the blue ramp for positive values. It can add a grey step for values that are exactly zero. A scale that needs more than one hue uses an established perceptually even ramp, such as viridis.

### Chart and map colours

The background, axes, grid lines and labels use the `chart` tokens: `--color-chart-surface`, `--color-chart-axis`, `--color-chart-grid`, `--color-chart-label` and `--color-chart-label-muted`. Maps use the `geo` tokens. Both have `inverse` versions for content on an inverse background ([0008](./decisions/0008-charts.md), [0018](./decisions/0018-colour.md)).

### Tables in Figma

The Figma table kit is built from cells, rows and header rows. Cells have fixed widths, and everything above them hugs, so columns line up. The cell is the unit that is swapped. Its renderer (text, number, boolean or mini-chart) sets its alignment. The widths are xs 64, sm 88, md 120, lg 220, xl 300, or fill, which is set on the instance ([0007](./decisions/0007-tables.md)).

## Accessibility

The target is WCAG 2.2 AA, for components, documentation pages and the Figma library ([0019](./decisions/0019-accessibility.md)).

### Focus

Focus has one colour, `--color-interactive-focus`, and two forms. ([0019](./decisions/0019-accessibility.md)).

- **By default, an outline on `:focus-visible`.** It is `max(2px, 0.08em)` solid, offset by its own width. An element can change it with `--outline-size`, `--outline-style`, `--outline-color` and `--outline-offset`.
- **On a filled control, an inset ring.** `Button`, `TabLabel`, `CheckboxSolid` and `RadioButtonSolid` turn the outline off and draw two lines inside their edge: 2px of `--color-interactive-focus` at the edge, and 2px of `--color-surface` inside it. The surface line keeps the focus line visible against the control's fill. Because the ring is inside the edge, focus stays visible on the tabbed sidebar buttons.

The Figma `focus` effect style draws the same inset ring with two inner shadows, bound to `interactive/focus` and `surface` ([0019](./decisions/0019-accessibility.md)).

### Contrast

Contrast follows WCAG: 4.5:1 for text, 3:1 for large text, and 3:1 for interface components and the parts of a chart that show data ([0019](./decisions/0019-accessibility.md)).

Two data colours are exceptions to the 3:1 rule:

- `--color-data-context` is for the series behind a highlighted one. It is always used with `--color-data-primary`, and has no meaning on its own.
- `--color-data-categorical-yellow` is used only for large areas, with an outline or a direct label.

### Text size and width

No text is smaller than 12px. The smallest roles, `label-sm` and `caption-sm`, are 12px ([0019](./decisions/0019-accessibility.md)).

Running text is no wider than 80 characters. The [content widths](#content-widths) keep it to about 79 ([0019](./decisions/0019-accessibility.md), [0015](./decisions/0015-system-classes.md)).
