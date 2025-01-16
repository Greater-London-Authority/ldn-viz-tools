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
	import { Plot } from '../observablePlotFragments/plot';

	$: chartData = ghgLondonTotalByYear.map((d) => {
		return { ...d, year: new Date(d.Year, 0) };
	});

	$: defaultMarks = [
		Plot.gridX({ interval: '2 years' }),
		Plot.gridY({}),
		Plot.ruleY([0], {}),
		Plot.line(chartData, {
			x: 'year',
			y: 'Domestic - Total'
		}),
		Plot.axisX({ interval: '2 years' }),
		Plot.axisY({
			label: 'ktCO₂e'
		})
	];

	$: defaultSpec = {
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: defaultMarks
	};

	$: specWithTooltip = {
		...defaultSpec,
		marks: [
			...defaultMarks,
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

<Template let:args>
	<ObservablePlot {...args} />
</Template>

<Story
	name="Default"
	args={{
		spec: defaultSpec,
		title: 'Total Domestic Greenhouse Gas Emissions in London have fallen between 2005 and 2022',
		subTitle:
			'Line chart showing total domestic greenhouse gas emissions in London fell by almost 8,000 kilotons of carbon dioxide emissions from 2005 to 2022. In 2005, there were almost 17,000 kilotons of carbon dioxide emissions, falling to 9,066 kilotons of carbon dioxide emissions in 2022.',
		data: { chartData }
	}}
	source
/>

<Story
	name="With Tooltip"
	args={{
		spec: specWithTooltip,
		title: 'Total Domestic Greenhouse Gas Emissions in London have fallen between 2005 and 2022',
		subTitle:
			'Line chart showing total domestic greenhouse gas emissions in London fell by almost 8,000 kilotons of carbon dioxide emissions from 2005 to 2022. In 2005, there were almost 17,000 kilotons of carbon dioxide emissions, falling to 9,066 kilotons of carbon dioxide emissions in 2022.',
		data: { chartData }
	}}
	source
/>
