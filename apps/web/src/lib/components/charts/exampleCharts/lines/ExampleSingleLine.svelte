<script lang="ts">
	/**
	 * TODO: THIS EXAMPLE ALREADY EXISTS ESWHERE IN THIS REPO, SO THIS IS A REPETITION ??
	 */

	import demoMonthlyTimeseriesLong from '$lib/data/demoMonthlyTimeseriesLong.json';
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import { format } from 'd3';

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	// Spec and data for example
	const chartData = demoMonthlyTimeseriesLong.filter((d) => d.Variable == 'Variable A');
	let spec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + format(',.4~s')(d) }),
			Plot.ruleY([0]),
			Plot.line(chartData, {
				x: 'Month',
				y: 'Value',
				tip: {
					format: {
						x: true,
						y: (d) => '£' + format(',.4~s')(d)
					}
				}
			})
		]
	});
</script>

<ObservablePlot
	{spec}
	data={chartData}
	title="In London, Variable A's value has fallen steadily since 2017"
	subTitle="London monthly estimated variable value (GBP), January 2015 to March 2024"
	alt="Line chart of London's variable A values"
	byline="GLA City Intelligence"
	source="LDN Viz Tools Demo Data"
	note="Data for demonstration only"
	chartDescription="The line chart shows monthly time series data for Variable A, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. Variable A's has fallen steadily since around 2017. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758"
/>
