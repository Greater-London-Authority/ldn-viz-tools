import { Plot } from '../../observablePlotFragments/plot';
import { theme } from '@ldn-viz/ui';
import type { ChartDataRow, ColorChoice, LineChartWithForecastOptions } from '../chartOptions';

import { extent, ticks, tickStep } from 'd3-array';
import { formatAxisTick, makeTooltip } from '../utils';

// Unlike the shared `getDomain` in utils, this pads the domain by a further 20% of a tick step
// beyond the outermost gridlines (except at 0).
const getDomain = (
	data: ChartDataRow[],
	options: LineChartWithForecastOptions
): [number, number] => {
	const nt = options.numTicks ?? 5;

	const [min, max] = extent(data.map((d) => d.y));

	if (min === undefined || max === undefined) {
		return [0, 1];
	}

	const range: [number, number] = [min, max];

	if (options.includeZero && range[0] > 0) {
		range[0] = 0;
	}

	const tickVals = ticks(range[0], range[1], nt);
	const stepSize = tickStep(range[0], range[1], nt);

	let start = tickVals[0] ?? range[0];
	if (start > range[0]) {
		start -= stepSize;
	}
	if (start !== 0) {
		start -= stepSize * 0.2;
	}

	let end = tickVals[tickVals.length - 1] ?? range[1];

	if (end < range[1]) {
		end += stepSize;
	}
	if (end !== 0) {
		end += stepSize * 0.2;
	}

	return [start, end];
};

const getComparableX = (value: ChartDataRow['xd']) =>
	value instanceof Date ? value.getTime() : value;

export const filterDataToXDomain = (
	data: ChartDataRow[],
	options: LineChartWithForecastOptions
) => {
	if (!options.xDomain || options.type !== 'date') return data;

	const [start, end] = options.xDomain.map((value) =>
		value instanceof Date ? value : new Date(value as string | number)
	) as [Date, Date];

	return data.filter((row) => {
		if (!(row.xd instanceof Date)) return true;
		return row.xd >= start && row.xd <= end;
	});
};

export const lineChartWithForecast = (
	options: LineChartWithForecastOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => {
	const filteredData = filterDataToXDomain(data, options);
	const yDomain = options.yDomain ?? getDomain(filteredData, options);

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

	const hasProjectedShading =
		Boolean(options.projectedStart) && options.type === 'date' && data.length > 0;

	const projectedMarks = hasProjectedShading
		? (() => {
				const xVals = filteredData.map((d) => d.xd).filter((d): d is Date => d instanceof Date);
				if (xVals.length === 0) return [];

				const maxX = new Date(Math.max(...xVals.map((d) => d.getTime())));
				const projectedStart = new Date(options.projectedStart as string);

				return [
					Plot.rect(
						[
							{
								x1: projectedStart,
								x2: maxX,
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
					Plot.ruleX([projectedStart], {
						stroke: theme.tokenNameToValue('data.context'),
						strokeWidth: 1.5,
						strokeDasharray: '4,3',
						strokeOpacity: 0.6
					}),
					Plot.text(['Projected →'], {
						x: projectedStart,
						y: yDomain[1],
						dx: 6,
						dy: 10,
						textAnchor: 'start',
						lineAnchor: 'top',
						fill: theme.tokenNameToValue('data.context'),
						fontSize: 11
					})
				];
			})()
		: [];

	const lineMarks = (() => {
		if (!hasProjectedShading) {
			return [
				Plot.line(filteredData, {
					x: 'xd',
					y: 'y',
					z: 'b',
					fx: options.faceted ? 'z2' : undefined,
					stroke: 'b',
					title: makeTooltip(options),
					tip: 'xy'
				})
			];
		}

		const projectedStart = new Date(options.projectedStart as string);
		const dateData = filteredData.filter(
			(d): d is ChartDataRow & { xd: Date } => d.xd instanceof Date
		);

		const historicalData = dateData.filter((d) => d.xd <= projectedStart);

		const grouped = new Map<string, (ChartDataRow & { xd: Date })[]>();
		for (const row of dateData) {
			const key = row.b;
			if (!grouped.has(key)) grouped.set(key, []);
			grouped.get(key)!.push(row);
		}

		const projectedData: (ChartDataRow & { xd: Date })[] = [];
		for (const rows of grouped.values()) {
			rows.sort((a, b) => a.xd.getTime() - b.xd.getTime());
			const firstProjectedIdx = rows.findIndex((r) => r.xd >= projectedStart);

			if (firstProjectedIdx === -1) continue;
			projectedData.push(...rows.slice(firstProjectedIdx));
		}

		return [
			Plot.line(historicalData, {
				x: 'xd',
				y: 'y',
				z: 'b',
				fx: options.faceted ? 'z2' : undefined,
				stroke: 'b',
				title: makeTooltip(options),
				tip: 'xy'
			}),
			Plot.line(projectedData, {
				x: 'xd',
				y: 'y',
				z: 'b',
				fx: options.faceted ? 'z2' : undefined,
				stroke: 'b',
				strokeDasharray: '5,4',
				title: makeTooltip(options),
				tip: 'xy'
			})
		];
	})();

	return {
		x: {
			label: options.xAxisLabel ?? null,
			insetLeft: 80,
			insetRight: options.insetRight ?? 120, // need space for labels to right of plot

			// 'Financial year' values are like "2013-14"
			type: options.timeperiod_type === 'Financial Year' ? 'point' : undefined,
			tickFormat:
				options.timeperiod_type === 'Financial Year'
					? (d: unknown, i: number) => (i % 2 === 0 ? d : '')
					: undefined,
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

			Plot
				.gridX
				//    {interval: '2 years'}
				(),
			Plot.gridY(),

			Plot.axisY({
				tickFormat: (d: unknown) => formatAxisTick(Number(d), options.ytickformat)
			}),

			...(options.includeZero || options.includeZeroLine ? [Plot.ruleY([0])] : []),

			...lineMarks,

			// reference lines
			Plot.ruleY(
				(options.reference_lines || []).map((l) => l.y),
				{
					stroke: theme.tokenNameToValue('data.context'),
					strokeWidth: 3,
					strokeDasharray: '4,4'
				}
			),

			...(options.reference_lines || []).map((l) =>
				Plot.text([l.label], {
					y: l.y,
					lineAnchor: 'bottom',
					dy: -4,
					frameAnchor: 'right'
				})
			),

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
