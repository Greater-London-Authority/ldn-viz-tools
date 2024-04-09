<script lang="ts">
	import { getContext } from 'svelte';
	import { GLIDE_ANIMATION_OPTIONS } from '@ldn-viz/maps';
	import { Geocoder, GeocoderSuggestionList } from '$unstable/geolocation';
	import { initMapLayer, setFeature, clearFeature } from './map-layer';

	import type {
		GeolocationCoords,
		GeolocationBounds,
		Geolocation,
		OnGeolocationSearchResult,
		OnGeolocationSearchError,
		GeocoderAdapter
	} from '$unstable/geolocation';

	import type { MapStore } from './map-types';

	// adapter to source location suggestions from.
	export let adapter: GeocoderAdapter;

	// onLocationSelected is invoked when a user clicks a suggestion.
	export let onLocationSelected: undefined | OnGeolocationSearchResult = undefined;

	// onSearchError is invoked when the adapter rejects a promise for a search.
	export let onSearchError: OnGeolocationSearchError;

	// maxSuggestions is the maximum number of suggestion to show. This does
	// not limit the results array.
	export let maxSuggestions: number = 5;

	// classes is a string of additional CSS classes that are passed to the
	// geocoder and applied to its root element.
	export let classes = '';

	// inputClasses is a string of additional CSS classes that are passed to the
	// geocoder and applied specifically to the text input field.
	export let inputClasses = '';

	const map: MapStore = getContext('map');
	const mapgl: MapMarker = getContext('map_gl');

	const zoomLevel = 16;
	const delay = 500;

	let showClearButton;

	const onLocationSelectedGeocoder = (location: Geolocation) => {
		if (!$map) {
			return;
		}

		showClearButton = true;
		setFeature($map, $mapgl, location, { zoom: zoomLevel });

		if (onLocationSelected) {
			onLocationSelected(location);
		}
	};

	$: initMapLayer($map);
	$: !showClearButton && clearFeature($map);
</script>

<Geocoder
	{adapter}
	{delay}
	{onSearchError}
	onLocationSelected={onLocationSelectedGeocoder}
	{classes}
	{inputClasses}
	bind:showClearButton
	let:onLocationSelected={onSelectSuggestion}
	let:attribution
	let:suggestions
	{...$$restProps}
>
	{#if suggestions.length > 0}
		<GeocoderSuggestionList
			onLocationSelected={onSelectSuggestion}
			{attribution}
			{suggestions}
			{maxSuggestions}
		/>
	{/if}
</Geocoder>
