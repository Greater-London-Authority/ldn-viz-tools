import tokens from '@ldn-viz/themes/styles/js/color-tokens';
import type { Map } from 'maplibre-gl';
import testData from './testData.json';

export const theme = (mode: keyof typeof tokens.mode = 'light') => {
	return tokens.mode[mode];
};

export default (map: Map) => {
	const sourceId = 'gla/ldn-viz-tools/test-data';

	map.addSource(sourceId, {
		type: 'geojson',
		data: testData as any,
		generateId: true
	});

	map.addLayer({
		id: `${sourceId}/polygon`,
		source: sourceId,
		type: 'fill',
		filter: ['==', '$type', 'Polygon'],
		paint: {
			'fill-color': theme().palette.green['500'],
			'fill-outline-color': theme().palette.green['800'],
			'fill-opacity': 0.6
		}
	});

	map.addLayer({
		id: `${sourceId}/line`,
		source: sourceId,
		type: 'line',
		filter: ['==', '$type', 'LineString'],
		paint: {
			'line-color': theme().palette.darkpink['400'],
			'line-width': 4,
			'line-opacity': 0.8
		},
		layout: {
			'line-join': 'round',
			'line-cap': 'round'
		}
	});

	map.addLayer({
		id: `${sourceId}/point`,
		source: sourceId,
		type: 'circle',
		filter: ['==', '$type', 'Point'],
		paint: {
			'circle-color': theme().palette.blue['700'],
			'circle-radius': 6,
			'circle-stroke-width': 1,
			'circle-stroke-color': '#000'
		}
	});
};
