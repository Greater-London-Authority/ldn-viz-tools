import { Plot } from '@ldn-viz/charts';
import type { BarChartHorizontalOptions, ChartDataRow, ColorChoice } from '../chartOptions';
import { getZeroXLine, makeTooltip } from '../utils';

export const barChartHorizontal = (
	options: BarChartHorizontalOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => ({
	marginLeft: options.marginLeft ?? 180, // space for bar labels

	height: 500, // slightly taller than default for other charts

	y: {
		label: null,
		domain:
			options.x_order && options.x_order.includes('|') ? options.x_order.split('|') : undefined,
		padding: 0.2
	},

	x: {
		label: null,
		insetLeft: 0,
		insetRight: options.insetRight ?? 0
	},

	color: {
		legend: (colorChoice.domain?.length ?? 0) > 1,
		...colorChoice
	},

	marks: [
		Plot.axisX({
			tickFormat: options.ytickformat
		}),

		Plot.gridX(),

		Plot.barX(data, {
			y: 'xd',
			x: 'y',
			fill: 'b',
			title: makeTooltip(options),
			tip: 'xy'
		}),

		...getZeroXLine(options)
	]
});
