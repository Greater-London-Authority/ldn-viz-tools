import { describe, expect, it } from 'vitest';
import { randomId } from './randomId';

describe('randomId', () => {
	it('returns a 12-character string', () => {
		expect(randomId()).toHaveLength(12);
	});

	it('contains only characters from the documented alphabet', () => {
		for (let i = 0; i < 100; i++) {
			expect(randomId()).toMatch(/^[A-Za-z]{12}$/);
		}
	});

	it('produces different values across many calls', () => {
		const iterations = 1000;
		const seen = new Set<string>();
		for (let i = 0; i < iterations; i++) {
			seen.add(randomId());
		}
		// With a 52^12 keyspace, 1000 draws should be collision-free in practice.
		expect(seen.size).toBe(iterations);
	});
});
