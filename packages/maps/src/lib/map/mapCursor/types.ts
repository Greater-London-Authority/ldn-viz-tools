import type { Writable } from 'svelte/store';
import type { MapLibreMouseLikeEvent } from '../types';

type Handler = (
	event: MapLibreMouseLikeEvent,
	details: {
		feature: null | object;
		features: object[];
		isTouchEvent: boolean;
	}
) => void;

// TODO: Needs further refinement of feature object types
export type MapCursorType = {
	activeFeatures: () => object[];
	topFeature: () => null | object;
	on: (eventType: string, layerId: string, handler: Handler) => void;
	off: (eventType: string, layerId: string, handler: Handler) => void;
	offLayer: (layerId: string) => void;
	destroy: () => void;
};

export type MapCursorTypeStore = Writable<null | MapCursorType>;

export type MapCursorFeatureHandler = (
	event: MapLibreMouseLikeEvent,
	details: {
		feature: null | object;
		features: object[];
		isTouchEvent: boolean;
	}
) => void;
