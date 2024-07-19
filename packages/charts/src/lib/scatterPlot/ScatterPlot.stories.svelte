<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import ScatterPlot from './ScatterPlot.svelte';

	export const meta = {
		title: 'Charts/ScatterPlot',
		component: ScatterPlot,
		argTypes: {
			$$restprops: {
				description: 'Any other props are passed through to `<LayerCake>`',
				table: {
					category: 'properties'
				}
			}
		}
	};
</script>

<script>
	import data from '../../data/dataScatter';
</script>

<Template let:args>
	<ScatterPlot
		{...args}
		{data}
		x="year"
		y="value"
		xDomain={[1979, 2017]}
		xAxis={{ baseline: true, gridlines: true }}
		yAxis={{ baseline: true }}
		markOptions={{ r: 4 }}
	/>
</Template>

<Story name="Default" />

<Story
	name="With Chrome"
	args={{ title: 'Chart Title', subTitle: 'This is a sub title', footer: { exportBtns: true } }}
/>

<Story
	name="With Chrome but no downlaod buttons"
	args={{
		title: 'Chart Title',
		subTitle: 'This is a sub title',
		footer: { byline: 'byline', source: 'Source', note: 'Note', exportBtns: true }
	}}
/>
