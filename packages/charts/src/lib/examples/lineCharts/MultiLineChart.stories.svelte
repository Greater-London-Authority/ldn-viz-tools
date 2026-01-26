<script module lang="ts">
	import { theme } from '@ldn-viz/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { format } from 'd3-format';
	import { monthlyData as chartData } from '../../../data/demoData';
	import ObservablePlot from '../../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../../observablePlotFragments/plot';

	const { Story } = defineMeta({
		title: 'Charts/Examples/Line Charts'
	});

	// Spec and data for multi-line example
	let spec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		color: {
			legend: true,
			type: 'ordinal',
			range: [
				theme.currentMode.data.primary,
				theme.currentMode.data.secondary,
				theme.currentMode.data.tertiary
			]
		},
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + format(',.4~s')(d) }),
			Plot.line(chartData, {
				x: 'Month',
				y: 'Value',
				z: 'Variable',
				stroke: 'Variable'
			}),

			Plot.ruleX(chartData, Plot.pointerX({ x: 'Month', stroke: theme.currentMode.chart.label })),
			Plot.point(
				chartData,
				Plot.pointer({ x: 'Month', y: 'Value', z: 'Variable', stroke: 'Variable' })
			),
			Plot.tip(
				chartData,
				Plot.pointer({
					x: 'Month',
					y: 'Value',
					z: 'Variable',
					channels: {
						Variable: 'Variable',
						Month: { value: 'Month', label: 'Date' },
						Value: { value: 'Value', label: 'GBP' }
					},
					format: {
						Variable: true,
						Month: true,
						Value: (d) => '£' + format(',.4~s')(d),
						x: false,
						y: false
					}
				})
			),
			// baseline last
			Plot.ruleY([0])
		]
	});
</script>

<Story name="Multiple lines">
	{#snippet template()}
		<ObservablePlot
			{spec}
			data={chartData}
			title="In London, all variable values have fallen steadily since 2017, with Variable A experiencing the most significant fall"
			subTitle="London monthly estimated variable values (GBP), January 2015 to March 2024"
			alt="Line chart of London variable values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The line chart shows monthly time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758. Variable B and C follow a similar fall, with a mean average of £27,545 and £23,681 respectively."
		/>
	{/snippet}
</Story>
