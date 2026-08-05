<script lang="ts">
	/**
	 * TODO: THIS EXAMPLE ALREADY EXISTS ESWHERE IN THIS REPO, SO THIS IS A REPETITION ??
	 */
	import demoYearlyTimeseriesLong from '$lib/data/demoYearlyTimeseriesLong.json';
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import * as d3 from 'd3';
	import { format } from 'd3';
	import { SvelteSet } from 'svelte/reactivity';

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	// Spec and data for example
	const chartData = demoYearlyTimeseriesLong
		.filter((d) => d.Year === '2015-01-01' || d.Year === '2021-01-01')
		.map((d) => ({ ...d, Year: new Date(d.Year).getFullYear().toString() }));

	// OcclusionY adds an initializer that shifts nodes vertically with a tiny force simulation.
	const occlusionY = ({ radius = 6.5, ...options }: { [key: string]: any } = {}) =>
		Plot.initializer(
			options,
			(data, facets, { y: { value: Y }, text: { value: T } }, { y: sy }) => {
				for (const index of facets) {
					const unique = new SvelteSet();
					const nodes = Array.from(index, (i) => ({
						fx: 0,
						y: sy!(Y[i]),
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
					for (const { y, i, visible } of nodes) Y[i] = !visible ? NaN : y;
				}
				return { data, facets, channels: { y: { value: Y } } };
			}
		);

	let spec = $derived({
		height: 300,
		marginBottom: 30,
		x: { axis: null, type: 'ordinal', insetLeft: 90, insetRight: 90 },
		y: { axis: null, inset: 20 },
		color: {
			legend: true,
			range: [
				theme.tokenNameToValue('data.primary'),
				theme.tokenNameToValue('data.secondary'),
				theme.tokenNameToValue('data.tertiary')
			]
		},
		marks: [
			Plot.line(chartData, {
				x: 'Year',
				y: 'Average',
				z: 'Variable',
				stroke: 'Variable',
				tip: true
			}),
			Plot.tickX(chartData, {
				x: 'Year',
				stroke: theme.tokenNameToValue('chart.grid')
			}),
			Plot.textX(
				chartData.filter((d) => d.Variable === 'Variable A'),
				{
					dy: 135,
					text: (d) => d.Year
				}
			),
			Plot.dot(chartData, {
				r: 4,
				x: 'Year',
				y: 'Average',
				stroke: 'Variable',
				strokeWidth: 2,
				fill: theme.tokenNameToValue('chart.surface'),
				fillOpacity: 1
			}),
			d3
				.groups(chartData, (d) => d.Year === '2015')
				.map(([left, data]) =>
					Plot.text(
						data,
						occlusionY({
							x: 'Year',
							y: 'Average',
							text: (d: { Average: number | { valueOf(): number } }) =>
								'£' + d3.format(',.4~s')(d.Average),
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
	{spec}
	data={chartData}
	title="In London, the yearly average across all variables has dropped significantly from 2015 to 2021"
	subTitle="London yearly average variable values combined (GBP), 2015 vs 2021"
	alt="Slope chart of London's variable values"
	byline="GLA City Intelligence"
	source="LDN Viz Tools Demo Data"
	note="Data for demonstration only"
	chartDescription="The slope chart shows yearly average data in 2015 vs 2021 for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges shows 2015 and 2021. The y axis ranges from £0 to £45,000. Variable A had the most significant change of -£19,328 in 2021 vs 2015 from £43.47k in 2015 to £24.15k in 2021. Variable B fell -£12.9k from £35.16k in 2015 to £22.26k in 2021. Variable C had the smallest change of -£6.45k from £26.87k in 2015 to £20.42k in 2021."
/>
