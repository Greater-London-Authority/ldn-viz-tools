import type { Writable } from 'svelte/store';
import type { GeolocationBounds } from '$unstable/geolocation';

export type Options = { [key: string]: unknown };

export interface Map {
	flyTo: (options: Options) => void;
	fitBounds: (bounds: GeolocationBounds, options: Options) => void;
}

export interface MapGL {
	marker: () => void;
	fitBounds: (bounds: GeolocationBounds, options: Options) => void;
}

export interface MapMarker {
	setLngLat: (coords: [number, number]) => MapMarker;
	addTo: (map: Map) => MapMarker;
}

export type MapStore = Writable<Map>;
