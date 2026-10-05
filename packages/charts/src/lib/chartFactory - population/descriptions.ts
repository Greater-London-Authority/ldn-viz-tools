import { max, min } from 'd3-array';
import { utcFormat } from 'd3-time-format';
import type { ChartDataRow, ChartOptions, ColorChoice } from './chartOptions';

const dateFormatter = utcFormat('%Y');
const formatDate = (d) => (d instanceof Date ? dateFormatter(d) : d);

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

const unique = (arr: any[]) => Array.from(new Set(arr));

export const joinUnique = (arr: any[]) => join(unique(arr));

export const getDescription = (
	options: ChartOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => {
	const xds = data.map((d) => d.xd);
	let timeStatement = `showing values between ${formatDate(min(xds))} and ${formatDate(max(xds))}`;
	const colorDomain =
		Array.isArray(colorChoice?.domain) && colorChoice.domain.length > 0
			? colorChoice.domain
			: unique(data.map((d) => d.b));

	if (options.chartType === 'line' || options.chartType === 'slopeChart') {
		let part = '';
		if (colorDomain.length === 1) {
			part = `with a single line for ${colorDomain[0]}`;
		} else {
			part = `with lines for ${join(colorDomain)}`;
		}

		return `Line chart ${part} ${timeStatement}.`;
	} else if (options.chartType === 'barChartVertical') {
		return `Bar chart showing values for ${timeStatement}.`; // TODO: ix xd always time
	} else if (options.chartType === 'barChartStacked') {
		return `Stacked bar chart  ${timeStatement}, with categories ${join(colorChoice.domain)}.`;
	} else if (options.chartType === 'lineChartWithLineStyles') {
		timeStatement = `showing values between ${formatDate(min(xds))} and ${formatDate(max(xds))}`;

		const z2s = data.map((d) => d.z2);

		return `Line chart ${timeStatement}. Line color distinguishes between ${join(colorDomain)}. Line style distinguishes between ${join(unique(z2s))}`;
	} else if (options.chartType === 'barChartStackedTimeseries') {
		// The stacked bar chart is difficult to compeletely descibe concisely.
		// For each

		return `Stacked bar chart of a time-series ${timeStatement}, with categories ${join(colorChoice.domain)}.`;
	} else if (
		options.chartType === 'barChartVerticalGrouped' ||
		options.chartType === 'barChartHorizontalGrouped'
	) {
		const xds = data.map((d) => d.xd);
		const bs = data.map((d) => d.b);

		return `A grouped bar chart. The groups correspond to ${join(unique(xds))}. Within each group, the bars correspond to ${join(unique(bs))}.`;
	} else if (options.chartType === 'pairedDotPlot') {
		// this data doesn't have time as xd

		let timeStatement = `showing values between ${formatDate(min(colorChoice.domain))} and ${formatDate(max(colorChoice.domain))}`;
		const xds = data.map((d) => d.xd);

		return `Paired dot plot ${timeStatement}, with categories ${join(unique(xds))}.`;
	} else if (options.chartType === 'barChartHorizontal') {
		const bs = data.map((d) => d.xd);

		return `Bar chart with bars corresponding to ${join(unique(bs))}.`; // TODO: ix xd always time
	} else if (options.chartType === 'incomeSlope') {
		return `Slope chart showing household income for each decile in London and the rest of the UK.`; // TODO: ix xd always time
	} else if (options.chartType === 'histogram') {
		return `Paired histograms of vacancy rates in Inner London and Outer London.`; // TODO: ix xd always time
	}

	return `TODO: ${options.chartType}`;
};

// review: health
// Public satisfaction with the NHS chart gone?

// CYP: obesity plot
