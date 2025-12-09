import { GLIDE_ANIMATION_OPTIONS } from '@ldn-viz/maps';
import type { Geolocation, GeolocationBounds, GeolocationCoords } from '@ldn-viz/ui';

import type {
	FlyToOptions,
	GeoJSONSource,
	LayerSpecification,
	Map,
	Marker,
	SourceSpecification
} from 'maplibre-gl';

import type { FeatureCollection } from 'geojson';

import maplibre_gl from 'maplibre-gl';

const markers: { [keys: string]: Marker } = {};
const sourceId = 'gla/context/location-search';

const sourceSpec: SourceSpecification = {
	type: 'geojson',
	data: {
		type: 'FeatureCollection',
		features: []
	}
};

const layerSpecs: LayerSpecification[] = [
	{
		id: `${sourceId}/map-point-symbol`,
		source: sourceId,
		type: 'symbol',
		layout: {
			'icon-image': 'map-pin',
			'icon-size': 0.4
		}
	}
];

export const initMapLayer = (map: Map) => {
	if (!map) {
		return;
	}

	removeLayers(map);
	addLayers(map);
};

const removeLayers = (map: Map) => {
	for (const layer of layerSpecs) {
		if (map.getLayer(layer.id)) {
			map.removeLayer(layer.id);
		}
	}

	if (map.getSource(sourceId)) {
		map.removeSource(sourceId);
	}
};

const addLayers = (map: Map) => {
	map.addSource(sourceId, sourceSpec);

	for (const layer of layerSpecs) {
		map.addLayer(layer);
	}
};

export const setFeature = (
	ref: string,
	map: Map,
	location: Geolocation,
	flyOptions: FlyToOptions = {}
) => {
	if (!map) {
		return;
	}

	(map.getSource(sourceId) as GeoJSONSource)?.setData(
		createFeatureCollection(location) as FeatureCollection
		//createFeatureGeometryPoint(location)
	);

	addMarkerAndFlyToLocation(ref, map, location, flyOptions);
};

const addMarkerAndFlyToLocation = (
	ref: string,
	map: Map,
	location: Geolocation,
	flyOptions: FlyToOptions
) => {
	setMarker(ref, map, location.center);

	if (location.bounds) {
		flyToBounds(map, location.bounds);
	} else {
		flyToCoords(map, location.center, flyOptions);
	}
};

const setMarker = (ref: string, map: Map, coords: GeolocationCoords) => {
	clearMarker(ref);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	markers[ref] = new maplibre_gl.Marker().setLngLat(coords).addTo(map);
};

const clearMarker = (ref: string) => {
	if (markers[ref]) {
		markers[ref].remove();
		delete markers[ref];
	}
};

export const clearFeature = (ref: string, map: Map) => {
	if (!map) {
		return;
	}

	clearMarker(ref);
	(map.getSource(sourceId) as GeoJSONSource)?.setData({
		type: 'FeatureCollection',
		features: []
	});
};

const createFeatureCollection = (location: Geolocation) => {
	return {
		type: 'FeatureCollection',
		features: [createFeature(location)]
	};
};

const createFeature = (location: Geolocation) => {
	return {
		type: 'Feature',
		geometry: createFeatureGeometry(location),
		properties: {}
	};
};

const createFeatureGeometry = (location: Geolocation) => {
	if (location.bounds) {
		return createFeatureGeometryBounds(location);
	}
	return createFeatureGeometryPoint(location);
};

const createFeatureGeometryPoint = (location: Geolocation) => {
	return {
		type: 'Point',
		coordinates: location.center as [number, number]
	};
};

const createFeatureGeometryBounds = (location: Geolocation) => {
	return {
		type: 'Polygon',
		coordinates: [location.bounds as [number, number, number, number]]
	};
};

const flyToBounds = (map: Map, bounds: GeolocationBounds) => {
	map.fitBounds(bounds, {
		...GLIDE_ANIMATION_OPTIONS
	});
};

const flyToCoords = (map: Map, coords: GeolocationCoords, options: FlyToOptions) => {
	map.flyTo({
		...GLIDE_ANIMATION_OPTIONS,
		center: coords,
		...options
	});
};
