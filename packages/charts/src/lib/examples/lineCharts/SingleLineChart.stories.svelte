<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { singleVariableData as chartData } from '../../../data/demoData';
	import ObservablePlot from '../../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../../observablePlotFragments/plot';
	import { formatHigh } from '../utils';

	const { Story } = defineMeta({
		title: 'Charts/Example Charts/LineChart'
	});

	// Spec and data for single line example (default)
	let spec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.ruleY([0]),
			Plot.line(chartData, {
				x: 'Month',
				y: 'Value',
				tip: {
					format: {
						x: true,
						y: (d) => '£' + formatHigh(d)
					}
				}
			})
		]
	});
</script>

<Story name="Single line">
	{#snippet template()}
		<ObservablePlot
			{spec}
			data={chartData}
			title="In London, Variable A's value has fallen steadily since 2017"
			subTitle="London monthly estimated variable value (GBP), January 2015 to March 2024"
			alt="Line chart of London's variable A values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The line chart shows monthly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. Variable A's has fallen steadily since around 2017. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758"
		/>
	{/snippet}
</Story>
