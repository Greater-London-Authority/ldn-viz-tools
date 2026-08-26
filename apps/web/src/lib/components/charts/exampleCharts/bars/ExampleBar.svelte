<script lang="ts">
	/**
	 * TODO: THIS EXAMPLE ALREADY EXISTS ESWHERE IN THIS REPO, SO THIS IS A REPETITION ??
	 */
	import demoYearlyTimeseriesLong from '$lib/data/demoYearlyTimeseriesLong.json';
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import * as d3 from 'd3';
	import { format } from 'd3';

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	// Spec and data for example

	// const chartData = yearlyData.filter((d) => d.Year === '2024');

	const chartData = demoYearlyTimeseriesLong
		.filter((d) => d.Year === '2024-01-01')
		.map((d) => ({ ...d, Year: new Date(d.Year) }));

	let spec = $derived({
		height: 250, // height set outside of default
		marginLeft: 80, // adjust margin left to suit label length,
		// reset insetLeft to 0, push domain to padded max value, insetRight to prevent label clipping on x axis
		x: {
			insetLeft: 0,
			insetRight: 16,
			domain: [0, d3.min(chartData, (d) => d.Average * 1.15)]
		},
		color: {
			legend: true,
			type: 'ordinal',
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
				y: 'Variable',
				fill: 'Variable',
				tip: {
					format: {
						x: (d) => '£' + format(',.4~s')(d),
						y: false
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
	title="In London (2024), Variable A's annual average is higher than both B and C"
	subTitle="London yearly average estimated variable values (GBP), 2024"
	alt="Bar chart of London's variable values"
	byline="GLA City Intelligence"
	source="LDN Viz Tools Demo Data"
	note="Data for demonstration only"
	chartDescription="The bar chart shows annual average  data in 2024 for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges from £0 to £20,000. The y axis shows Variable A, B and C. Variable A had the highest annual average of £19,786 compared to B which was £17,614 and C which was £17,674."
/>
