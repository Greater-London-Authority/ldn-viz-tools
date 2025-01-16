<script context="module">
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	export const meta = {
		title: 'Charts/Examples/LineChart'
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import ghgLondonTotalByYear from '../../data/ghgLondonTotalByYear.json';
	import { plotTheme } from '../observablePlotFragments/observablePlotFragments';
	import { Plot } from '../observablePlotFragments/plot';

	$: chartData = ghgLondonTotalByYear.map((d) => {
		return { ...d, year: new Date(d.Year, 0) };
	});

	/**
	 * Spec for default example
	 */

	$: defaultMarks = [
		Plot.gridX({ interval: '2 years' }),
		Plot.gridY(),
		Plot.ruleY([0]),
		Plot.line(chartData, { x: 'year', y: 'Domestic - Total' }),
		Plot.axisX({ interval: '2 years' }),
		Plot.axisY({ label: 'ktCO₂e' }),
		Plot.tip(
			chartData,
			Plot.pointerX({
				x: 'year',
				y: 'Domestic - Total',
				channels: { Year: 'year', Value: 'Value' },
				format: {
					x: false,
					Year: (d) => d.getFullYear()
				}
			})
		)
	];

	$: defaultSpec = {
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: defaultMarks
	};

	/**
	 * Spec for multi-line example
	 */

	$: multiLineExampleMarks = [
		Plot.gridX({ interval: '2 years' }),
		Plot.gridY(),
		Plot.ruleY([0]),
		Plot.line(chartData, {
			x: 'year',
			y: 'Domestic - Electricity',
			stroke: plotTheme().color.data.primary,
			tip: 'x'
		}),
		Plot.line(chartData, {
			x: 'year',
			y: 'Domestic - Gas',
			stroke: plotTheme().color.data.secondary,
			tip: 'x'
		}),
		Plot.axisX({ interval: '2 years' }),
		Plot.axisY({ label: 'ktCO₂e' }),
		Plot.tip(
			chartData,
			Plot.pointerX({
				x: 'year',
				y: 'Domestic - Electricity',
				channels: { Year: 'year', Value: 'Value' },
				format: {
					x: false,
					Year: (d) => d.getFullYear()
				}
			})
		),
		Plot.tip(
			chartData,
			Plot.pointerX({
				x: 'year',
				y: 'Domestic - Gas',
				channels: { Year: 'year', Value: 'Value' },
				format: {
					x: false,
					Year: (d) => d.getFullYear()
				}
			})
		)
		// Plot.ruleX(
		// 	chartData,
		// 	Plot.pointerX({ x: 'year', py: 'Domestic - Gas', stroke: plotTheme().color.chart.label })
		// )
	];

	$: multiLineSpec = {
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: multiLineExampleMarks
	};
</script>

<Template let:args>
	<ObservablePlot {...args} />
</Template>

<!--
```html
<script>
	import { Plot, ObservablePlot } from '@ldn-vis/charts';

	// Import data
	import ghgLondonTotalByYear from '../../data/ghgLondonTotalByYear.json';

	// Parse dates
	$: chartData = ghgLondonTotalByYear.map((d) => {
		return { ...d, year: new Date(d.Year, 0) };
	});

	$: marks = [
		Plot.gridX({ interval: '2 years' }),
		Plot.gridY(),
		Plot.ruleY([0]),
		Plot.line(chartData, { x: 'year', y: 'Domestic - Total' }),
		Plot.axisX({ interval: '2 years' }),
		Plot.axisY({ label: 'ktCO₂e' }),
		Plot.tip(
				chartData,
				Plot.pointerX({
					x: 'year',
					y: 'Domestic - Total',
					channels: { Year: 'year', Value: 'Value' },
					format: {
						x: false,
						Year: (d) => d.getFullYear()
					}
				})
			)
	];

	$: spec = {
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: marks
	};
</script>

<ObservablePlot
	spec={spec}
	title={'Domestic Greenhouse Gas Emissions'}
	subTitle={'Total Domestic Greenhouse Gas Emissions in London have fallen between 2005 and 2022'}
	data={ chartData }
/>
```
-->

<Story name="Default" source>
	<ObservablePlot
		spec={defaultSpec}
		title={'Domestic Greenhouse Gas Emissions'}
		subTitle={'Total Domestic Greenhouse Gas Emissions in London have fallen between 2005 and 2022'}
		data={chartData}
	/>
</Story>

<Story name="Multiple lines" source>
	<ObservablePlot
		spec={multiLineSpec}
		title={'Domestic Greenhouse Gas Emissions'}
		subTitle={'Total Domestic Greenhouse Gas Emissions in London have fallen between 2005 and 2022'}
		data={chartData}
	/>
</Story>
