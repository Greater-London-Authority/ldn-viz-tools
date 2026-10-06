import { theme } from '@ldn-viz/ui';
import { Plot } from '../../observablePlotFragments/plot';
import type { ChartDataRow, ColorChoice, LineChartWithForecastOptions } from '../chartOptions';

import {
	getAxisTypeAndTickFormat,
	getDomain,
	getGridStrokeOpacity,
	getReferenceLineMarks,
	getZeroYLine,
	makeTooltip
} from '../utils';

// Fraction of a tick step to pad the y-domain beyond the outermost grid-lines
const Y_DOMAIN_PADDING = 0.2;

const getComparableX = (value: ChartDataRow['xd']) =>
	value instanceof Date ? value.getTime() : value;

const filterDataToXDomain = (data: ChartDataRow[], options: LineChartWithForecastOptions) => {
	if (!options.xDomain || options.type !== 'date') return data;

	const [start, end] = options.xDomain.map((value) =>
		value instanceof Date ? value : new Date(value as string | number)
	) as [Date, Date];

	return data.filter((row) => {
		if (!(row.xd instanceof Date)) return true;
		return row.xd >= start && row.xd <= end;
	});
};

type DatedRow = ChartDataRow & { xd: Date };

/**
 * Returns the interval of the x-axis that contains projected values, or `null` if the chart
 * should be drawn as ordinary solid lines: when there is no `projectedStart`, it is not a valid
 * date, the x-axis is not a date axis, or no data point is after `projectedStart`.
 */
const getProjectedInterval = (
	options: LineChartWithForecastOptions,
	dateData: DatedRow[]
): { start: Date; end: Date } | null => {
	if (!options.projectedStart || options.type !== 'date' || dateData.length === 0) return null;

	const start = new Date(options.projectedStart);
	if (isNaN(start.getTime())) return null;

	const end = new Date(Math.max(...dateData.map((d) => d.xd.getTime())));
	if (start >= end) return null;

	return { start, end };
};

export const lineChartWithForecast = (
	options: LineChartWithForecastOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => {
	const filteredData = filterDataToXDomain(data, options);
	const yDomain =
		options.yDomain ?? getDomain(filteredData, options, { padding: Y_DOMAIN_PADDING });

	const lastXBySeries = new Map<string, ChartDataRow['xd']>();
	for (const row of filteredData) {
		const current = lastXBySeries.get(row.b);
		if (current == null || getComparableX(row.xd) > getComparableX(current)) {
			lastXBySeries.set(row.b, row.xd);
		}
	}
	const seriesShareLastX =
		lastXBySeries.size > 1 && new Set([...lastXBySeries.values()].map(getComparableX)).size === 1;
	const shouldSuppressEndpointLabels = seriesShareLastX && lastXBySeries.size > 3;

	const dateData = filteredData.filter((d): d is DatedRow => d.xd instanceof Date);
	const projected = getProjectedInterval(options, dateData);

	const projectedMarks = projected
		? [
				Plot.rect(
					[
						{
							x1: projected.start,
							x2: projected.end,
							y1: yDomain[0],
							y2: yDomain[1]
						}
					],
					{
						x1: 'x1',
						x2: 'x2',
						y1: 'y1',
						y2: 'y2',
						fill: theme.tokenNameToValue('data.context'),
						fillOpacity: 0.1
					}
				),
				Plot.ruleX([projected.start], {
					stroke: theme.tokenNameToValue('data.context'),
					strokeWidth: 1.5,
					strokeDasharray: '4,3',
					strokeOpacity: 0.6
				}),
				Plot.text(['Projected →'], {
					x: projected.start,
					y: yDomain[1],
					dx: 6,
					dy: 10,
					textAnchor: 'start',
					lineAnchor: 'top',
					fill: theme.tokenNameToValue('data.context'),
					fontSize: 11
				})
			]
		: [];

	const lineMarks = (() => {
		const lineOptions = {
			x: 'xd',
			y: 'y',
			z: 'b',
			fx: options.faceted ? 'z2' : undefined,
			stroke: 'b'
		};

		if (!projected) {
			return [
				Plot.line(filteredData, {
					...lineOptions,
					title: makeTooltip(options),
					tip: 'xy'
				})
			];
		}

		const historicalData = dateData.filter((d) => d.xd <= projected.start);

		const grouped = new Map<string, DatedRow[]>();
		for (const row of dateData) {
			const key = row.b;
			if (!grouped.has(key)) grouped.set(key, []);
			grouped.get(key)!.push(row);
		}

		const projectedData: DatedRow[] = [];
		for (const rows of grouped.values()) {
			rows.sort((a, b) => a.xd.getTime() - b.xd.getTime());
			const firstProjectedIdx = rows.findIndex((r) => r.xd >= projected.start);

			if (firstProjectedIdx === -1) continue;
			projectedData.push(...rows.slice(firstProjectedIdx));
		}

		return [
			Plot.line(historicalData, lineOptions),
			Plot.line(projectedData, { ...lineOptions, strokeDasharray: '5,4' }),

			// A single invisible line carries the tooltip, so that only one tooltip appears near
			// the boundary between the historical and projected lines
			Plot.line(dateData, {
				...lineOptions,
				strokeOpacity: 0,
				title: makeTooltip(options),
				tip: 'xy'
			})
		];
	})();

	return {
		x: {
			label: options.xAxisLabel ?? null,
			insetLeft: options.insetLeft ?? 80,
			insetRight: options.insetRight ?? 120, // need space for labels to right of plot

			...getAxisTypeAndTickFormat(options.timeperiod_type),

			domain: options.xDomain
				? (options.xDomain.map((d) =>
						d instanceof Date ? d : typeof d === 'string' ? new Date(d) : d
					) as [Date | number, Date | number])
				: undefined,

			ticks: 5
		},

		y: {
			label: null,
			domain: yDomain,
			includeZero: options.includeZero
		},

		fx: options.faceted
			? {
					label: null
				}
			: undefined,

		color: {
			legend: true,
			...colorChoice
		},

		marks: [
			...projectedMarks,

			Plot.gridX({
				strokeOpacity: getGridStrokeOpacity(options.timeperiod_type)
			}),
			Plot.gridY(),

			Plot.axisY({
				tickFormat: options.ytickformat
			}),

			...getZeroYLine(options),

			...lineMarks,

			// reference lines
			...getReferenceLineMarks(options.reference_lines),

			// Label end-point with b when the series do not all terminate at the same x-value,
			// or when the comparison is small enough that labels remain readable.
			...(!shouldSuppressEndpointLabels
				? [
						Plot.dot(
							filteredData,
							Plot.selectLast({
								x: 'xd',
								y: 'y',
								fx: options.faceted ? 'z2' : undefined,

								stroke: 'b',
								strokeWidth: 2,
								fill: 'white',
								fillOpacity: 1,
								r: 5
							})
						),

						Plot.text(
							filteredData,
							Plot.selectLast({
								x: 'xd',
								y: 'y',
								fx: options.faceted ? 'z2' : undefined,

								text: 'b',
								fill: 'b',
								textAnchor: 'start',
								dx: 10
							})
						)
					]
				: [])
		]
	};
};
