import type { Writable } from 'svelte/store';

import type { Map, Marker } from 'maplibre-gl';

export interface MapGL {
	Marker: Marker;
	[keys: string]: unknown;
}

export type MapStore = Writable<Map>;
export type MapGLStore = Writable<MapGL>;
