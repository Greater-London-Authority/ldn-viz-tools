import { describe, test, expect, vi } from 'vitest';
import { fixImportedGeoJSON } from './utils';
import type { FeatureCollection, Geometry, Polygon } from 'geojson';

const geometry = {
	type: 'Polygon',
	coordinates: [
		[
			[0, 0],
			[1, 0],
			[1, 1],
			[0, 1],
			[0, 0]
		]
	]
} as Geometry;

describe('fixImportedGeoJSON', () => {
	describe('UUID handling', () => {
		test('preserves valid UUID4 IDs', () => {
			const validUUID = '550e8400-e29b-41d4-a716-446655440000';
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: validUUID,
						geometry,
						properties: {}
					}
				]
			};

			fixImportedGeoJSON(geojson);
			expect(geojson.features[0].id).toBe(validUUID);
		});

		test('generates new UUID for invalid ID', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: 'invalid-id-123',
						geometry,
						properties: {}
					}
				]
			};

			fixImportedGeoJSON(geojson);

			// Should have a new UUID (different from original)
			expect(geojson.features[0].id).not.toBe('invalid-id-123');

			// Should be a string (UUID format)
			expect(typeof geojson.features[0].id).toBe('string');

			// Should match UUID pattern
			expect(geojson.features[0].id).toMatch(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
			);
		});

		test('generates UUID when ID is missing', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry,
						properties: {}
					}
				]
			};

			fixImportedGeoJSON(geojson);

			expect(geojson.features[0].id).toBeDefined();
			expect(typeof geojson.features[0].id).toBe('string');
		});

		test('handles numeric IDs by generating new UUID', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: 12345,
						geometry,
						properties: {}
					}
				]
			};

			fixImportedGeoJSON(geojson);

			// Numeric IDs might not be valid UUIDs, should get replaced
			expect(typeof geojson.features[0].id).toBe('string');

						expect(geojson.features[0].id).toMatch(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
			);
		});
	});

	describe('Properties handling', () => {
		test('creates properties object (with mode) if missing', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: '550e8400-e29b-41d4-a716-446655440000',
						geometry,
						properties: null
					}
				]
			};

			fixImportedGeoJSON(geojson);

			expect(geojson.features[0].properties).toBeDefined();
			expect(geojson.features[0].properties).toEqual({ mode: 'polygon' });
		});

		test('preserves existing properties', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: '550e8400-e29b-41d4-a716-446655440000',
						geometry,
						properties: {
							name: 'Test Area',
							population: 1000
						}
					}
				]
			};

			fixImportedGeoJSON(geojson);

			expect(geojson.features[0].properties?.name).toBe('Test Area');
			expect(geojson.features[0].properties?.population).toBe(1000);
		});

		test('adds mode property if missing', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: '550e8400-e29b-41d4-a716-446655440000',
						geometry,
						properties: {
							name: 'Test Area'
						}
					}
				]
			};

			fixImportedGeoJSON(geojson);

			expect(geojson.features[0].properties?.mode).toBe('polygon');
		});

		test('preserves existing mode property', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: '550e8400-e29b-41d4-a716-446655440000',
						geometry,
						properties: {
							mode: 'circle'
						}
					}
				]
			};

			fixImportedGeoJSON(geojson);

			expect(geojson.features[0].properties?.mode).toBe('circle');
		});
	});

	describe('Coordinate rounding for Polygons', () => {
		test('rounds coordinates to 9 decimal places', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: '550e8400-e29b-41d4-a716-446655440000',
						geometry: {
							type: 'Polygon',
							coordinates: [
								[
									[1.123456789012345, 2.987654321098765],
									[3.111111111111111, 4.999999999999999],
									[5.123456789, 6.987654321],
									[1.123456789012345, 2.987654321098765]
								]
							]
						},
						properties: {}
					}
				]
			};

			fixImportedGeoJSON(geojson);

			const coords = (geojson.features[0].geometry as Polygon).coordinates[0];

			// Check first point
			expect(coords[0][0]).toBe(1.123456789);
			expect(coords[0][1]).toBe(2.987654321);

			// Check second point
			expect(coords[1][0]).toBe(3.111111111);
			expect(coords[1][1]).toBe(5); // 4.999999999999999 rounds to 5

			// Check third point (already 9 decimal places)
			expect(coords[2][0]).toBe(5.123456789);
			expect(coords[2][1]).toBe(6.987654321);
		});

		test('handles integer coordinates', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: '550e8400-e29b-41d4-a716-446655440000',
						geometry,
						properties: {}
					}
				]
			};

			fixImportedGeoJSON(geojson);

			const coords = (geojson.features[0].geometry as Polygon).coordinates[0];

			expect(coords[0]).toEqual([0, 0]);
			expect(coords[1]).toEqual([1, 0]);
			expect(coords[2]).toEqual([1, 1]);
			expect(coords[3]).toEqual([0, 1]);
			expect(coords[4]).toEqual([0, 0]);
		});

		test('handles negative coordinates', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: '550e8400-e29b-41d4-a716-446655440000',
						geometry: {
							type: 'Polygon',
							coordinates: [
								[
									[-1.123456789012345, -2.987654321098765],
									[-3.111111111111111, -4.555555555555555],
									[-1.123456789012345, -2.987654321098765]
								]
							]
						},
						properties: {}
					}
				]
			};

			fixImportedGeoJSON(geojson);

			const coords = (geojson.features[0].geometry as Polygon).coordinates[0];

			expect(coords[0][0]).toBe(-1.123456789);
			expect(coords[0][1]).toBe(-2.987654321);
			expect(coords[1][0]).toBe(-3.111111111);
			expect(coords[1][1]).toBe(-4.555555556);
		});

		test('modifies coordinates in place', () => {
			const coordinates = [
				[
					[1.123456789012345, 2.987654321098765],
					[3.5, 4.5],
					[1.123456789012345, 2.987654321098765]
				]
			];

			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: '550e8400-e29b-41d4-a716-446655440000',
						geometry: {
							type: 'Polygon',
							coordinates
						},
						properties: {}
					}
				]
			};

			fixImportedGeoJSON(geojson);

			// Should modify the original array
			expect(coordinates[0][0][0]).toBe(1.123456789);
			expect(coordinates[0][0][1]).toBe(2.987654321);
		});
	});

	// TODO: maybe this behaviour should be changed
	describe('Non-Polygon geometries', () => {
		test('does not modify Point geometries', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: 'invalid-id',
						geometry: {
							type: 'Point',
							coordinates: [1.123456789012345, 2.987654321098765]
						},
						properties: null
					}
				]
			};

			fixImportedGeoJSON(geojson);

			// Point coordinates should remain unchanged (no rounding)
			expect(geojson.features[0].geometry.coordinates).toEqual([
				1.123456789012345, 2.987654321098765
			]);

			// But UUID and properties should still be fixed
			expect(geojson.features[0].id).not.toBe('invalid-id');
			expect(geojson.features[0].properties).toBeDefined();
		});

		// TODO: maybe this behaviour should be changed
		test('does not modify LineString geometries', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: 'invalid-id',
						geometry: {
							type: 'LineString',
							coordinates: [
								[1.123456789012345, 2.987654321098765],
								[3.111111111111111, 4.555555555555555]
							]
						},
						properties: null
					}
				]
			};

			fixImportedGeoJSON(geojson);

			// LineString coordinates should remain unchanged (no rounding)
			expect(geojson.features[0].geometry.coordinates).toEqual([
				[1.123456789012345, 2.987654321098765],
				[3.111111111111111, 4.555555555555555]
			]);

			// But UUID and properties should still be fixed
			expect(geojson.features[0].id).not.toBe('invalid-id');
			expect(geojson.features[0].properties).toBeDefined();
		});
	});

	describe('Multiple features', () => {
		test('processes all features in collection', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: 'invalid-1',
						geometry,
						properties: null
					},
					{
						type: 'Feature',
						id: 'invalid-2',
						geometry: {
							type: 'Point',
							coordinates: [1, 2]
						},
						properties: null
					},
					{
						type: 'Feature',
						id: 'invalid-3',
						geometry: {
							type: 'Polygon',
							coordinates: [
								[
									[5, 5],
									[6, 5],
									[6, 6],
									[5, 5]
								]
							]
						},
						properties: null
					}
				]
			};

			fixImportedGeoJSON(geojson);

			// All features should have been processed
			expect(geojson.features[0].properties).toBeDefined();
			expect(geojson.features[1].properties).toBeDefined();
			expect(geojson.features[2].properties).toBeDefined();

			// All should have valid IDs
			expect(geojson.features[0].id).not.toBe('invalid-1');
			expect(geojson.features[1].id).not.toBe('invalid-2');
			expect(geojson.features[2].id).not.toBe('invalid-3');

			// All should have mode property
			expect(geojson.features[0].properties?.mode).toBe('polygon');
			expect(geojson.features[1].properties?.mode).toBe('polygon');
			expect(geojson.features[2].properties?.mode).toBe('polygon');
		});
	});

	describe('Edge cases', () => {
		test('handles empty features array', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: []
			};

			expect(() => fixImportedGeoJSON(geojson)).not.toThrow();
			expect(geojson.features).toEqual([]);
		});

		test('handles single feature', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry,
						properties: {}
					}
				]
			};

			fixImportedGeoJSON(geojson);

			expect(geojson.features).toHaveLength(1);
			expect(geojson.features[0].id).toBeDefined();
			expect(geojson.features[0].properties?.mode).toBe('polygon');
		});

		test('handles polygon with very small coordinate values', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: '550e8400-e29b-41d4-a716-446655440000',
						geometry: {
							type: 'Polygon',
							coordinates: [
								[
									[0.0000000001, 0.0000000002],
									[0.0000000003, 0.0000000004],
									[0.0000000001, 0.0000000002]
								]
							]
						},
						properties: {}
					}
				]
			};

			fixImportedGeoJSON(geojson);

			const coords = (geojson.features[0].geometry as Polygon).coordinates[0];

			// Values should be rounded to 9 decimal places
			expect(coords[0][0]).toBe(0);
			expect(coords[0][1]).toBe(0);
		});

		test('preserves zero coordinates', () => {
			const geojson: FeatureCollection = {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						id: '550e8400-e29b-41d4-a716-446655440000',
						geometry,
						properties: {}
					}
				]
			};

			fixImportedGeoJSON(geojson);

			const coords = (geojson.features[0].geometry as Polygon).coordinates[0];

			expect(coords[0]).toEqual([0, 0]);
			expect(coords[1]).toEqual([1, 0]);
		});
	});
});
