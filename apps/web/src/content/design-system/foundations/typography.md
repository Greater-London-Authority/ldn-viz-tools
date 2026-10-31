---
title: Typography
description: Coherent and consistent use of type
navLabel: Typography
heroImage: header-foundations-overflow.svg
thumbnail: cta-foundations-4.svg
order: 2
---

<script>
    import TypographyTable from '$lib/components/typography/TypographyTable.svelte'
    import UsageTabs from '$lib/components/usageTabs/UsageTabs.svelte'
    import TokenReference from '$lib/components/tokenReference/TokenReference.svelte'
    import { Card, PlaceholderImage, TitleGroup } from '@ldn-viz/ui'
    import { ChartContainer } from '@ldn-viz/charts'

    const roles = [
        {text: 'Display', usage: 'High-impact text, such as a homepage hero. Use sparingly.', class: 'display-lg'},
        {text: 'Headline', usage: 'The main statement of a page or a major section.', class: 'headline-lg'},
        {text: 'Subhead', usage: 'A supporting line under a headline or display.', class: 'subhead-lg'},
        {text: 'Title', usage: 'The name of a unit within the page: a card, panel, chart, table or block of prose.', class: 'title-md'},
        {text: 'Subtitle', usage: 'A supporting line under a title.', class: 'subtitle-md'},
        {text: 'Body', usage: 'Running text.', class: 'body-md'},
        {text: 'Label', usage: 'Text needed to use the interface: buttons, inputs, tabs.', class: 'label-md'},
        {text: '1,284', usage: 'Metric: a figure shown as the content itself.', class: 'metric-lg'},
        {text: 'Caption', usage: 'Optional notes: image and chart captions, sources, helper text.', class: 'caption-sm'},
        {text: 'Eyebrow', usage: 'A short signpost above a headline or title.', class: 'eyebrow'}
        ]
</script>

<p class="lead">Typography defines tone and ensures information is clear, legible, and consistent. Together with our spacing guidelines, it creates a balanced, accessible, and reliable user experience.</p>

## Use

<UsageTabs>
{#snippet full()}

The components already have the typography system applied.

For example if you use the title components like `TitleGroup`, `DashboardTitle` and `PageTitle` they handle setting the type on a title group for you.

```svelte
<script>
	import { TitleGroup } from '@ldn-viz/ui';
</script>

<TitleGroup
	eyebrow="Air quality"
	title="Nitrogen dioxide"
	subtitle="Rolling 24-hour mean"
	headingLevel={3}
/>
```

<div class="typeset-product bg-color-surface p-4 my-4">
	<TitleGroup eyebrow="Air quality" title="Nitrogen dioxide" subtitle="Rolling 24-hour mean" headingLevel={3} />
</div>

Where you can't use a component and in your own markup you need to set your own type. The rest of this page explains how.

{/snippet}
{#snippet adapting()}

Ensure you are loading the font [Inter](https://fonts.google.com/specimen/Inter)

Import the tokens, the system's classes and a reset:

```css
@import '@ldn-viz/themes/index.css';
```

If your app has its own reset, import `tokens.css` and `system.css` instead.

```css
@import '@ldn-viz/themes/tokens.css';
@import '@ldn-viz/themes/system.css';
```

The system provides CSS custom properties by role.

```css
/* --{role}-font-size */
--headline-sm-font-size
```

The typeset sets the value of the custom property across breakpoints so you can create a single class that will follow the type system across different screen widths.

```css
.panel-heading {
	font-family: var(--headline-sm-font-family);
	font-size: var(--headline-sm-font-size);
	font-weight: var(--headline-sm-font-weight);
	line-height: var(--headline-sm-line-height);
	letter-spacing: var(--headline-sm-letter-spacing);
}
```

{/snippet}
{#snippet anywhere()}

Set text in Inter, which is available from [Google Fonts](https://fonts.google.com/specimen/Inter).

Choose the right typeset for the context: <b>longform</b> for reading, and <b>product</b> for interfaces, tables, charts and maps. Then take each role's size, weight, line height and letter spacing from the [reference](#reference). Roles that change size have a value for each breakpoint.

{/snippet}

</UsageTabs>

<p class="body-sm text-color-text-muted"><span class="text-strong">note:</span> Some of the examples below use Tailwind utilities for color and padding. You don't need Tailwind to use the system.</p>

### Choose a typeset

Set the right typeset for the page or component you are building. There are two typesets: <b>longform</b> for reading, and <b>product</b> for interfaces, tables, charts and maps.

The typeset dictates the size and spacing behaviour of its children.

Set by adding a class to a containing element. Where typesets are nested the inner one applies.

```html
<article class="typeset-longform">
	<p class="body-md">Set by the longform typeset</p>
	<div class="typeset-product">
		<p class="body-md">Set by the product typeset</p>
	</div>
</article>
```

Read more detail about [how typesets work](#typesets)

### Give text a role

The system describes type by <b>role</b>. A role names the <b>job</b> a piece of text does; an article <b>headline</b>, an input <b>label</b>, the <b>title</b> of a chart, and dictates every property that job requires: font family, size, weight, line height and letter spacing.

Each role's job, sizes and weight are listed under [Roles](#roles).

Roles are applied by giving the element a class that corresponds to the role.

```html
<h3 class="title-lg">The large title role</h3>
```

The closest typeset context then applies values to the roles properties: font family, size, weight, line height and letter spacing.

```html
<article class="typeset-longform">
	<p class="body-md">The medium body title role. Properties set by the longform typeset</p>
</article>

<article class="typeset-product">
	<p class="body-md">The medium body title role. Properties set by the product typeset</p>
</article>
```

<div class="width-content-wide not-typeset grid gap-4 bg-color-canvas-muted p-4 my-4 md:grid-cols-2">
	<div class="typeset-longform bg-color-surface p-4 ">
		<p class="body-md">The medium body title role. Properties set by the longform typeset</p>
	</div>
	<div class="typeset-product bg-color-surface p-4 ">
		<p class="body-md">The medium body title role. Properties set by the product typeset</p>
	</div>
	<p class="caption-sm col-span-full text-color-text-muted">The product typeset applies a tighter line height on this role</p>
</div>

### Formatted content

In some situations like rendering Markdown or content from a CMS, it might not be possible to add classes to every element on the page. Inside `typeset-longform` and `typeset-product--formatted` plain html is styled without the need for direct role classes. A class on the element replaces its default style.

```html
<div class="typeset-product--formatted">
	<h3>About this data</h3>
	<p>Counts are provisional until the annual release.</p>
	<ul>
		<li>Source: GLA City Intelligence</li>
		<li>Updated quarterly</li>
	</ul>
	<p class="body-sm">Style over-ride</p>
</div>
```

<div class="width-content-wide bg-color-canvas-muted p-4 my-4">
	<div class="typeset-product-formatted bg-color-surface p-4">
		<h3>About this data</h3>
		<p>Counts are provisional until the annual release.</p>
		<ul>
			<li>Source: GLA City Intelligence</li>
			<li>Updated quarterly</li>
		</ul>
		<p class="body-sm">Style over-ride</p>
	</div>
</div>

See the [reference](#reference) for the styling that is applied per element.

#### Content width

In a formatted typeset, running text is limited to 38 times the body size, which is 608px at a 16px body size. Figures, images, videos, tables, code blocks and charts can be up to 56 times the body size (896px). To set a block's width directly, use `width-content`, `width-content-wide` or `width-content-full`.

<div class="width-content-full bg-color-canvas-muted p-4 my-4 flex-col space-y-4 body-sm">

<div class="width-content-full bg-color-surface-accent-muted p-4">width-content-full</div>
<div class="width-content-wide bg-color-surface-accent-muted p-4">width-content-wide</div>
<div class="width-content bg-color-surface-accent-muted p-4">width-content</div>

</div>

#### Escaping the style

To turn the styling off, for example around an embedded component that has its own styles, add `not-typeset` to a block or to a single element. The styling also stops at a typeset nested inside.

```html
<div class="typeset-longform">
	<h3>Title</h3>
	<div class="not-typeset">
		<h3>I have escaped</h3>
	</div>
	<h3 class="not-typeset">So have I</h3>
</div>
```

<div class="width-content-wide bg-color-canvas-muted p-4 my-4">
<div class="typeset-product-formatted bg-color-surface p-4">
	<h3>Title</h3>
	<div class="not-typeset">
		<h3>I have escaped</h3>
	</div>
	<h3 class="not-typeset">So have I</h3>
	</div>
</div>

### Usage aliases

The system provides a set of pre-defined usage alias classes. These are classes that are named for where they are applied.

Aliases are named `{place}-{part}`, for example `.card-title`, `.chart-tick` and `.dashboard-section-title`.

```html
<h3 class="chart-title">A chart title</h3>
<p class="chart-subtitle">and its subtitle</p>
```

<div class="width-content-wide bg-color-canvas-muted p-4 my-4">
<div class="typeset-product-formatted bg-color-surface p-4">
<h3 class="chart-title">A chart title</h3>
<p class="chart-subtitle">and its subtitle</p>
</div>
</div>

These are a convenience. Each alias applies a role, and some also add the muted text colour or tabular numerals. Use a role class where you can, because the roles are the system's stable API.

Check the [reference](#reference) section for the full set of classes.

### Title groups

A title group is the text at the top of a card, chart, table or panel. It has up to three parts, in this order: an optional eyebrow, a title and an optional subtitle. Write the parts as sibling elements, each with its role:

```html
<section class="typeset-product flow-standard">
	<p class="eyebrow">Air quality</p>
	<h2 class="title-md">Nitrogen dioxide</h2>
	<p class="subtitle-sm">Rolling 24-hour mean</p>
</section>
```

<div class="width-content-wide bg-color-canvas-muted p-4 my-4">
<div class="typeset-product flow-standard bg-color-surface p-4 my-4">
	<p class="eyebrow">Air quality</p>
	<h2 class="title-md">Nitrogen dioxide</h2>
	<p class="subtitle-sm">Rolling 24-hour mean</p>
</div>
</div>

`Card`, `ChartContainer` and `TitleGroup` components set this with their `emphasis` prop. [Surfaces and chrome](/design-system/application-design/surfaces-and-chrome) has more examples.

### Colour and emphasis

Set text colour with a semantic token:

```html
<p class="body-md text-color-text">Primary text</p>
<p class="body-sm text-color-text-muted">Secondary text</p>
<span class="label-md text-color-label">Control label</span>
```

<div class="width-content-wide bg-color-canvas-muted p-4 my-4">
<div class="typeset-product flow-standard bg-color-surface p-4 my-4">
<p class="body-md text-color-text">Primary text</p>
<p class="body-sm text-color-text-muted">Secondary text</p>
<span class="label-md text-color-label">Control label</span>
</div>
</div>

The text tokens are `--color-text`, `--color-text-muted` and `--color-text-wash`, from most to least emphasis. The label tokens are `--color-label` and `--color-label-muted`. Text or an icon on a filled control uses an inverse token, such as `--color-inverse-text`, so that it contrasts with the fill in light and dark mode.

Subhead, subtitle, eyebrow and the lead paragraph are muted by the system.

See [the foundation section on colour](/design-system/foundations/colour) for more.

To emphasise text within a role, add `text-strong`, which sets semibold. `text-soft` sets regular.

```html
<p class="body-md">Readings are <span class="text-strong">provisional</span>.</p>
```

<div class="width-content-wide bg-color-canvas-muted p-4 my-4">
<div class="typeset-product flow-standard bg-color-surface p-4 my-4">
<p class="body-md">Readings are <span class="text-strong">provisional</span>.</p>
</div>
</div>

### Things to avoid

- Tailwind type utilities such as `text-xl`, `font-bold` and `leading-tight`. The preset removes them. Use a role, or `text-strong` and `text-soft` for weight.
- Setting a size per breakpoint. Each role already has a value for every breakpoint.
- Adding a weight to a role to change its look. Use `text-strong` or `text-soft`.
- Mixing typesets in one region. Give reading content in an application its own `typeset-product--formatted` or `typeset-longform` container.
- Using the type scale directly, including inside a component. Use a role.

## How it works

### Typeface

We use the sans serif font Inter. Inter is a variable font family designed for computer screens, available via Google Fonts under the Open Font License. By using webfonts in our applications we can be reasonably certain that Inter will be used under normal circumstances. All weights are included, so there is no risk of a browser synthesising a bold or a semibold from a lighter face, which produces a coarser letterform than the designed one.

If Inter fails to load, text falls back through this stack:

```css
ui-sans-serif,system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto
Color Emoji"
```

### Type scale

Every size comes from a scale of 17 steps. Step 0 is 16px, the body size.

| Step | Size | Sample                                                                                  |
| ---- | ---- | --------------------------------------------------------------------------------------- |
| 14   | 72px | <span class="whitespace-nowrap" style="font-size: 4.5rem; line-height: 1.2">Ag</span>   |
| 13   | 64px | <span class="whitespace-nowrap" style="font-size: 4rem; line-height: 1.2">Ag</span>     |
| 12   | 56px | <span class="whitespace-nowrap" style="font-size: 3.5rem; line-height: 1.2">Ag</span>   |
| 11   | 48px | <span class="whitespace-nowrap" style="font-size: 3rem; line-height: 1.2">Ag</span>     |
| 10   | 40px | <span class="whitespace-nowrap" style="font-size: 2.5rem; line-height: 1.2">Ag</span>   |
| 9    | 36px | <span class="whitespace-nowrap" style="font-size: 2.25rem; line-height: 1.2">Ag</span>  |
| 8    | 32px | <span class="whitespace-nowrap" style="font-size: 2rem; line-height: 1.2">Ag</span>     |
| 7    | 30px | <span class="whitespace-nowrap" style="font-size: 1.875rem; line-height: 1.2">Ag</span> |
| 6    | 28px | <span class="whitespace-nowrap" style="font-size: 1.75rem; line-height: 1.2">Ag</span>  |
| 5    | 26px | <span class="whitespace-nowrap" style="font-size: 1.625rem; line-height: 1.2">Ag</span> |
| 4    | 24px | <span class="whitespace-nowrap" style="font-size: 1.5rem; line-height: 1.2">Ag</span>   |
| 3    | 22px | <span class="whitespace-nowrap" style="font-size: 1.375rem; line-height: 1.2">Ag</span> |
| 2    | 20px | <span class="whitespace-nowrap" style="font-size: 1.25rem; line-height: 1.2">Ag</span>  |
| 1    | 18px | <span class="whitespace-nowrap" style="font-size: 1.125rem; line-height: 1.2">Ag</span> |
| 0    | 16px | <span class="whitespace-nowrap" style="font-size: 1rem; line-height: 1.2">Ag</span>     |
| -1   | 14px | <span class="whitespace-nowrap" style="font-size: 0.875rem; line-height: 1.2">Ag</span> |
| -2   | 12px | <span class="whitespace-nowrap" style="font-size: 0.75rem; line-height: 1.2">Ag</span>  |

Designs and code use the roles, which take their sizes from the scale.

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

The system has two typesets: longform for reading, and product for interfaces, tables, charts and maps. Both use the same [roles](#roles). A typeset gives a role its font, weight, line height, letter-spacing or size. Longform is airier, which suits long passages of text, and product is tighter, which suits dashboards.

| Class                        | For                                                 | Flow context    | Content styles and widths |
| ---------------------------- | --------------------------------------------------- | --------------- | ------------------------- |
| `typeset-longform`           | Articles, reports and documentation                 | `flow-spacious` | Yes                       |
| `typeset-product`            | Interfaces, tables, charts and maps                 | None            | No                        |
| `typeset-product--formatted` | Content from a CMS or Markdown in a product setting | `flow-standard` | Yes                       |

`typeset-longform` and `typeset-product--formatted` set the vertical spacing through [flow](/design-system/foundations/flow).
`typeset-product` sets type only, and can be combined with a flow class as required.

The typeset is chosen once, on a wrapper or app root:

```html
<div class="typeset-longform"></div>
```

where contexts are nested the inner context takes precedence:

```html
<article class="typeset-longform">
	<p class="body-md">I am set by the longform typeset</p>
	<div class="typeset-product">
		<p class="body-md">I am set by the product typeset</p>
	</div>
</article>
```

Product is the default typeset. Its role values are also set on `:root`, so a role class outside any typeset still works.

### Roles

A role names the job a piece of text does, such as the label on an input or the title of a card. If card titles need to be a step larger, the change is made to the role and every card title changes with it.

There are ten roles:

<div class="typeset-product width-content-wide">
    <TypographyTable items={roles} />
</div>

Each role comes in three sizes, `sm`, `md` and `lg`, except eyebrow, which has one. No title is smaller than 18px, so a heading in a small container, such as a popover or a sidebar section, can use `label-lg`.

Labels and eyebrows are medium (500), titles are semibold (600), and display, headlines and metrics are bold (700). Other roles are regular (400). Metrics use tabular numerals.

### Font weight

The system has five font weights.

| Weight   | Numeral |
| -------- | ------- |
| Light    | 300     |
| Regular  | 400     |
| Medium   | 500     |
| Semibold | 600     |
| Bold     | 700     |

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

### Line height

Line height is defined in three steps based on a simple formula: `font-size + k`, where font-size and k are measured in px.

| tight           | default         | loose            |
| --------------- | --------------- | ---------------- |
| font-size + 4px | font-size + 8px | font-size + 12px |

Line height comes from the role. There are no line-height utilities.

### Responsive sizing

Some roles grow as the screen widens. The breakpoints are `sm` (640px), `md` (768px), `lg` (1024px) and `xl` (1280px). Type at wider screens stays at the `xl` size.

These roles change size, in pixels:

| Role          | Typeset  | base | `sm` | `md` | `lg` | `xl` |
| ------------- | -------- | ---- | ---- | ---- | ---- | ---- |
| `display-lg`  | Both     | 40   | 48   | 56   | 64   | 72   |
| `display-md`  | Both     | 36   | 40   | 48   | 56   | 64   |
| `display-sm`  | Both     | 32   | 36   | 40   | 48   | 56   |
| `headline-lg` | Both     | 30   | 32   | 36   | 36   | 40   |
| `headline-md` | Longform | 28   | 28   | 30   | 32   | 36   |
| `headline-md` | Product  | 28   | 28   | 30   | 30   | 30   |
| `headline-sm` | Longform | 26   | 26   | 28   | 30   | 32   |
| `subhead-lg`  | Longform | 24   | 24   | 24   | 26   | 26   |
| `subhead-md`  | Longform | 22   | 22   | 22   | 24   | 24   |
| `body-lg`     | Longform | 18   | 18   | 20   | 20   | 20   |
| `metric-lg`   | Both     | 28   | 30   | 32   | 32   | 36   |

Every other role has one size at every breakpoint.

## Reference

Choose a typeset and a breakpoint to see the values for each role.

<TokenReference group="typography" />

### Formatted content

In a `typeset-longform` or `typeset-product--formatted`: Headings, the lead paragraph and captions take these roles:

| Element                                                          | Role                |
| ---------------------------------------------------------------- | ------------------- |
| <span class="headline-lg">h1</span>                              | `headline-lg`       |
| <span class="headline-sm">h2</span>                              | `headline-sm`       |
| <span class="title-lg">h3</span>                                 | `title-lg`          |
| <span class="title-md">h4</span>                                 | `title-md`          |
| <span class="title-sm">h5</span>                                 | `title-sm`          |
| <span class="body-lg text-color-text-muted">p.lead</span>        | `body-lg`, muted    |
| <span class="caption-sm text-color-text-muted">figcaption</span> | `caption-sm`, muted |
| Any other text                                                   | `body-md`           |

Other elements keep the role of the text around them, with these changes:

| Element                                              | Style                                                                                                       |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| <a href="#formatted-content">a</a>                   | Link colour, underlined. The underline thickens on hover                                                    |
| <strong>strong</strong>, <b>b</b>                    | Semibold                                                                                                    |
| <em>em</em>, <i>i</i>                                | Italic                                                                                                      |
| <mark>mark</mark>                                    | Muted caution background                                                                                    |
| <abbr title="abbreviation">abbr</abbr>               | Help cursor, when it has a `title`                                                                          |
| <small>small</small>                                 | 0.875 times the surrounding size                                                                            |
| <code>code</code>                                    | 0.875 times the surrounding size, on a muted surface                                                        |
| <kbd>kbd</kbd>                                       | As `code`, with a border                                                                                    |
| <cite>cite</cite>                                    | Upright                                                                                                     |
| <ul><li>ul</li></ul>                                 | Disc markers, then circle and square when nested. Markers are muted                                         |
| <ol><li>ol</li></ol>                                 | Numbers, then letters and roman numerals when nested                                                        |
| <dl><dt>dt</dt><dd>dd</dd></dl>                      | Term semibold, description indented                                                                         |
| <blockquote>blockquote</blockquote>                  | Muted, with a brand-colour rule on the left                                                                 |
| <pre>pre</pre>                                       | Muted surface, scrolls sideways when too wide                                                               |
| <details><summary>summary</summary>details</details> | Summary semibold                                                                                            |
| `table`                                              | Full width. Caption muted and above, header cells semibold, figures in tabular numerals, rules between rows |
| `hr`                                                 | Wash border colour                                                                                          |

### Usage aliases

A usage alias is a class named for the place it is used, such as `card-title` or `chart-tick`. Each alias applies a role, and some also add the muted text colour or tabular numerals.

#### Charts

| Sample                                                             | Alias              | Role          | Adds                           |
| ------------------------------------------------------------------ | ------------------ | ------------- | ------------------------------ |
| <span class="typeset-product chart-title">Chart title</span>       | `chart-title`      | `title-md`    | –                              |
| <span class="typeset-product chart-subtitle">Chart subtitle</span> | `chart-subtitle`   | `subtitle-sm` | Muted colour                   |
| <span class="typeset-product chart-axis-title">Axis title</span>   | `chart-axis-title` | `label-md`    | Muted colour                   |
| <span class="typeset-product chart-label">Data label</span>        | `chart-label`      | `label-md`    | –                              |
| <span class="typeset-product chart-tick">2024</span>               | `chart-tick`       | `caption-md`  | Muted colour, tabular numerals |
| <span class="typeset-product chart-tick-sm">2024</span>            | `chart-tick-sm`    | `caption-sm`  | Muted colour, tabular numerals |
| <span class="typeset-product chart-note">Source: GLA</span>        | `chart-note`       | `caption-sm`  | –                              |

`chart-label` is for value labels, annotations and legend entries. `chart-tick-sm` is for the ticks of a dense chart.

#### Tables

| Sample                                                               | Alias               | Role          | Adds             |
| -------------------------------------------------------------------- | ------------------- | ------------- | ---------------- |
| <span class="typeset-product table-title">Table title</span>         | `table-title`       | `title-md`    | –                |
| <span class="typeset-product table-subtitle">Table subtitle</span>   | `table-subtitle`    | `subtitle-sm` | Muted colour     |
| <span class="typeset-product table-col-head">Column header</span>    | `table-col-head`    | `label-md`    | Tabular numerals |
| <span class="typeset-product table-col-head-sm">Column header</span> | `table-col-head-sm` | `label-sm`    | Tabular numerals |
| <span class="typeset-product table-body">1,284</span>                | `table-body`        | `body-sm`     | Tabular numerals |

#### Interface

| Sample                                                                           | Alias                        | Role          | Adds         |
| -------------------------------------------------------------------------------- | ---------------------------- | ------------- | ------------ |
| <span class="typeset-product dashboard-main-title">Dashboard title</span>        | `dashboard-main-title`       | `headline-md` | –            |
| <span class="typeset-product dashboard-main-subtitle">Dashboard subtitle</span>  | `dashboard-main-subtitle`    | `subhead-md`  | Muted colour |
| <span class="typeset-product dashboard-section-title">Section title</span>       | `dashboard-section-title`    | `headline-sm` | –            |
| <span class="typeset-product dashboard-section-subtitle">Section subtitle</span> | `dashboard-section-subtitle` | `subhead-sm`  | Muted colour |
| <span class="typeset-product header-title">Header title</span>                   | `header-title`               | `title-md`    | –            |
| <span class="typeset-product sidebar-title">Sidebar title</span>                 | `sidebar-title`              | `title-md`    | –            |
| <span class="typeset-product dialog-title">Dialog title</span>                   | `dialog-title`               | `label-lg`    | –            |
| <span class="typeset-product card-title">Card title</span>                       | `card-title`                 | `title-md`    | –            |
| <span class="typeset-product card-subtitle">Card subtitle</span>                 | `card-subtitle`              | `subtitle-sm` | Muted colour |
| <span class="typeset-product input-label">Input label</span>                     | `input-label`                | `label-md`    | –            |
| <span class="typeset-product input-placeholder">Placeholder</span>               | `input-placeholder`          | `body-md`     | –            |
| <span class="typeset-product input-value">Field value</span>                     | `input-value`                | `body-md`     | –            |
| <span class="typeset-product input-hint">Hint text</span>                        | `input-hint`                 | `caption-sm`  | –            |
| <span class="typeset-product button-label">Button label</span>                   | `button-label`               | `label-md`    | –            |
| <span class="typeset-product button-label-sm">Button label</span>                | `button-label-sm`            | `label-sm`    | –            |

Controls such as buttons, tabs and chips use the label role's line height. Their padding sets their height.

The full rules for type are in the [specification](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/design-system-specification/design-system-specification.md#typography).
