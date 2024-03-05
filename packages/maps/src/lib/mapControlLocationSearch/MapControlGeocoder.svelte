<script lang="ts">
	import { getContext } from 'svelte';
	import { GLIDE_ANIMATION_OPTIONS } from '@ldn-viz/maps';
	import type { Coords, Bounds, GeocoderAdapter, Geolocation } from './GeocoderAdapter';
	import type { MapStore, OnSearchResult } from './types';

	import Geocoder from './Geocoder.svelte';

	export let adapter: GeocoderAdapter;
	export let onLocationFound: OnSearchResult = undefined;
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

	const flyToBounds = (bounds: Bounds) => {
		$map.fitBounds(bounds, {
			...GLIDE_ANIMATION_OPTIONS
		});
	};

	const flyToCoords = (coords: Coords) => {
		$map.flyTo({
			...GLIDE_ANIMATION_OPTIONS,
			zoom: zoomLevel,
			center: coords
		});
	};
</script>

<Geocoder {adapter} {delay} {onLocationSelected} {classes} {inputClasses} />
