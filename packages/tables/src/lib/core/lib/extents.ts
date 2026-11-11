import { extent } from 'd3-array';
import type { DataRow, Extent, ExtentMap } from './types';

/**
 * Computes the extent for a single column of data
 */
export function computeColumnExtent(data: DataRow[], columnName: string): Extent {
	const values = data.map((d) => d[columnName]).filter((v) => v != null);

	if (values.length === 0) {
		return [undefined, undefined];
	}

	const firstValue = values[0];

	if (typeof firstValue === 'number') {
		return extent(values as number[]) as [number, number];
	}

	if (firstValue instanceof Date) {
		return extent(values as Date[]) as [Date, Date];
	}

	if (typeof firstValue === 'string') {
		const sorted = [...(values as string[])].sort();
		return [sorted[0], sorted[sorted.length - 1]];
	}

	return [undefined, undefined];
}

/**
 * Computes extents for all columns in the data
 *
 * @param data - Array of data rows
 * @returns Map of column name to extent
 */
export function computeExtents(data: DataRow[]): ExtentMap {
	const extents = new Map<string, Extent>();

	if (!data || data.length === 0) {
		return extents;
	}

	// Get all column names from the first row
	const columnNames = Object.keys(data[0]);

	for (const columnName of columnNames) {
		extents.set(columnName, computeColumnExtent(data, columnName));
	}

	return extents;
}

/**
 * Computes extents only for specified columns
 *
 * @param data - Array of data rows
 * @param columnNames - List of column names to compute extents for
 * @returns Map of column name to extent
 */
export function computeExtentsForColumns(data: DataRow[], columnNames: string[]): ExtentMap {
	const extents = new Map<string, Extent>();

	if (!data || data.length === 0) {
		return extents;
	}

	for (const columnName of columnNames) {
		extents.set(columnName, computeColumnExtent(data, columnName));
	}

	return extents;
}
