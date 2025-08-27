<script module lang="ts">
	import { theme } from '@ldn-viz/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { yearlyData as chartData } from '../../data/demoData';
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../observablePlotFragments/plot';
	import { format } from 'd3-format';

	const { Story } = defineMeta({
		title: 'Charts/Examples/Bar Charts'
	});

	let spec = $derived({
		marginRight: 120, // adjust margin right to suit your label length
		marginTop: 20, // adjust top margin to better suit facetY,
		x: { insetLeft: 80, insetRight: 20, type: 'band' },
		fy: { padding: 0.2 }, // add options or true to ensure defaultSizeFacet is applied
		color: {
			legend: true,
			range: [
				theme.currentTheme.color.data.primary,
				theme.currentTheme.color.data.secondary,
				theme.currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridY(),
			Plot.axisX({ label: 'Year' }),
			Plot.axisY({ tickFormat: (d) => '£' + format(',.4~s')(d) }),
			Plot.barY(chartData, {
				x: 'Year',
				y: 'Average',
				fy: 'Variable',
				fill: 'Variable',
				tip: {
					format: {
						x: true,
						y: (d) => '£' + format(',.4~s')(d)
					}
				}
			}),
			// baseline last
			Plot.ruleY([0])
		]
	});
</script>

<Story name="Faceted">
	{#snippet template()}
		<ObservablePlot
			{spec}
			data={chartData}
			title="In London, total value across all variables has fallen steadily since 2015"
			subTitle="London yearly average estimated variable value (GBP), 2015 to 2024"
			alt="Faceted bar chart of London variable values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The faceted bar chart shows yearly average time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £40,000. Variable A's value has fallen steadily since 2015. Variable A's highest value was £43,473 in 2015, its lowest value was £19,786 in 2024, (a change of around -£23,687) and its mean value was £29,936. Variable B and C follow a similar fall, with a mean of £26,800 and £23,231 respectively."
		/>
	{/snippet}
</Story>
