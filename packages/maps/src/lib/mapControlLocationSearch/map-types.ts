import type { Writable } from 'svelte/store';
import type { GeolocationBounds } from '../geolocation/types';

export type Options = { [key: string]: unknown };

export interface Map {
	flyTo: (options: Options) => void;
	fitBounds: (bounds: GeolocationBounds, options: Options) => void;
}

export type MapStore = Writable<Map>;
