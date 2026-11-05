import { Plot } from '../../observablePlotFragments/plot';
import type { ChartDataRow, ColorChoice, LineChartOptions } from '../chartOptions';
import { getEndOfLineLabelMarks } from '../endOfLineLabels';

import {
	getAxisTypeAndTickFormat,
	getDomain,
	getGridStrokeOpacity,
	getReferenceLineMarks,
	getZeroYLine,
	makeTooltip
} from '../utils';

const MIN_WIDTH_FOR_LABELS = 500;

export const lineChart = (
	options: LineChartOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice,
	width: number
) => ({
	...(options.height ? { height: options.height } : {}),

	x: {
		label: null,
		insetLeft: options.insetLeft ?? 0,
		insetRight: width < MIN_WIDTH_FOR_LABELS ? 0 : (options.insetRight ?? 120), // need space for labels to right of plot

		...getAxisTypeAndTickFormat(options.timeperiod_type),

		ticks: 5,

		domain: options.xDomain
	},

	y: {
		label: null,
		domain: options.yDomain ?? getDomain(data, options),
		includeZero: options.includeZero,
		insetTop: options.insetTop ?? 20,
		insetBottom: options.includeZero ? 0 : 20
	},

	fx: options.faceted
		? {
				label: null
			}
		: undefined,

	color: {
		legend: (colorChoice.domain ?? []).length > 1 || options.showColorLegend,
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

		Plot.line(data, {
			x: 'xd',
			y: 'y',

			fx: options.faceted ? 'z2' : undefined,

			stroke: 'b',
			title: makeTooltip(options),
			tip: 'xy',
			sort: (d: ChartDataRow) => -(colorChoice.domain || []).indexOf(d.b) // N.B. by default "lines are drawn in input order"
		}),

		// reference lines
		...getReferenceLineMarks(options.reference_lines),

		// Label end-point with b

		Plot.dot(
			data,
			Plot.selectLast({
				x: 'xd',
				y: 'y',
				fx: options.faceted ? 'z2' : undefined,

				stroke: 'b',
				strokeWidth: 2,
				fill: 'white',
				fillOpacity: 1,
				r: 5,
				sort: (d: ChartDataRow) => -(colorChoice?.domain || []).indexOf(d.b) // N.B. by default "lines are drawn in input order"
			})
		),

		...(options.extraMarks
			? [options.extraMarks({ Plot, options, colorChoice, data, makeTooltip })]
			: []),

		// End-of-line series labels
		...(width > MIN_WIDTH_FOR_LABELS ? getEndOfLineLabelMarks(data, options) : [])
	]
});
