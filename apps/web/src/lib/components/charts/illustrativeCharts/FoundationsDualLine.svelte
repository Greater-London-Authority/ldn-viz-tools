<script lang="ts">
	/**
	 * TODO: THIS EXAMPLE ALREADY EXISTS ESWHERE IN THIS REPO, SO THIS IS A REPETITION ??
	 */

	import demoMonthlyTimeseriesLong from '$lib/data/demoMonthlyTimeseriesLong.json';
	import { getDefaultPlotStyles, ObservablePlot, Plot } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import { format } from 'd3';

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	// Spec and data for example
	const chartData = demoMonthlyTimeseriesLong.filter((d) => d.Variable != 'Variable C');
	let dualLineSpec = $derived({
		x: { insetLeft: 60, insetRight: 10, type: 'utc' },
		y: { domain: [0, 75000] }, // changing y domain (instead of insetTop due to explicit positioning of annotation labels)
		color: {
			legend: true,
			type: 'ordinal',
			range: [
				theme.tokenNameToValue('data.primary'),
				theme.tokenNameToValue('data.context')
				// theme.tokenNameToValue('data.tertiary')
			]
			// domain: ['Variable B', 'Variable A']
		},
		marks: [
			Plot.gridX({ interval: '2 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '1 year' }),
			Plot.axisY({ label: '', tickFormat: (d) => '£' + formatHigh(d) }),

			Plot.rectX([0], {
				// ...ldnTheme.defaultAnnotationRange,
				// ...getDefault('defaultAnnotationRange'),
				...getDefaultPlotStyles().defaultAnnotationRange,
				x1: new Date('2020-03-23'),
				x2: new Date('2021-07-19')
			}),

			Plot.text([0], {
				...getDefaultPlotStyles().defaultAnnotationText,
				x: new Date('2020-03-23T00:00:01'),
				y: 73000,
				text: ['Highlight context'],
				dy: 0,
				dx: 13,
				rotate: 90,
				textAnchor: 'start'
			}),

			Plot.ruleY([0]),
			Plot.line(chartData, {
				x: 'Month',
				y: 'Value',
				z: 'Variable',
				stroke: 'Variable',
				reverse: true // ensure var A is drawn first
			}),

			// point on pointer
			Plot.point(
				chartData,
				Plot.pointer({ x: 'Month', y: 'Value', z: 'Variable', stroke: 'Variable' })
			),

			Plot.point([0], {
				x: new Date('2015-02-01'),
				y: 61820
			}),

			Plot.point(
				chartData.filter((d) => d.Variable == 'Variable A' && d.Month == '2024-03-01'),
				{
					x: 'Month',
					y: 'Value'
				}
			),

			// static annotation
			Plot.tip(
				chartData.filter((d) => d.Variable == 'Variable A' && d.Month == '2024-03-01'),
				{
					...getDefaultPlotStyles().defaultAnnotationTip,
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
						Month: false,
						Value: (d) => '£' + formatHigh(d),
						x: (d) => d.toLocaleString('default', { month: 'short', year: 'numeric' }),
						y: false
					},
					anchor: 'top-right'
				}
			),

			Plot.tip(
				chartData.filter((d) => d.Variable == 'Variable A' && d.Month == '2015-02-01'),
				{
					...getDefaultPlotStyles().defaultAnnotationTip,
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
						Month: false,
						Value: (d) => '£' + formatHigh(d),
						x: (d) => d.toLocaleString('default', { month: 'short', year: 'numeric' }),
						y: false
					},
					anchor: 'bottom-left'
				}
			),

			// hover tip
			Plot.tip(
				chartData,
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
						Month: false,
						Value: (d) => '£' + formatHigh(d),
						x: (d) => d.toLocaleString('default', { month: 'short', year: 'numeric' }),
						y: false
					}
				})
			)
		]
	});
</script>

<ObservablePlot
	spec={dualLineSpec}
	data={chartData}
	title="In London, Variable A has tracked Variable B closely since 2016"
	subTitle="London monthly estimated variable values (GBP), January 2015 to March 2024"
	alt="Line chart of London variable values"
	byline="GLA City Intelligence"
	source="LDN Viz Tools Demo Data"
	note="Data for demonstration only"
	chartDescription="The line chart shows monthly time series data for Variable A and B, measured in GBP (Pounds Sterling). The x axis ranges in months from January 2015 to March 2024. The y axis ranges from £0 to £60,000. All variable values have fallen steadily since around 2017, but Variable A has fallen the most. Variable A's highest value was £61,816 in February 2015, its lowest value was £11,667 in July 2023, (a change of around -£50,149) and its mean average value was £30,758. Variable B follows a similar fall, with a mean average of £27,545."
	imageDownloadButton={false}
	dataDownloadButton={false}
/>
