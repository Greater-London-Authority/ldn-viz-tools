<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { singleVariableData as chartData } from '../../../data/demoData';
	import ObservablePlot from '../../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../../observablePlotFragments/plot';
	import { formatHigh } from '../utils';

	const { Story } = defineMeta({
		title: 'Charts/Example Charts/LineChart'
	});

	// Spec and data for area example
	let spec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.areaY(chartData, {
				x: 'Month',
				y: 'Value',
				fillOpacity: 0.8
			}),
			Plot.line(chartData, {
				x: 'Month',
				y: 'Value',
				tip: {
					format: {
						x: true,
						y: (d) => '£' + formatHigh(d)
					}
				}
			}),
			// baseline last
			Plot.ruleY([0])
		]
	});
</script>

<Story name="Area chart with custom fill opacity" exportName="AreaOpacity">
	{#snippet template()}
		<ObservablePlot
			{spec}
			data={chartData}
			title="In London, Variable A's value has fallen steadily since 2017"
			subTitle="London monthly estimated variable value (GBP), January 2015 to March 2024"
			alt="Area chart of London's variable A values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The area chart shows monthly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. Variable A's value has fallen steadily since around 2017. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023 (a change of around -£50,149), and its mean average value was £30,758."
		/>
	{/snippet}
</Story>
