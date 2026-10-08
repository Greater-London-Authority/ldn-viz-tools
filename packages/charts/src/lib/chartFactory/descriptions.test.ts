import { describe, expect, it, vi } from 'vitest';
import type { ChartDataRow, ChartOptions, ColorChoice } from './chartOptions';
import { getDescription } from './descriptions';

vi.mock('@ldn-viz/ui', () => ({
	theme: {
		tokenNameToValue: vi.fn((tokenName: string) => `value(${tokenName})`)
	}
}));

const opts = (chartType: string, extra: Record<string, unknown> = {}) =>
	({
		chartType,
		type: 'date',
		timeperiod_type: 'Annual',
		ytickformat: null,
		...extra
	}) as ChartOptions;

const d = (year: number) => new Date(Date.UTC(year, 0, 1));

const timeseries: ChartDataRow[] = [
	{ xd: d(2010), b: 'London', y: 1 },
	{ xd: d(2020), b: 'London', y: 2 },
	{ xd: d(2010), b: 'England', y: 3 },
	{ xd: d(2020), b: 'England', y: 4 }
];

const colors: ColorChoice = { domain: ['London', 'England'], range: ['red', 'blue'] };

describe('getDescription', () => {
	it('line', () => {
		expect(getDescription(opts('line'), timeseries, colors)).toBe(
			'Line chart with lines for "London" and "England" showing values between 2010 and 2020.'
		);
	});

	it('line with a single series', () => {
		expect(
			getDescription(opts('line'), timeseries.slice(0, 2), { domain: ['London'], range: ['red'] })
		).toBe('Line chart with a single line for London showing values between 2010 and 2020.');
	});

	it('line falls back to the data when the color domain is empty', () => {
		expect(getDescription(opts('line'), timeseries, {})).toBe(
			'Line chart with lines for "London" and "England" showing values between 2010 and 2020.'
		);
	});

	it('slopeChart', () => {
		expect(getDescription(opts('slopeChart'), timeseries, colors)).toBe(
			'Slope chart with lines for "London" and "England" showing values between 2010 and 2020.'
		);
	});

	it('lineChartWithForecast', () => {
		expect(
			getDescription(
				opts('lineChartWithForecast', { projectedStart: '2018-01-01' }),
				timeseries,
				colors
			)
		).toBe(
			'Line chart with lines for "London" and "England" showing values between 2010 and 2020. Values from 2018 onwards are projections.'
		);
	});

	it('lineChartWithLineStyles', () => {
		const data = timeseries.map((row, i) => ({ ...row, z2: i % 2 ? 'Actual' : 'Target' }));
		expect(getDescription(opts('lineChartWithLineStyles'), data, colors)).toBe(
			'Line chart showing values between 2010 and 2020. Line color distinguishes between "London" and "England". Line style distinguishes between "Target" and "Actual".'
		);
	});

	it('lineChartWithLineStyles ignores rows without z2', () => {
		expect(getDescription(opts('lineChartWithLineStyles'), timeseries, colors)).toBe(
			'Line chart showing values between 2010 and 2020. Line color distinguishes between "London" and "England".'
		);
	});

	it('barChartVertical', () => {
		expect(getDescription(opts('barChartVertical'), timeseries, colors)).toBe(
			'Bar chart showing values between 2010 and 2020.'
		);
	});

	it('barChartStacked', () => {
		expect(getDescription(opts('barChartStacked'), timeseries, colors)).toBe(
			'Stacked bar chart showing values between 2010 and 2020, with categories "London" and "England".'
		);
	});

	it('barChartStackedTimeseries', () => {
		expect(getDescription(opts('barChartStackedTimeseries'), timeseries, colors)).toBe(
			'Stacked bar chart of a time-series showing values between 2010 and 2020, with categories "London" and "England".'
		);
	});

	it.each(['barChartVerticalGrouped', 'barChartHorizontalGrouped'])('%s', (chartType) => {
		const data = [
			{ xd: 'Camden', b: 'Male', y: 1 },
			{ xd: 'Camden', b: 'Female', y: 2 },
			{ xd: 'Hackney', b: 'Male', y: 3 }
		];
		expect(getDescription(opts(chartType, { type: 'character' }), data, colors)).toBe(
			'A grouped bar chart. The groups correspond to "Camden" and "Hackney". Within each group, the bars correspond to "Male" and "Female".'
		);
	});

	it('pairedDotPlot', () => {
		const data = [
			{ xd: 'Camden', b: '2010', y: 1 },
			{ xd: 'Hackney', b: '2020', y: 2 }
		];
		expect(
			getDescription(opts('pairedDotPlot', { type: 'character' }), data, {
				domain: [2010, 2020]
			})
		).toBe(
			'Paired dot plot showing values between 2010 and 2020, with categories "Camden" and "Hackney".'
		);
	});

	it('barChartHorizontal', () => {
		const data = [
			{ xd: 'Camden', b: 'x', y: 1 },
			{ xd: 'Hackney', b: 'x', y: 2 }
		];
		expect(getDescription(opts('barChartHorizontal', { type: 'character' }), data, colors)).toBe(
			'Bar chart with bars corresponding to "Camden" and "Hackney".'
		);
	});

	it('incomeSlope', () => {
		const data = [
			{ xd: 'London', b: '10', y: 1 },
			{ xd: 'Rest of UK', b: '10', y: 2 },
			{ xd: 'London', b: '50', y: 3 }
		];
		expect(getDescription(opts('incomeSlope', { type: 'character' }), data, {})).toBe(
			'Slope chart comparing "London" and "Rest of UK" for "10" and "50".'
		);
	});

	it('histogram', () => {
		const data = [
			{ xd: 'a', b: 'Inner London', y: 0.1 },
			{ xd: 'b', b: 'Outer London', y: 0.2 }
		];
		expect(getDescription(opts('histogram'), data, {})).toBe(
			'Histograms of values for "Inner London" and "Outer London".'
		);
	});

	it.each([
		['borough', 'borough'],
		['ward-2022', 'ward'],
		['lsoa-2021', 'LSOA'],
		['oa-2021', 'output area']
	])('choropleth of %s', (areaType, areaName) => {
		const data = [
			{ xd: 'E09000001', b: 'x', y: 12.3 },
			{ xd: 'E09000002', b: 'x', y: 45.6 }
		];
		expect(
			getDescription(
				opts('choropleth', { type: 'character', ytickformat: '.1f', areaType }),
				data,
				{}
			)
		).toBe(`Map of London shaded by value for each ${areaName}. Values range from 12.3 to 45.6.`);
	});

	it('uses a generic fallback for unknown chart types', () => {
		expect(getDescription(opts('somethingNew'), timeseries, colors)).toBe(
			'Chart showing values between 2010 and 2020 for "London" and "England".'
		);
	});

	it('never mentions TODO or undefined', () => {
		for (const chartType of [
			'line',
			'slopeChart',
			'lineChartWithForecast',
			'lineChartWithLineStyles',
			'barChartVertical',
			'barChartStacked',
			'barChartStackedTimeseries',
			'barChartVerticalGrouped',
			'barChartHorizontalGrouped',
			'pairedDotPlot',
			'barChartHorizontal',
			'incomeSlope',
			'histogram',
			'choropleth'
		]) {
			for (const data of [timeseries, []]) {
				const text = getDescription(opts(chartType), data, {});
				expect(text).not.toMatch(/TODO|undefined|NaN| {2}/);
			}
		}
	});
});
