import { Plot } from '../../observablePlotFragments/plot';
import type { ChartDataRow, ChartOptions, ColorChoice } from '../chartOptions';

import { utcFormat } from 'd3-time-format';
import { getAxisTypeAndTickFormat, getDomain, getZeroYLine, makeTooltip } from '../utils';

export const slopeChart = (
	options: ChartOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => {
	return {
		x: {
			label: null,
			insetLeft: options.insetLeft ?? 80,
			insetRight: options.insetRight ?? 120, // need space for labels to right of plot

			...getAxisTypeAndTickFormat(options.timeperiod_type),
			tickFormat: (d: string | number | Date) => utcFormat('%Y')(new Date(d))
		},

		y: {
			label: null,
			domain: options.yDomain ?? getDomain(data, options),
			includeZero: options.includeZero,
			insetTop: options.insetTop ?? 20
		},

		color: {
			legend: false,
			...colorChoice
		},

		marks: [
			Plot.gridX(),
			Plot.gridY(),

			Plot.axisY({
				tickFormat: options.ytickformat
			}),

			...getZeroYLine(options),

			Plot.line(data, {
				x: 'xd',
				y: 'y',
				z: 'b',

				title: makeTooltip(options),
				tip: 'xy',
				stroke: 'b'
			}),

			Plot.dot(data, {
				x: 'xd',
				y: 'y',
				stroke: 'b',
				strokeWidth: 2,
				fill: 'white',
				r: 5
			})
		]
	};
};
