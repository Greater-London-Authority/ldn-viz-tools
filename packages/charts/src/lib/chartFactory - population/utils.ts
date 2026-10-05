// import { PUBLIC_CHART_DATA_API_URL } from "$env/static/public";
export const PUBLIC_CHART_DATA_API_URL = '';

import { Plot } from '@ldn-viz/charts';
import { theme } from '@ldn-viz/ui';
import { extent, ticks, tickStep } from 'd3-array';
import { formatLocale } from 'd3-format';
import { utcFormat } from 'd3-time-format';
import type { ChartOptions } from './chartOptions';

// Bundled projected population chart rows shipped with the app build.
import projectedPopulation2ChartData from '$lib/data/projectedPopulation2ChartData.json' with { type: 'json' };
import projectedPopulationChartData from '$lib/data/projectedPopulationChartData.json' with { type: 'json' };
// Bundled components-of-change chart rows shipped with the app build.
import componentsOfChangeData from '$lib/data/ComponentsOfChangeChartData.json' with { type: 'json' };
// Bundled borough-level population data.
import boroughPopulationData from '$lib/data/boroughPopulationData.json' with { type: 'json' };
import housingLedVsTrendCentralBoroughDifferenceData from '$lib/data/housingLedVsTrendCentralBoroughDifferenceData.json' with { type: 'json' };
// Bundled ward-level population data.
import housingLedComponentsData from '$lib/data/HousingLedComponentsData.json' with { type: 'json' };
import housingLedFertilityAgeData from '$lib/data/HousingLedFertilityAgeData.json' with { type: 'json' };
import { boroughCapacityMapData } from '$lib/data/boroughCapacityMapData';
import housingLedProjectedPopulationData from '$lib/data/housingLedProjectedPopulation.json' with { type: 'json' };
import housingLedVsTrendProjectionData from '$lib/data/housingLedVsTrendProjectionData.json' with { type: 'json' };
import housingLedWardPopulationData from '$lib/data/housingLedWardPopulationData.json' with { type: 'json' };
import londonSitesCumulativeData from '$lib/data/londonSitesCumulativeData.json' with { type: 'json' };
import wardPopulationData from '$lib/data/wardPopulationData.json' with { type: 'json' };
import { chartColumns } from './chartColumns';

export type ChartDataRow = {
	dataset: string;
	xd: string | number | Date;
	b: string;
	y: number;
};

export type ChartDataOptions = {
	type?: string;
	timeperiod_type?: string;
	hide?: string[];
};

export function fetchChartData(dataset: string): Promise<Response> {
	return fetch(`${PUBLIC_CHART_DATA_API_URL}?dataset=eq.${dataset}`);
}

function getLocalDatasetRows(dataset: string): ChartDataRow[] {
	return (projectedPopulationChartData as ChartDataRow[])
		.concat(projectedPopulation2ChartData as ChartDataRow[])
		.concat(componentsOfChangeData as ChartDataRow[])
		.concat(boroughPopulationData as ChartDataRow[])
		.concat(housingLedVsTrendCentralBoroughDifferenceData as ChartDataRow[])
		.concat(boroughCapacityMapData as ChartDataRow[])
		.concat(londonSitesCumulativeData as ChartDataRow[])
		.concat(wardPopulationData as ChartDataRow[])
		.concat(housingLedWardPopulationData as ChartDataRow[])
		.concat(housingLedProjectedPopulationData as ChartDataRow[])
		.concat(housingLedVsTrendProjectionData as ChartDataRow[])
		.concat(housingLedComponentsData as ChartDataRow[])
		.concat(housingLedFertilityAgeData as ChartDataRow[])
		.filter((d) => d.dataset === dataset);
}

function getDatasetRows(dataset: string): Promise<ChartDataRow[]> {
	const localRows = getLocalDatasetRows(dataset);

	if (localRows.length > 0) {
		return Promise.resolve(localRows);
	}

	return fetchChartData(dataset).then((res) => res.json());
}

function deriveTotalNetMigrationRows(
	internationalRows: ChartDataRow[],
	domesticRows: ChartDataRow[]
): ChartDataRow[] {
	const internationalByKey = new Map<string, ChartDataRow>();

	for (const row of internationalRows) {
		internationalByKey.set(`${row.b}::${row.xd}`, row);
	}

	const combinedRows: ChartDataRow[] = [];

	for (const domesticRow of domesticRows) {
		const matchingInternational = internationalByKey.get(`${domesticRow.b}::${domesticRow.xd}`);

		if (!matchingInternational) continue;

		combinedRows.push({
			dataset: 'total_net_migration',
			xd: domesticRow.xd,
			b: domesticRow.b,
			y: matchingInternational.y + domesticRow.y
		});
	}

	return combinedRows;
}

export function getColorChoice(
	options?: {
		colorScale?: { domain: string[]; range: string[] };
		colorScaleLight?: { domain: string[]; range: string[] };
		colorScaleDark?: { domain: string[]; range: string[] };
	},
	mode: 'light' | 'dark' = 'light'
): { type?: string; domain?: string[]; range?: string[] } {
	if (!options) {
		return {};
	}

	if (mode === 'dark') {
		return options.colorScaleDark ?? options.colorScale ?? {};
	}

	return options.colorScaleLight ?? options.colorScale ?? {};
}

export function sortChartData<T extends ChartDataRow>(
	rows: T[],
	xField: keyof ChartDataRow = 'xd',
	seriesField: keyof ChartDataRow = 'b'
): T[] {
	return [...rows].sort((a, b) => {
		const aSeries = String(a[seriesField] ?? '');
		const bSeries = String(b[seriesField] ?? '');
		if (aSeries !== bSeries) return aSeries.localeCompare(bSeries);

		const aX = a[xField];
		const bX = b[xField];

		if (aX instanceof Date && bX instanceof Date) {
			return aX.getTime() - bX.getTime();
		}

		if (typeof aX === 'number' && typeof bX === 'number') {
			return aX - bX;
		}

		return String(aX).localeCompare(String(bX));
	});
}

export function loadChartData(dataset: string, options: ChartDataOptions): Promise<ChartDataRow[]> {
	const convertVal = (val: string): string | number | Date => {
		if (options.type === 'integer') return +val;
		if (options.type === 'date' && !['Financial Year'].includes(options.timeperiod_type ?? ''))
			return new Date(val);
		return val;
	};

	const dataPromise = getDatasetRows(dataset).then((rows) => {
		if (rows.length > 0 || dataset !== 'total_net_migration') {
			return rows;
		}

		return Promise.all([
			getDatasetRows('international_net_migration'),
			getDatasetRows('domestic_net_migration')
		]).then(([internationalRows, domesticRows]) =>
			deriveTotalNetMigrationRows(internationalRows, domesticRows)
		);
	});

	return dataPromise.then((dataRes) => {
		const newData = dataRes
			.map((d: ChartDataRow) => ({ ...d, xd: convertVal(d.xd as string) }))
			.filter((d: ChartDataRow) => !options.hide || !options.hide.includes(d.b))
			.filter((d: ChartDataRow) => {
				const isHousingLedAnnualPopulationChange =
					dataset === 'housing_led_annual_population_change' ||
					dataset === 'housing_led_vs_trend_annual_population_change';

				const isHousingLedZeroPoint =
					isHousingLedAnnualPopulationChange &&
					typeof d.b === 'string' &&
					((dataset === 'housing_led_annual_population_change' &&
						['Central', 'High', 'Low'].includes(d.b)) ||
						(dataset === 'housing_led_vs_trend_annual_population_change' &&
							d.b.startsWith('Housing-led'))) &&
					d.y === 0 &&
					d.xd instanceof Date &&
					d.xd.getFullYear() === 2011;

				if (isHousingLedZeroPoint) {
					return false;
				}
				return true;
			});

		if (options.type === 'date' || dataset === 'job_posts') {
			newData.sort((a: ChartDataRow, b: ChartDataRow) => (a.xd as number) - (b.xd as number));
		}

		return newData;
	});
}

/********************************************************************************************/

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
	const rawSpec = options.tooltipFormatValue ?? options.ytickformat ?? ',.0f';
	const spec = rawSpec.includes('s') ? ',.0f' : rawSpec;
	// N.B. we need to define the format locale to ensure the currency formatter is set to use £ rather than $
	const valueFormatter = formatLocale({
		currency: ['£', ''],
		thousands: ',',
		grouping: [3]
	}).format(spec);

	const dateFormat = options.tooltipFormatDate ?? '%Y';
	const dateFormatter = utcFormat(dateFormat);

	return (d: ChartDataRow) => getTooltip(d, dateFormatter, valueFormatter);
}

export const formatAxisTick = (value: number, spec?: string | null): string => {
	if (spec?.includes('s')) {
		const abs = Math.abs(value);
		if (abs >= 1_000_000) {
			const millions = value / 1_000_000;
			return `${millions.toFixed(1)}M`;
		}
	}

	const formatter = formatLocale({ currency: ['£', ''], thousands: ',', grouping: [3] }).format(
		spec ?? ',.0f'
	);
	return formatter(value);
};

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

// TOOD: replace
export const getColumnMapping = (dataset: string) => {
	const cols = chartColumns.find((d) => d.dataset === dataset);

	if (cols) {
		return {
			xd: cols.xd_source,
			b: cols.b_source,
			y: cols.y_source,
			z2: cols.z2_source
		};
	}

	return undefined;
};
