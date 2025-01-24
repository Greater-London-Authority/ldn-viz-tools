<script context="module">
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	/** This is an example `LineChart` chart using default plot styles.
	 *
	 * By default, charts are hidden from screen readers to improve accessibility. Instead, use descriptive `title`, `subTitle` and surrounding text description so all users understand what the chart shows.
	 */

	export const meta = {
		title: 'Charts/Examples/LineChart'
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
	import demoMonthlyTimeseriesLong from '../../data/demoMonthlyTimeseriesLong.json';
	import ghgLondonTotalByYear from '../../data/ghgLondonTotalByYear.json';
	import { plotTheme } from '../observablePlotFragments/observablePlotFragments';
	import { Plot } from '../observablePlotFragments/plot';

	$: chartData = ghgLondonTotalByYear.map((d) => {
		return { ...d, year: new Date(d.Year, 0) };
	});

	const getRandomArbitrary = function (min: number, max: number) {
		return Math.random() * (max - min) + min;
	};

	$: chartDataMulti = demoMonthlyTimeseriesLong;
	// .map((d) => {
	// 	return { ...d, Value: d.Value * getRandomArbitrary(1, 1.025) * 1000 };
	// });

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

	// $: multiLineSpec = {
	// 	x: { insetLeft: 80, insetRight: 20, type: 'utc' },
	// 	marks: [
	// 		Plot.gridX({ interval: '2 years' }),
	// 		Plot.gridY(),
	// 		Plot.ruleY([0]),
	// 		Plot.line(chartData, {
	// 			x: 'year',
	// 			y: 'Domestic - Electricity',
	// 			stroke: plotTheme().color.data.primary
	// 		}),
	// 		Plot.line(chartData, {
	// 			x: 'year',
	// 			y: 'Domestic - Gas',
	// 			stroke: plotTheme().color.data.secondary
	// 		}),
	// 		Plot.axisX({ interval: '2 years' }),
	// 		Plot.axisY({ label: 'ktCO₂e' }),
	// 		Plot.ruleX(
	// 			chartData,
	// 			Plot.pointerX({ x: 'year', py: 'Domestic - Gas', stroke: plotTheme().color.chart.label })
	// 		),
	// 		Plot.tip(
	// 			chartData,
	// 			Plot.pointerX({
	// 				x: 'year',
	// 				y: 'Domestic - Electricity',
	// 				channels: { Value: 'Value' },
	// 				format: {
	// 					x: false,
	// 					Year: (d) => d.getFullYear()
	// 				}
	// 			})
	// 		),
	// 		Plot.tip(
	// 			chartData,
	// 			Plot.pointerX({
	// 				x: 'year',
	// 				y: 'Domestic - Gas',
	// 				channels: { Value: 'Value' },
	// 				format: {
	// 					x: false,
	// 					Year: (d) => d.getFullYear()
	// 				}
	// 			})
	// 		)
	// 	]
	// };

	$: multiLineSpec = {
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		color: {
			legend: true,
			type: 'ordinal',
			range: [
				plotTheme().color.data.primary,
				plotTheme().color.data.secondary,
				plotTheme().color.data.tertiary
			]
		},
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ interval: '1 year' }),
			Plot.axisY({ label: '£ GBP' }),
			Plot.ruleY([0]),
			Plot.line(chartDataMulti, {
				x: 'Month',
				y: 'Value',
				z: 'Variable',
				stroke: 'Variable'
			}),

			Plot.ruleX(
				chartDataMulti,
				Plot.pointerX({ x: 'Month', stroke: plotTheme().color.chart.label })
			),
			Plot.point(
				chartDataMulti,
				Plot.pointer({ x: 'Month', y: 'Value', z: 'Variable', stroke: 'Variable' })
			),
			Plot.tip(
				chartDataMulti,
				Plot.pointer({
					x: 'Month',
					y: 'Value',
					z: 'Varaible',
					channels: { Variable: 'Variable', Date: 'Month', 'GBP (£)': 'Value' },
					format: {
						x: false,
						y: false
					}
				})
			)
			// Plot.tip(
			// 	chartData,
			// 	Plot.pointerX({
			// 		x: 'year',
			// 		y: 'Domestic - Gas',
			// 		channels: { Value: 'Value' },
			// 		format: {
			// 			x: false,
			// 			Year: (d) => d.getFullYear()
			// 		}
			// 	})
			// )
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
	data={chartData}
	title="Domestic Greenhouse Gas Emissions in London have fallen steadily since 2005"
	subTitle="London annual domestic greenhouse gas emissions split by gas and electric energy, measured in kilotonnes of carbon dioxide equivalent (ktCO₂e), from 2005 to 2022"
	alt="Line chart of London annual domestic greenhouse gas emissions"
	byline="GLA City Intelligence"
	source="LDN Viz Tools Demo Data"
	note="Data for demonstration purposes only"
	chartDescription="The chart shows domestic greenhouse gas emissions in London fell by almost 8,000 kilotonnes of carbon dioxide equivalent from 2005 to 2022. There are two lines, one shows domestic gas emissions and the second shows domestic electricity emissions. In 2005, for gas, there were 9,748 kilotonnes of carbon dioxide equivalent which dropped to 6,343 kilotonnes in 2022. In 2005, for electricity, there were 6,986 kilotonnes of carbon dioxide equivalent which dropped to 2,632 kilotonnes in 2022."
	/>
```
-->

<Story name="Multiple lines" source>
	<ObservablePlot
		spec={multiLineSpec}
		data={chartDataMulti}
		title="In London, all variable values have fallen steadily since 2017, with Variable A experiencing the most siginificant fall. "
		subTitle="London monthly estimated variable values (GBP), January 2015 to March 2024"
		alt="Line chart of London variable values"
		byline="GLA City Intelligence"
		source="LDN Viz Tools Demo Data"
		note="Data for demonstration purposes only"
		chartDescription="The line chart shows monthly time series data for Variable A, B and C, measured in GBP (Pounds Sterling), from January 2015 to March 2024.  "
	/>
</Story>
