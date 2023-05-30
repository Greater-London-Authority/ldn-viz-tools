<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import data from '../../data/dataScatter';
	import ScatterPlot from './ScatterPlot.svelte';
</script>

<Meta title="Charts/ScatterPlot" component={ScatterPlot} />

<Template let:args>
	<ScatterPlot
		{data}
		x="year"
		y="value"
		xDomain={[1979, 2017]}
		title="Scatter Plot"
		xAxis={{ baseline: true, gridlines: true }}
		yAxis={{ baseline: true }}
		markOptions={{ r: 4 }}
	/>
</Template>

<Story name="Default" />
