<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { yearlyData } from '../../../data/demoData';
	import ObservablePlot from '../../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../../observablePlotFragments/plot';
	import { format } from 'd3-format';

	const { Story } = defineMeta({
		title: 'Charts/Examples/Bar Charts'
	});

	const chartData = yearlyData.filter((d) => d.Variable === 'Variable A');

	let spec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'band' },
		marks: [
			Plot.gridY(),
			Plot.axisX({ label: 'Year' }),
			Plot.axisY({ tickFormat: (d) => '£' + format(',.4~s')(d) }),
			Plot.barY(chartData, {
				x: 'Year',
				y: 'Average',
				tip: {
					format: {
						x: true,
						y: (d) => '£' + format(',.4~s')(d)
					}
				}
			}),
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
			title="In London, Variable A's value has fallen steadily since 2015"
			subTitle="London yearly average estimated variable value (GBP), 2015 to 2024"
			alt="Bar chart of London's variable A values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The bar chart shows yearly average time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £40,000. Variable A's value has fallen steadily since 2015. Variable A's highest value was £43,473 in 2015, its lowest value was £19,786 in 2024, (a change of around -£23,686) and its mean value was £29,936."
		/>
	{/snippet}
</Story>
