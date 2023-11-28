<script context="module">
	export const appendOSKeyToUrl = (osKey) => {
		return (url) => {
			url = new URL(url);

			if (!url.hostname === 'api.os.uk') {
				return { url: url.href };
			}

			const WGS84 = 3857;
			url.searchParams.set('srs', WGS84);
			url.searchParams.set('key', osKey);

			return { url: url.href };
		};
	};
</script>

<script>
	import { onMount } from 'svelte';
	import maplibre_gl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';

	import { GREATER_LONDON_BOUNDS, GREATER_LONDON_BOUNDS_MAX } from '../themes/bounds';

	export let disabled = false;
	export let options = {};

	export let whenMapLoads = null
	export let whenMapUnloads = null

	const defaultOptions = {
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

		const map = new maplibre_gl.Map({
			...defaultOptions,
			...options,
			container
		});

		map.once('load', () => {
			whenMapLoads && whenMapLoads(map, maplibre_gl);
		});

		return () => whenMapUnloads && whenMapUnloads(map, maplibre_gl);
	});
</script>

<section
	bind:this={container}
	id="ldn-viz-map-container"
	class="w-full h-full relative"
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
