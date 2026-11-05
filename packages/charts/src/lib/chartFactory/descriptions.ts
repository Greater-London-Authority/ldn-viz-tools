import { extent, type Numeric } from 'd3-array';
import { utcFormat } from 'd3-time-format';
import type { ChartDataRow, ChartOptions, ChoroplethAreaType, ColorChoice } from './chartOptions';
import { enGBLocale } from './utils';

const dateFormatter = utcFormat('%Y');
const formatDate = (d: unknown) => (d instanceof Date ? dateFormatter(d) : d);

const join = (arr: (string | number)[], addQuotes = true) => {
	let a = arr;
	if (addQuotes) {
		a = arr.map((d) => `"${d}"`);
	}

	if (a.length === 0) {
		return '';
	} else if (a.length === 1) {
		return a[0];
	}
	return `${a.slice(0, -1).join(', ')} and ${a.at(-1)}`;
};

const unique = <T>(arr: T[]) => Array.from(new Set(arr));

// unique values, ignoring rows where the field is missing
const uniqueDefined = <T>(arr: (T | null | undefined)[]) =>
	unique(arr.filter((d): d is T => d != null && d !== ''));

// how each area type is named in a description, e.g. "for each ward"
const areaTypeNames: Record<ChoroplethAreaType, string> = {
	borough: 'borough',
	'ward-2022': 'ward',
	'ward-2021': 'ward',
	'msoa-2021': 'MSOA',
	'lsoa-2021': 'LSOA',
	'lsoa-2011': 'LSOA',
	'oa-2021': 'output area'
};

export const joinUnique = (arr: any[]) => join(unique(arr));

// Joins the non-empty fragments with single spaces and ends the sentence with a full stop.
const sentence = (...parts: (string | number | undefined | false)[]) =>
	parts.filter((p) => p !== undefined && p !== false && p !== '').join(' ') + '.';

// Describes the range of `values` if they are dates or numbers, or lists them if they are categories.
const rangeStatement = (values: unknown[]) => {
	const defined = values.filter((d) => d != null);
	if (defined.length === 0) {
		return '';
	}

	if (defined.every((d) => d instanceof Date || typeof d === 'number')) {
		// d3's extent compares Dates and numbers at runtime, but its overloads can't express the
		// mixed union, so we cast
		const [lo, hi] = extent(defined as Numeric[]);
		return `showing values between ${formatDate(lo)} and ${formatDate(hi)}`;
	}

	return `showing values for ${join(unique(defined.map(String)))}`;
};

export const getDescription = (
	options: ChartOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => {
	const xds = data.map((d) => d.xd);
	const xStatement = rangeStatement(xds);

	// the color domain is empty when there are too many series to color; fall back to the data
	const domain = colorChoice.domain ?? [];
	const series = domain.length > 0 ? domain : uniqueDefined(data.map((d) => d.b));

	// e.g. "showing values between 2010 and 2020, with categories "A" and "B""
	const withCategories = (statement: string, categories: (string | number)[]) =>
		[statement, categories.length > 0 && `with categories ${join(categories)}`]
			.filter(Boolean)
			.join(', ');

	const linesFor = (s: (string | number)[]) => {
		if (s.length === 0) return undefined;
		return s.length === 1 ? `with a single line for ${s[0]}` : `with lines for ${join(s)}`;
	};

	switch (options.chartType) {
		case 'line':
			return sentence('Line chart', linesFor(series), xStatement);

		case 'slopeChart':
			return sentence('Slope chart', linesFor(series), xStatement);

		case 'lineChartWithForecast': {
			const description = sentence('Line chart', linesFor(series), xStatement);
			const projectedStart = options.projectedStart ? new Date(options.projectedStart) : null;
			if (options.type === 'date' && projectedStart && !isNaN(projectedStart.getTime())) {
				return `${description} Values from ${formatDate(projectedStart)} onwards are projections.`;
			}
			return description;
		}

		case 'lineChartWithLineStyles': {
			const z2s = uniqueDefined(data.map((d) => d.z2));
			return [
				sentence('Line chart', xStatement),
				series.length > 0 && sentence('Line color distinguishes between', join(series)),
				z2s.length > 0 && sentence('Line style distinguishes between', join(z2s))
			]
				.filter(Boolean)
				.join(' ');
		}

		case 'barChartVertical':
			return sentence('Bar chart', xStatement);

		case 'barChartStacked':
			return sentence('Stacked bar chart', withCategories(xStatement, series));

		case 'barChartStackedTimeseries':
			return sentence('Stacked bar chart of a time-series', withCategories(xStatement, series));

		case 'barChartVerticalGrouped':
		case 'barChartHorizontalGrouped': {
			const groups = uniqueDefined(xds.map((d) => String(formatDate(d))));
			const bs = uniqueDefined(data.map((d) => d.b));
			return [
				'A grouped bar chart.',
				groups.length > 0 && sentence('The groups correspond to', join(groups)),
				bs.length > 0 && sentence('Within each group, the bars correspond to', join(bs))
			]
				.filter(Boolean)
				.join(' ');
		}

		case 'pairedDotPlot':
			// in this chart, the compared values are the color domain rather than `xd`
			return sentence(
				'Paired dot plot',
				withCategories(rangeStatement(domain), uniqueDefined(xds.map(String)))
			);

		case 'barChartHorizontal': {
			const bars = uniqueDefined(xds.map(String));
			return sentence('Bar chart', bars.length > 0 && `with bars corresponding to ${join(bars)}`);
		}

		case 'incomeSlope': {
			// `xd` holds the groups being compared; each line joins the values of one `b` across them
			const groups = uniqueDefined(xds.map(String));
			const bs = uniqueDefined(data.map((d) => d.b));
			return sentence(
				'Slope chart',
				groups.length > 0 && `comparing ${join(groups)}`,
				bs.length > 0 && `for ${join(bs)}`
			);
		}

		case 'histogram':
			return series.length > 1
				? sentence('Histograms of values for', join(series))
				: sentence('Histogram of values', series.length === 1 && `for ${join(series)}`);

		case 'choropleth': {
			const areaType = areaTypeNames[options.areaType] ?? 'area';
			const [lo, hi] = extent(data, (d) => d.y);
			const f = enGBLocale.format(options.tooltipFormatValue ?? options.ytickformat ?? '.0f');
			return [
				`Map of London shaded by value for each ${areaType}.`,
				lo !== undefined && hi !== undefined && sentence('Values range from', f(lo), 'to', f(hi))
			]
				.filter(Boolean)
				.join(' ');
		}
	}

	// generic fallback for any chart type without a specific description
	return sentence('Chart', xStatement, series.length > 0 && `for ${join(series)}`);
};
