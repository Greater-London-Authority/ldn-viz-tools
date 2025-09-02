<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { randomVals as chartData } from '../../../data/demoData';
	import ObservablePlot from '../../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../../observablePlotFragments/plot';

	const { Story } = defineMeta({
		title: 'Charts/Examples/Histograms'
	});

	// Spec and data for histogram example (default)
	let spec = $derived({
		marginTop: 48, // adjust for y label
		x: { insetLeft: 80, insetRight: 20 },
		marks: [
			Plot.gridX(),
			Plot.gridY(),
			Plot.axisX({ label: 'Random Value Range' }),
			Plot.axisY({ label: 'Frequency of value' }),
			Plot.rectY(chartData, Plot.binX({ y: 'count' }, { x: 'x', tip: true })),
			// baseline last
			Plot.ruleY([0])
		]
	});
</script>

<Story name="Default">
	{#snippet template()}
		<ObservablePlot
			{spec}
			data={chartData}
			title="Using the RectY mark to create a histogram that shows Math.random samples from a uniform distribution"
			subTitle="1000 randomly generated and binned values"
			alt="Histogram chart of 1000 randomly generated values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The histogram chart shows 1000 randomly generated and binned values in a uniform distribution. The x axis ranges in value from 0 to 1.0 and the y axis ranges in frequency from 0 to a randomly defined number."
		/>
	{/snippet}
</Story>
