<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ChartContainer from './ChartContainer.svelte';

	import { Card, Select } from '@ldn-viz/ui';

	/**
	 * The `ChartContainer` is a wrapper around a plot that adds a title, subtitle, footnotes and
	 * export controls.
	 *
	 * **Accessibility**: always provide `alt` (a short text alternative). `description` (a longer
	 * account) is optional but recommended; when given, it is exposed to both screen readers
	 * (`aria-describedby`) and sighted users (a "View description" Modal).
	 *
	 * **Alternatives**: normally the [ObservablePlot](./?path=/docs/charts-components-observableplot--documentation) or other plot component would be used rather than using `ChartContainer` directly.
	 */
	const { Story } = defineMeta({
		title: 'Charts/Components/ChartContainer/ChartContainer',
		component: ChartContainer,
		tags: ['autodocs']
	});
</script>

{#snippet placeholderChart()}
	<div
		class="flex h-full w-full items-center justify-center bg-color-container-level-1 text-color-text-muted"
	>
		Chart would go here.
	</div>
{/snippet}

<Story name="Default">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<Story name="With Title">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart Title"
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<Story name="With Title and Subtitle">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart Title"
			subTitle="Subtitle provides extra context"
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<!--
	`hint` shows an information affordance beside the title. A string opens an `Overlay`;
	`hintType` selects `tooltip` (default), `popover`, or `modal` (with `hintTitle`).
-->
<Story name="With hint (tooltip)">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart Title"
			subtitle="Subtitle provides extra context"
			hint="These figures are illustrative placeholder data, not a real series."
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<Story name="With Title, Subtitle, and Controls">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart Title"
			subTitle="Subtitle provides extra context"
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{#snippet controls()}
				<div class="mb-4 flex gap-4">
					<div class="w-56">
						<Select label="An input affecting the chart" options={[]} />
					</div>
					<div class="w-52">
						<Select label="Another input" options={[]} />
					</div>
				</div>
			{/snippet}

			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<Story name="With custom id">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			id="MySpecialChartContainer"
			title="This is the Chart Title"
			subTitle="Subtitle provides extra context"
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<Story name="Source, byline and note (footer)">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart Title"
			subTitle="Subtitle provides extra context"
			source="GLA city intelligence"
			byline="A byline for the chart"
			note="Be aware that you can provide a note if required"
			dataDownloadButton={['JSON', 'CSV']}
			data={[]}
			imageDownloadButton
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<Story name="Source, byline only">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart Title"
			subTitle="Subtitle provides extra context"
			source="The source of this chart data"
			byline="A byline for the chart"
			dataDownloadButton={['JSON', 'CSV']}
			data={[]}
			imageDownloadButton
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<!--
	**For use only in emergency** - an overrideClass can be applied to the slot area within the chart container. 
	This is primarily to fine tune the margins and padding around a Plot chart with a legend. (See the ObservablePlot / Examples / Line Chart) 
-->

<Story name="With Override Class">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			overrideClass="bg-color-palette-red-500"
			title="This is the Chart Title"
			subTitle="Subtitle provides extra context"
			source="The source of this chart data"
			byline="A byline for the chart"
			note="Be aware that you can provide a note if required"
			dataDownloadButton={['JSON', 'CSV']}
			data={[]}
			imageDownloadButton={['PNG']}
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<!--
This story show how you can place two (or more) charts side-by-side, and ensure that the titles/chart body/download buttons remain aligned as the window is shrunk.
-->
<Story name="Aligning 2 charts">
	{#snippet template(args)}
		<div
			class="grid grid-flow-col grid-cols-2 gap-x-12"
			style="grid-template-rows: auto auto auto;"
		>
			<ChartContainer
				{...args}
				overrideClass="bg-color-palette-red-500"
				title="This is the Chart Title"
				subTitle="Subtitle provides extra context"
				source="The source of this chart data"
				byline="A byline for the chart"
				note="Be aware that you can provide a note if required"
				dataDownloadButton={['JSON', 'CSV']}
				data={[]}
				imageDownloadButton={['PNG']}
				alignMultiple
			/>

			<ChartContainer
				{...args}
				overrideClass="bg-color-palette-red-500"
				title="This is the Chart Title"
				subTitle="Subtitle provides extra context. This one is much longer than for the other chart, so will wrap earlier."
				source="The source of this chart data"
				byline="A byline for the chart"
				note="Be aware that you can provide a note if required. This one is much longer than for the other chart, so will wrap earlier. It's really excessively long."
				dataDownloadButton={['JSON', 'CSV']}
				data={[]}
				imageDownloadButton={['PNG']}
				alignMultiple
			/>
		</div>
	{/snippet}
</Story>

<!--
	The `legend` snippet is rendered between the controls and the chart body.
	It is kept separate from the `controls` snippet so that, when two charts are placed side-by-side,
	the chart bodies stay aligned even if their legends wrap over a different number of lines.
-->
<Story name="With legend snippet">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart Title"
			subTitle="Subtitle provides extra context"
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{#snippet legend()}
				<div class="mb-4 flex flex-wrap gap-4 text-sm">
					<span class="flex items-center gap-2">
						<span class="inline-block h-3 w-3 rounded-full bg-color-palette-blue-500"></span>
						Variable A
					</span>
					<span class="flex items-center gap-2">
						<span class="inline-block h-3 w-3 rounded-full bg-color-palette-red-500"></span>
						Variable B
					</span>
				</div>
			{/snippet}

			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<!--
You can use HTML to provide additional formatting for the title/subTitle/source/byline/note.
It can also be used to add liks.
-->
<Story name="With HTML formatting">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart <i>Title</i>"
			subTitle="<i>Subtitle</i> provides extra context"
			source="<a href='https://www.london.gov.uk/programmes-strategies/research-and-analysis'>GLA city intelligence</a>"
			byline="A <i>byline</i> for the chart"
			note="Be aware that you can provide a <i>note</i> if required"
			dataDownloadButton={['JSON', 'CSV']}
			data={[]}
			imageDownloadButton
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<Story name="With id">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart <i>Title</i>"
			subTitle="<i>Subtitle</i> provides extra context"
			source="<a href='https://www.london.gov.uk/programmes-strategies/research-and-analysis' class='underline'>GLA city intelligence</a>"
			byline="A <i>byline</i> for the chart"
			note="Be aware that you can provide a <i>note</i> if required"
			dataDownloadButton={['JSON', 'CSV']}
			data={[]}
			imageDownloadButton
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
			id="MyCustomChart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<!--
	The `chartHeight` prop (default `h-60`) sets the height of the chart area via a Tailwind class.
	Here it is overridden to make the chart area taller.
-->
<Story name="Custom chartHeight">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			chartHeight="h-96"
			title="This is the Chart Title"
			subTitle="Subtitle provides extra context"
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<!--
	The `chartWidth` prop (default `w-full`) sets the overall width of the chart via a Tailwind class.
	Here it is overridden to make the chart occupy half the available width.
-->
<Story name="Custom chartWidth">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			chartWidth="w-1/2"
			title="This is the Chart Title"
			subTitle="Subtitle provides extra context"
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<!--
	This example is included for completeness, but is not an expected use: usually charts have at least a title.
-->
<Story name="Description modal only">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			dataDownloadButton={false}
			imageDownloadButton={false}
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<!--
	Both download buttons can be hidden by setting `dataDownloadButton={false}` and `imageDownloadButton={false}`.
-->
<Story name="No download buttons">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart Title"
			subTitle="Subtitle provides extra context"
			source="GLA city intelligence"
			byline="A byline for the chart"
			note="Be aware that you can provide a note if required"
			dataDownloadButton={false}
			imageDownloadButton={false}
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<!--
	`columnMapping` renames the columns in the downloaded data file, and `filename` sets the name of the downloaded file.
-->
<Story name="With columnMapping and filename">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart Title"
			subTitle="Subtitle provides extra context"
			source="GLA city intelligence"
			byline="A byline for the chart"
			data={[
				{ Month: '2015-01-01', Value: 53623.9 },
				{ Month: '2015-02-01', Value: 61816.0 }
			]}
			columnMapping={{ Month: 'Date', Value: 'Amount (GBP)' }}
			filename="my-custom-chart-data"
			dataDownloadButton={['CSV', 'JSON']}
			imageDownloadButton
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}
		</ChartContainer>
	{/snippet}
</Story>

<!--
	`description` may also be a snippet, for rich content. The container still handles the a11y
	wiring: the snippet is rendered once visually hidden (referenced by `aria-describedby` for
	screen readers) and once inside the "View description" Modal for sighted users — you do not
	add your own `sr-only` wrapper.
-->
<Story name="Description as a snippet">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart Title"
			subtitle="Subtitle provides extra context"
			alt="Simple description of type of chart"
		>
			{@render placeholderChart()}

			{#snippet description()}
				This chart shows an <strong>illustrative upward trend</strong> across the period; values are
				placeholder data.
			{/snippet}
		</ChartContainer>
	{/snippet}
</Story>

<!--
	`ChartContainer` has no surface of its own — no border, padding or shadow. When a surface
	is wanted, compose it inside a `Card`, which supplies the border/padding/shadow. Here the
	Card owns the title (primary slot), so the single chart inside is left untitled.
-->
<Story name="Inside a Card (single chart)">
	{#snippet template()}
		<div class="max-w-2xl">
			<Card title="Population by borough" subtitle="Mid-year estimate, illustrative data">
				<ChartContainer
					source="GLA City Intelligence"
					byline="Illustrative placeholder data"
					description="A detailed description of the chart for screen-reader and sighted users."
					alt="Simple description of type of chart"
				>
					{@render placeholderChart()}
				</ChartContainer>
			</Card>
		</div>
	{/snippet}
</Story>

<!--
	Several charts in one Card. The Card title yields the primary slot (`emphasis="secondary"`,
	so it renders as an eyebrow labelling the group), and each `ChartContainer` carries its own
	dominant title — the primary-slot rule from the spec.
-->
<Story name="Multiple charts in a Card">
	{#snippet template()}
		<div class="max-w-4xl">
			<Card title="London indicators" emphasis="secondary">
				<div class="grid gap-x-12 gap-y-6 sm:grid-cols-2">
					<ChartContainer title="Population" subtitle="by borough" byline="Illustrative data">
						{@render placeholderChart()}
					</ChartContainer>
					<ChartContainer title="Employment rate" subtitle="16–64, by borough" byline="Illustrative data">
						{@render placeholderChart()}
					</ChartContainer>
				</div>
			</Card>
		</div>
	{/snippet}
</Story>

<!--
	The other side of the primary-slot rule: when the Card owns the primary title, the chart yields
	with `emphasis="secondary"` so its own title renders as an eyebrow (kicker) rather than competing.
-->
<Story name="Demoted chart title in a Card">
	{#snippet template()}
		<div class="max-w-2xl">
			<Card title="Population" subtitle="Greater London, mid-year estimate">
				<ChartContainer
					title="By borough"
					emphasis="secondary"
					byline="Illustrative data"
					alt="Bar chart of population by London borough"
				>
					{@render placeholderChart()}
				</ChartContainer>
			</Card>
		</div>
	{/snippet}
</Story>
