import { describe, expect, it, vi } from 'vitest';
import type { ChartDataRow } from './chartOptions';
import { getColorScale } from './utils';

vi.mock('@ldn-viz/ui', () => ({
	theme: {
		tokenNameToValue: vi.fn((tokenName: string) => `value(${tokenName})`)
	}
}));

// one row for each value of `b`
const rows = (...bs: unknown[]) => bs.map((b) => ({ xd: 'a', b, y: 1 }) as ChartDataRow);

const categorical = [
	'value(data.primary)',
	'value(data.secondary)',
	'value(data.tertiary)',
	'value(data.categorical.turquoise)',
	'value(data.categorical.purple)',
	'value(data.categorical.red)',
	'value(data.categorical.green)',
	'value(data.categorical.yellow)'
];

describe('getColorScale', () => {
	it('sorts the domain and assigns the categorical colors in order', () => {
		expect(getColorScale(rows('C', 'A', 'B'))).toEqual({
			type: 'ordinal',
			domain: ['A', 'B', 'C'],
			range: categorical.slice(0, 3)
		});
	});

	it('includes each value of `b` only once', () => {
		expect(getColorScale(rows('B', 'A', 'B', 'A')).domain).toEqual(['A', 'B']);
	});

	it('ignores rows with no `b` value', () => {
		expect(getColorScale(rows('A', undefined, null, 'B')).domain).toEqual(['A', 'B']);
	});

	it('puts "London" first, and gives it the primary color', () => {
		const scale = getColorScale(rows('Barnet', 'London', 'Camden'));
		expect(scale.domain).toEqual(['London', 'Barnet', 'Camden']);
		expect(scale.range?.[0]).toBe('value(data.primary)');
	});

	it('uses the primary and context colors for London and one comparator', () => {
		expect(getColorScale(rows('England', 'London'))).toEqual({
			type: 'ordinal',
			domain: ['London', 'England'],
			range: ['value(data.primary)', 'value(data.context)']
		});
	});

	it('matches a London series whose name starts with "London"', () => {
		expect(getColorScale(rows('UK', 'London (ITL1)'))).toEqual({
			type: 'ordinal',
			domain: ['London (ITL1)', 'UK'],
			range: ['value(data.primary)', 'value(data.context)']
		});
	});

	it('uses the primary and secondary colors for Domestic and International', () => {
		expect(getColorScale(rows('International visitors', 'Domestic visitors'))).toEqual({
			type: 'ordinal',
			domain: ['Domestic visitors', 'International visitors'],
			range: ['value(data.primary)', 'value(data.secondary)']
		});
	});

	it('uses the primary and secondary colors for Inner and Outer London', () => {
		expect(getColorScale(rows('Outer London', 'Inner London'))).toEqual({
			type: 'ordinal',
			domain: ['Inner London', 'Outer London'],
			range: ['value(data.primary)', 'value(data.secondary)']
		});
	});

	it('uses all eight categorical colors for eight series', () => {
		const bs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
		expect(getColorScale(rows(...bs))).toEqual({
			type: 'ordinal',
			domain: bs,
			range: categorical
		});
	});

	it('returns an empty color choice for more than eight series', () => {
		expect(getColorScale(rows('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'))).toEqual({});
	});

	it('keeps numeric values of `b` as numbers, so the domain still matches the data', () => {
		const scale = getColorScale(rows(2, 1));
		expect(scale.domain).toEqual([1, 2]);
		expect(scale.range).toEqual(categorical.slice(0, 2));
	});

	it('returns an empty ordinal scale for empty data', () => {
		expect(getColorScale([])).toEqual({ type: 'ordinal', domain: [], range: [] });
	});
});
