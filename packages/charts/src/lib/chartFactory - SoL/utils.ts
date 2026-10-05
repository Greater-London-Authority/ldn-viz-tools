import { PUBLIC_CHART_DATA_API_URL } from '$env/static/public';
import { Plot } from '@ldn-viz/charts';
import { theme } from '@ldn-viz/ui';
import { extent, ticks, tickStep } from 'd3-array';
import { formatLocale } from 'd3-format';
import { utcFormat } from 'd3-time-format';
import type { ChartDataRow, ChartOptions } from './chartOptions';

export type ChartDataOptions = {
	type?: string;
	timeperiod_type?: string | null;
	hide?: string[];
};

export function fetchChartData(dataset: string): Promise<Response> {
	return fetch(`${PUBLIC_CHART_DATA_API_URL}?dataset=eq.${dataset}`);
}

export function loadChartData(dataset: string, options: ChartDataOptions): Promise<ChartDataRow[]> {
	const convertVal = (val: string): string | number | Date => {
		if (options.type === 'integer') return +val;
		if (
			options.type === 'date' &&
			!['Financial Year', 'Academic Year'].includes(options.timeperiod_type ?? '')
		)
			return new Date(val.replace(/\//g, '-'));
		return val;
	};

	return fetchChartData(dataset)
		.then((res) => res.json())
		.then((dataRes) => {
			const newData = dataRes
				.map((d: ChartDataRow) => ({ ...d, xd: convertVal(d.xd as string) }))
				.filter((d: ChartDataRow) => !(d.xd instanceof Date && isNaN((d.xd as Date).getTime())))
				.filter((d: ChartDataRow) => !options.hide || !options.hide.includes(d.b));

			if (options.type === 'date' || dataset === 'job_posts') {
				newData.sort((a: ChartDataRow, b: ChartDataRow) => (a.xd as number) - (b.xd as number));
			}

			return newData;
		});
}

export function getTooltip(
	d: ChartDataRow,
	dateFormatter: (d: Date) => string,
	formatter?: (n: number) => string
) {
	const y = formatter && typeof d.y === 'number' ? formatter(d.y) : d.y;
	if (d.xd instanceof Date) {
		return [d.b, dateFormatter(d.xd), y].join('\n');
	}

	return [d.b, d.xd, y].join('\n');
}

export function makeTooltip(
	options: Pick<
		import('./chartOptions').ChartOptions,
		'tooltipFormatValue' | 'ytickformat' | 'tooltipFormatDate'
	>
): (d: ChartDataRow) => string {
	const spec = options.tooltipFormatValue ?? options.ytickformat;
	// N.B. we need to define the format locale to ensure the currency formatter is set to use £ rather than $
	const valueFormatter = spec
		? formatLocale({ currency: ['£', ''], thousands: ',', grouping: [3] }).format(spec)
		: undefined;

	const dateFormat = options.tooltipFormatDate ?? '%d %B %Y';
	const dateFormatter = utcFormat(dateFormat);

	return (d: ChartDataRow) => getTooltip(d, dateFormatter, valueFormatter);
}

export const getColorScale = (data: ChartDataRow[]) => {
	let domain = new Array(...new Set(data.map((d) => d.b))).sort();

	// ensure "London" comes first (if it is present)
	if (domain.includes('London')) {
		domain = ['London', ...domain.filter((d) => d !== 'London')];
	}

	const colors = [
		theme.tokenNameToValue('data.primary'),
		theme.tokenNameToValue('data.secondary'),
		theme.tokenNameToValue('data.tertiary'),
		theme.tokenNameToValue('data.categorical.turquoise'),
		theme.tokenNameToValue('data.categorical.purple'),

		theme.tokenNameToValue('data.categorical.red'),
		theme.tokenNameToValue('data.categorical.green'),
		theme.tokenNameToValue('data.categorical.yellow')
	];

	if (domain.length === 2 && (domain[0].startsWith('London') || domain[1].startsWith('London'))) {
		return {
			type: 'ordinal',
			domain,
			range: domain.map((v) =>
				v.includes('London')
					? theme.tokenNameToValue('data.primary')
					: theme.tokenNameToValue('data.context')
			)
		};
	} else if (
		domain.length == 2 &&
		domain[0].includes('Domestic') &&
		domain[1].includes('International')
	) {
		return {
			type: 'ordinal',
			domain,
			range: domain.map((v) =>
				v.includes('Domestic')
					? theme.tokenNameToValue('data.primary')
					: theme.tokenNameToValue('data.secondary')
			)
		};
	} else if (domain.length == 2 && domain[0].includes('Inner') && domain[1].includes('Outer')) {
		return {
			type: 'ordinal',
			domain,
			range: domain.map((v) =>
				v.includes('Inner')
					? theme.tokenNameToValue('data.primary')
					: theme.tokenNameToValue('data.secondary')
			)
		};
	} else if (domain.length <= colors.length) {
		return {
			type: 'ordinal',
			domain,
			range: colors.slice(0, domain.length)
		};
	}

	return {};
};

const STRING_TIMEPERIOD_TYPES = ['Financial Year', 'Academic Year'];

/**
 * Returns the `type` and `tickFormat` for the y-axis.
 * 'Financial Year' (values like "2013-14") and 'Academic Year' (values like "2013/14") are strings;
 * to avoid these overlapping, we use a `point` scale and drop every other label to prevent overlap
 */
export const getAxisTypeAndTickFormat = (
	timeperiod_type: ChartOptions['timeperiod_type']
): { type: 'point' | undefined; tickFormat: ((d: unknown, i: number) => unknown) | undefined } => {
	if (STRING_TIMEPERIOD_TYPES.includes(timeperiod_type ?? '')) {
		return {
			type: 'point',
			tickFormat: (d: unknown, i: number) => (i % 2 === 0 ? d : '')
		};
	}
	return { type: undefined, tickFormat: undefined };
};

/**
 * Returns the `opacity` and `tickFormat` for the vertical gridlines.
 * 'Financial Year' (values like "2013-14") and 'Academic Year' (values like "2013/14") are strings,
 * and we drop every other label to prevent overlap.
 * This function sets the opacity to hides the vertical grid-lines that would be unlabelled.
 */
export const getGridStrokeOpacity = (
	timeperiod_type: ChartOptions['timeperiod_type']
): ((d: unknown, i: number) => number) | number => {
	// apply similar trick as for tickFormat, to hide grid lines for values with no label
	if (STRING_TIMEPERIOD_TYPES.includes(timeperiod_type ?? '')) {
		return (d: unknown, i: number) => (i % 2 === 0 ? 1 : 0);
	}
	return 1;
};

/**
 *
 * Construct the domain for the chart.
 * For line charts, we try to ensure that there is one grid-line above the
 * highest data-point, and one grid-line below the lowest, so the data appears nicely contained.
 */
export const getDomain = (data: ChartDataRow[], options: ChartOptions) => {
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

	let end = tickVals[tickVals.length - 1] ?? range[1];

	if (end < range[1]) {
		end += stepSize;
	}

	return [start, end];
};

/**
 * Adds a `Plot.ruleX()` mark at `options.indexLine` (if set), or 0
 * (if either `options.includeZero` or `options.includeZeroLine` is true)
 */

export const getZeroXLine = (options: ChartOptions) => {
	if (typeof options.indexLine == 'number') {
		return [Plot.ruleX([options.indexLine])];
	} else if (options.includeZero || options.includeZeroLine) {
		return [Plot.ruleX([0])];
	}
	return [];
};

/**
 * Returns `Plot.RuleY` and `Plot.text` marks for reference lines.
 */
export const getReferenceLineMarks = (
	referenceLines: { label: string; y: number; strokeDasharray?: string }[] | undefined
) => [
	...(referenceLines || []).map((l) =>
		Plot.ruleY([l.y], {
			stroke: theme.tokenNameToValue('data.context'),
			strokeWidth: 2,
			strokeDasharray: l.strokeDasharray ?? '4,4'
		})
	),
	...(referenceLines || []).map((l) =>
		Plot.text([l.label], {
			y: l.y,
			lineAnchor: 'bottom',
			dy: -4,
			frameAnchor: 'right'
		})
	)
];

/**
 * Adds a `Plot.ruleY()` mark at `options.indexLine` (if set), or 0
 * (if either `options.includeZero` or `options.includeZeroLine` is true)
 */
export const getZeroYLine = (options: ChartOptions) => {
	if (typeof options.indexLine == 'number') {
		return [Plot.ruleY([options.indexLine])];
	} else if (options.includeZero || options.includeZeroLine) {
		return [Plot.ruleY([0])];
	}
	return [];
};
