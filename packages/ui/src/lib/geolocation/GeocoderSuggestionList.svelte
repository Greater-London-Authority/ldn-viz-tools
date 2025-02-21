<script lang="ts">
	import type { GeocoderAttribution } from './GeocoderAdapter';
	import GeocoderSuggestion from './GeocoderSuggestion.svelte';
	import type { GeolocationNamed, OnSuggestionListInteraction } from './types';

	export let attribution: undefined | GeocoderAttribution = undefined;

	// suggestions is an array of named geolocations. The suggestions will be
	// presented in order and limited by maxSuggestions.
	export let suggestions: GeolocationNamed[];

	// maxSuggestions is the maximum number of suggestion to show. This does
	// not limit the results array.
	export let maxSuggestions: number = 5;

	// onSuggestionEvent is invoked when a keyboard, mouse, or touch
	// event occurs in the suggestion list, except when a suggestion is selected.
	export let onSuggestionEvent: OnSuggestionListInteraction;

	/**
	 * The currently selected location in the parent `Geocoder`.
	 */
	export let selected: null | GeolocationNamed = null;

	// Mouse highlight only
	let highlighted: null | GeolocationNamed = null;

	const highlightFirstSuggestion = (suggestions: GeolocationNamed[]) => {
		const containsSelected =
			selected &&
			suggestions.find((s) => {
				return s.id === selected.id;
			});

		if (containsSelected) {
			highlighted = selected;
		} else {
			highlighted = suggestions.length > 0 ? suggestions[0] : null;
		}
	};

	$: highlightFirstSuggestion(suggestions);
</script>

<ul
	class="absolute top-11 left-0 bg-color-input-background text-color-text-primary text-sm w-full shadow-lg z-40 overflow-y-scroll max-height-[60vh]"
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
