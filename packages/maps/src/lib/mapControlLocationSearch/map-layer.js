import { GLIDE_ANIMATION_OPTIONS } from '@ldn-viz/maps';

let marker = null;
const sourceId = 'gla/context/location-search';

const sourceSpec = {
	type: 'geojson',
	data: {
		type: 'FeatureCollection',
		features: []
	}
};

const layerSpecs = [
	{
		id: `${sourceId}/map-point-symbol`,
		source: sourceId,
		type: 'symbol',
		layout: {
			'icon-image': 'map-pin',
			'icon-size': 0.4
		}
	}
	/*
	{
		id: `${sourceId}/bounds`,
		source: sourceId,
		type: 'line',
		paint: {
			'line-color': '#000',
			'line-width': 10
		}
	}
	*/
];

export const initMapLayer = (map) => {
	if (!map) {
		return;
	}

	removeLayers(map);
	addLayers(map);
};

const removeLayers = (map) => {
	for (const layer of layerSpecs) {
		if (map.getLayer(layer.id)) {
			map.removeLayer(layer.id);
		}
	}

	if (map.getSource(sourceId)) {
		map.removeSource(sourceId);
	}
};

const addLayers = (map) => {
	map.addSource(sourceId, sourceSpec);

	for (const layer of layerSpecs) {
		map.addLayer(layer);
	}
};

export const setFeature = (map, mapgl, location, flyOptions = {}) => {
	if (!map) {
		return;
	}

	map //
		.getSource(sourceId) //
		.setData(createFeatureCollection(location));

	addMarkerAndFlyToLocation(map, mapgl, location, flyOptions);
};

const addMarkerAndFlyToLocation = (map, mapgl, location, flyOptions) => {
	setMarker(map, mapgl, location.center);

	if (location.bounds) {
		flyToBounds(map, location.bounds);
	} else {
		flyToCoords(map, location.center, flyOptions);
	}
};

const setMarker = (map, mapgl, coords) => {
	clearMarker();
	marker = new mapgl.Marker() // //
		.setLngLat(coords)
		.addTo(map);
};

const clearMarker = () => {
	if (marker) {
		marker.remove();
		marker = null;
	}
};

export const clearFeature = (map) => {
	if (!map) {
		return;
	}

	clearMarker();
	map.getSource(sourceId)?.setData({
		type: 'FeatureCollection',
		features: []
	});
};

const createFeatureCollection = (location) => {
	return {
		type: 'FeatureCollection',
		features: [createFeature(location)]
	};
};

const createFeature = (location) => {
	return {
		type: 'Feature',
		geometry: createFeatureGeometry(location)
	};
};

const createFeatureGeometry = (location) => {
	if (location.bounds) {
		return createFeatureGeometryBounds(location);
	}
	return createFeatureGeometryPoint(location);
};

const createFeatureGeometryPoint = (location) => {
	return {
		type: 'Point',
		coordinates: location.center
	};
};

const createFeatureGeometryBounds = (location) => {
	return {
		type: 'Polygon',
		coordinates: [location.bounds]
	};
};

const flyToBounds = (map, bounds) => {
	map.fitBounds(bounds, {
		...GLIDE_ANIMATION_OPTIONS
	});
};

const flyToCoords = (map, coords, options) => {
	map.flyTo({
		...GLIDE_ANIMATION_OPTIONS,
		center: coords,
		...options
	});
};
