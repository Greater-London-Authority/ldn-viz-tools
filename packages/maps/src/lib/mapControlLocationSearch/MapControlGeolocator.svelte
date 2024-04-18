<script lang="ts">
	import { getContext } from 'svelte';
	import { setFeature, clearFeature } from './map-layer';
	import { Geolocator } from '@ldn-viz/ui';
	import type { MapStore, MapGLStore } from './map-types';

	import type {
		GeolocationUnamed,
		OnGeolocationSearchResult,
		OnGeolocationSearchError
	} from '@ldn-viz/ui';

	// onLocationFound is invoked when the browser finds a location.
	export let onLocationFound: undefined | OnGeolocationSearchResult = undefined;

	// onSearchError is invoked when a search error occurs.
	export let onSearchError: undefined | OnGeolocationSearchError = undefined;

	const map: MapStore = getContext('map');
	const mapgl: MapGLStore = getContext('map_gl');
	const zoomLevel = 16;

	const flyToLocation = (location: GeolocationUnamed) => {
		if (!$map) {
			return;
		}

		setFeature('geolocator', $map, $mapgl, location, { zoom: zoomLevel });

		if (onLocationFound) {
			onLocationFound(location);
		}
	};

	let showClearButton = false;
	$: !showClearButton && clearFeature('geolocator', $map);
</script>

<Geolocator onLocationFound={flyToLocation} {onSearchError} bind:showClearButton />
