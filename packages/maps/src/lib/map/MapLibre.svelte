<script lang="ts">
	/**
	 * The `<MapLibre>` component wraps a MapLibre `Map` ensuring it sizes
	 * correctly and exposing map creation and destruction functions. It is not
	 * designed for external use. Use the `<Map>` component instead.
	 *
	 * (see [MapLibre Map](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/)).
	 * @component
	 */

	import { onMount, onDestroy } from 'svelte';
	import maplibre_gl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';

	import {
		GREATER_LONDON_BOUNDS,
		GREATER_LONDON_BOUNDS_MAX,
		theme_os_light_vts
	} from '@ldn-viz/maps';

	import type { MapLibre, MapLibreStyle, WhenMapLoads, MapLibreBounds } from './types';

	type MapLibreOptions = Omit<maplibre_gl.MapOptions, 'container'>;

	const defaultOptions: MapLibreOptions = {
		style: theme_os_light_vts as MapLibreStyle,
		bounds: GREATER_LONDON_BOUNDS as MapLibreBounds,
		maxBounds: GREATER_LONDON_BOUNDS_MAX as MapLibreBounds,
		clickTolerance: 6
	};

	/**
	 * Disables initialisation of the map on mount. This is most often used
	 * to avoid uneeded map rendering during development of non-map application
	 * elements.
	 */
	export let disabled = false;

	/**
	 * Custom MapLibre options (see [MapOptions](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapOptions/)).
	 */
	export let options: MapLibreOptions = defaultOptions;

	/**
	 * Called during component mounting after the map has been created but
	 * before it has loaded.
	 *
	 * This allows custom `load` functions to be added to the map instance
	 * before loading occurs.
	 */
	export let whenMapCreated: null | WhenMapLoads = null;

	/**
	 * Called during component unmounting just before the map and component are
	 * destroyed.
	 */
	export let whenMapDestroyed: null | WhenMapLoads = null;

	let container: null | HTMLElement;
	let maplibre: null | MapLibre;

	onMount(() => {
		if (disabled) {
			return;
		}

		maplibre = new maplibre_gl.Map({
			...defaultOptions,
			...options,
			container: container as HTMLElement
		} as maplibre_gl.MapOptions);

		maplibre.once('load', () => {
			// When embedded the map has a tendency to not spread itself across its
			// entire canvas. This might be a MapLibre issue but it is resolved by
			// forcing a resize.
			maplibre!.resize();
		});

		if (whenMapCreated) {
			whenMapCreated(maplibre!);
		}
	});

	onDestroy(() => {
		return () => {
			if (whenMapDestroyed) {
				whenMapDestroyed(maplibre!);
			}

			maplibre = null;
		};
	});

	// client width and height because on:resize won't always trigger refresh.
	let clientWidth = 0;
	let clientHeight = 0;
	$: clientWidth && clientHeight && maplibre?.resize();
</script>

<section
	bind:this={container}
	bind:clientWidth
	bind:clientHeight
	class:w-full={true}
	class:h-full={true}
	class:relative={true}
	class:overflow-hidden={true}
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
