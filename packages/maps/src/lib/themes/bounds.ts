export type Point = [number, number];
export type BoundsPoints = [Point, Point];
export type BoundsArray = [number, number, number, number];
export type ScaleFactor = { x?: number; y?: number };

export const centerOfBounds = (bounds: BoundsPoints) => {
	const midpoint = (min: number, max: number) => max - (max - min) / 2;
	return [midpoint(bounds[0][0], bounds[1][0]), midpoint(bounds[0][1], bounds[1][1])] as Point;
};

// scaleBounds returns a new bounds that scales the input bounds by the
// specified scaleFactor { x, y } using the center as the origin.
//
// Given the factors:
// - { x: 1.1, y: 1.1 } then both width and height will be 10% bigger;
// - { x: 0.5, y: 1 } then width will be 50% bigger and height left unchanged;
// - { x: 2, y: 0 } then width will be twice as big and height as zero;
// - etc.
export const scaleBounds = (bounds: BoundsPoints, scaleFactor: ScaleFactor = { x: 1, y: 1 }) => {
	const numberOrDefault = (n: number | undefined, elseDefault: number) => {
		return typeof n === 'number' ? n : elseDefault;
	};

	const center = centerOfBounds(bounds);
	const oldWidth = Math.abs(bounds[1][0] - bounds[0][0]);
	const oldHeight = Math.abs(bounds[1][1] - bounds[0][1]);

	const halfWidth = (numberOrDefault(scaleFactor.x, 1) * oldWidth) / 2;
	const halfHeight = (numberOrDefault(scaleFactor.y, 1) * oldHeight) / 2;

	return [
		[
			// Bottom left point
			center[0] - halfWidth,
			center[1] - halfHeight
		],
		[
			// Top right point
			center[0] + halfWidth,
			center[1] + halfHeight
		]
	] as BoundsPoints;
};

export const GREATER_LONDON_ZOOM = 11;
export const GREATER_LONDON_BOUNDS: BoundsPoints = [
	[-0.517, 51.278],
	[0.342, 51.698]
];
export const GREATER_LONDON_BOUNDS_PADDED = scaleBounds(GREATER_LONDON_BOUNDS, {
	x: 1.05,
	y: 1.05
});
export const GREATER_LONDON_BOUNDS_MAX = scaleBounds(
	GREATER_LONDON_BOUNDS,
	{ x: 2.5, y: 2.8 } // Tuned to fit both tall and wide devices
);
export const GREATER_LONDON_CENTER = centerOfBounds(GREATER_LONDON_BOUNDS);

export default {
	GREATER_LONDON_ZOOM,
	GREATER_LONDON_CENTER,
	GREATER_LONDON_BOUNDS,
	GREATER_LONDON_BOUNDS_PADDED,
	GREATER_LONDON_BOUNDS_MAX,
	centerOfBounds,
	scaleBounds
};
