import geojsonRbush from '@turf/geojson-rbush';
import type { Point } from 'geojson';
/*
This uses a heuristic that iteratively identifies markers that overlap other markers, and simultaneously moves all such makers away from the markers that they overlap with.

A naive implementation of this heuristic would consider interactions between all possible pairs of markers; to be efficient an implementation must avoid as many unnecessary comparisons as possible.

We exploit the observation that after calculating the distance between a pair of points, we can determine the earliest iteration on which they could possibly overlap, and avoid re-computing their distance until then.

 */

// treats markers as circles
const circlesAreTouching = (
	a: { x: number; y: number },
	b: { x: number; y: number },
	diameter: number
) => {
	return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) <= Math.pow(diameter, 2);
};

const jitterPositions = (data: any) => {
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
const initializeOverlaps = (
	data: any[],
	overlappingNeighbours: { [x: string]: any[] },
	possiblyFutureOverlappingNeighbours: { [x: string]: any[][] },
	markerDiameter: number,
	numIterations: number,
	stepSize: number
) => {
	const tree = geojsonRbush<Point, { id: string; originalObj: any }>();

	tree.load(
		data.map((d) => ({
			type: 'Feature' as const,
			properties: { id: d.id, originalObj: d },
			geometry: { type: 'Point' as const, coordinates: [d.x, d.y] }
		}))
	);

	for (const point of data) {
		// Indexed points are centres with no footprint, so pad the query box by an extra
		// markerDiameter / 2 (on top of the usual markerDiameter + movement margin) to cover a
		// neighbour whose own marker footprint would otherwise reach into the search area.
		const margin = 1.5 * markerDiameter + numIterations * stepSize;

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
			const distance = Math.sqrt(Math.pow(point.x - p.x, 2) + Math.pow(point.y - p.y, 2));

			if (distance <= markerDiameter) {
				// points are already overlapping
				overlappingNeighbours[point.id].push(p);
			} else {
				let earliest = Math.ceil((distance - markerDiameter) / (2 * stepSize));
				if (earliest < numIterations) {
					possiblyFutureOverlappingNeighbours[point.id][earliest - 1].push(p);
				}
			}
		}
	}
};

const computeNewPosition = (
	data: any,
	overlappingNeighbours: { [x: string]: any },
	stepSize: number
) => {
	// based on current overlaps, computes new position
	let numOverlaps = 0;
	for (const point of data) {
		let vectorSum = [0, 0];

		const overlappingPoints = overlappingNeighbours[point.id];
		if (overlappingPoints.length > 0) {
			// console.log({point, overlappingPoints})
			numOverlaps += 1;
		}

		for (let overlappingPoint of overlappingPoints) {
			vectorSum[0] += point.x - overlappingPoint.x;
			vectorSum[1] += point.y - overlappingPoint.y;
		}

		const length = Math.sqrt(Math.pow(vectorSum[0], 2) + Math.pow(vectorSum[1], 2));
		if (length > 0) {
			point.newX = point.x + (stepSize * vectorSum[0]) / length;
			point.newY = point.y + (stepSize * vectorSum[1]) / length;
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
	data: any,
	overlappingNeighbours: { [x: string]: any[] },
	possiblyFutureOverlappingNeighbours: { [x: string]: any[][] },
	stepSize: number,
	markerDiameter: number,
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
			const distance = Math.sqrt(Math.pow(point.x - p.x, 2) + Math.pow(point.y - p.y, 2));

			if (distance <= markerDiameter) {
				// points are overlapping
				overlappingNeighbours[point.id].push(p);
			} else {
				let earliest = Math.ceil((distance - markerDiameter) / (2 * stepSize));
				if (earliest < numIterationsRemaining) {
					possiblyFutureOverlappingNeighbours[point.id][earliest - 1].push(p);
				}
			}
		}
	}
};

const applyNewPositions = (data: any) => {
	for (const point of data) {
		point.x = point.newX;
		point.y = point.newY;
	}
};

export const reposition = (data: any, PIXEL_PER_M: number, radiusScale: number) => {
	const numIterations = 30;
	const markerDiameter = radiusScale * 2 * PIXEL_PER_M; //0.5 * PIXEL_PER_M / 0.00813006137069526; // ?
	const stepSize = markerDiameter / 4; // 0.05 * PIXEL_PER_M / 0.00813006137069526;

	let numOverlaps;

	let i = 0;

	let overlappingNeighbours: { [x: string]: any[] } = {};
	let possiblyFutureOverlappingNeighbours: { [x: string]: any[][] } = {};

	jitterPositions(data);
	initializeOverlaps(
		data,
		overlappingNeighbours,
		possiblyFutureOverlappingNeighbours,
		markerDiameter,
		numIterations,
		stepSize
	);
	numOverlaps = computeNewPosition(data, overlappingNeighbours, stepSize);
	applyNewPositions(data);

	while (numOverlaps && i < numIterations) {
		const numIterationsRemaining = numIterations - i;

		updateOverlaps(
			data,
			overlappingNeighbours,
			possiblyFutureOverlappingNeighbours,
			stepSize,
			markerDiameter,
			numIterationsRemaining
		);
		numOverlaps = computeNewPosition(data, overlappingNeighbours, stepSize);
		applyNewPositions(data);

		i += 1;
	}

	// final check for debugging
	for (const point of data) {
		point.overlapping = false;
		for (let p of overlappingNeighbours[point.id]) {
			//  if (isIntersecting(bounds(point, size), bounds(p, size))) { // could keep bounds on objects updated hwne we move them...
			if (circlesAreTouching(point, p, markerDiameter)) {
				point.overlapping = true;
				//   break;
			}
		}
	}
};
