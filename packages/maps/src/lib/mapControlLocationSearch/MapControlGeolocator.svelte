<script lang="ts">
	/**
	 * The `<MapControlGeolocator>` component wraps the UI package's `<Geolocator>`
	 * component for use with MapLibre maps. When the browser locates the user it
	 * places a marker on the map and flies to it (via `setFeature`), calling
	 * `onLocationFound`. Errors (e.g. denied permission) call `onSearchError`.
	 *
	 * It reads the `mapStore` context, so it must be rendered inside a `<Map>`.
	 * It is usually positioned using a [MapControlGroup](./?path=/docs/maps-components-mapcontrols-mapcontrolgroup--documentation).
	 * @component
	 */

	import { Geolocator } from '@ldn-viz/ui';
	import mapgl from 'maplibre-gl';
	import { getContext } from 'svelte';
	import type { MapLibreStore } from '../map/types';
	import { clearFeature, setFeature } from './map-layer';

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
