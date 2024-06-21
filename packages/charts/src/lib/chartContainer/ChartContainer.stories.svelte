<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import ChartContainer from './ChartContainer.svelte';

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

<!--
	**For use only in emergency** - an overrideClass can be applied to the slot area within the chart container. 
	This is primarily to fine tune the margins and padding around a Plot chart with a legend. (See the ObservablePlot / Examples / Line Chart) 
-->

<Story name="With Override Class">
	<ChartContainer
		overrideClass="bg-core-red-500"
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
