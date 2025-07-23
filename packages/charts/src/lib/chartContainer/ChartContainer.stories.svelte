<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ChartContainer from './ChartContainer.svelte';

	import { Select } from '@ldn-viz/ui';

	const { Story } = defineMeta({
		title: 'Charts/Components/ChartContainer',
		component: ChartContainer,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		/>
	{/snippet}
</Story>

<Story name="With Title">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart Title"
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		/>
	{/snippet}
</Story>

<Story name="With Title and Subtitle">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart Title"
			subTitle="Subtitle provides extra context"
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		/>
	{/snippet}
</Story>

<Story name="With Title, Subtitle, and Controls">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="This is the Chart Title"
			subTitle="Subtitle provides extra context"
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		>
			{#snippet controls()}
				<div class="flex gap-4">
					<Select label="An input affecting the chart" items={[]} />
					<Select label="Another input" items={[]} />
				</div>
			{/snippet}
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
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		/>
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
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		/>
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
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
		/>
	{/snippet}
</Story>

<!--
This story show how you can place two (or more) sites side-by-side, and ensure that the titles/chart body/download buttons remain aligned as the window is shrunk.
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
				subTitle="Subtitle provides extra context. This one is much longer than for the other chart, so wil wrap earlier."
				source="The source of this chart data"
				byline="A byline for the chart"
				note="Be aware that you can provide a note if required. This one is much longer than for the other chart, so wil wrap earlier. It's really excessively long."
				dataDownloadButton={['JSON', 'CSV']}
				data={[]}
				imageDownloadButton={['PNG']}
				alignMultiple
			/>
		</div>
	{/snippet}
</Story>
