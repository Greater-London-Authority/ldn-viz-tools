<script lang="ts">
	/**
	 * The `<MapControlLocationSearch>` component wraps both the
	 * `<MapControlGeocoder>` and `<MapControlGeolocator>` components to create
	 * single and easy to use map search control. It is typically placed in the
	 * top left hand corner.
	 * @component
	 */

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

	const mapStore: MapStore = getContext('mapStore');

	/**
	 * An adapter for sourcing location suggestions. All data fetching and
	 * caching is delegated to the adapter.
	 */
	export let adapter: GeocoderAdapter;

	/**
	 * Depending on which search feature the user interacted with, called when a
	 * user clicks a geocoder suggestion or when the browser geolocates the
	 * users location.
	 */
	export let onLocationFound: undefined | OnGeolocationSearchResult = undefined;

	/**
	 * Called when the adapter rejects a promise for a geocoder suggestion search
	 * or an error occurs during geolocation.
	 */
	export let onSearchError: undefined | OnGeolocationSearchError = undefined;

	/**
	 * Passed to the suggestions dropdown to limit the number of suggestions
	 * shown at once.
	 */
	export let maxSuggestions: number = 5;

	/**
	 * Hides the geolocator if true.
	 */
	export let hideGeolocator = false;

	let limitWidthClass = '';

	if (hideGeolocator) {
		// 100% - left margin - right margin
		limitWidthClass = 'max-w-[calc(100dvw-1.5rem-1.5rem)]';
	} else {
		// 100% - geolocator button width - left margin - right margin
		limitWidthClass = 'max-w-[calc(100dvw-2.5rem-1.5rem-1.5rem)]';
	}

	$: initMapLayer($mapStore);
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
