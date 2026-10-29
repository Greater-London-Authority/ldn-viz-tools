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
    import EnhancedImage from '$lib/components/enhancedImage/EnhancedImage.svelte'
    import { TitleGroup } from '@ldn-viz/ui'

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

    const chartRoles = [
        {text: 'Title', usage: 'chart-title: the title of a chart.', class: 'chart-title'},
        {text: 'Subtitle', usage: 'chart-subtitle: a supporting line under a chart title.', class: 'chart-subtitle'},
        {text: 'Axis title', usage: 'chart-axis-title: the name of an axis.', class: 'chart-axis-title'},
        {text: 'Data label', usage: 'chart-label: value labels, annotations and legend entries.', class: 'chart-label'},
        {text: '2024', usage: 'chart-tick: axis and scale labels.', class: 'chart-tick'},
        {text: '2024', usage: 'chart-tick-sm: tick labels on a dense chart.', class: 'chart-tick-sm'},
        {text: 'Source: GLA', usage: 'chart-note: notes and sources under a chart.', class: 'chart-note'}
        ]
</script>

<p class="lead">Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed. When combined with our spacing rules our typographic system ensures our designs and interfaces are balanced and harmonious.</p>

Text is set by role. Choose the role for the job the text does, and the role sets its size, weight and line height.

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

<div class="typeset-product border border-color-border-wash p-4 my-4">
	<TitleGroup eyebrow="Air quality" title="Nitrogen dioxide" subtitle="Rolling 24-hour mean" headingLevel={3} />
</div>

In your own markup, set a typeset on a container and give text a role class, as described below.

If your app uses Tailwind, as the component library does, the preset removes Tailwind's font sizes, weights and line heights. Type comes from the role classes.

{/snippet}
{#snippet adapting()}

The typesets and role classes are plain CSS. Import `@ldn-viz/themes/index.css`, or `tokens.css` and `system.css` if your app has its own reset, and use them as described below.

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

The classes in this section work in the full system and in any project that imports `@ldn-viz/themes/index.css`. They don't need Tailwind. The colour and spacing utilities in the examples, such as `text-color-text-muted` and `p-4`, come from the Tailwind preset.

### Setting a typeset

A typeset is applied as a class on a containing element. Everything inside it takes its role values from that typeset. Where typesets are nested, the inner one applies.

```html
<article class="typeset-longform">…</article>
<section class="typeset-product">…</section>
```

`typeset-product` is the default, so a role class outside any typeset takes its product values.

An application surface will normally also want a flow context, which sets the space between blocks. `typeset-longform` sets its own.

```html
<section class="flow-standard typeset-product">…</section>
```

### Longform styles its content automatically

Inside `typeset-longform`, ordinary HTML elements are styled for you. Headings take headline and title roles, paragraphs take Body and captions take Caption. Links, lists, blockquotes and tables are styled too. Standard content needs no classes.

```html
<div class="typeset-longform">
	<h2>Title</h2>
	<p class="lead">An introductory paragraph.</p>
	<p>Body copy.</p>
</div>
```

<div class="typeset-longform border border-color-border-wash p-4 my-4">
	<h2>Title</h2>
	<p class="lead">An introductory paragraph</p>
    <p>Body copy</p>
</div>

These elements take a role without a class:

| Element      | Role             |
| ------------ | ---------------- |
| `h1`         | `headline-lg`    |
| `h2`         | `headline-sm`    |
| `h3`         | `title-lg`       |
| `h4`         | `title-md`       |
| `h5`         | `title-sm`       |
| `p.lead`     | `body-lg`, muted |
| `figcaption` | `caption-sm`     |

A role class on the element replaces its default role. Display has to be applied by class.

`typeset-longform` also limits the width of each block inside it for readability. Running text is limited to 38 times the body size, which is 608px at a 16px body size. Figures, images, videos, tables, code blocks and charts can be wider, up to 56 times the body size (896px). To set a block's width directly, use `width-content`, `width-content-wide` or `width-content-full`.

#### Leaving the longform typeset

Because `typeset-longform` styles elements automatically, you will sometimes need to opt out, most often around an embedded component that brings its own styling. Use `not-typeset`, on a block or on a single element.

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

A typeset nested inside `typeset-longform` also stops its automatic styling.

### Product requires explicit roles

`typeset-product` sets the typeset and gives unclassed text the Body role. It doesn't style headings or other elements, so apply the role directly to the element.

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

For Markdown or other formatted content inside an application, use `typeset-product--formatted`. It styles links, lists, blockquotes and tables as `typeset-longform` does, limits the width of each block, and sets the standard flow context. It gives headings, `p.lead` and `figcaption` the same roles as `typeset-longform`.

### Choosing a role for an interface element

Each usage alias applies the role shown. Use the alias, or the role class with the same treatment.

| Element                    | Alias                        | Role                                  |
| -------------------------- | ---------------------------- | ------------------------------------- |
| Dashboard title            | `dashboard-main-title`       | `headline-md`                         |
| Dashboard subtitle         | `dashboard-main-subtitle`    | `subhead-md`, muted                   |
| Dashboard section title    | `dashboard-section-title`    | `headline-sm`                         |
| Dashboard section subtitle | `dashboard-section-subtitle` | `subhead-sm`, muted                   |
| Header title               | `header-title`               | `title-sm`                            |
| Sidebar title              | `sidebar-title`              | `title-sm`                            |
| Dialog title               | `dialog-title`               | `label-lg`                            |
| Card title                 | `card-title`                 | `title-sm`                            |
| Card subtitle              | `card-subtitle`              | `subtitle-sm`, muted                  |
| Input label                | `input-label`                | `label-md`                            |
| Placeholder                | `input-placeholder`          | `body-md`                             |
| Field value                | `input-value`                | `body-md`                             |
| Helper text and hints      | `input-hint`                 | `caption-sm`                          |
| Button label               | `button-label`               | `label-md`                            |
| Small button label         | `button-label-sm`            | `label-sm`                            |
| Table title                | `table-title`                | `title-sm`                            |
| Table subtitle             | `table-subtitle`             | `subtitle-sm`, muted                  |
| Table column header        | `table-col-head`             | `label-md`, tabular numerals          |
| Small table column header  | `table-col-head-sm`          | `label-sm`, tabular numerals          |
| Table body                 | `table-body`                 | `body-sm`, tabular numerals           |
| Chart title                | `chart-title`                | `title-sm`                            |
| Chart subtitle             | `chart-subtitle`             | `subtitle-sm`, muted                  |
| Chart axis title           | `chart-axis-title`           | `label-md`, muted                     |
| Chart data label or legend | `chart-label`                | `label-md`                            |
| Chart tick                 | `chart-tick`                 | `caption-md`, muted, tabular numerals |
| Small chart tick           | `chart-tick-sm`              | `caption-sm`, muted, tabular numerals |
| Chart note or source       | `chart-note`                 | `caption-sm`                          |

Controls such as buttons, tabs and chips use the label role's line height. Their own padding sets their height.

### Titling groups

The titling roles are designed to be used together. Write the group as flat sibling elements and give each its role; the spacing between them is handled by the flow system.

```html
<section class="flow-standard typeset-product">
	<p class="eyebrow">Air quality</p>
	<h2 class="title-lg">Nitrogen dioxide</h2>
	<p class="subtitle-sm">Rolling 24-hour mean</p>
</section>
```

<div class="typeset-product flow-standard border border-color-border-wash p-4 my-4">
	<p class="eyebrow">Air quality</p>
	<h2 class="title-lg">Nitrogen dioxide</h2>
	<p class="subtitle-sm">Rolling 24-hour mean</p>
</div>

The eyebrow closes up to the heading below it, the subtitle closes up to the heading above it, and the larger break that separates one section from the next moves above the whole group. Reproducing the same appearance with generic classes, such as a small muted paragraph in place of the subtitle, will look almost identical but will not be recognised as a titling group, and the spacing will be wrong.

### Emphasis and colour

Colour is a separate axis. Bind text colour to a semantic token.

```html
<p class="body-md text-color-text">Primary text</p>
<p class="body-sm text-color-text-muted">Secondary text</p>
<span class="label-md text-color-label">Control label</span>
```

Text and label tokens descend in emphasis: `text`, `text-muted`, `text-wash`, and `label`, `label-muted`. Text or an icon on a filled control uses an inverse token so that it themes correctly against the fill. Subhead, Subtitle and Eyebrow are muted by default, and so is the longform lead paragraph. The muted chart aliases are listed in the table above.

Where the intent is emphasis within a role, change the weight. `text-strong` sets semibold and `text-soft` sets regular, on any role:

```html
<p class="body-md">Readings are <span class="text-strong">provisional</span>.</p>
```

### Things to avoid

**Tailwind's type utilities.** The Tailwind preset removes Tailwind's font sizes, weights and line heights, so `text-xl`, `font-bold` and `leading-tight` have no effect. Use a role, or `text-strong` and `text-soft` for weight.

**Setting a size per breakpoint.** Roles already have a value at every breakpoint.

**Setting a weight alongside a role** in order to reach a particular look. The role defines its own weight.

**Mixing typesets within one region.** Reading content on an application surface is better given its own `typeset-longform` container than assembled from a mixture.

**Referring to the private scale.** The raw values beneath the roles are internal to the system, including within a component. Use the role.

### The Tailwind Typography plugin

The system does not use the Tailwind Typography plugin. Its `prose` class and modifiers such as `prose-lg` and `prose-invert` have no effect. Size comes from the roles, and the reading width is set by `typeset-longform`.

## How it works

### Font

We use the sans serif font Inter. Inter is a variable font family designed for computer screens, available via Google Fonts under the Open Font License. Code blocks use Source Code Pro.

The base styles set Inter with this fallback stack:

```css
Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
"Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
"Segoe UI Symbol", "Noto Color Emoji"
```

### Roles

The system describes type by **role** rather than by size. A role names the **job** a piece of text does, such as the **label** on an input or the **title** of a card. The role sets every property that job needs: font family, size, weight, line height and letter spacing.

If card titles should be a step larger, that change is made in one place and everything that uses the role follows.

There are ten roles:

<div class="typeset-product my-8">
    <TypographyTable items={roles} />
</div>

Every role except Eyebrow comes in three sizes, `sm`, `md` and `lg`, and the class is the role and size together: `title-sm`, `body-md`, `headline-lg`. The Eyebrow class is `eyebrow`.

Headlines open a page or a section. Titles name the units inside it. Labels are needed to use the interface; captions are not.

### Type scale

Roles are what designs and code should reference. Beneath them sits a scale of raw values that the roles draw from. That scale is private to the system. Designs and code use the roles instead.

### Typesets

A **typeset** gives every role its values for one kind of surface. There are two.

| Typeset              | Intended for                                                         |
| -------------------- | -------------------------------------------------------------------- |
| **typeset-longform** | Long passages of reading: articles, guidance, help, documentation    |
| **typeset-product**  | Applications and dashboards, and the text in tables, charts and maps |

Both typesets have all ten roles, and give each role the same weight. They differ in the line height of body text, and `typeset-longform` sets `subhead-md` and `subhead-lg` larger at the `lg` and `xl` breakpoints. The line heights of body text in each typeset:

| Role      | `typeset-longform` | `typeset-product` |
| --------- | ------------------ | ----------------- |
| `body-lg` | 18px / 30px        | 18px / 26px       |
| `body-md` | 16px / 28px        | 16px / 24px       |
| `body-sm` | 14px / 26px        | 14px / 22px       |

Because the role names are the same, a component can be written once and read correctly in either typeset.

Reading content placed on an application surface, such as a help article inside a dashboard, is better given `typeset-longform` for that whole region than assembled from a mixture of the two.

### Title groups

A title group is an optional eyebrow, a title and a subtitle, at the top of a card, chart, table or panel.

When a component contains two or more title groups, one is made dominant. The dominant group has a title and an optional subtitle. Each other group becomes an eyebrow, using the text that would have been its title.

| Treatment  | Role          | Size | Weight | When it applies                                                     |
| ---------- | ------------- | ---- | ------ | ------------------------------------------------------------------- |
| Dominant   | `title-sm`    | 20px | 600    | The group is the subject of its container                           |
| Demoted    | `eyebrow`     | 14px | 500    | Another group is dominant, for example a chart inside a titled card |
| Supporting | `subtitle-sm` | 16px | 400    | A supporting line under a dominant title                            |

Two examples:

- **A card containing one titled chart.** The chart's title is dominant. The card's own title becomes an eyebrow above it, or is left out. If the chart has no title, the card title is dominant.
- **A small card holding a single figure.** The label sits above the metric as an eyebrow, which is the same treatment a demoted title takes, so a group of these cards reads consistently beside a titled card.

### Usage aliases

A usage alias is a class named for the place it is used, such as `card-title` or `chart-tick`. Each alias applies a role, and some also set the muted text colour or tabular numerals. Use a role class where you can. The aliases are for code that names the place rather than the role.

Chart text uses the chart aliases:

<div class="typeset-product my-8">
    <TypographyTable items={chartRoles} />
</div>

There is no separate alias for a legend. A legend entry uses `chart-label`.

The full list of aliases and their roles is under [choosing a role](#choosing-a-role-for-an-interface-element).

### Size, weight and colour are separate

Size, weight and colour are three independent axes. A "subtle heading" is a heading in a muted colour. An "emphasised caption" is a caption at a heavier weight. Expressing either as a new size would add a role that describes an appearance rather than a job.

Weight has two uses:

**Identity weight** is part of what a role is, and the role sets it. Labels and eyebrows are medium, titles are semibold, and headlines, display and metrics are bold.

**Emphasis weight** is applied on top of a role, for example to a bold run within a paragraph.

There are five weights: light (300), regular (400), medium (500), semibold (600) and bold (700). No role uses light.

### Responsive sizing

Some roles change size as the viewport widens. The breakpoints are:

| Breakpoint | Minimum width | CSS                          |
| ---------- | ------------- | ---------------------------- |
| base       | —             | the default                  |
| `sm`       | 640px         | `@media (min-width: 640px)`  |
| `md`       | 768px         | `@media (min-width: 768px)`  |
| `lg`       | 1024px        | `@media (min-width: 1024px)` |
| `xl`       | 1280px        | `@media (min-width: 1280px)` |

These roles change size, in pixels, in both typesets:

| Role          | base | `sm` | `md` | `lg` | `xl` |
| ------------- | ---- | ---- | ---- | ---- | ---- |
| `display-lg`  | 40   | 48   | 56   | 64   | 72   |
| `display-md`  | 36   | 40   | 48   | 56   | 64   |
| `display-sm`  | 32   | 36   | 40   | 48   | 56   |
| `headline-lg` | 30   | 32   | 36   | 36   | 40   |
| `headline-md` | 28   | 28   | 30   | 30   | 30   |
| `metric-lg`   | 28   | 30   | 32   | 32   | 36   |

In `typeset-longform`, `subhead-lg` is 24px up to `md` and 26px at `lg` and `xl`, and `subhead-md` is 22px, then 24px.

Every other role has one size at every breakpoint. The role class picks up the value for the current breakpoint, so there is no need to set a size per breakpoint.

You can test the roles on this page by resizing your browser, or by emulating a device in your browser's developer tools.

<figure class="width-content-wide">
	<EnhancedImage src="/typography/longform-breakpoints.png" alt="The same report page in typeset-longform at the base and xl breakpoints. The headline is larger at xl, and the body text keeps its size." />
</figure>

<figure class="width-content-wide">
	<EnhancedImage src="/typography/product-breakpoints.png" alt="The same dashboard in typeset-product at the base and xl breakpoints. The dashboard title and the metrics are larger at xl, and the card text keeps its size." />
</figure>

### Line height

Line height is the font size plus 4px, 8px or 12px.

| Added | Roles                           |
| ----- | ------------------------------- |
| 4px   | Metric, Caption and Eyebrow     |
| 8px   | Every other role                |
| 12px  | Body in `typeset-longform` only |

Because every line height is a whole number of pixels, a block of text composes predictably against the margins and gaps around it.

## Reference

Choose a typeset and a breakpoint to see the values for each role.

<TokenReference group="typography" />

The full rules for type are in the [specification](https://github.com/Greater-London-Authority/ldn-viz-tools/blob/main/design-system-specification/design-system-specification.md#typography).
