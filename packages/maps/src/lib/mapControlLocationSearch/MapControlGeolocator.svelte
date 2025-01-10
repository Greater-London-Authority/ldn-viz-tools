<script lang="ts">
	/**
	 * The `<MapControlGeolocator>` component wraps the UI package's
	 * `<Geolocator>` component for use with MapLibre maps.
	 * @component
	 */

	import { getContext } from 'svelte';
	import mapgl from 'maplibre-gl';
	import { setFeature, clearFeature } from './map-layer';
	import { Geolocator } from '@ldn-viz/ui';
	import type { MapStore } from './map-types';

	import type {
		GeolocationUnamed,
		OnGeolocationSearchResult,
		OnGeolocationSearchError
	} from '@ldn-viz/ui';

	/**
	 * Called when the browser finds a location.
	 */
	export let onLocationFound: undefined | OnGeolocationSearchResult = undefined;

	/**
	 * Called when an error occurs while searching.
	 */
	export let onSearchError: undefined | OnGeolocationSearchError = undefined;

	const mapStore: MapStore = getContext('mapStore');
	const zoomLevel = 16;

	const flyToLocation = (location: GeolocationUnamed) => {
		if (!$mapStore) {
			return;
		}

		setFeature('geolocator', $mapStore, mapgl, location, { zoom: zoomLevel });

		if (onLocationFound) {
			onLocationFound(location);
		}
	};

	let showClearButton = false;
	$: !showClearButton && clearFeature('geolocator', $mapStore);
</script>

<Geolocator allowClearButton onLocationFound={flyToLocation} {onSearchError} bind:showClearButton />
