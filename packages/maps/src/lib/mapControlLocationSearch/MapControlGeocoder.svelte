<script lang='ts'>
	import { getContext } from 'svelte';
	import { GLIDE_ANIMATION_OPTIONS } from '@ldn-viz/maps';
	import type { GeocoderAdapter, GeocoderLocation } from './GeocoderAdapter'
		import type { MapControlLocationUpdate } from './types'

	import Geocoder from './Geocoder.svelte';

	interface Map {
		flyTo: (options: any) => void
		fitBounds: (bounds: [number, number, number, number], options: any) => void
	}

	export let adapter: GeocoderAdapter;
	export let onLocationFound: MapControlLocationUpdate = undefined;
	export let classes = '';
	export let inputClasses = '';

	const map = getContext('map');
	const zoomLevel = 16;
	const delay = 500;

	const onLocationSelected = (location: GeocoderLocation) => {
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

	const flyToBounds = (bounds) => {
		$map.fitBounds(bounds, {
			...GLIDE_ANIMATION_OPTIONS
		});
	};

	const flyToCoords = (coords) => {
		$map.flyTo({
			...GLIDE_ANIMATION_OPTIONS,
			zoom: zoomLevel,
			center: coords
		});
	};
</script>

<Geocoder {adapter} {delay} {onLocationSelected} {classes} {inputClasses} />
