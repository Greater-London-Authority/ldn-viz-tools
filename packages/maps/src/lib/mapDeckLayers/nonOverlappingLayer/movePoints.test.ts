import { describe, expect, test } from 'vitest';
import { reposition, type RepositionNode } from './movePoints';

// Seeded pseudo-random number generator (mulberry32), so that random layouts are reproducible
const makeRandom = (seed: number) => () => {
	seed |= 0;
	seed = (seed + 0x6d2b79f5) | 0;
	let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
	t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const randomLayout = (
	seed: number,
	count: number,
	size: number,
	radiusOf: (i: number) => number
): RepositionNode[] => {
	const random = makeRandom(seed);
	return Array.from({ length: count }, (_, i) => ({
		id: i,
		x: random() * size,
		y: random() * size,
		radius: radiusOf(i)
	}));
};

/** Pairs of nodes whose circles overlap (allowing for floating point error). */
const overlappingPairs = (nodes: RepositionNode[]) => {
	const pairs: [RepositionNode, RepositionNode][] = [];
	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			const a = nodes[i];
			const b = nodes[j];
			if (Math.hypot(a.x - b.x, a.y - b.y) < a.radius + b.radius - 1e-9) {
				pairs.push([a, b]);
			}
		}
	}
	return pairs;
};

describe('reposition', () => {
	test('handles an empty array', () => {
		expect(() => reposition([])).not.toThrow();
	});

	test('does not move a single point', () => {
		const nodes: RepositionNode[] = [{ id: 0, x: 3, y: 4, radius: 10 }];
		reposition(nodes);

		expect(nodes[0]).toMatchObject({ x: 3, y: 4 });
		expect(nodes[0].hasMoved).toBeFalsy();
	});

	test('does not move points that do not overlap', () => {
		const nodes: RepositionNode[] = [
			{ id: 0, x: 0, y: 0, radius: 10 },
			{ id: 1, x: 25, y: 0, radius: 10 }
		];
		reposition(nodes);

		expect(nodes[0]).toMatchObject({ x: 0, y: 0 });
		expect(nodes[1]).toMatchObject({ x: 25, y: 0 });
		expect(nodes.some((n) => n.hasMoved)).toBe(false);
	});

	test('moves two overlapping points of equal size apart along the line between them', () => {
		const nodes: RepositionNode[] = [
			{ id: 0, x: 0, y: 0, radius: 10 },
			{ id: 1, x: 15, y: 0, radius: 10 }
		];
		reposition(nodes);

		// each moves by half the overlap (plus a small margin), after which they no longer overlap
		expect(nodes[0].x).toBeCloseTo(-2.6);
		expect(nodes[1].x).toBeCloseTo(17.6);
		expect(nodes[0].y).toBeCloseTo(0);
		expect(nodes[1].y).toBeCloseTo(0);
		expect(nodes.every((n) => n.hasMoved)).toBe(true);
		expect(overlappingPairs(nodes)).toHaveLength(0);
	});

	test('treats points that are exactly touching as overlapping', () => {
		const nodes: RepositionNode[] = [
			{ id: 0, x: 0, y: 0, radius: 10 },
			{ id: 1, x: 20, y: 0, radius: 10 }
		];
		reposition(nodes);

		expect(nodes.every((n) => n.hasMoved)).toBe(true);
	});

	test('moves points of different sizes by distances proportional to their radii', () => {
		const nodes: RepositionNode[] = [
			{ id: 0, x: 0, y: 0, radius: 4 },
			{ id: 1, x: 20, y: 0, radius: 20 }
		];
		reposition(nodes);

		expect(nodes[1].x - 20).toBeCloseTo(5 * -nodes[0].x);
		expect(overlappingPairs(nodes)).toHaveLength(0);
	});

	test('moves overlapping points only just far enough to separate them', () => {
		const nodes: RepositionNode[] = [
			{ id: 0, x: 0, y: 0, radius: 20 },
			{ id: 1, x: 39, y: 0, radius: 20 }
		];
		reposition(nodes);

		const gap = nodes[1].x - nodes[0].x - 40;
		expect(gap).toBeGreaterThan(0);
		expect(gap).toBeLessThan(1);
	});

	test('uses the sum of the individual radii to decide whether points overlap', () => {
		const nodes: RepositionNode[] = [
			// two small points, far enough apart for their own radii...
			{ id: 'a', x: 0, y: 0, radius: 5 },
			{ id: 'b', x: 15, y: 0, radius: 5 },
			// ...but close enough that they would overlap if they were as large as this one
			{ id: 'big', x: 1000, y: 1000, radius: 50 },
			// a small point that overlaps the large one, but not another small point at that distance
			{ id: 'c', x: 1040, y: 1000, radius: 5 }
		];
		reposition(nodes);

		const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
		expect(byId.a.hasMoved).toBeFalsy();
		expect(byId.b.hasMoved).toBeFalsy();
		expect(byId.big.hasMoved).toBe(true);
		expect(byId.c.hasMoved).toBe(true);
		expect(overlappingPairs(nodes)).toHaveLength(0);
	});

	test('separates points at exactly the same position', () => {
		const nodes: RepositionNode[] = [
			{ id: 0, x: 50, y: 50, radius: 10 },
			{ id: 1, x: 50, y: 50, radius: 10 },
			{ id: 2, x: 50, y: 50, radius: 10 }
		];
		reposition(nodes);

		expect(overlappingPairs(nodes)).toHaveLength(0);
	});

	test('does not change the radius or id of any point', () => {
		const nodes = randomLayout(1, 50, 100, (i) => 2 + (i % 7));
		const before = nodes.map(({ id, radius }) => ({ id, radius }));
		reposition(nodes);

		expect(nodes.map(({ id, radius }) => ({ id, radius }))).toEqual(before);
	});

	test('sets overlapping to false on every point once no overlaps remain', () => {
		const nodes = randomLayout(2, 100, 500, () => 10);
		reposition(nodes);

		expect(nodes.every((n) => n.overlapping === false)).toBe(true);
	});

	describe.each([
		{ name: 'equal sizes', radiusOf: () => 10 },
		{ name: 'two sizes', radiusOf: (i: number) => (i % 5 === 0 ? 20 : 5) },
		{ name: 'a range of sizes', radiusOf: (i: number) => 3 + ((i * 7) % 18) }
	])('with a random layout of $name', ({ radiusOf }) => {
		test.each([1, 2, 3, 4, 5])('removes every overlap (seed %i)', (seed) => {
			const nodes = randomLayout(seed, 300, 700, radiusOf);
			expect(overlappingPairs(nodes).length).toBeGreaterThan(0);

			reposition(nodes);

			expect(overlappingPairs(nodes)).toHaveLength(0);
		});

		test('leaves points that have not moved at their original position', () => {
			const nodes = randomLayout(6, 300, 700, radiusOf);
			const original = nodes.map(({ x, y }) => ({ x, y }));

			reposition(nodes);

			const unmoved = nodes.filter((n) => !n.hasMoved);
			expect(unmoved.length).toBeGreaterThan(0);
			for (const node of unmoved) {
				expect(node.x).toBe(original[node.id as number].x);
				expect(node.y).toBe(original[node.id as number].y);
			}
		});
	});
});
