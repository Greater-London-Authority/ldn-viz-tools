<script lang="ts">
	/**
	 * TODO: THIS EXAMPLE ALREADY EXISTS ESWHERE IN THIS REPO, SO THIS IS A REPETITION ??
	 */

	import demoMonthlyTimeseriesLong from '$lib/data/demoMonthlyTimeseriesLong.json';
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import { format } from 'd3-format';

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	const chartData = demoMonthlyTimeseriesLong.filter((d) => d.Variable != 'Variable C');

	// Spec and data for dual line example
	let spec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		color: {
			legend: true,
			type: 'ordinal',
			range: [theme.tokenNameToValue('data.primary'), theme.tokenNameToValue('data.context')]
		},
		height: 300,
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + format(',.4~s')(d) }),
			Plot.line(chartData, {
				x: 'Month',
				y: 'Value',
				z: 'Variable',
				stroke: 'Variable',
				reverse: true, // draw in reverse to get Var A on top
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
	title="Example"
	imageDownloadButton={false}
	dataDownloadButton={false}
	alt="Line chart of London variable values"
	chartDescription="The line chart shows monthly time series data for Variable A and B, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758. Variable B follows a similar fall, with a mean average of £27,545."
/>
