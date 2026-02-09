import { sum } from 'd3-array';
import type { ColGroup, ColSpec } from './types';

/**
 * Column spec with computed width added.
 */
export type ColSpecWithWidth = ColSpec & { computedWidth: number };

const parseWidth = (width: number | string): number => {
	if (typeof width === 'number') {
		return width;
	} else {
		return +width.replace('px', '').trim();
	}
};

/**
 * Computes column widths based on available space.
 * Returns a new array of column specs with computedWidth set.
 */
export const computeColumnWidths = (
	columns: ColSpec[],
	colGroups: ColGroup[],
	colGroupGap: number,
	totalWidth: number
): ColSpecWithWidth[] => {
	let availableWidth = totalWidth;

	// subtract gaps
	const numColGroups = (colGroups || []).length;
	const totalGapWidth = (colGroupGap ?? 0) * numColGroups;
	availableWidth -= totalGapWidth;

	// subtract space for group controls
	availableWidth -= (colGroups || []).length * (colGroupGap ?? 0);

	// subtract fixed widths
	const absoluteWidths = columns
		.filter((c) => c.width !== undefined)
		.map((c) => parseWidth(c.width!));
	availableWidth -= sum(absoluteWidths);

	// determine scale factor
	const relativeWidths = columns
		.filter((c) => c.width === undefined)
		.map((c) => c.relativeWidth || 1);
	const totalRelWidth = sum(relativeWidths);

	// compute widths for each column
	return columns.map((col) => {
		const computedWidth = col.width
			? parseWidth(col.width)
			: Math.floor(availableWidth * ((col.relativeWidth ?? 1) / totalRelWidth));

		return {
			...col,
			computedWidth
		};
	});
};
