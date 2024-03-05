<script lang="ts">
	import { getContext } from 'svelte';
	import { GLIDE_ANIMATION_OPTIONS } from '@ldn-viz/maps';
	import type { Coords, GeolocationUnamed } from './GeocoderAdapter';
	import type { MapStore, OnSearchResult, OnSearchError } from './types';

	import Geolocator from './Geolocator.svelte';

	export let onLocationFound: OnSearchResult = undefined;
	export let onLocationNotFound: OnSearchError = undefined;

	const map: MapStore = getContext('map');
	const zoomLevel = 16;

	const onLocationFoundWrap = (location: GeolocationUnamed) => {
		if (!$map) {
			return;
		}

		flyToCoords(location.center);

		if (onLocationFound) {
			onLocationFound(location);
		}
	};

	const flyToCoords = (coords: Coords) => {
		$map.flyTo({
			...GLIDE_ANIMATION_OPTIONS,
			zoom: zoomLevel,
			center: coords
		});
	};
</script>

<Geolocator onLocationFound={onLocationFoundWrap} {onLocationNotFound} />
