import maplibre_gl from 'maplibre-gl';
import type { StyleSpecification } from 'maplibre-gl';
import { type Writable } from 'svelte/store';

/**
 * Alias for MapLibre map options type.
 */
export type MapLibreOptions = Omit<maplibre_gl.MapOptions, 'container' | 'style'>;

/**
 * Alias for MapLibre style specification type.
 */
export type MapLibreStyle = StyleSpecification;

/**
 * Alias for a MapLibre Map instance type.
 */
export type MapLibre = maplibre_gl.Map;

/**
 * Store type for a MapLibre Map instance.
 */
export type MapLibreStore = Writable<null | MapLibre>;

/**
 * Store type for a MapLibre Map instance.
 *
 * @deprecated Use MapLibreStore.
 */
export type MapStore = MapLibreStore;

/**
 * Called when the map is created, destroyed, loaded or unloaded.
 */
export type WhenMapLoads = (map: MapLibre) => void;

/**
 * Alias for a MapLibre point type or point like type.
 */
export type MapLibrePoint = maplibre_gl.PointLike;

/**
 * Alias for a MapLibre bounds or bounds like.
 */
export type MapLibreBounds = maplibre_gl.LngLatBoundsLike;

/**
 * Alias for MapLibre for mouse, touch, pen, and other pointer like events.
 */
export type MapLibreMouseLikeEvent = maplibre_gl.MapMouseEvent | maplibre_gl.MapTouchEvent;

/**
 * Alias for MapLibre for mouse, touch, pen, and other pointer like layer events.
 */
export type MapLibreLayerMouseLikeEvent =
	| maplibre_gl.MapLayerMouseEvent
	| maplibre_gl.MapLayerTouchEvent;
