<script lang="ts">
	/**
	 * TODO: THIS EXAMPLE ALREADY EXISTS ESWHERE IN THIS REPO, SO THIS IS A REPETITION ??
	 */
	import demoYearlyTimeseriesLong from '$lib/data/demoYearlyTimeseriesLong.json';
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import { format } from 'd3';

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	// Spec and data for example
	const chartData = demoYearlyTimeseriesLong
		.filter((d) => d.Year === '2015-01-01' || d.Year === '2021-01-01')
		.map((d) => ({ ...d, Year: new Date(d.Year) }));

	let spec = $derived({
		height: 200, // height set outside of default
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
				theme.tokenNameToValue('data.primary'),
				theme.tokenNameToValue('data.secondary'),
				theme.tokenNameToValue('data.tertiary')
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
