import { Plot } from '@ldn-viz/charts';
import type { ChartDataRow, ColorChoice, LineChartOptions } from '../chartOptions';

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
			sort: (d) => -(colorChoice.domain || []).indexOf(d.b) // N.B. by default "lines are drawn in input order"
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
				sort: (d) => -(colorChoice?.domain || []).indexOf(d.b) // N.B. by default "lines are drawn in input order"
			})
		),

		...(options.extraMarks
			? [options.extraMarks({ Plot, options, colorChoice, data, makeTooltip })]
			: []),

		// End-of-line series labels.
		// Three rendering modes:
		//   (a) autoDodgeLabels=true — single text mark wrapped in Plot.dodgeY
		//       so Plot auto-spaces overlapping labels (James's suggestion).
		//   (b) labelNudges configured — nudged series rendered as separate
		//       marks so each carries its own dx/dy; non-nudged share default.
		//   (c) neither — single default text mark.
		...(() => {
			if (width > MIN_WIDTH_FOR_LABELS && options.autoDodgeLabels) {
				return [
					Plot.text(
						data,
						Plot.dodgeY(
							{ anchor: 'middle', padding: 2 },
							Plot.selectLast({
								x: 'xd',
								y: 'y',
								fx: options.faceted ? 'z2' : undefined,
								text: 'b',
								fill: 'b',
								textAnchor: 'start',
								dx: 10,
								lineWidth: options.labelLineWidth
							})
						)
					)
				];
			}

			const nudges = options.labelNudges ?? {};
			const nudgedSeries = Object.keys(nudges);
			const defaultData =
				nudgedSeries.length > 0 ? data.filter((d) => !nudgedSeries.includes(d.b)) : data;

			const defaultMark = Plot.text(
				defaultData,
				Plot.selectLast({
					x: 'xd',
					y: 'y',
					fx: options.faceted ? 'z2' : undefined,
					text: 'b',
					fill: 'b',
					textAnchor: 'start',
					dx: 10,
					lineWidth: options.labelLineWidth
				})
			);

			const nudgedMarks = nudgedSeries.map((name) => {
				const n = nudges[name];
				return Plot.text(
					data.filter((d) => d.b === name),
					Plot.selectLast({
						x: 'xd',
						y: 'y',
						fx: options.faceted ? 'z2' : undefined,
						text: 'b',
						fill: 'b',
						textAnchor: 'start',
						dx: 10 + (n.dx ?? 0),
						dy: n.dy ?? 0,
						lineWidth: options.labelLineWidth
					})
				);
			});

			return width > MIN_WIDTH_FOR_LABELS ? [defaultMark, ...nudgedMarks] : [];
		})()
	]
});
