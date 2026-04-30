import { describe, it, expect } from 'vitest';
import { computeExtents, computeColumnExtent, computeExtentsForColumns } from './extents';
import type { DataRow } from './types';

describe('extents', () => {
	const sampleData: DataRow[] = [
		{ id: 1, value: 10, name: 'Alice', date: new Date('2024-01-01') },
		{ id: 2, value: 20, name: 'Bob', date: new Date('2024-06-15') },
		{ id: 3, value: 15, name: 'Charlie', date: new Date('2024-03-10') }
	];

	describe('computeColumnExtent', () => {
		it('computes numeric extent correctly', () => {
			const extent = computeColumnExtent(sampleData, 'value');
			expect(extent).toEqual([10, 20]);
		});

		it('computes string extent correctly', () => {
			const extent = computeColumnExtent(sampleData, 'name');
			expect(extent).toEqual(['Alice', 'Charlie']);
		});

		it('returns undefined extent for empty data', () => {
			const extent = computeColumnExtent([], 'value');
			expect(extent).toEqual([undefined, undefined]);
		});

		it('handles null values', () => {
			const dataWithNulls: DataRow[] = [{ value: 10 }, { value: null }, { value: 30 }];
			const extent = computeColumnExtent(dataWithNulls, 'value');
			expect(extent).toEqual([10, 30]);
		});
	});

	describe('computeExtents', () => {
		it('computes extents for all columns', () => {
			const extents = computeExtents(sampleData);
			expect(extents.get('id')).toEqual([1, 3]);
			expect(extents.get('value')).toEqual([10, 20]);
			expect(extents.get('name')).toEqual(['Alice', 'Charlie']);
		});

		it('returns empty map for empty data', () => {
			const extents = computeExtents([]);
			expect(extents.size).toBe(0);
		});
	});

	describe('computeExtentsForColumns', () => {
		it('computes extents only for specified columns', () => {
			const extents = computeExtentsForColumns(sampleData, ['value', 'name']);
			expect(extents.size).toBe(2);
			expect(extents.has('id')).toBe(false);
			expect(extents.get('value')).toEqual([10, 20]);
		});
	});
});
