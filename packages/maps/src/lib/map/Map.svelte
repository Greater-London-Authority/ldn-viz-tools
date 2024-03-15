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

	export let disabled = false;
	export let options = {};

	export let whenMapLoads = null;
	export let whenMapUnloads = null;

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
	let clientWidth = 0;
	let clientHeight = 0;
	$: clientWidth && clientHeight && $map?.resize();
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
