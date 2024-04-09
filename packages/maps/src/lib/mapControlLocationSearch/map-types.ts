import type { Writable } from 'svelte/store';
import type { GeolocationBounds } from '@ldn-viz/ui';

import type {
	Map, //
	Marker
} from 'maplibre-gl';

export interface MapGL {
	Marker: () => Marker;
	[keys: string]: any;
}

export type Options = { [key: string]: unknown };
export type MapStore = Writable<Map>;
export type MapGLStore = Writable<MapGL>;
