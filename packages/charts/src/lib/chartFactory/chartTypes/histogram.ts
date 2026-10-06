import { Plot } from '../../observablePlotFragments/plot';
import type { RectYOptions } from '@observablehq/plot';
import type { ChartDataRow, ColorChoice, HistogramOptions } from '../chartOptions';

export const histogram = (
	options: HistogramOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => ({
	height: 440,
	marginRight: 100,

	x: {
		label: options.xAxisLabel ?? null,
		tickFormat: '.2%',
		insetLeft: options.insetLeft ?? 80,
		insetRight: 0, // need space for labels to right of plot
		domain: options.xDomain
	},

	y: {
		label: options.yAxisLabel === undefined ? 'Count' : options.yAxisLabel,

		domain: options.yDomain,

		insetTop: 20 // x=0 line needs to extend up above the 120 tick, as the tick label is above it
	},

	fy: options.faceted
		? {
				label: null,
				padding: 0.2
			}
		: undefined,

	color: {
		legend: true,
		...colorChoice
	},

	marks: [
		Plot.gridX({ interval: options.gridXInterval }),
		Plot.gridY(),

		Plot.axisX({
			tickFormat: '.0%'
		}),

		Plot.axisY({
			tickFormat: options.ytickformat
		}),

		Plot.rectY(
			data,
			Plot.binX<RectYOptions>(
				{
					y: 'count'
				},
				{
					x: 'y',
					fy: options.faceted ? 'b' : undefined,

					fill: 'b',

					title: (d: ChartDataRow) => d.b,
					tip: 'xy'
				}
			)
		),

		Plot.ruleX([0])
	]
});
