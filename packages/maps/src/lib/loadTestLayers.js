import tokens from '@ldn-viz/themes/styles/js/mode-tokens';
import testData from './testData.json';

export const theme = (mode = 'light') => {
	return tokens.theme[mode];
};

export default (map) => {
	const sourceId = 'gla/ldn-viz-tools/test-data';

	map.addSource(sourceId, {
		type: 'geojson',
		data: testData,
		generateId: true
	});

	map.addLayer({
		id: `${sourceId}/polygon`,
		source: sourceId,
		type: 'fill',
		filter: ['==', '$type', 'Polygon'],
		paint: {
			'fill-color': theme().color.palette.green['500'],
			'fill-outline-color': theme().color.palette.green['800'],
			'fill-opacity': 0.6
		}
	});

	map.addLayer({
		id: `${sourceId}/line`,
		source: sourceId,
		type: 'line',
		filter: ['==', '$type', 'LineString'],
		paint: {
			'line-color': theme().color.palette.darkpink['400'],
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
			'circle-color': theme().color.palette.blue['700'],
			'circle-radius': 6,
			'circle-stroke-width': 1,
			'circle-stroke-color': '#000'
		}
	});
};
