import type { FeatureCollection } from 'geojson';
import uuid4 from 'uuid4';

export const fixImportedGeoJSON = (parsedJson: FeatureCollection) => {
	// modify features to please TerraDraw
	// see e.g. https://github.com/JamesLMilner/terra-draw/issues/177
	for (const feature of parsedJson.features) {
		if (!uuid4.valid(`${feature.id}`)) {
			feature.id = uuid4();
		}

		if (!feature.properties) {
			feature.properties = {};
		}
		if (!feature.properties.mode) {
			feature.properties.mode = 'polygon';
		}

		// if coordinates have too many decimal places, then terradraw won't render them correctly
		if (feature.geometry.type === 'Polygon') {
			// terradraw doesn't handle holes, so for a polygon the geometry will be array containing one element (the exterior ring)
			const coords = feature.geometry.coordinates[0];

			for (const i in coords) {
				coords[i] = [Math.round(coords[i][0] * 1e9) / 1e9, Math.round(coords[i][1] * 1e9) / 1e9];
			}
		}
	}
};
