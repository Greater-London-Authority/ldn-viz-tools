<script lang="ts">
	/**
	 * TODO: THIS EXAMPLE ALREADY EXISTS ESWHERE IN THIS REPO, SO THIS IS A REPETITION ??
	 */

	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import { theme as currentThemeObj } from '@ldn-viz/ui';
	import { format } from 'd3';
	import demoMonthlyTimeseriesLong from '../../../../data/demoMonthlyTimeseriesLong.json';

	let currentTheme = $derived(currentThemeObj.currentTheme);

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	// Spec and data for multi-line example
	let multiLineData = $derived(demoMonthlyTimeseriesLong);
	let multiLineSpec = $derived({
		x: { insetLeft: 80, insetRight: 20, type: 'utc' },
		color: {
			legend: true,
			type: 'ordinal',
			range: [
				currentTheme?.color.data.primary,
				currentTheme?.color.data.secondary,
				currentTheme?.color.data.tertiary
			]
		},
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),
			Plot.ruleY([0]),
			Plot.line(multiLineData, {
				x: 'Month',
				y: 'Value',
				z: 'Variable',
				stroke: 'Variable'
			}),

			Plot.ruleX(
				multiLineData,
				Plot.pointerX({ x: 'Month', stroke: currentTheme?.color.chart.label })
			),
			Plot.point(
				multiLineData,
				Plot.pointer({ x: 'Month', y: 'Value', z: 'Variable', stroke: 'Variable' })
			),
			Plot.tip(
				multiLineData,
				Plot.pointer({
					x: 'Month',
					y: 'Value',
					z: 'Variable',
					channels: {
						Variable: 'Variable',
						Month: { value: 'Month', label: 'Date' },
						Value: { value: 'Value', label: 'GBP' }
					},
					format: {
						Variable: true,
						Month: true,
						Value: (d) => '£' + formatHigh(d),
						x: false,
						y: false
					}
				})
			)
		]
	});
</script>

<ObservablePlot
	spec={multiLineSpec}
	data={multiLineData}
	title="In London, all variable values have fallen steadily since 2017, with Variable A experiencing the most significant fall"
	subTitle="London monthly estimated variable values (GBP), January 2015 to March 2024"
	alt="Line chart of London variable values"
	byline="GLA City Intelligence"
	source="LDN Viz Tools Demo Data"
	note="Data for demonstration only"
	chartDescription="The line chart shows monthly time series data for Variable A, B and C, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758. Variable B and C follow a similar fall, with a mean average of £27,545 and £23,681 respectively."
/>
