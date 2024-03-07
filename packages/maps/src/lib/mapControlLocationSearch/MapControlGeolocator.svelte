<script lang="ts">
	import { getContext } from 'svelte';
	import { GLIDE_ANIMATION_OPTIONS } from '@ldn-viz/maps';
	import Geolocator from '../geolocation/Geolocator.svelte';

	import type { MapStore } from './map-types';
	import type {
		GeolocationUnamed, //
		OnGeolocationSearchResult,
		OnGeolocationSearchError
	} from '../geolocation/types';

	export let onLocationFound: OnGeolocationSearchResult;
	export let onSearchError: OnGeolocationSearchError;

	const map: MapStore = getContext('map');
	const zoomLevel = 16;

	const flyToLocation = (location: GeolocationUnamed) => {
		if (!$map) {
			return;
		}

		$map.flyTo({
			...GLIDE_ANIMATION_OPTIONS,
			zoom: zoomLevel,
			center: location.center
		});

		if (onLocationFound) {
			onLocationFound(location);
		}
	};
</script>

<Geolocator onLocationFound={flyToLocation} {onSearchError} />
