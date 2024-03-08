<script lang="ts">
	import GeocoderSuggestion from './GeocoderSuggestion.svelte';
	import type { GeocoderAdapter } from './GeocoderAdapter';
	import type {
		GeolocationNamed, //
		OnGeolocationSearchResult
	} from './types';

	export let adapter: GeocoderAdapter;
	export let suggestions: GeolocationNamed[];
	export let onSelect: OnGeolocationSearchResult;

	const attribution = adapter.attribution && adapter.attribution();

	let highlighted: null | GeolocationNamed = null;

	const highlightFirstSuggestion = (suggestions: GeolocationNamed[]) => {
		highlighted = suggestions.length > 0 ? suggestions[0] : null;
	};

	$: highlightFirstSuggestion(suggestions);
</script>

<ul class="absolute top-10 left-0 bg-core-grey-600 text-white text-sm w-full">
	{#if suggestions.length === 0}
		<li class="w-full px-2.5 py-1.5">
			<h1 class="pointer-events-none">No locations found</h1>
		</li>
	{:else}
		{#each suggestions as suggestion (suggestion.id)}
			<GeocoderSuggestion {suggestion} {onSelect} bind:highlighted />
		{/each}
	{/if}

	{#if attribution && attribution.text}
		<li class="w-full px-2.5 py-1.5 text-right text-core-grey-300">
			{#if attribution.link}
				<a href={attribution.link} target="_blank" rel="noopener" class="text-core-blue-500">
					{attribution.text}
				</a>
			{:else}
				{attribution.text}
			{/if}
		</li>
	{/if}
</ul>
