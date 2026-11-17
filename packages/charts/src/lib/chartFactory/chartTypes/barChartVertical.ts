import { Plot } from '../../observablePlotFragments/plot';
import type { ChartDataRow, ChartOptions, ColorChoice } from '../chartOptions';
import { getZeroYLine, makeTooltip } from '../utils';

export const barChartVertical = (
	options: ChartOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => ({
	x: {
		label: null,
		insetLeft: options.insetLeft ?? 80,
		type: options.xScaleType ?? undefined,
		padding: !colorChoice.domain || colorChoice.domain?.length < 3 ? 0.5 : 0.3
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
