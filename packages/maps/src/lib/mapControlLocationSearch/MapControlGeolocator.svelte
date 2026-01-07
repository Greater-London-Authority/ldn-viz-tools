<script lang="ts">
	/**
	 * The `<MapControlGeolocator>` component wraps the UI package's
	 * `<Geolocator>` component for use with MapLibre maps.
	 * @component
	 */

	import { Geolocator } from '@ldn-viz/ui';
	import mapgl from 'maplibre-gl';
	import { getContext } from 'svelte';
	import { clearFeature, setFeature } from './map-layer';
	import type { MapLibreStore } from '../map/types';

	import type {
		GeolocationUnamed,
		OnGeolocationSearchError,
		OnGeolocationSearchResult
	} from '@ldn-viz/ui';

	interface Props {
		/**
		 * Called when the browser finds a location.
		 */
		onLocationFound?: undefined | OnGeolocationSearchResult;
		/**
		 * Called when an error occurs while searching.
		 */
		onSearchError?: undefined | OnGeolocationSearchError;
	}

	let { onLocationFound = undefined, onSearchError = undefined }: Props = $props();

	const mapStore: MapLibreStore = getContext('mapStore');
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

	let showClearButton = $state(false);

	$effect(() => {
		if (!showClearButton && $mapStore) {
			clearFeature('geolocator', $mapStore);
		}
	});
</script>

<Geolocator allowClearButton onLocationFound={flyToLocation} {onSearchError} bind:showClearButton />
