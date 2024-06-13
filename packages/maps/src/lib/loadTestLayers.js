import colors from '@ldn-viz/themes/colors.json';
import testData from './testData.json';

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
			'fill-color': colors.core.green['500'],
			'fill-outline-color': colors.core.green['800'],
			'fill-opacity': 0.6
		}
	});

	map.addLayer({
		id: `${sourceId}/line`,
		source: sourceId,
		type: 'line',
		filter: ['==', '$type', 'LineString'],
		paint: {
			'line-color': colors.core.darkPink['400'],
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
			'circle-color': colors.core.blue['700'],
			'circle-radius': 6,
			'circle-stroke-width': 1,
			'circle-stroke-color': '#000'
		}
	});
};
