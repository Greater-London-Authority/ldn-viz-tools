import type { Writable } from 'svelte/store';
import MapCursor from './MapCursor.js';

export type MapCursorStore = Writable<null | MapCursor>;

export type MapCursorFeatureHandler = (
	event: MouseEvent | TouchEvent,
	details: {
		feature: null | object;
		features: object[];
		isTouchEvent: boolean;
	}
) => void;
