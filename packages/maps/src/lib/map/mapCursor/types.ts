import type { MapGeoJSONFeature } from 'maplibre-gl';
import type { Writable } from 'svelte/store';
import type { MapLibreMouseLikeEvent } from '../types';

export type MapCursorType = {
	activeFeatures: () => MapGeoJSONFeature[];
	topFeature: () => null | MapGeoJSONFeature;
	on: (eventType: string, layerId: string, handler: MapCursorFeatureHandler) => void;
	off: (eventType: string, layerId: string, handler: MapCursorFeatureHandler) => void;
	offLayer: (layerId: string) => void;
	destroy: () => void;
};

export type MapCursorTypeStore = Writable<null | MapCursorType>;

export type MapCursorFeatureHandler = (
	event: MapLibreMouseLikeEvent,
	details: {
		feature: null | MapGeoJSONFeature;
		features: MapGeoJSONFeature[];
		isTouchEvent: boolean;
	}
) => void;

/**
 * One handler registered against a layer in a `HandlerCollection`.
 */
export type HandlerCollectionEntry = {
	layerId: string;
	handler: MapCursorFeatureHandler;
};

/**
 * Handler store returned by `HandlerCollection`.
 */
export type HandlerCollectionType = {
	entries: Record<string, HandlerCollectionEntry[]>;
	layerIds: string[];
	size: () => number;
	findAll: (eventType: string, layerId?: string | null) => HandlerCollectionEntry[];
	add: (eventType: string, layerId: string, handler: MapCursorFeatureHandler) => void;
	remove: (eventType: string, layerId: string, handler: MapCursorFeatureHandler) => void;
	clear: () => void;
};
