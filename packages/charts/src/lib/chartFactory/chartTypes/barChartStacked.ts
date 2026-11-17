import { Plot } from '../../observablePlotFragments/plot';
import type { ChartDataRow, ChartOptions, ColorChoice } from '../chartOptions';
import { getZeroYLine, makeTooltip } from '../utils';

export const barChartStacked = (
	options: ChartOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => ({
	...(options.height ? { height: options.height } : {}),

	x: {
		label: null,
		type: options.xScaleType ?? undefined,
		padding: (colorChoice.domain?.length ?? 0) < 3 ? 0.5 : 0.3
	},

	y: {
		label: null,

		domain: options.yDomain,

		includeZero: options.includeZero
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

		Plot.barY(data, {
			x: 'xd',
			y: 'y',
			fill: 'b',
			title: makeTooltip(options),
			tip: 'xy'
		}),

		...getZeroYLine(options)
	]
});
