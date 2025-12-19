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

	import type {
		GeocoderAdapter,
		OnGeolocationSearchError,
		OnGeolocationSearchResult
	} from '@ldn-viz/ui';
	import type { MapStore } from './map-types';

	const mapStore: MapStore = getContext('mapStore');

	interface Props {
		/**
		 * An adapter for sourcing location suggestions. All data fetching and
		 * caching is delegated to the adapter.
		 */
		adapter: GeocoderAdapter;
		/**
		 * Depending on which search feature the user interacted with, called when a
		 * user clicks a geocoder suggestion or when the browser geolocates the
		 * user's location.
		 */
		onLocationFound?: undefined | OnGeolocationSearchResult;
		/**
		 * Called when the adapter rejects a promise for a geocoder suggestion search
		 * or an error occurs during geolocation.
		 */
		onSearchError?: undefined | OnGeolocationSearchError;
		/**
		 * Called when the user clears the search box.
		 */
		onSearchClear?: any;
		/**
		 * Passed to the suggestions dropdown to limit the number of suggestions
		 * shown at once.
		 */
		maxSuggestions?: number;
		/**
		 * Hides the geolocator if true.
		 */
		hideGeolocator?: boolean;
		/**
		 * Placeholder text to be displayed in the input element.
		 */
		placeholder?: string;
		[key: string]: any;
	}

	let {
		adapter,
		onLocationFound = undefined,
		onSearchError = undefined,
		onSearchClear = () => {},
		maxSuggestions = 5,
		hideGeolocator = false,
		placeholder = 'Location search',
		...rest
	}: Props = $props();

	let limitWidthClass = $state('');

	if (hideGeolocator) {
		// 100% - left margin - right margin
		limitWidthClass = 'max-w-[calc(100dvw-1.5rem-1.5rem)]';
	} else {
		// 100% - geolocator button width - left margin - right margin
		limitWidthClass = 'max-w-[calc(100dvw-2.5rem-1.5rem-1.5rem)]';
	}

	$effect(() => {
		initMapLayer($mapStore);
	});
</script>

<div class="flex shadow" {...rest}>
	<MapControlGeocoder
		{adapter}
		onLocationSelected={onLocationFound}
		{onSearchError}
		{onSearchClear}
		{maxSuggestions}
		inputClasses="w-72 {limitWidthClass}"
		{placeholder}
	/>
	{#if !hideGeolocator}
		<MapControlGeolocator {onLocationFound} {onSearchError} />
	{/if}
</div>
