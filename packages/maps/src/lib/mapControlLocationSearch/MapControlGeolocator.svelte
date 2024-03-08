<script lang="ts">
	import { getContext } from 'svelte';
	import { GLIDE_ANIMATION_OPTIONS } from '../themes/animations';
	import { Geolocator } from '@ldn-viz/ui';
	import type {
		GeolocationUnamed,
		OnGeolocationSearchResult,
		OnGeolocationSearchError
	} from '@ldn-viz/ui';

	import type { MapStore } from './map-types';

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
