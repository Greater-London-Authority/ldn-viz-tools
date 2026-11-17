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
		// .filter((d) => d.Variable == 'Variable A')
		.map((d) => ({ ...d, Year: new Date(d.Year) }));
	let spec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'band' },
		color: {
			legend: true,
			range: [
				theme.tokenNameToValue('data.primary'),
				theme.tokenNameToValue('data.secondary'),
				theme.tokenNameToValue('data.tertiary')
			]
		},
		marks: [
			Plot.gridY(),
			Plot.axisX({ label: 'Year' }),
			Plot.axisY({ tickFormat: (d) => '£' + format(',.4~s')(d) }),
			Plot.barY(chartData, {
				x: 'Year',
				y: 'Average',
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

<ObservablePlot
	{spec}
	data={chartData}
	title="In London, total value across all variables has fallen steadily since 2015"
	subTitle="London yearly average estimated variable value (GBP), 2015 to 2024"
	alt="Stacked bar chart of London variable values"
	byline="GLA City Intelligence"
	source="LDN Viz Tools Demo Data"
	note="Data for demonstration only"
	chartDescription="The stacked bar chart shows yearly average time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in years from 2015 to 2024. The y axis ranges from £0 to £100,000. Variable A's value has fallen steadily since 2015. Variable A's highest value was £43,473 in 2015, its lowest value was £19,786 in 2024, (a change of around -£23,687) and its mean value was £29,936. Variable B and C follow a similar fall, with a mean average of £26,800 and £23,231 respectively."
/>
