<script context="module" lang="ts">
	import { onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import maplibre_gl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';

	import {
		theme_os_light_vts,
		GREATER_LONDON_BOUNDS,
		GREATER_LONDON_BOUNDS_MAX
	} from '@ldn-viz/maps';
	import MapCursor from './mapCursor/MapCursor';
	import type { MapCursorStore } from './mapCursor/types';

	export type MapLibre = maplibre_gl.Map;
	export type MapStore = Writable<null | maplibre_gl.Map>;
	export type WhenMapLoads = (map: maplibre_gl.Map) => void;

	/**
	 * Apllied as the MapLibre transformRequest option to append the OS key
	 * to outgoing OS API requests.
	 */
	export const appendOSKeyToUrl = (osKey: string) => {
		return (url: string) => {
			const urlObj = new URL(url);

			if (urlObj.hostname !== 'api.os.uk') {
				return { url: urlObj.href };
			}

			const WEB_MERCATOR_EPSG = '3857';
			urlObj.searchParams.set('srs', WEB_MERCATOR_EPSG);
			urlObj.searchParams.set('key', osKey);

			return { url: urlObj.href };
		};
	};
</script>

<script lang="ts">
	/**
	 * The `<Map>` component wraps a MapLibre `Map` to provide:
	 * - access to the `Map` and `MapCursor` objects via context;
	 * - notification of both map initialisation and destruction events;
	 * - default map options suitable for mapping in London;
	 * - default styling to HTML elements rendered by the map.
	 *
	 * The map's container has a relative CSS position so slotted content can
	 * position itself accordingly. Map controls and other overlay components
	 * should be wrapped and positioned using a `MapControlGroup` instance.
	 *
	 * (see [MapLibre Map](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/)).
	 * @component
	 */

	/**
	 * Store containing the MapLibre instance.
	 */
	export const mapStore: MapStore = writable(null);

	/**
	 * Store containing the MapCursor instance.
	 */
	export const mapCursorStore: MapCursorStore = writable(null);

	/**
	 * Disables initialisation of the map on mount. This is most often used
	 * to speed up development on non-map components.
	 */
	export let disabled = false;

	/**
	 * Custom MapLibre options (see [MapOptions](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapOptions/)).
	 */
	export let options = {};

	/**
	 * Called when the map is finished loading and ready for use.
	 */
	export let whenMapLoads: null | WhenMapLoads = null;

	/**
	 * Called when the map component is destroyed. Required when external resources need to be cleaned up.
	 */
	export let whenMapUnloads: null | WhenMapLoads = null;

	/**
	 * Additional classes applied to the map's container element.
	 */
	export let classes = '';

	setContext('mapStore', mapStore);
	setContext('mapCursorStore', mapCursorStore);

	const defaultOptions = {
		style: theme_os_light_vts,
		bounds: GREATER_LONDON_BOUNDS,
		maxBounds: GREATER_LONDON_BOUNDS_MAX,
		attributionControl: true,
		clickTolerance: 6
	};

	let container: null | HTMLElement;

	onMount(() => {
		if (disabled) {
			return;
		}

		const maplibre: maplibre_gl.Map = new maplibre_gl.Map({
			...defaultOptions,
			...options,
			container: container as HTMLElement
		} as maplibre_gl.MapOptions);

		maplibre.once('load', () => {
			mapStore.set(maplibre);
			mapCursorStore.set(new MapCursor(maplibre));

			if (whenMapLoads) {
				whenMapLoads(maplibre);
			}

			// When embedded the map has a tendency to not spread itself across its
			// entire canvas. This might be a MapLibre issue but it is resolved by
			// forcing a resize.
			maplibre.resize();
		});

		return () => {
			if (whenMapUnloads) {
				whenMapUnloads(maplibre);
			}

			$mapCursorStore?.destroy();

			mapStore.set(null);
			mapCursorStore.set(null);
		};
	});

	// client width and height because on:resize won't always trigger refresh.
	let clientWidth = 0;
	let clientHeight = 0;
	$: clientWidth && clientHeight && $mapStore?.resize();
</script>

<section
	bind:this={container}
	bind:clientWidth
	bind:clientHeight
	class="w-full h-full relative overflow-hidden {classes}"
	{...$$restProps}
>
	<slot />
</section>

<style global>
	/*
		Override top level MapLibre & MapBox styling with ldn-viz styling so we
		don't have to do it separately within each map sub-component, e.g.
		map controls, popups, etc.
	*/
	.mapboxgl-map,
	.maplibregl-map {
		font-size: inherit;
		font-family: inherit;
		font-style: inherit;
		line-height: inherit;
	}

	.maplibregl-ctrl-attrib-inner,
	.mapboxgl-ctrl-attrib-inner {
		@apply text-sm;
	}
</style>
