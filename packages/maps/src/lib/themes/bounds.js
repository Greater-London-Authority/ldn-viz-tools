export const centerOfBounds = (bounds) => {
	const midpoint = (min, max) => max - (max - min) / 2;
	return [midpoint(bounds[0][0], bounds[1][0]), midpoint(bounds[0][1], bounds[1][1])];
};

// scaleBounds returns a new bounds that scales the input bounds up by the
// specified amount { x, y } with the center as the origin.
//
// Given the amounts:
// - { x: 0.1, y: 0.1 } then both width and height will be 10% bigger;
// - { x: 0.5, y: 1 } then width will be 50% bigger and height 100% bigger;
// - { x: 2, y: 0 } then width will be 200% bigger and height left unchanged;
// - etc.
export const scaleBounds = (bounds, amount = { x: 0, y: 0 }) => {
	const width = bounds[0][0] - bounds[1][0];
	const height = bounds[0][1] - bounds[1][1];

	const widthMul = (amount.x || 0) / 2;
	const heightMul = (amount.y || 0) / 2;

	return [
		[
			// Bottom left point
			bounds[0][0] - Math.abs(width * widthMul),
			bounds[0][1] - Math.abs(height * heightMul)
		],
		[
			// Top right point
			bounds[1][0] + Math.abs(width * widthMul),
			bounds[1][1] + Math.abs(height * heightMul)
		]
	];
};

export const GREATER_LONDON_ZOOM = 11;
export const GREATER_LONDON_BOUNDS = [
	[-0.517, 51.278],
	[0.342, 51.698]
];
export const GREATER_LONDON_BOUNDS_MAX = scaleBounds(
	GREATER_LONDON_BOUNDS,
	{ x: 2.5, y: 2.1 } // Tuned to fit both tall and wide devices
);
export const GREATER_LONDON_CENTER = centerOfBounds(GREATER_LONDON_BOUNDS);

export default {
	GREATER_LONDON_ZOOM,
	GREATER_LONDON_CENTER,
	GREATER_LONDON_BOUNDS,
	GREATER_LONDON_BOUNDS_MAX,
	centerOfBounds,
	scaleBounds
};
