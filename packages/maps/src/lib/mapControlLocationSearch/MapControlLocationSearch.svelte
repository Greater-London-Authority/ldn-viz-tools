<script lang="ts">
	import { getContext } from 'svelte';
	import MapControlGeocoder from './MapControlGeocoder.svelte';
	import MapControlGeolocator from './MapControlGeolocator.svelte';
	import { initMapLayer } from './map-layer';

	import type { MapStore } from './map-types';
	import type {
		GeocoderAdapter,
		OnGeolocationSearchResult,
		OnGeolocationSearchError
	} from '@ldn-viz/ui';

	const map: MapStore = getContext('map');

	// adapter to source location suggestions from.
	export let adapter: GeocoderAdapter;

	// onLocationFound is invoked when a user clicks a suggestion.
	export let onLocationFound: undefined | OnGeolocationSearchResult = undefined;

	// onSearchError is invoked when the adapter rejects a promise for a search.
	export let onSearchError: undefined | OnGeolocationSearchError = undefined;

	// maxSuggestions is the maximum number of suggestion to show. This does
	// not limit the results array.
	export let maxSuggestions: number = 5;

	// hideGeolocator hides the geolocator.
	export let hideGeolocator = false;

	let limitWidthClass = '';
	if (hideGeolocator) {
		// 100% - left margin - right margin
		limitWidthClass = 'max-w-[calc(100dvw-1.5rem-1.5rem)]';
	} else {
		// 100% - geolocator button width - left margin - right margin
		limitWidthClass = 'max-w-[calc(100dvw-2.5rem-1.5rem-1.5rem)]';
	}

	$: initMapLayer($map);
</script>

<div class="flex" {...$$restProps}>
	<MapControlGeocoder
		{adapter}
		onLocationSelected={onLocationFound}
		{onSearchError}
		{maxSuggestions}
		inputClasses="w-72 {limitWidthClass}"
	/>
	{#if !hideGeolocator}
		<MapControlGeolocator {onLocationFound} {onSearchError} />
	{/if}
</div>
