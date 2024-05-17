<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import ChartContainer from './ChartContainer.svelte';

	export const meta = {
		title: 'Charts/ChartContainer',
		component: ChartContainer
	};
</script>

<script>
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

<Story name="Source, byline and note (footer)">
	<ChartContainer
		title="This is the Chart Title"
		subTitle="Subtitle provides extra context"
		footer={{
			source: 'The source of this chart data',
			byline: 'A byline for the chart',
			note: 'Be aware that you can provide a note if required',
			exportBtns: true
		}}
	/>
</Story>
