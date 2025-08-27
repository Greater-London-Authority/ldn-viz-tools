<script module lang="ts">
	import { theme } from '@ldn-viz/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { yearlyData } from '../../../data/demoData';
	import ObservablePlot from '../../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../../observablePlotFragments/plot';
	import { format } from 'd3-format';

	const { Story } = defineMeta({
		title: 'Charts/Examples/Bar Charts'
	});

	let chartData = yearlyData.filter((d) => d.Year === '2015' || d.Year === '2021');

	let spec = $derived({
		height: 300, // height set outside of default
		marginLeft: 80, // adjust margin left to suit label length,
		// reset insetLeft to 0, push domain to padded max value, insetRight to prevent label clipping on x axis
		x: {
			insetLeft: 0,
			insetRight: 16
		},
		y: { type: 'band' },
		color: {
			legend: true,
			range: [
				theme.currentTheme.color.data.primary,
				theme.currentTheme.color.data.secondary,
				theme.currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridX(),
			Plot.axisX({ label: null, tickFormat: (d) => '£' + format(',.4~s')(d) }),
			// change text & line anchors and reset dx & dy
			Plot.axisY({ textAnchor: 'end', lineAnchor: 'middle', dx: 0, dy: 0 }),
			Plot.barX(chartData, {
				insetTop: 5,
				insetBottom: 5,
				x: 'Average',
				y: 'Year',
				fill: 'Variable',
				tip: {
					format: {
						x: (d) => '£' + format(',.4~s')(d),
						y: false,
						fill: false
					}
				}
			}),
			// baseline last
			Plot.ruleX([0])
		]
	});
</script>

<Story name="Horizontal Stacked">
	{#snippet template()}
		<ObservablePlot
			{spec}
			data={chartData}
			title="In London, total yearly average across all variables has dropped significantly from 2015 to 2021"
			subTitle="London yearly average estimated variable values combined (GBP), 2015 vs 2021"
			alt="Stacked bar chart of London's variable values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The stacked bar chart shows yearly average  data in 2015 vs 2021 for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges from £0 to £100,000. The y axis shows 2015 and 2021. The combined annual average for all variables was £105,503 in 2015 compared to £66,820 in 2021 (a change of around -£38,683). Variable A had the most significant change of -£19,328 in 2021 vs 2015."
		/>
	{/snippet}
</Story>
