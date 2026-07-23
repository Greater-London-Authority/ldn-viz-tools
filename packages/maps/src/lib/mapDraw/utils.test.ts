import { describe, test, expect } from 'vitest';
import uuid4 from 'uuid4';
import type { FeatureCollection } from 'geojson';
import { fixImportedGeoJSON } from './utils';

const featureCollection = (features: FeatureCollection['features']): FeatureCollection => ({
	type: 'FeatureCollection',
	features
});

describe('fixImportedGeoJSON', () => {
	test('assigns a new valid UUID when a feature has no id', () => {
		const fc = featureCollection([
			{ type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] }, properties: {} }
		]);

		fixImportedGeoJSON(fc);

		expect(uuid4.valid(`${fc.features[0].id}`)).toEqual(true);
	});

	test('assigns a new id when the existing id is not a valid UUID, but leaves a valid one untouched', () => {
		const fcInvalid = featureCollection([
			{
				id: 'not-a-uuid',
				type: 'Feature',
				geometry: { type: 'Point', coordinates: [0, 0] },
				properties: {}
			}
		]);
		fixImportedGeoJSON(fcInvalid);
		expect(fcInvalid.features[0].id).not.toEqual('not-a-uuid');
		expect(uuid4.valid(`${fcInvalid.features[0].id}`)).toEqual(true);

		const validId = uuid4();
		const fcValid = featureCollection([
			{
				id: validId,
				type: 'Feature',
				geometry: { type: 'Point', coordinates: [0, 0] },
				properties: {}
			}
		]);
		fixImportedGeoJSON(fcValid);
		expect(fcValid.features[0].id).toEqual(validId);
	});

	test('creates an empty properties object when a feature has none', () => {
		const fc = featureCollection([
			{
				type: 'Feature',
				geometry: { type: 'Point', coordinates: [0, 0] },
				properties: null as unknown as GeoJSON.GeoJsonProperties
			}
		]);

		fixImportedGeoJSON(fc);

		expect(fc.features[0].properties).toEqual({ mode: 'polygon' });
	});

	test('defaults properties.mode to polygon only when not already set', () => {
		const fcNoMode = featureCollection([
			{ type: 'Feature', geometry: { type: 'Point', coordinates: [0, 0] }, properties: {} }
		]);
		fixImportedGeoJSON(fcNoMode);
		expect(fcNoMode.features[0].properties?.mode).toEqual('polygon');

		const fcWithMode = featureCollection([
			{
				type: 'Feature',
				geometry: { type: 'Point', coordinates: [0, 0] },
				properties: { mode: 'line' }
			}
		]);
		fixImportedGeoJSON(fcWithMode);
		expect(fcWithMode.features[0].properties?.mode).toEqual('line');
	});

	test('rounds Polygon exterior-ring coordinates to 9 decimal places', () => {
		const fc = featureCollection([
			{
				type: 'Feature',
				geometry: {
					type: 'Polygon',
					coordinates: [
						[
							[0.12345678901234, 1.98765432109876],
							[2, 2],
							[0.12345678901234, 1.98765432109876]
						]
					]
				},
				properties: {}
			}
		]);

		fixImportedGeoJSON(fc);

		const geometry = fc.features[0].geometry as GeoJSON.Polygon;
		expect(geometry.coordinates[0][0]).toEqual([0.123456789, 1.987654321]);
	});

	test('leaves coordinates untouched for non-Polygon geometries', () => {
		const fc = featureCollection([
			{
				type: 'Feature',
				geometry: { type: 'Point', coordinates: [0.123456789012, 1.987654321098] },
				properties: {}
			},
			{
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: [
						[0.123456789012, 1.987654321098],
						[2, 2]
					]
				},
				properties: {}
			}
		]);

		fixImportedGeoJSON(fc);

		expect((fc.features[0].geometry as GeoJSON.Point).coordinates).toEqual([
			0.123456789012, 1.987654321098
		]);
		expect((fc.features[1].geometry as GeoJSON.LineString).coordinates[0]).toEqual([
			0.123456789012, 1.987654321098
		]);
	});
});
