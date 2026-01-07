<script lang="ts">
	import type { GeocoderAttribution } from './GeocoderAdapter';
	import GeocoderSuggestion from './GeocoderSuggestion.svelte';
	import type { GeolocationNamed, OnSuggestionListInteraction } from './types';

	// suggestions is an array of named geolocations. The suggestions will be

	// maxSuggestions is the maximum number of suggestion to show. This does

	// onSuggestionEvent is invoked when a keyboard, mouse, or touch

	interface Props {
		attribution?: undefined | GeocoderAttribution;
		// presented in order and limited by maxSuggestions.
		suggestions: GeolocationNamed[];
		// not limit the results array.
		maxSuggestions?: number;
		// event occurs in the suggestion list, except when a suggestion is selected.
		onSuggestionEvent: OnSuggestionListInteraction;
		/**
		 * The currently selected location in the parent `Geocoder`.
		 */
		selected?: null | GeolocationNamed;
	}

	let {
		attribution = undefined,
		suggestions,
		maxSuggestions = 5,
		onSuggestionEvent,
		selected = null
	}: Props = $props();

	// Mouse highlight only
	let highlighted: null | GeolocationNamed = $derived.by(() => {
		const containsSelected =
			selected &&
			suggestions.find((s) => {
				return s.id === selected.id;
			});

		if (containsSelected) {
			return selected;
		} else {
			return suggestions.length > 0 ? suggestions[0] : null;
		}
	});
</script>

<ul
	class="max-height-[60vh] absolute left-0 top-11 z-40 w-full overflow-y-scroll bg-color-input-background text-sm text-color-text-primary shadow-lg"
>
	{#if suggestions.length === 0}
		<li class="w-full px-2.5 py-1.5">
			<h1 class="pointer-events-none">No locations found</h1>
		</li>
	{:else}
		{#each suggestions as suggestion, i (suggestion.id)}
			{#if i < maxSuggestions}
				<GeocoderSuggestion {suggestion} {onSuggestionEvent} bind:highlighted />
			{/if}
		{/each}
	{/if}

	{#if attribution && attribution.text}
		<li class="w-full px-2.5 py-1.5 text-right text-color-text-secondary">
			{#if attribution.link}
				<a href={attribution.link} target="_blank" rel="noopener" class="text-color-text-primary">
					{attribution.text}
				</a>
			{:else}
				{attribution.text}
			{/if}
		</li>
	{/if}
</ul>
