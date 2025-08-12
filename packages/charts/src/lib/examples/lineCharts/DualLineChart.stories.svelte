<script module lang="ts">
	import { theme as currentThemeObj } from '@ldn-viz/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as d3 from 'd3';
	import { dualVariableData as chartData } from '../../../data/demoData';
	import ObservablePlot from '../../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../../observablePlotFragments/plot';
	import { formatHigh } from '../utils';

	const { Story } = defineMeta({
		title: 'Charts/Example Charts/LineChart'
	});

	let currentTheme = $derived(currentThemeObj.currentTheme);

	// Spec and data for dual line example
	let spec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		color: {
			legend: true,
			type: 'ordinal',
			range: [currentTheme.color.data.primary, currentTheme.color.data.context]
		},
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.line(chartData, {
				x: 'Month',
				y: 'Value',
				z: 'Variable',
				stroke: 'Variable',
				reverse: true, // draw in reverse to get Var A on top
				tip: {
					format: {
						x: true,
						y: (d) => '£' + formatHigh(d)
					}
				}
			}),
			Plot.ruleX([new Date('2016-01-01T00:00:01')]),
			Plot.text([0], {
				x: new Date('2016-01-01T00:00:01'),
				y: d3.max(chartData, (d) => d.Value),
				text: ['2016'],
				dy: 0,
				dx: 13,
				rotate: 90,
				textAnchor: 'start'
			}),
			// baseline last
			Plot.ruleY([0])
		]
	});
</script>

<Story name="Dual line">
	{#snippet template()}
		<ObservablePlot
			{spec}
			data={chartData}
			title="In London, Variable A has tracked Variable B closely since 2016"
			subTitle="London monthly estimated variable values (GBP), January 2015 to March 2024"
			alt="Line chart of London variable values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The line chart shows monthly time series data for Variable A and B, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758. Variable B follows a similar fall, with a mean average of £27,545."
		/>
	{/snippet}
</Story>
