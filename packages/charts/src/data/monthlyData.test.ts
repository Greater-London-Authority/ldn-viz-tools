import { describe, expect, it } from 'vitest';
import { monthlyData } from './monthlyData';

describe('monthlyData', () => {
	it('is non-empty', () => {
		expect(monthlyData.length).toBeGreaterThan(0);
	});

	it('parses Month into a Date instance for every row', () => {
		for (const row of monthlyData) {
			expect(row.Month).toBeInstanceOf(Date);
		}
	});

	it('derives Year as the 4-digit year prefix of the original Month string', () => {
		for (const row of monthlyData) {
			expect(row.Year).toMatch(/^\d{4}$/);
			expect(row.Year).toBe(String(row.Month.getUTCFullYear()));
		}
	});

	it('preserves Variable and Value from the source data', () => {
		expect(monthlyData[0]).toMatchObject({
			Variable: 'Variable A',
			Value: 53623.9185728035
		});
	});

	it('parses the first row consistently with the original source string ("2015-01-01")', () => {
		expect(monthlyData[0].Year).toBe('2015');
		expect(monthlyData[0].Month.toISOString()).toBe('2015-01-01T00:00:00.000Z');
	});
});
