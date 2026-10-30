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

<p class="lead">Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed. When combined with our spacing rules our typographic system ensures our designs and interfaces are balanced and harmonious.</p>

Each piece of text has a role, such as title, body or label, chosen for what the text does. The role sets its font, size, weight, line height and letter spacing.

## Use

<UsageTabs>
{#snippet full()}

The components set their own type. The title components, such as `TitleGroup`, `DashboardTitle` and `PageTitle`, give each part of a title group its role:

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

In your own markup, set a typeset on a container and give text a role class.

If your app uses Tailwind, as the component library does, the preset removes Tailwind's font sizes, weights and line heights.

{/snippet}
{#snippet adapting()}

The typesets and role classes are plain CSS. Import `@ldn-viz/themes/index.css`, or `tokens.css` and `system.css` if your app has its own reset.

A role class reads custom properties named for the role, such as `--title-sm-font-size`. Each typeset sets them for the current breakpoint, so a rule of your own can use them:

```css
.panel-heading {
	font-family: var(--title-sm-font-family);
	font-size: var(--title-sm-font-size);
	font-weight: var(--title-sm-font-weight);
	line-height: var(--title-sm-line-height);
	letter-spacing: var(--title-sm-letter-spacing);
}
```

With `tokens.css` alone, use the typography tokens. Each names a breakpoint and a typeset, such as `--typography-base-product-title-sm-font-size`, so set the values for larger breakpoints in media queries.

{/snippet}
{#snippet anywhere()}

Set text in Inter, which is available from [Google Fonts](https://fonts.google.com/specimen/Inter).

Choose the typeset for the kind of work: longform for reading, and product for interfaces, tables, charts and maps. Then take each role's size, weight, line height and letter spacing from the [reference](#reference). Roles that change size have a value for each breakpoint.

{/snippet}
</UsageTabs>

The classes below need only `@ldn-viz/themes/index.css`. The colour and spacing utilities in the examples, such as `text-color-text-muted` and `p-4`, come from the Tailwind preset.

### Choose a typeset

A typeset sets the values of every role. Set it once, on a wrapper or the app root. Where typesets are nested, the inner one applies.

| Class                        | For                                           | Styles plain HTML | Flow context |
| ---------------------------- | --------------------------------------------- | ----------------- | ------------ |
| `typeset-longform`           | Articles, reports and documentation           | Yes               | Spacious     |
| `typeset-product`            | Interfaces, tables, charts and maps           | No                | None         |
| `typeset-product--formatted` | Markdown or CMS content inside an application | Yes               | Standard     |

```html
<article class="typeset-longform">
	<p class="body-md">Set by the longform typeset</p>
	<div class="typeset-product">
		<p class="body-md">Set by the product typeset</p>
	</div>
</article>
```

Product is the default, so a role class outside any typeset takes its product values.

`typeset-product` sets type only, so add a [flow context](/design-system/foundations/flow) for the space between blocks:

```html
<section class="flow-standard typeset-product">…</section>
```

### Give text a role

In `typeset-product`, give each piece of text a role class. The class is the role and a size, such as `title-lg` or `body-md`. A heading without a class is not styled.

```html
<div class="typeset-product">
	<h2>No role applied</h2>
	<h2 class="title-lg">Section title</h2>
	<p class="body-md">Body copy.</p>
	<span class="label-md">Control label</span>
</div>
```

<div class="typeset-product border border-color-border-wash p-4 my-4">
	<h2>No role applied</h2>
	<h2 class="title-lg">Section title</h2>
	<p class="body-md">Body copy.</p>
	<span class="label-md">Control label</span>
</div>

Each role's job, sizes and weight are listed under [Roles](#roles).

### Formatted content

Rendered Markdown and CMS output can't have classes. Inside `typeset-longform` and `typeset-product--formatted`, plain HTML is styled without them.

```html
<div class="typeset-product--formatted">
	<h3>About this data</h3>
	<p>Counts are provisional until the annual release.</p>
	<ul>
		<li>Source: GLA City Intelligence</li>
		<li>Updated quarterly</li>
	</ul>
</div>
```

<div class="typeset-product--formatted bg-color-surface p-4 my-4">
	<h3>About this data</h3>
	<p>Counts are provisional until the annual release.</p>
	<ul>
		<li>Source: GLA City Intelligence</li>
		<li>Updated quarterly</li>
	</ul>
</div>

Headings, the lead paragraph and captions take these roles:

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

A class on the element replaces its default style.

In a formatted typeset, running text is limited to 38 times the body size, which is 608px at a 16px body size. Figures, images, videos, tables, code blocks and charts can be up to 56 times the body size (896px). To set a block's width directly, use `width-content`, `width-content-wide` or `width-content-full`.

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

<div class="border border-color-border-wash p-4 my-4">
	<h3>Title</h3>
	<div class="not-typeset">
		<h3>I have escaped</h3>
	</div>
	<h3 class="not-typeset">So have I</h3>
</div>

### Usage aliases

A usage alias is a class named for the place it is used, such as `card-title` or `chart-tick`. Each alias applies a role, and some also add the muted text colour or tabular numerals. Use a role class where you can, because the roles are the system's stable API.

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

Controls such as buttons, tabs and chips use the label role's line height. Their own padding sets their height.

### Title groups

A title group is the text at the top of a card, chart, table or panel. It has up to three parts, in this order: an optional eyebrow, a title and an optional subtitle. Write the parts as sibling elements, each with its role:

```html
<section class="flow-standard typeset-product">
	<p class="eyebrow">Air quality</p>
	<h2 class="title-md">Nitrogen dioxide</h2>
	<p class="subtitle-sm">Rolling 24-hour mean</p>
</section>
```

<div class="typeset-product flow-standard bg-color-surface p-4 my-4">
	<p class="eyebrow">Air quality</p>
	<h2 class="title-md">Nitrogen dioxide</h2>
	<p class="subtitle-sm">Rolling 24-hour mean</p>
</div>

In a flow context, the title sits 4px below the eyebrow and the subtitle sits directly under the title. The flow rules match the parts by their role classes, so a muted paragraph styled to look like a subtitle takes the default space instead.

A card can hold a titled chart, which gives it two title groups. When it does, one group is dominant and has a title and an optional subtitle. Each other group is demoted to an eyebrow, using the text that would have been its title.

The designer chooses which group is dominant. When a card holds one chart that is its main subject, make the chart's group dominant. The card's title becomes an eyebrow above the chart's title. A small card with a single figure has its label as an eyebrow above the metric.

```svelte
<Card title="Housing" emphasis="secondary">
	<ChartContainer title="Net additional dwellings" subtitle="London, 2015 to 2024">…</ChartContainer
	>
</Card>

<Card title="People seen sleeping rough" emphasis="secondary">
	<p class="metric-lg">1,284</p>
</Card>
```

<div class="width-content-wide not-typeset grid gap-4 bg-color-canvas-muted p-4 my-4 md:grid-cols-2">
	<Card title="Housing" emphasis="secondary"><ChartContainer id="tg-chart" title="Net additional dwellings" subtitle="London, 2015 to 2024" chartHeight="h-32" dataDownloadButton={false} imageDownloadButton={false}><PlaceholderImage /></ChartContainer></Card>
	<Card title="People seen sleeping rough" emphasis="secondary"><p class="metric-lg">1,284</p></Card>
</div>

`Card`, `ChartContainer` and `TitleGroup` set this with their `emphasis` prop. [Surfaces and chrome](/design-system/application-design/surfaces-and-chrome) has more examples.

### Colour and emphasis

Set text colour with a semantic token:

```html
<p class="body-md text-color-text">Primary text</p>
<p class="body-sm text-color-text-muted">Secondary text</p>
<span class="label-md text-color-label">Control label</span>
```

The text tokens are `text`, `text-muted` and `text-wash`, from most to least emphasis. The label tokens are `label` and `label-muted`. Text or an icon on a filled control uses an inverse token, such as `--color-inverse-text`, so that it contrasts with the fill in light and dark mode.

Subhead, subtitle, eyebrow and the lead paragraph are muted already.

To emphasise text within a role, add `text-strong`, which sets semibold. `text-soft` sets regular.

```html
<p class="body-md">Readings are <span class="text-strong">provisional</span>.</p>
```

### Things to avoid

- Tailwind type utilities such as `text-xl`, `font-bold` and `leading-tight`. The preset removes them. Use a role, or `text-strong` and `text-soft` for weight.
- Setting a size per breakpoint. Each role already has a value for every breakpoint.
- Adding a weight to a role to change its look. Use `text-strong` or `text-soft`.
- Mixing typesets in one region. Give reading content in an application its own `typeset-product--formatted` or `typeset-longform` container.
- Using the type scale directly, including inside a component. Use a role.

## How it works

### Typeface

Text is set in Inter, a variable font designed for screens and available from Google Fonts under the Open Font License. Code is set in Source Code Pro.

If Inter fails to load, text falls back through this stack:

```css
Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
"Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
"Segoe UI Symbol", "Noto Color Emoji"
```

### Type scale

Every size comes from a scale of 17 steps. Step 0 is 16px, the body size. Up to 32px the steps are 2px apart. Above 32px they are 4px apart up to 40px, then 8px apart up to 72px.

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

### Roles

A role names the job a piece of text does, such as the label on an input or the title of a card. If card titles need to be a step larger, the change is made to the role and every card title changes with it.

There are ten roles:

<div class="typeset-product my-8">
    <TypographyTable items={roles} />
</div>

Each role comes in three sizes, `sm`, `md` and `lg`, except eyebrow, which has one. No title is smaller than 18px, so a heading in a small container, such as a popover or a sidebar section, can use `label-lg`.

Labels and eyebrows are medium (500), titles are semibold (600), and display, headlines and metrics are bold (700). Other roles are regular (400). Metrics use tabular numerals.

A heading in a muted colour or a caption at a heavier weight needs no new role. Use a text colour token or `text-strong`.

### Typesets

Both typesets have the same roles, so a component written with role classes works in either. `typeset-product--formatted` uses the product values.

Line height is the font size plus 4px, 8px or 12px. Metric, caption and eyebrow add 4px. Body adds 12px in longform. Every other role adds 8px.

| Role      | `typeset-longform` | `typeset-product` |
| --------- | ------------------ | ----------------- |
| `body-lg` | 18px / 30px        | 18px / 26px       |
| `body-md` | 16px / 28px        | 16px / 24px       |
| `body-sm` | 14px / 26px        | 14px / 22px       |

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

The full rules for type are in the [specification](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/design-system-specification/design-system-specification.md#typography).
