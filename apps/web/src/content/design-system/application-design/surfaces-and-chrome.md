---
title: Surfaces and chrome
description: Cards, chart containers and their titles
navLabel: Surfaces and chrome
order: 3
heroImage: header-application-design-overflow.svg
thumbnail: cta-application-design-1.svg
---

<script>
	import { Button, Card, PlaceholderImage } from '@ldn-viz/ui';
	import { ChartContainer } from '@ldn-viz/charts';
	import UsageTabs from '$lib/components/usageTabs/UsageTabs.svelte';
</script>

<p class="lead">A surface is a card or panel on the page. Chrome is the header and footer around a card, chart or table: the header has its title, and the footer has its source and actions.</p>

## Canvas and surface

The canvas is the page background, coloured `--color-canvas`. A surface sits on the canvas and is coloured `--color-surface`. Use `--color-surface-muted` for a surface that needs to stand apart from what is around it, such as a panel inside a card.

A surface's level above the canvas is set by its [elevation](/design-system/foundations/elevation). A card sits at `elevation-1`, a tooltip or popover at `elevation-4` and a modal at `elevation-5`. Surfaces have square corners ([visual rules](/design-system/foundations/visual-rules)).

## Cards

A card groups related content under one title, such as a chart, a table or several panels. It has the surface colour, a border, `elevation-1` and 16px of padding. The space between its header, content and footer is the default flow step of the context.

<UsageTabs>
{#snippet full()}

Use `Card` from `@ldn-viz/ui`. The content goes in its children, and the title group and footnotes are props:

```svelte
<Card
	title="Rough sleeping"
	subtitle="People seen sleeping rough, by quarter"
	source="CHAIN"
	hint="Counts include people seen more than once."
>
	<div class="h-40"><PlaceholderImage /></div>
</Card>
```

<div class="border border-color-border-wash p-4 my-4 bg-color-canvas-muted">
	<Card title="Rough sleeping" subtitle="People seen sleeping rough, by quarter" source="CHAIN" hint="Counts include people seen more than once."><div class="h-40"><PlaceholderImage /></div></Card>
</div>

[Storybook](https://greater-london-authority.github.io/ldn-viz-tools/?path=/docs/ui-components-card--documentation) lists the props.

{/snippet}
{#snippet adapting()}

Build a card from the system's classes and custom properties. The role classes set the title group, `elevation-1` sets the shadow and `gap-flow` sets the space between the parts:

```html
<div class="card typeset-product elevation-1 gap-flow">
	<div>
		<h3 class="title-sm">Rough sleeping</h3>
		<p class="subtitle-sm">People seen sleeping rough, by quarter</p>
	</div>
	<div>…</div>
	<p class="caption-sm">Source: CHAIN</p>
</div>
```

```css
.card {
	display: flex;
	flex-direction: column;
	padding: var(--spacing-4);
	border: 1px solid var(--color-border-wash);
	background: var(--color-surface);
	color: var(--color-text);
}
```

{/snippet}
{#snippet anywhere()}

A card has these values:

| Part       | Value                                                        |
| ---------- | ------------------------------------------------------------ |
| Background | `--color-surface`                                            |
| Border     | 1px, `--color-border-wash`                                   |
| Shadow     | `--elevation-1`                                              |
| Padding    | 16px                                                         |
| Text       | The product typeset: `title-sm`, `subtitle-sm`, `caption-sm` |

The [design tokens reference](/design-system/foundations/design-tokens#reference) has the value of each token.

{/snippet}
</UsageTabs>

## Title groups

A title group is the text at the top of a card, chart, table or panel. It has up to three parts, stacked in this order: an optional eyebrow, a title and an optional subtitle. The title uses `title-sm` unless the design needs a larger one. The parts have no space between them. Their line heights set the distance.

A component with one title group can use all three parts. A card that contains other titled components, such as a chart, has several groups. Choose one to be dominant. The dominant group has a title and an optional subtitle, and no eyebrow. Each other group shows only an eyebrow, with the text that would have been its title.

In the components, `emphasis="primary"` makes a group dominant and `emphasis="secondary"` reduces it to an eyebrow.

### A card with one chart

When the chart is the main subject, its group is dominant. The card's title becomes an eyebrow directly above the chart's title:

```svelte
<Card title="Housing" emphasis="secondary">
	<ChartContainer
		title="Net additional dwellings"
		subtitle="London, 2015 to 2024"
		source="GLA"
		dataDownloadButton={false}
		imageDownloadButton={false}
	>
		<PlaceholderImage />
	</ChartContainer>
</Card>
```

<div class="border border-color-border-wash p-4 my-4 bg-color-canvas-muted">
	<Card title="Housing" emphasis="secondary"><ChartContainer id="tg-one" title="Net additional dwellings" subtitle="London, 2015 to 2024" source="GLA" chartHeight="h-40" dataDownloadButton={false} imageDownloadButton={false}><PlaceholderImage /></ChartContainer></Card>
</div>

### A card with two related charts

The card's group is dominant, and each chart's title becomes an eyebrow:

```svelte
<Card title="Housing" subtitle="London, 2015 to 2024">
	<div class="gap-flow grid grid-cols-2">
		<ChartContainer title="Completions" emphasis="secondary" …>…</ChartContainer>
		<ChartContainer title="Approvals" emphasis="secondary" …>…</ChartContainer>
	</div>
</Card>
```

<div class="border border-color-border-wash p-4 my-4 bg-color-canvas-muted">
	<Card title="Housing" subtitle="London, 2015 to 2024"><div class="grid grid-cols-2 gap-flow"><ChartContainer id="tg-two-a" title="Completions" emphasis="secondary" chartHeight="h-32" dataDownloadButton={false} imageDownloadButton={false}><PlaceholderImage /></ChartContainer><ChartContainer id="tg-two-b" title="Approvals" emphasis="secondary" chartHeight="h-32" dataDownloadButton={false} imageDownloadButton={false}><PlaceholderImage /></ChartContainer></div></Card>
</div>

A card with only text has no other title group, so its group can have an eyebrow, a title and a subtitle.

## Chrome

`Card`, `ChartContainer` and `TableContainer` share the same chrome: a header above the content and a footer below it, built from three parts:

- **`ChromeHeader`** has the title group at the left and an optional hint at the right. The hint is an information icon that opens a help overlay.
- **`ChromeFooter`** has the footnotes at the left: a byline, the source, a note and, on a chart or table, a button that opens its description. The actions sit at the right, such as the data and image download buttons. The footnotes use `caption-sm` in the muted text colour.
- **`TitleGroup`** renders the eyebrow, title and subtitle, or only an eyebrow when the group isn't dominant.

```svelte
<Card title="Rough sleeping" byline="GLA City Intelligence" source="CHAIN" note="Provisional">
	…
	{#snippet actions()}
		<Button variant="outline" emphasis="secondary" size="sm">Download CSV</Button>
	{/snippet}
</Card>
```

<div class="border border-color-border-wash p-4 my-4 bg-color-canvas-muted">
	<Card title="Rough sleeping" byline="GLA City Intelligence" source="CHAIN" note="Provisional">
		<div class="h-32"><PlaceholderImage /></div>
		{#snippet actions()}<Button variant="outline" emphasis="secondary" size="sm">Download CSV</Button>{/snippet}
	</Card>
</div>

`ChartContainer` adds the download buttons and the description button. The middle of a chart container has separate slots for the controls, the legend and the plot, so that plots side by side stay aligned when their legends wrap to different heights. The [Data visualisation](/design-system/data-visualisation) pages describe the plot.

<div class="my-4 border border-dashed border-color-border p-4 body-sm text-color-text-muted">Placeholder: a TableContainer example, once TableContainer is exported from @ldn-viz/tables.</div>

[Storybook](https://greater-london-authority.github.io/ldn-viz-tools) lists the props of `Card`, `ChartContainer`, `ChromeHeader`, `ChromeFooter` and `TitleGroup`.
