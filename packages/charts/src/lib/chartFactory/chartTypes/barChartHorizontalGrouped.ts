import { Plot } from '../../observablePlotFragments/plot';
import type { BarChartHorizontalGroupedOptions, ChartDataRow, ColorChoice } from '../chartOptions';
import { getZeroXLine, makeTooltip } from '../utils';

export const barChartHorizontalGrouped = (
	options: BarChartHorizontalGroupedOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => ({
	marginLeft: options.marginLeft ?? 220, // space for bar labels

	y: {
		label: null,
		axis: null,
		domain:
			options.y_order && options.y_order.includes('|') ? options.y_order.split('|') : undefined
	},

	x: {
		label: null,
		insetLeft: 0,
		domain: options.yDomain
	},

	fy: {
		label: null,
		anchor: 'left',
		domain:
			options.x_order && options.x_order.includes('|') ? options.x_order.split('|') : undefined
	},

	color: {
		legend: true,
		...colorChoice
	},

	marks: [
		Plot.axisX({
			tickFormat: options.ytickformat
		}),

		Plot.axisFy({
			anchor: 'left',
			tickSize: 0
		}),

		/* these don't join up, as each pair of plots is in a different facet :( */
		Plot.gridX(),

		Plot.barX(data, {
			y: 'b',
			fy: 'xd',
			x: 'y',
			fill: 'b',
			title: makeTooltip(options),
			tip: 'xy'
		}),

		...getZeroXLine(options)
	]
});
