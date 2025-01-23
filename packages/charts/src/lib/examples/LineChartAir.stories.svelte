<script context="module">
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	export const meta = {
		title: 'Charts/Examples/LineChartAir'
	};
</script>

<!-- TODO:
[x] Thicker line (for contrast) (done in fragments)
[ ] Long data, not wide (wide data example elsewhere?
[ ] Make data 'meaningless' to avoid distraction. So 'Variable 1, Variable 2, etc'
[ ] Make date formats and ranges real, as transformations and formatting are important
[ ] Change spec to use lomg data and set color domains (rather than wide data named fields.render. or both?)
[ ] London vs Rest of UK (primary vs grey)
[ ] Multi line
[ ] Many multi Line (as grey context) 
[ ] Points on lines (with label?)
[ ] X & Y threshold line (and annotation)
[ ] Range highlight 
[ ] X axis label, Y axis label
[ ] area chart, as simple addition to line? (not stacked)

-->

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import airQualityLondonMonthly2024 from '../../data/airQualityLondonMonthly2024.json';
	import ghgLondonTotalByYear from '../../data/ghgLondonTotalByYear.json';
	import { plotTheme } from '../observablePlotFragments/observablePlotFragments';
	import { Plot } from '../observablePlotFragments/plot';

	$: chartData = ghgLondonTotalByYear.map((d) => {
		return { ...d, year: new Date(d.Year, 0) };
	});

	$: chartDataAir = airQualityLondonMonthly2024.map((d) => {
		return { ...d, Month: new Date(d.Month) };
	});

	$: console.log(chartDataAir);

	/**
	 * Spec for default example
	 */

	$: defaultSpec = {
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
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
		]
	};

	/**
	 * Spec for multi-line example
	 */

	$: multiLineSpec = {
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.ruleY([0]),
			Plot.line(chartData, {
				x: 'year',
				y: 'Domestic - Electricity',
				stroke: plotTheme().color.data.primary
			}),
			Plot.line(chartData, {
				x: 'year',
				y: 'Domestic - Gas',
				stroke: plotTheme().color.data.secondary
			}),
			Plot.axisX({ interval: '2 years' }),
			Plot.axisY({ label: 'ktCO₂e' }),
			Plot.ruleX(
				chartData,
				Plot.pointerX({ x: 'year', py: 'Domestic - Gas', stroke: plotTheme().color.chart.label })
			),
			Plot.tip(
				chartData,
				Plot.pointerX({
					x: 'year',
					y: 'Domestic - Electricity',
					channels: { Value: 'Value' },
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
					channels: { Value: 'Value' },
					format: {
						x: false,
						Year: (d) => d.getFullYear()
					}
				})
			)
		]
	};
</script>

<Template let:args>
	<ObservablePlot {...args} />
</Template>

<!--
```html
<script>
	import { Plot, ObservablePlot } from '@ldn-viz/charts';

	// Import data
	import ghgLondonTotalByYear from '../../data/ghgLondonTotalByYear.json';

	// Parse dates
	$: chartData = ghgLondonTotalByYear.map((d) => {
		return { ...d, year: new Date(d.Year, 0) };
	});

	$: spec = {
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
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
		]
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

<!--
```html
<script>
	import { Plot, ObservablePlot } from '@ldn-viz/charts';

	// Import data
	import ghgLondonTotalByYear from '../../data/ghgLondonTotalByYear.json';

	// Parse dates
	$: chartData = ghgLondonTotalByYear.map((d) => {
		return { ...d, year: new Date(d.Year, 0) };
	});

	$: spec = {
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
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
		]
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

<Story name="Multiple lines" source>
	<ObservablePlot
		spec={multiLineSpec}
		title={'Domestic Greenhouse Gas Emissions'}
		subTitle={'Total Domestic Greenhouse Gas Emissions in London have fallen between 2005 and 2022'}
		data={chartData}
	/>
</Story>
