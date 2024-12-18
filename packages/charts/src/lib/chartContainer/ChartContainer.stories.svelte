<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import ChartContainer from './ChartContainer.svelte';

	import { Select } from '@ldn-viz/ui';

	export const meta = {
		title: 'Charts/ChartContainer',
		component: ChartContainer
	};
</script>

<Template let:args>
	<ChartContainer {...args} />
</Template>

<Story name="Default" id="ChartcontainerDefault" />

<Story name="With Title">
	<ChartContainer title="This is the Chart Title" />
</Story>

<Story name="With Title and Subtitle">
	<ChartContainer title="This is the Chart Title" subTitle="Subtitle provides extra context" />
</Story>

<Story name="With Title, Subtitle, and Controls">
	<ChartContainer title="This is the Chart Title" subTitle="Subtitle provides extra context">
		<div slot="controls" class="flex gap-4">
			<Select label="An input affecting the chart" items={[]} />
			<Select label="Another input" items={[]} />
		</div>
	</ChartContainer>
</Story>

<Story name="Source, byline and note (footer)">
	<ChartContainer
		title="This is the Chart Title"
		subTitle="Subtitle provides extra context"
		source="GLA city intelligence"
		byline="A byline for the chart"
		note="Be aware that you can provide a note if required"
		dataDownloadButton={['JSON', 'CSV']}
		data={[]}
		imageDownloadButton
	/>
</Story>

<Story name="Source, byline only">
	<ChartContainer
		title="This is the Chart Title"
		subTitle="Subtitle provides extra context"
		source="The source of this chart data"
		byline="A byline for the chart"
		dataDownloadButton={['JSON', 'CSV']}
		data={[]}
		imageDownloadButton
	/>
</Story>

<!--
	**For use only in emergency** - an overrideClass can be applied to the slot area within the chart container. 
	This is primarily to fine tune the margins and padding around a Plot chart with a legend. (See the ObservablePlot / Examples / Line Chart) 
-->

<Story name="With Override Class">
	<ChartContainer
		overrideClass="bg-color-palette-red-500"
		title="This is the Chart Title"
		subTitle="Subtitle provides extra context"
		source="The source of this chart data"
		byline="A byline for the chart"
		note="Be aware that you can provide a note if required"
		dataDownloadButton={['JSON', 'CSV']}
		data={[]}
		imageDownloadButton={['PNG']}
	/>
</Story>

<!--
This story show how you can place two (or more) sites side-by-side, and ensure that the titles/chart body/download buttons remain aligned as the window is shrunk.
-->
<Story name="Aligning 2 charts">
	<div class="grid grid-flow-col grid-cols-2 gap-x-12" style="grid-template-rows: auto auto auto;">
		<ChartContainer
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
			overrideClass="bg-color-palette-red-500"
			title="This is the Chart Title"
			subTitle="Subtitle provides extra context. This one is much longer than for the other chart, so wil wrap earlier."
			source="The source of this chart data"
			byline="A byline for the chart"
			note="Be aware that you can provide a note if required. This one is much longer than for the other chart, so wil wrap earlier. It's really unnecessarilt ong."
			dataDownloadButton={['JSON', 'CSV']}
			data={[]}
			imageDownloadButton={['PNG']}
			alignMultiple
		/>
	</div>
</Story>
