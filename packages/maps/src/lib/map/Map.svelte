<script context="module">
	export const appendOSKeyToUrl = (osKey) => {
		return (url) => {
			url = new URL(url);

			if (!url.hostname === 'api.os.uk') {
				return { url: url.href };
			}

			const WEB_MERCATOR_EPSG = 3857;
			url.searchParams.set('srs', WEB_MERCATOR_EPSG);
			url.searchParams.set('key', osKey);

			return { url: url.href };
		};
	};
</script>

<script>
	/**
	 * The `<Map>` component wraps a MapLibre `Map` to provide:
	 * - access to the `Map` and `maplibre_gl` objects via context;
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

	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import maplibre_gl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';

	import { GREATER_LONDON_BOUNDS, GREATER_LONDON_BOUNDS_MAX } from '../themes/bounds';
	import * as os_light_vts from '../themes/os_light_vts.json';

	const map = writable(null);
	const map_gl = writable(null);

	setContext('map', map);
	setContext('map_gl', map_gl);

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
	export let whenMapLoads = null;

	/**
	 * Called when the map component is destroyed for when resources need to be cleaned up.
	 */
	export let whenMapUnloads = null;

	/**
	 * Additional classes applied to the map's container element.
	 */
	export let classes = '';

	const defaultOptions = {
		style: os_light_vts,
		bounds: GREATER_LONDON_BOUNDS,
		maxBounds: GREATER_LONDON_BOUNDS_MAX,
		attributionControl: true,
		clickTolerance: 6
	};

	let container;

	onMount(() => {
		if (disabled) {
			return;
		}

		const maplibre = new maplibre_gl.Map({
			...defaultOptions,
			...options,
			container
		});

		maplibre.once('load', () => {
			map.set(maplibre);
			map_gl.set(maplibre_gl);

			if (whenMapLoads) {
				whenMapLoads(maplibre, maplibre_gl);
			}
		});

		return () => {
			if (whenMapUnloads) {
				whenMapUnloads(maplibre, maplibre_gl);
			}

			map.set(null);
			map_gl.set(null);
		};
	});

	// client width and height because on:resize won't always trigger refresh.
	let clientWidth = null;
	let clientHeight = null;
	$: clientWidth !== null && clientHeight !== null && $map?.resize();
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
