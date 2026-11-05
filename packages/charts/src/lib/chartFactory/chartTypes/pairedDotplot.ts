import { Plot } from '../../observablePlotFragments/plot';
import type { ChartDataRow, ColorChoice, PairedDotplotOptions } from '../chartOptions';

import { theme } from '@ldn-viz/ui';
import { group } from 'd3-array';
import { getAxisTypeAndTickFormat, getZeroXLine, makeTooltip } from '../utils';

export const pairedDotplot = (
	options: PairedDotplotOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => {
	const [compareStart, compareEnd] = options.compareValues ?? ['Jan-Mar 2019', 'Jan-Mar 2026'];

	// Build paired records: { xd, from, to } for arrow connectors.
	// ordered by the "to" value, largest first
	// N.B. `a`/`b` may be undefined if there is no data for that xd at compareStart/compareEnd
	const pairs = Array.from(
		group(data, (d) => d.xd),
		([xd, rows]) => {
			const a = rows.find((r) => r.b === compareStart);
			const b = rows.find((r) => r.b === compareEnd);
			return { xd, x1: a?.y, x2: b?.y };
		}
	).sort((a, b) => (b.x2 ?? b.x1 ?? 0) - (a.x2 ?? a.x1 ?? 0));

	// get ordered list of xd values
	const domain = Array.from(new Map(pairs.map((p) => [p.xd, p.xd])).values());

	return {
		x: {
			label: null,
			insetLeft: options.insetLeft ?? 80,
			insetRight: options.insetRight ?? 120, // need space for labels to right of plot

			...getAxisTypeAndTickFormat(options.timeperiod_type),
			ticks: 5,

			domain: options.xDomain
		},

		y: {
			label: null,
			domain
		},

		color: {
			legend: true,
			...colorChoice
		},

		marks: [
			Plot.gridX(),

			Plot.axisX({
				tickFormat: '.0%'
			}),

			Plot.axisY({
				dy: 5
			}),

			...getZeroXLine(options),

			// Connector: arrow from 2019 → 2026
			// only drawn where both endpoints have data
			Plot.arrow(
				pairs.filter((p) => p.x1 !== undefined && p.x2 !== undefined),
				{
					x1: 'x1',
					x2: 'x2',
					y1: 'xd',
					y2: 'xd',
					stroke: theme.tokenNameToValue('data.context'),

					headLength: 15,
					headAngle: 28,

					bend: false,
					inset: 7 // leaves space so arrow doesn't overlap the dots
				}
			),

			Plot.circle(data, {
				x: 'y',
				y: 'xd',
				stroke: 'b',
				fill: 'white',
				title: makeTooltip(options),
				tip: 'xy'
			})
		]
	};
};
