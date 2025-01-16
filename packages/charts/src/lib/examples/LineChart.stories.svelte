<script context="module">
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	/** This is an example `LineChart` chart using default plot styles.
	 *
	 * This incorporates `ariaHidden` and `ariaLabel` props inside the spec to ensure the screen reader ignores individual SVG elements for accessibility.
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
		Plot.gridX({ interval: '2 years', ariaHidden: 'true' }),
		Plot.gridY({ ariaHidden: 'true' }),
		Plot.ruleY([0], { ariaHidden: 'true' }),
		Plot.line(chartData, {
			x: 'year',
			y: 'Domestic - Total',
			ariaHidden: 'true'
		}),
		Plot.axisX({ interval: '2 years', ariaHidden: 'true' }),
		Plot.axisY({
			label: 'ktCO₂e',
			ariaHidden: 'true'
		})
	];

	$: defaultSpec = {
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: defaultMarks,
		ariaLabel:
			'Domestic Greenhouse Gas Emissions dropped from over 16,000 kilotons of carbon dioxide emissions in 2005, to below 10,000 kilotons in 2022'
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
		title: 'Domestic Greenhouse Gas Emissions',
		subTitle: 'Total Domestic Greenhouse Gas Emissions in London have fallen between 2005 and 2022',
		data: { chartData }
	}}
	source
/>

<Story
	name="With Tooltip"
	args={{
		spec: specWithTooltip,
		title: 'Domestic Greenhouse Gas Emissions',
		subTitle: 'Total Domestic Greenhouse Gas Emissions in London have fallen between 2005 and 2022',
		data: { chartData }
	}}
	source
/>
