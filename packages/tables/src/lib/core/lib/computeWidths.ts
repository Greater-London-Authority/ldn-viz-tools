import { sum } from 'd3-array';

// TODO: call when grouping changes

const parseWidth = (width: number | string) => {
	if (typeof width === 'number') {
		return width;
	} else {
		return +width.replace('px', '').trim();
	}
};

export const computeWidths = (table: any, width: number) => {
	let availableWidth = width;

	// subtract gaps
	const gapWidth = table.gapWidth || 0;
	const numColGroups = (table.colGroups || []).length;
	const totalGapWidth = gapWidth * numColGroups;

	availableWidth -= totalGapWidth;

	// subtract space for group controls
	availableWidth -= (table.colGroups || []).length * (table.colGroupGap ?? 0);

	// subtract fixed widths
	const absoluteWidths = table.columnSpec
		.filter((c: any) => c.width !== undefined)
		.map((d: any) => parseWidth(d.width)); // TODO: remove 'px' if necessary?
	availableWidth -= sum(absoluteWidths);

	// determine scale factor
	const relativeWidths = table.columnSpec
		.filter((c: any) => c.width === undefined)
		.map((c: any) => c.relativeWidth || 1)
		.filter((d: any) => d);
	const totalRelWidth = sum(relativeWidths);

	// set widths
	for (const col of table.columnSpec) {
		if (col.width) {
			col.computedWidth = parseWidth(col.width);
		} else {
			const relativeWidth = col.relativeWidth ?? 1;
			col.computedWidth = Math.floor(availableWidth * (relativeWidth / totalRelWidth));
		}
	}
};
