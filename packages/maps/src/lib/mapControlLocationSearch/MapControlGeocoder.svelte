<script lang="ts">
	import { getContext } from 'svelte';
	import { GLIDE_ANIMATION_OPTIONS } from '../themes/animations';
	import { Geocoder } from '@ldn-viz/ui';

	import type {
		GeolocationCoords,
		GeolocationBounds,
		Geolocation,
		OnGeolocationSearchResult,
		OnGeolocationSearchError,
		GeocoderAdapter
	} from '@ldn-viz/ui';
	import type { MapStore } from './map-types';

	export let adapter: GeocoderAdapter;
	export let onLocationFound: OnGeolocationSearchResult;
	export let onSearchError: OnGeolocationSearchError;
	export let classes = '';
	export let inputClasses = '';

	const map: MapStore = getContext('map');
	const zoomLevel = 16;
	const delay = 500;

	const onLocationSelected = (location: Geolocation) => {
		if (!$map) {
			return;
		}

		if (location.bounds) {
			flyToBounds(location.bounds);
		} else {
			flyToCoords(location.center);
		}

		if (onLocationFound) {
			onLocationFound(location);
		}
	};

	const flyToBounds = (bounds: GeolocationBounds) => {
		$map.fitBounds(bounds, {
			...GLIDE_ANIMATION_OPTIONS
		});
	};

	const flyToCoords = (coords: GeolocationCoords) => {
		$map.flyTo({
			...GLIDE_ANIMATION_OPTIONS,
			zoom: zoomLevel,
			center: coords
		});
	};
</script>

<Geocoder {adapter} {delay} {onSearchError} {onLocationSelected} {classes} {inputClasses} />
