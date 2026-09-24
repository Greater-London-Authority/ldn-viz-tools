import geojsonRbush from '@turf/geojson-rbush';
import type { Point } from 'geojson';
/*
This uses a heuristic that iteratively identifies markers that overlap other markers, and simultaneously moves all such makers away from the markers that they overlap with.

Each marker is treated as a circle with its own radius; two markers overlap if the distance between their centres is no more than the sum of their radii.
On each iteration, a marker moves just far enough to separate it from the markers it overlaps, up to a maximum step size that is proportional to its own radius.

A naive implementation of this heuristic would consider interactions between all possible pairs of markers; to be efficient an implementation must avoid as many unnecessary comparisons as possible.

We exploit the observation that after calculating the distance between a pair of points, we can determine the earliest iteration on which they could possibly overlap, and avoid re-computing their distance until then.

 */

/** A marker to be repositioned. `radius` is in the same units as `x` and `y`. */
export type RepositionNode = {
	id: string | number;
	x: number;
	y: number;
	radius: number;
	hasMoved?: boolean;
	[key: string]: any;
};

const NUM_ITERATIONS = 40;

// the maximum distance a marker moves on each iteration
const stepSizeOf = (point: RepositionNode) => point.radius / 2;

// markers are moved slightly further than needed to just touch (as a fraction of their radius),
// so that floating point error does not leave them overlapping
const OVERLAP_MARGIN = 0.01;

// treats markers as circles
const circlesAreTouching = (a: RepositionNode, b: RepositionNode) => {
	return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) <= Math.pow(a.radius + b.radius, 2);
};

const jitterPositions = (data: RepositionNode[]) => {
	// deal with exactly coincident positions
	let positions = new Set();
	for (let datum of data) {
		let pos = `${datum.x}_${datum.y}`;
		if (positions.has(pos)) {
			datum.x += Math.random() * 0.0000001;
			datum.y += Math.random() * 0.0000001;
		} else {
			positions.add(pos);
		}
	}
};

/**
 * Adds `p` to the list of neighbours that `point` currently overlaps, or to the list of those it
 * might overlap on a future iteration (if that is within the remaining number of iterations).
 */
const classifyNeighbour = (
	point: RepositionNode,
	p: RepositionNode,
	overlappingNeighbours: { [x: string]: RepositionNode[] },
	possiblyFutureOverlappingNeighbours: { [x: string]: RepositionNode[][] },
	numIterationsRemaining: number
) => {
	const distance = Math.sqrt(Math.pow(point.x - p.x, 2) + Math.pow(point.y - p.y, 2));
	const minDistance = point.radius + p.radius;

	if (distance <= minDistance) {
		// points are overlapping
		overlappingNeighbours[point.id].push(p);
	} else {
		// the gap between the two can close by at most the sum of their step sizes per iteration
		let earliest = Math.ceil((distance - minDistance) / (stepSizeOf(point) + stepSizeOf(p)));
		if (earliest < numIterationsRemaining) {
			possiblyFutureOverlappingNeighbours[point.id][earliest - 1].push(p);
		}
	}
};

const initializeOverlaps = (
	data: RepositionNode[],
	overlappingNeighbours: { [x: string]: RepositionNode[] },
	possiblyFutureOverlappingNeighbours: { [x: string]: RepositionNode[][] },
	numIterations: number
) => {
	const tree = geojsonRbush<Point, { id: string | number; originalObj: RepositionNode }>();

	tree.load(
		data.map((d) => ({
			type: 'Feature' as const,
			properties: { id: d.id, originalObj: d },
			geometry: { type: 'Point' as const, coordinates: [d.x, d.y] }
		}))
	);

	const maxRadius = Math.max(0, ...data.map((d) => d.radius));

	for (const point of data) {
		// Indexed points are centres with no footprint, so the query box must reach far enough to
		// include the centre of the largest possible neighbour that could touch this point, after
		// both have moved towards each other on every iteration.
		const margin = point.radius + maxRadius + numIterations * (stepSizeOf(point) + maxRadius / 2);

		// N.B. could instead store just a list of ids here
		const pp = tree
			.search([point.x - margin, point.y - margin, point.x + margin, point.y + margin])
			.features.filter((f) => f.properties.id !== point.id)
			.map((f) => f.properties.originalObj);

		overlappingNeighbours[point.id] = [];
		possiblyFutureOverlappingNeighbours[point.id] = [];
		for (let i = 0; i < numIterations; i++) {
			possiblyFutureOverlappingNeighbours[point.id][i] = [];
		}

		for (const p of pp) {
			classifyNeighbour(
				point,
				p,
				overlappingNeighbours,
				possiblyFutureOverlappingNeighbours,
				numIterations
			);
		}
	}
};

const computeNewPosition = (
	data: RepositionNode[],
	overlappingNeighbours: { [x: string]: RepositionNode[] }
) => {
	// based on current overlaps, computes new position
	let numOverlaps = 0;
	for (const point of data) {
		let vectorSum = [0, 0];

		const overlappingPoints = overlappingNeighbours[point.id];
		if (overlappingPoints.length > 0) {
			numOverlaps += 1;
		}

		// Each of an overlapping pair moves directly away from the other by a share of the overlap
		// proportional to its radius (plus a small margin), which is just enough to separate them
		// if neither moves elsewhere.
		for (let overlappingPoint of overlappingPoints) {
			const dx = point.x - overlappingPoint.x;
			const dy = point.y - overlappingPoint.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			if (distance === 0) continue;

			const minDistance = point.radius + overlappingPoint.radius;
			const share = point.radius / minDistance;
			const push = share * (minDistance - distance) + OVERLAP_MARGIN * point.radius;
			vectorSum[0] += (push * dx) / distance;
			vectorSum[1] += (push * dy) / distance;
		}

		const length = Math.sqrt(Math.pow(vectorSum[0], 2) + Math.pow(vectorSum[1], 2));
		if (length > 0) {
			// Never move further than the step size, as the pruning of neighbours relies on it
			const scale = Math.min(1, stepSizeOf(point) / length);
			point.newX = point.x + scale * vectorSum[0];
			point.newY = point.y + scale * vectorSum[1];
			point.overlapping = true;
			point.hasMoved = true;
		} else {
			point.newX = point.x;
			point.newY = point.y;
			point.overlapping = false;
		}
	}
	return numOverlaps;
};

const updateOverlaps = (
	data: RepositionNode[],
	overlappingNeighbours: { [x: string]: RepositionNode[] },
	possiblyFutureOverlappingNeighbours: { [x: string]: RepositionNode[][] },
	numIterationsRemaining: number
) => {
	// Update the overlappingNeighbours and possiblyFutureOverlappingNeighbours arrays after positions have changed

	for (const point of data) {
		const potentiallyOverlappingNow = [
			...overlappingNeighbours[point.id],
			...(possiblyFutureOverlappingNeighbours[point.id].shift() ?? [])
		];

		overlappingNeighbours[point.id] = [];

		for (const p of potentiallyOverlappingNow) {
			classifyNeighbour(
				point,
				p,
				overlappingNeighbours,
				possiblyFutureOverlappingNeighbours,
				numIterationsRemaining
			);
		}
	}
};

const applyNewPositions = (data: RepositionNode[]) => {
	for (const point of data) {
		point.x = point.newX;
		point.y = point.newY;
	}
};

/**
 * Moves markers apart so that they do not overlap. Mutates the nodes it is given: `x` and `y` are
 * updated, and `hasMoved` is set to `true` on any node that has moved.
 *
 * @param data markers, each with a position and a `radius` (in the same units as the position)
 */
export const reposition = (data: RepositionNode[]) => {
	const numIterations = NUM_ITERATIONS;

	let numOverlaps;

	let i = 0;

	let overlappingNeighbours: { [x: string]: RepositionNode[] } = {};
	let possiblyFutureOverlappingNeighbours: { [x: string]: RepositionNode[][] } = {};

	jitterPositions(data);
	initializeOverlaps(
		data,
		overlappingNeighbours,
		possiblyFutureOverlappingNeighbours,
		numIterations
	);
	numOverlaps = computeNewPosition(data, overlappingNeighbours);
	applyNewPositions(data);

	while (numOverlaps && i < numIterations) {
		const numIterationsRemaining = numIterations - i;

		updateOverlaps(
			data,
			overlappingNeighbours,
			possiblyFutureOverlappingNeighbours,
			numIterationsRemaining
		);
		numOverlaps = computeNewPosition(data, overlappingNeighbours);
		applyNewPositions(data);

		i += 1;
	}

	// final check for debugging
	for (const point of data) {
		point.overlapping = false;
		for (let p of overlappingNeighbours[point.id]) {
			if (circlesAreTouching(point, p)) {
				point.overlapping = true;
			}
		}
	}
};
