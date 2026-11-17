import { Plot } from '../../observablePlotFragments/plot';
import type { BarChartStackedTimeseriesOptions, ChartDataRow, ColorChoice } from '../chartOptions';
import { getZeroYLine, makeTooltip } from '../utils';

export const barChartStackedTimeseries = (
	options: BarChartStackedTimeseriesOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => ({
	x: {
		label: null,
		type: options.xScaleType ?? undefined,
		insetRight: options.insetRight ?? 0,
		...(options.insetLeft ? { insetLeft: options.insetLeft } : {})
	},

	y: {
		label: null,

		domain: options.yDomain
	},

	color: {
		legend: true,
		...colorChoice
	},

	marks: [
		Plot.axisY({
			tickFormat: options.ytickformat
		}),

		Plot.gridY(),

		Plot.rectY(
			data,
			Plot.stackY({
				x: 'xd',
				y: 'y',
				fill: 'b',
				title: makeTooltip(options),
				tip: 'xy',
				interval: (options.xInterval ?? 'year') as any,
				order: 'sum',
				reverse: true
			})
		),

		...getZeroYLine(options)
	]
});
