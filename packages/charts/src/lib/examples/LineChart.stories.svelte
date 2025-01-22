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
		Plot.gridY({}),
		Plot.ruleY([0], {}),
		Plot.line(chartData, {
			x: 'year',
			y: 'Domestic - Total'
		}),
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
	data={chartData}
	title="Domestic Greenhouse Gas Emissions in London have fallen steadily since 2005"
	subTitle="London annual domestic greenhouse gas emissions, measured in kilotonnes of carbon dioxide equivalent (ktCO₂e), from 2005 to 2022"
	alt="Line chart of London annual domestic greenhouse gas emissions"
	note="This is for footnotes"
	source="GLA Environment Team"
	byline="GLA City Intelligence Unit"
	chartDescription="The chart shows total domestic greenhouse gas emissions in London fell by almost 8,000 kilotonnes of carbon dioxide equivalent from 2005 to 2022. In 2005, there were 16,833 kilotonnes of carbon dioxide equivalent, which fell to 9,066 kilotonnes of carbon dioxide equivalent in 2022."
/>
```
-->

<Story name="Default" source>
	<ObservablePlot
		spec={defaultSpec}
		data={chartData}
		title="Domestic Greenhouse Gas Emissions in London have fallen steadily since 2005"
		subTitle="London annual domestic greenhouse gas emissions, measured in kilotonnes of carbon dioxide equivalent (ktCO₂e), from 2005 to 2022"
		alt="Line chart of London annual domestic greenhouse gas emissions"
		note="This is for footnotes"
		source="GLA Environment Team"
		byline="GLA City Intelligence Unit"
		chartDescription="The chart shows total domestic greenhouse gas emissions in London fell by almost 8,000 kilotonnes of carbon dioxide equivalent from 2005 to 2022. In 2005, there were 16,833 kilotonnes of carbon dioxide equivalent, which fell to 9,066 kilotonnes of carbon dioxide equivalent in 2022."
	/>
</Story>

<Story name="Multiple lines" source>
	<ObservablePlot
		spec={multiLineSpec}
		data={chartData}
		title="Domestic Greenhouse Gas Emissions in London have fallen steadily since 2005"
		subTitle="London annual domestic greenhouse gas emissions split by gas and electric energy, measured in kilotonnes of carbon dioxide equivalent (ktCO₂e), from 2005 to 2022"
		alt="Line chart of London annual domestic greenhouse gas emissions"
		chartDescription="The chart shows domestic greenhouse gas emissions in London fell by almost 8,000 kilotonnes of carbon dioxide equivalent from 2005 to 2022. There are two lines, one shows domestic gas emissions and the second shows domestic electricity emissions. In 2005, for gas, there were 9,748 kilotonnes of carbon dioxide equivalent which dropped to 6,343 kilotonnes in 2022. In 2005, for electricity, there were 6,986 kilotonnes of carbon dioxide equivalent which dropped to 2,632 kilotonnes in 2022."
	/>
</Story>
