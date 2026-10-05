import { Plot } from '@ldn-viz/charts';
import type { ChartDataRow, ColorChoice, LineChartWithLineStylesOptions } from '../chartOptions';
import {
	getAxisTypeAndTickFormat,
	getGridStrokeOpacity,
	getReferenceLineMarks,
	getZeroYLine,
	makeTooltip
} from '../utils';

export const lineChartWithLineStyles = (
	options: LineChartWithLineStylesOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => ({
	x: {
		label: null,
		insetRight: options.insetRight ?? 120, // need space for labels to right of plot

		...getAxisTypeAndTickFormat(options.timeperiod_type),

		ticks: 5
	},

	y: {
		label: null,
		domain: options.yDomain,
		includeZero: options.includeZero
	},

	fx: options.faceted
		? {
				label: null
			}
		: undefined,

	color: {
		legend: true,
		...colorChoice
	},

	marks: [
		Plot.gridX({
			strokeOpacity: getGridStrokeOpacity(options.timeperiod_type)
		}),

		Plot.gridY(),

		Plot.axisY({
			tickFormat: options.ytickformat
		}),

		...getZeroYLine(options),

		...Array.from(new Set(data.map((d) => d.z2))).map((v, i) =>
			Plot.line(
				data.filter((d) => d.z2 === v),
				{
					x: 'xd',
					y: 'y',
					fx: options.faceted ? 'z2' : undefined,

					strokeDasharray: ['4,0', '4,4'][i % 2],

					stroke: 'b',
					title: makeTooltip(options),
					tip: 'xy'
				}
			)
		),

		// reference lines
		...getReferenceLineMarks(options.reference_lines),

		// Label end-point with b
		...Array.from(new Set(data.map((d) => d.z2))).map((z2) => [
			Plot.dot(
				data.filter((d) => d.z2 === z2),
				Plot.selectLast({
					x: 'xd',
					y: 'y',
					fx: options.faceted ? 'z2' : undefined,

					stroke: 'b',
					strokeWidth: 2,
					fill: 'white',
					fillOpacity: 1,
					r: 5
				})
			),

			Plot.text(
				data.filter((d) => d.z2 === z2),
				Plot.selectLast({
					x: 'xd',
					y: 'y',
					fx: options.faceted ? 'z2' : undefined,

					text: 'b',
					fill: 'b',
					textAnchor: 'start',
					dx: 10
				})
			)
		]),

		...(options.extraMarks
			? [options.extraMarks({ Plot, options, colorChoice, data, makeTooltip })]
			: [])
	]
});
