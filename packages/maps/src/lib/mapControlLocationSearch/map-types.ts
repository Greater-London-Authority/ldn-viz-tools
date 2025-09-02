import type { Writable } from 'svelte/store';

import type { Map } from 'maplibre-gl';

export type MapStore = Writable<Map>;
