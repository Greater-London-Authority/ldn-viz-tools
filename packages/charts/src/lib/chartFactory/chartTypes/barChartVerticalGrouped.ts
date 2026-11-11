import { Plot } from '../../observablePlotFragments/plot';
import type { ChartDataRow, ChartOptions, ColorChoice } from '../chartOptions';
import { getDomain, getZeroYLine, makeTooltip } from '../utils';

export const barChartVerticalGrouped = (
	options: ChartOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => ({
	height: 440,

	x: {
		label: null,
		axis: null,
		type: options.xScaleType ?? undefined
	},

	y: {
		label: null,
		domain: options.yDomain ?? getDomain(data, options)
	},

	fx: {
		label: null
	},

	color: {
		legend: true,
		...colorChoice
	},

	marks: [
		Plot.axisY({
			tickFormat: options.ytickformat
		}),

		/* these don't join up, as each pair of plots is in a different facet :( */
		Plot.gridY(),

		Plot.barY(data, {
			x: 'b',
			fx: 'xd',
			y: 'y',
			fill: 'b',
			title: makeTooltip(options),
			tip: 'xy'
		}),

		...getZeroYLine(options)
	]
});
