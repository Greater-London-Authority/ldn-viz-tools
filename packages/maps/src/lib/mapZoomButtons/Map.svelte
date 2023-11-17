<script>
	import { onMount } from 'svelte';
	import maplibre_gl from 'maplibre-gl';

	import { GREATER_LONDON_ZOOM, GREATER_LONDON_CENTER } from '../themes/bounds.js';

	import * as lightStyle from '../themes/os_light_vts.json';
	import * as greyStyle from '../themes/os_greyscale.json';
	import * as darkGreyMutedStyle from '../themes/os_dark_grey_muted_buildings.json';
	import * as darkStyle from '../themes/os_dark.json';

	import MapZoomButtons from './MapZoomButtons.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	const transformRequest = (url) => {
		if (!url.toLowerCase().includes('api.os')) return { url: url };
		if (!/[?&]key=/.test(url)) url += '?key=' + OS_KEY;
		return {
			url: url + '&srs=3857'
		};
	};

	export let whenMapLoads = () => {}
	let container
	let map = null;

	onMount(() => {
		map = new maplibre_gl.Map({
			// https://maplibre.org/maplibre-gl-js-docs/api/map/
			style: darkGreyMutedStyle,
			zoom: 9,
			center: GREATER_LONDON_CENTER,
			//maxBounds: GREATER_LONDON_ZOOM,
			attributionControl: true,
			clickTolerance: 6,
			transformRequest,
			container
		})

		whenMapLoads(map)
	})
</script>

<section
	id="gla-maplibre-map-container"
	class="w-full h-full relative"
	bind:this={container}
>
	<slot />
</section>

<style global>
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
