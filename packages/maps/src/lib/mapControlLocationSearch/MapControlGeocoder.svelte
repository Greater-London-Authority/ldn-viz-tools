<script lang="ts">
	/**
	 * The `<MapControlGeocoder>` component wraps the UI package's `<Geocoder>`
	 * component for use with MapLibre maps.
	 * @component
	 */

	import { getContext } from 'svelte';
	import mapgl from 'maplibre-gl';
	import { Geocoder, GeocoderSuggestionList } from '@ldn-viz/ui';
	import { setFeature, clearFeature } from './map-layer';
	import type { MapStore } from './map-types';

	import type {
		Geolocation,
		GeolocationNamed,
		OnGeolocationSearchResult,
		OnGeolocationSearchError,
		GeocoderAdapter
	} from '@ldn-viz/ui';

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
	 * Placeholder text to be dislayed in the input element.
	 */
	export let placeholder = 'Location search';

	const mapStore: MapStore = getContext('mapStore');

	const zoomLevel = 16;
	const delay = 500;
	let selected: null | GeolocationNamed = null;

	const onLocationSelectedGeocoder = (location: Geolocation) => {
		if (!$mapStore) {
			return;
		}

		showClearButton = true;
		setFeature('geocoder', $mapStore, mapgl, location, { zoom: zoomLevel });

		if (onLocationSelected) {
			onLocationSelected(location);
		}
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
