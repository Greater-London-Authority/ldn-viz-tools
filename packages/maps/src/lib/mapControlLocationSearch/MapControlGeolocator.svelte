<script lang="ts">
	import { getContext } from 'svelte';
	import { GLIDE_ANIMATION_OPTIONS } from '@ldn-viz/maps';
		import type { Geolocation } from './GeocoderAdapter'
	import type { MapControlLocationUpdate, MapControlLocationError } from './types'

	import Geolocator from './Geolocator.svelte';

	interface Map {
		flyTo: (options: any) => void
	}

	export let onLocationFound: MapControlLocationUpdate = undefined;
	export let onLocationNotFound: MapControlLocationError = undefined;

	const map = getContext('map');
	const zoomLevel = 16;

	const onLocationFoundWrap = (location: Geolocation) => {
		if (!$map) {
			return;
		}

		flyToCoords(location.center);

		if (onLocationFound) {
			onLocationFound(location);
		}
	};

	const flyToCoords = (coords) => {
		$map.flyTo({
			...GLIDE_ANIMATION_OPTIONS,
			zoom: zoomLevel,
			center: coords
		});
	};
</script>

<Geolocator onLocationFound={onLocationFoundWrap} {onLocationNotFound} />
