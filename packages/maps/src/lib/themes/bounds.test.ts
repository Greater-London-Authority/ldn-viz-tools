import { describe, test, expect } from 'vitest';
import { centerOfBounds, scaleBounds } from './bounds';
import type { BoundsPoints } from './bounds';

describe('centerOfBounds', () => {
	test('correctly identifies center of bounds', () => {
		const bounds = [
			[-12, 21],
			[28, 33]
		] as BoundsPoints;

		const exp = [8, 27];

		const act = centerOfBounds(bounds);
		expect(act).toEqual(exp);
	});
});

describe('scaleBounds', () => {
	const bounds = [
		[0, 0],
		[10, 10]
	] as BoundsPoints;

	test('adjust width only', () => {
		const exp = [
			[-5, 0],
			[15, 10]
		];

		const act = scaleBounds(bounds, { x: 2 });
		expect(act).toEqual(exp);
	});

	test('adjust height only', () => {
		const exp = [
			[0, -5],
			[10, 15]
		] as BoundsPoints;

		const act = scaleBounds(bounds, { y: 2 });
		expect(act).toEqual(exp);
	});

	test('quadruple size', () => {
		const exp = [
			[-15, -15],
			[25, 25]
		] as BoundsPoints;

		const act = scaleBounds(bounds, { x: 4, y: 4 });
		expect(act).toEqual(exp);
	});

	test('half size', () => {
		const exp = [
			[2.5, 2.5],
			[7.5, 7.5]
		] as BoundsPoints;

		const act = scaleBounds(bounds, { x: 0.5, y: 0.5 });
		expect(act).toEqual(exp);
	});
});
