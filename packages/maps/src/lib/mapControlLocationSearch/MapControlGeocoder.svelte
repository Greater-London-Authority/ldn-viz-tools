<script lang="ts">
	/**
	 * The `<MapControlGeocoder>` component wraps the UI package's `<Geocoder>`
	 * component for use with MapLibre maps.
	 * @component
	 */

	import { Geocoder, GeocoderSuggestionList } from '@ldn-viz/ui';
	import mapgl from 'maplibre-gl';
	import { getContext } from 'svelte';
	import { clearFeature, setFeature } from './map-layer';
	import type { MapStore } from './map-types';

	import type {
		GeocoderAdapter,
		Geolocation,
		GeolocationNamed,
		OnGeolocationSearchError,
		OnGeolocationSearchResult
	} from '@ldn-viz/ui';
	import { MapGeocoderAdapterMapBox } from './MapGeocoderAdapterMapBox';

	/**
	 * An adapter for sourcing location suggestions. All data fetching and
	 * caching is delegated to the adapter.
	 */
	export let adapter: GeocoderAdapter;

	/**
	 * Called when a user clicks a suggestion.
	 */
	export let onLocationSelected: undefined | OnGeolocationSearchResult = undefined;

	/**
	 * Called when the adapter rejects a promise for a search.
	 */
	export let onSearchError: undefined | OnGeolocationSearchError;

	/**
	 * Called when the user clears the search box.
	 */
	export let onSearchClear = () => {};

	/**
	 * Passed to the suggestions dropdown to limit the number of suggestions
	 * shown at once.
	 */
	export let maxSuggestions: number = 5;

	/**
	 * Additional classes applied to the root container element.
	 */
	export let classes = '';

	/**
	 * Additional classes applied to the geocoder search input element.
	 */
	export let inputClasses = '';

	/**
	 * Placeholder text to be displayed in the input element.
	 */
	export let placeholder = 'Location search';

	const mapStore: MapStore = getContext('mapStore');

	const zoomLevel = 16;
	const delay = 500;
	let selected: null | GeolocationNamed = null;

	const onLocationSelectedGeocoder = (location: GeolocationNamed) => {
		if (!$mapStore) {
			return;
		}

		adapter
			.retrieve(location.id)
			.then((updatedLocation: Geolocation) => {
				console.log('Updated location:', updatedLocation);

				showClearButton = true;
				setFeature('geocoder', $mapStore, updatedLocation, { zoom: zoomLevel });

				if (onLocationSelected) {
					onLocationSelected(updatedLocation);
				}
			})
			.catch((error: any) => {
				console.error('Error retrieving location:', error);
			});
	};

	let showClearButton = false;

	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	$: !showClearButton && clearFeature('geocoder', $mapStore);
</script>

<Geocoder
	{adapter}
	{delay}
	{onSearchError}
	onLocationSelected={onLocationSelectedGeocoder}
	{onSearchClear}
	{classes}
	{inputClasses}
	{placeholder}
	bind:showClearButton
	bind:selected
	let:onSuggestionEvent
	let:attribution
	let:suggestions
	{...$$restProps}
>
	{#if suggestions.length > 0}
		<GeocoderSuggestionList
			{onSuggestionEvent}
			{attribution}
			{suggestions}
			{selected}
			{maxSuggestions}
		/>
	{/if}
</Geocoder>
