import type { Writable } from 'svelte/store';
import type { Bounds, Geolocation } from './GeocoderAdapter';

type Options = { [key: string]: unknown };

export interface Map {
	flyTo: (options: Options) => void;
	fitBounds: (bounds: Bounds, options: Options) => void;
}

export type MapStore = Writable<Map>;
export type OnSearchResult = undefined | ((loc: Geolocation) => void);
export type OnSearchError = undefined | ((err: Error | GeolocationPositionError) => void);
