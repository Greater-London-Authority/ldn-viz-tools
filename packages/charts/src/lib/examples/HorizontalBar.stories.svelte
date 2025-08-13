<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as d3 from 'd3';
	import { multiVarSingleYearAggregatedByYear as chartData } from '../../data/demoData';
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../observablePlotFragments/plot';
	import { formatHigh } from './utils';

	const { Story } = defineMeta({
		title: 'Charts/Examples/Bar Charts'
	});

	let spec = $derived({
		height: 300, // height set outside of default
		marginLeft: 80, // adjust margin left to suit label length,
		// reset insetLeft to 0, push domain to padded max value, insetRight to prevent label clipping on x axis
		x: {
			insetLeft: 0,
			insetRight: 16,
			domain: [0, d3.min(chartData, (d) => d.Average * 1.15)]
		},
		marks: [
			Plot.gridX(),
			Plot.axisX({ label: null, tickFormat: (d) => '£' + formatHigh(d) }),
			// change text & line anchors and reset dx & dy
			Plot.axisY({ textAnchor: 'end', lineAnchor: 'middle', dx: 0, dy: 0 }),
			Plot.barX(chartData, {
				insetTop: 5,
				insetBottom: 5,
				x: 'Average',
				y: 'Variable',
				tip: {
					format: {
						x: (d) => '£' + formatHigh(d),
						y: false
					}
				}
			}),
			// baseline last
			Plot.ruleX([0])
		]
	});
</script>

<Story name="Horizontal">
	{#snippet template()}
		<ObservablePlot
			{spec}
			data={chartData}
			title="In London (2024), Variable A's annual average is higher than both B and C"
			subTitle="London yearly average estimated variable values (GBP), 2024"
			alt="Bar chart of London's variable values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The bar chart shows annual average  data in 2024 for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges from £0 to £20,000. The y axis shows Variable A, B and C. Variable A had the highest annual average of £19,786 compared to B which was £17,614 and C which was £17,674."
		/>
	{/snippet}
</Story>
