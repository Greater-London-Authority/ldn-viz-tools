<script lang="ts">
	import type { GeolocationNamed, OnSuggestionListInteraction } from './types';

	export let suggestion: GeolocationNamed;
	export let onSuggestionEvent: OnSuggestionListInteraction;
	export let highlighted: null | GeolocationNamed;

	const navigateList = (event: Event) => {
		onSuggestionEvent(event, suggestion);
	};

	const highlight = () => {
		highlighted = suggestion;
	};
</script>

<li>
	<div
		role="button"
		class="w-full px-2.5 py-1.5 cursor-pointer"
		on:click|self={navigateList}
		on:keydown={navigateList}
		on:mouseenter={highlight}
		on:focus={highlight}
		class:bg-color-action-background-primary-100={highlighted === suggestion}
		tabindex="0"
		data-geocoder-suggestion-id={suggestion.id}
	>
		{#if suggestion.name}
			<h1 class="underline pointer-events-none mb-1">{suggestion.name}</h1>
		{/if}
		{#if suggestion.address}
			<p class="pointer-events-none leading-4">{suggestion.address}</p>
		{/if}
	</div>
</li>
