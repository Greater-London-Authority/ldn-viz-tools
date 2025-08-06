<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	/** These are example `SlopeChart` charts using default plot styles.
	 *
	 * By default, charts (and their inner details) are hidden from screen readers to improve the accessibility experience. Instead, it's crtitical we use a descriptive `title`, `subTitle`, `alt`, `chartDescription` and surrounding document text, so all users understand what the chart shows and gain the same insight. We should also link to the data where possible.
	 */

	const { Story } = defineMeta({
		title: 'Charts/Example Charts/SlopeChart',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { theme as currentThemeObj } from '@ldn-viz/ui';
	import * as d3 from 'd3';
	import { multiVarDualYearAggregatedByYear } from '../../data/demoData';
	import { Plot } from '../observablePlotFragments/plot';
	import { formatHigh } from './utils';

	let currentTheme = $derived(currentThemeObj.currentTheme);

	// OcclusionY adds an initializer that shifts nodes vertically with a tiny force simulation.
	const occlusionY = ({ radius = 6.5, ...options } = {}) =>
		Plot.initializer(
			options,
			(data, facets, { y: { value: Y }, text: { value: T } }, { y: sy }, dimensions, context) => {
				for (const index of facets) {
					const unique = new Set();
					const nodes = Array.from(index, (i) => ({
						fx: 0,
						y: sy(Y[i]),
						visible: unique.has(T[i]) // remove duplicate labels
							? false
							: !!unique.add(T[i]),
						i
					}));
					d3.forceSimulation(nodes.filter((d) => d.visible))
						.force(
							'y',
							d3.forceY(({ y }) => y)
						) // gravitate towards the original y
						.force('collide', d3.forceCollide().radius(radius)) // collide
						.stop()
						.tick(20);
					for (const { y, node, i, visible } of nodes) Y[i] = !visible ? NaN : y;
				}
				return { data, facets, channels: { y: { value: Y } } };
			}
		);

	// Spec and data for slope example (default)
	let singleSlopeSpec = $derived({
		height: 300,
		marginBottom: 30,
		x: { axis: null, type: 'ordinal', insetLeft: 90, insetRight: 90 },
		y: { axis: null, inset: 20 },
		color: {
			legend: true,
			range: [
				currentTheme.color.data.primary,
				currentTheme.color.data.secondary,
				currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.line(multiVarDualYearAggregatedByYear, {
				x: 'Year',
				y: 'Average',
				z: 'Variable',
				stroke: 'Variable',
				tip: true
			}),
			Plot.tickX(multiVarDualYearAggregatedByYear, {
				x: 'Year',
				stroke: currentTheme.color.chart.grid
			}),
			Plot.textX(
				multiVarDualYearAggregatedByYear.filter((d) => d.Variable === 'Variable A'),
				{
					dy: 135,
					text: (d) => d.Year
				}
			),
			Plot.dot(multiVarDualYearAggregatedByYear, {
				r: 4,
				x: 'Year',
				y: 'Average',
				stroke: 'Variable',
				strokeWidth: 2,
				fill: currentTheme.color.chart.background,
				fillOpacity: 1
			}),
			d3
				.groups(multiVarDualYearAggregatedByYear, (d) => d.Year === '2015')
				.map(([left, data]) =>
					Plot.text(
						data,
						occlusionY({
							x: 'Year',
							y: 'Average',
							text: (d) => '£' + formatHigh(d.Average),
							textAnchor: left ? 'end' : 'start',
							dx: left ? -8 : 8,
							radius: 8.5
						})
					)
				)
		]
	});
</script>

<!--
```html
<script>
	import { theme as currentThemeObj } from '@ldn-viz/ui';
	import * as d3 from 'd3';
	import { multiVarDualYearAggregatedByYear } from '../../data/demoData';
	import { Plot } from '../observablePlotFragments/plot';
	import { formatHigh } from './utils';

	let currentTheme = $derived(currentThemeObj.currentTheme);

	// OcclusionY adds an initializer that shifts nodes vertically with a tiny force simulation.
	const occlusionY = ({ radius = 6.5, ...options } = {}) =>
		Plot.initializer(
			options,
			(data, facets, { y: { value: Y }, text: { value: T } }, { y: sy }, dimensions, context) => {
				for (const index of facets) {
					const unique = new Set();
					const nodes = Array.from(index, (i) => ({
						fx: 0,
						y: sy(Y[i]),
						visible: unique.has(T[i]) // remove duplicate labels
							? false
							: !!unique.add(T[i]),
						i
					}));
					d3.forceSimulation(nodes.filter((d) => d.visible))
						.force(
							'y',
							d3.forceY(({ y }) => y)
						) // gravitate towards the original y
						.force('collide', d3.forceCollide().radius(radius)) // collide
						.stop()
						.tick(20);
					for (const { y, node, i, visible } of nodes) Y[i] = !visible ? NaN : y;
				}
				return { data, facets, channels: { y: { value: Y } } };
			}
		);

	// Spec and data for slope example (default)
	let singleSlopeSpec = $derived({
		height: 300,
		marginBottom: 30,
		x: { axis: null, type: 'ordinal', insetLeft: 90, insetRight: 90 },
		y: { axis: null, inset: 20 },
		color: {
			legend: true,
			range: [
				currentTheme.color.data.primary,
				currentTheme.color.data.secondary,
				currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.line(multiVarDualYearAggregatedByYear, {
				x: 'Year',
				y: 'Average',
				z: 'Variable',
				stroke: 'Variable',
				tip: true
			}),
			Plot.tickX(multiVarDualYearAggregatedByYear, {
				x: 'Year',
				stroke: currentTheme.color.chart.grid
			}),
			Plot.textX(
				multiVarDualYearAggregatedByYear.filter((d) => d.Variable === 'Variable A'),
				{
					dy: 135,
					text: (d) => d.Year
				}
			),
			Plot.dot(multiVarDualYearAggregatedByYear, {
				r: 4,
				x: 'Year',
				y: 'Average',
				stroke: 'Variable',
				strokeWidth: 2,
				fill: currentTheme.color.chart.background,
				fillOpacity: 1
			}),
			d3
				.groups(multiVarDualYearAggregatedByYear, (d) => d.Year === '2015')
				.map(([left, data]) =>
					Plot.text(
						data,
						occlusionY({
							x: 'Year',
							y: 'Average',
							text: (d) => '£' + formatHigh(d.Average),
							textAnchor: left ? 'end' : 'start',
							dx: left ? -8 : 8,
							radius: 8.5
						})
					)
				)
		]
	});
</script>

<ObservablePlot
			spec={singleSlopeSpec}
			data={multiVarDualYearAggregatedByYear}
			title="In London, the yearly average across all variables has dropped significantly from 2015 to 2021"
			subTitle="London yearly average variable values combined (GBP), 2015 vs 2021"
			alt="Slope chart of London's variable values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The slope chart shows yearly average data in 2015 vs 2021 for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges shows 2015 and 2021. The y axis ranges from £0 to £45,000. Variable A had the most significant change of -£19,328 in 2021 vs 2015 from £43.47k in 2015 to £24.15k in 2021. Variable B fell -£12.9k from £35.16k in 2015 to £22.26k in 2021. Variable C had the smallest change of -£6.45k from £26.87k in 2015 to £20.42k in 2021."
		/>
```
-->

<Story name="Default">
	{#snippet template()}
		<ObservablePlot
			spec={singleSlopeSpec}
			data={multiVarDualYearAggregatedByYear}
			title="In London, the yearly average across all variables has dropped significantly from 2015 to 2021"
			subTitle="London yearly average variable values combined (GBP), 2015 vs 2021"
			alt="Slope chart of London's variable values"
			byline="GLA City Intelligence"
			source="LDN Viz Tools Demo Data"
			note="Data for demonstration only"
			chartDescription="The slope chart shows yearly average data in 2015 vs 2021 for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges shows 2015 and 2021. The y axis ranges from £0 to £45,000. Variable A had the most significant change of -£19,328 in 2021 vs 2015 from £43.47k in 2015 to £24.15k in 2021. Variable B fell -£12.9k from £35.16k in 2015 to £22.26k in 2021. Variable C had the smallest change of -£6.45k from £26.87k in 2015 to £20.42k in 2021."
		/>
	{/snippet}
</Story>
