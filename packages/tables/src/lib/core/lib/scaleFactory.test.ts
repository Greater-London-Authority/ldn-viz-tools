import { describe, it, expect } from 'vitest';
import {
	createCategoricalColorScale,
	createContinuousColorScale,
	createColorScales,
	createPositionScales
} from './scaleFactory';
import type { ColSpec, DataRow } from './types';

describe('scaleFactory', () => {
	describe('createCategoricalColorScale', () => {
		it('creates scale for unique values', () => {
			const scale = createCategoricalColorScale(['A', 'B', 'C']);
			const colorA = scale('A');
			const colorB = scale('B');

			expect(colorA).toBeDefined();
			expect(colorB).toBeDefined();
			expect(colorA).not.toBe(colorB);
		});

		it('returns consistent colors for same values', () => {
			const scale = createCategoricalColorScale(['A', 'B']);
			expect(scale('A')).toBe(scale('A'));
		});
	});

	describe('createContinuousColorScale', () => {
		it('creates scale for numeric values with MinToMax', () => {
			const scale = createContinuousColorScale('MinToMax', [0, 50, 100]);

			const colorLow = scale(10);
			const colorHigh = scale(90);

			expect(colorLow).toBeDefined();
			expect(colorHigh).toBeDefined();
		});

		it('creates scale for numeric values with ZeroToMax', () => {
			const scale = createContinuousColorScale('ZeroToMax', [10, 50, 100]);
			const colorZero = scale(0);
			expect(colorZero).toBeDefined();
		});

		it('creates scale with custom domain', () => {
			const scale = createContinuousColorScale([0, 200], [50, 100, 150]);
			expect(scale(100)).toBeDefined();
		});
	});

	describe('createColorScales', () => {
		const data: DataRow[] = [
			{ name: 'Alice', score: 85 },
			{ name: 'Bob', score: 92 },
			{ name: 'Charlie', score: 78 }
		];

		const columns: ColSpec[] = [
			{ label: 'Name', short_label: 'name' },
			{ label: 'Score', short_label: 'score', type: 'number' }
		];

		it('creates scales for all columns', () => {
			const scales = createColorScales(data, columns);

			expect(scales.has('name')).toBe(true);
			expect(scales.has('score')).toBe(true);
		});

		it('creates categorical scale for string columns', () => {
			const scales = createColorScales(data, columns);
			const nameScale = scales.get('name')!;

			expect(nameScale('Alice')).toBeDefined();
			expect(nameScale('Bob')).toBeDefined();
		});

		it('creates continuous scale for numeric columns', () => {
			const scales = createColorScales(data, columns);
			const scoreScale = scales.get('score')!;

			expect(scoreScale(85)).toBeDefined();
		});

		it('handles null values gracefully', () => {
			const scales = createColorScales(data, columns);
			const scoreScale = scales.get('score')!;

			expect(scoreScale(null)).toBe('lightgrey');
			expect(scoreScale(undefined)).toBe('lightgrey');
		});

		it('returns empty map for empty data', () => {
			const scales = createColorScales([], columns);
			expect(scales.size).toBe(0);
		});
	});

	describe('createPositionScales', () => {
		const data: DataRow[] = [
			{ category: 'A', value: 10 },
			{ category: 'B', value: 20 },
			{ category: 'C', value: 30 }
		];

		const columns: ColSpec[] = [
			{ label: 'Category', short_label: 'category', type: 'categorical' },
			{ label: 'Value', short_label: 'value', type: 'number' }
		];

		it('creates position scales only for categorical columns', () => {
			const scales = createPositionScales(data, columns);

			expect(scales.has('category')).toBe(true);
			expect(scales.has('value')).toBe(false);
		});

		it('creates band scale with correct domain', () => {
			const scales = createPositionScales(data, columns);
			const catScale = scales.get('category')!;

			expect(catScale.domain()).toEqual(['A', 'B', 'C']);
		});

		it('maps values to positions in [0, 1] range', () => {
			const scales = createPositionScales(data, columns);
			const catScale = scales.get('category')!;

			const posA = catScale('A')!;
			const posC = catScale('C')!;

			expect(posA).toBeGreaterThanOrEqual(0);
			expect(posC).toBeLessThanOrEqual(1);
		});
	});
});
