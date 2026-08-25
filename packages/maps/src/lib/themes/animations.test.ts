import { describe, test, expect } from 'vitest';
import { easeOutQuad, easeOutQuart } from './animations';

describe('easeOutQuad', () => {
	test('returns 0 at t=0 and 1 at t=1', () => {
		expect(easeOutQuad(0)).toEqual(0);
		expect(easeOutQuad(1)).toEqual(1);
	});

	test('is monotonically increasing over [0, 1]', () => {
		const samples = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1].map(easeOutQuad);

		for (let i = 1; i < samples.length; i++) {
			expect(samples[i]).toBeGreaterThan(samples[i - 1]);
		}
	});
});

describe('easeOutQuart', () => {
	test('returns 0 at t=0 and 1 at t=1', () => {
		expect(easeOutQuart(0)).toEqual(0);
		expect(easeOutQuart(1)).toEqual(1);
	});

	test('is monotonically increasing over [0, 1]', () => {
		const samples = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1].map(easeOutQuart);

		for (let i = 1; i < samples.length; i++) {
			expect(samples[i]).toBeGreaterThan(samples[i - 1]);
		}
	});
});

describe('easeOutQuad vs easeOutQuart', () => {
	test('easeOutQuart decelerates faster (is further ahead) at the same t', () => {
		for (const t of [0.1, 0.25, 0.5, 0.75, 0.9]) {
			expect(easeOutQuart(t)).toBeGreaterThan(easeOutQuad(t));
		}
	});
});
