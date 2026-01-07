<script lang="ts">
	/**
	 * The `<MapControlGeocoder>` component wraps the UI package's `<Geocoder>`
	 * component for use with MapLibre maps.
	 * @component
	 */

	import { Geocoder, GeocoderSuggestionList } from '@ldn-viz/ui';
	import { getContext } from 'svelte';
	import { clearFeature, setFeature } from './map-layer';
	import type { MapLibreStore } from '../map/types';

	import type {
		GeocoderAdapter,
		Geolocation,
		GeolocationNamed,
		OnGeolocationSearchError,
		OnGeolocationSearchResult
	} from '@ldn-viz/ui';

	interface Props {
		/**
		 * An adapter for sourcing location suggestions. All data fetching and
		 * caching is delegated to the adapter.
		 */
		adapter: GeocoderAdapter;
		/**
		 * Called when a user clicks a suggestion.
		 */
		onLocationSelected?: undefined | OnGeolocationSearchResult;
		/**
		 * Called when the adapter rejects a promise for a search.
		 */
		onSearchError: undefined | OnGeolocationSearchError;
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
		 * Additional classes applied to the root container element.
		 */
		classes?: string;
		/**
		 * Additional classes applied to the geocoder search input element.
		 */
		inputClasses?: string;
		/**
		 * Placeholder text to be displayed in the input element.
		 */
		placeholder?: string;
		[key: string]: any;
	}

	let {
		adapter,
		onLocationSelected = undefined,
		onSearchError,
		onSearchClear = () => {},
		maxSuggestions = 5,
		classes = '',
		inputClasses = '',
		placeholder = 'Location search',
		...rest
	}: Props = $props();

	const mapStore: MapLibreStore = getContext('mapStore');

	const zoomLevel = 16;
	const delay = 500;
	let selected: null | GeolocationNamed = $state(null);

	const onLocationSelectedGeocoder = (location: Geolocation) => {
		if (!$mapStore) {
			return;
		}

		if (adapter.retrieve && 'id' in location) {
			adapter
				.retrieve(location.id)
				.then((updatedLocation: Geolocation) => {
					showClearButton = true;

					if ($mapStore) {
						setFeature('geocoder', $mapStore, updatedLocation, { zoom: zoomLevel });
					}

					if (onLocationSelected) {
						onLocationSelected(updatedLocation);
					}
				})
				.catch((error: any) => {
					console.error('Error retrieving location:', error);
				});
		}
	};

	let showClearButton = $state(false);

	$effect(() => {
		if (!showClearButton && $mapStore) {
			clearFeature('geocoder', $mapStore);
		}
	});
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
	{...rest}
>
	{#snippet children({ onSuggestionEvent, attribution, suggestions })}
		{#if suggestions.length > 0}
			<GeocoderSuggestionList
				{onSuggestionEvent}
				{attribution}
				{suggestions}
				{selected}
				{maxSuggestions}
			/>
		{/if}
	{/snippet}
</Geocoder>
