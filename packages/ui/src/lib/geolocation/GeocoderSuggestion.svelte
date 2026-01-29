<script lang="ts">
	import type { GeolocationNamed, OnSuggestionListInteraction } from './types';

	interface Props {
		suggestion: GeolocationNamed;
		onSuggestionEvent: OnSuggestionListInteraction;
		highlighted: null | GeolocationNamed;
	}

	let { suggestion, onSuggestionEvent, highlighted = $bindable() }: Props = $props();

	const navigateList = (event: Event) => {
		onSuggestionEvent(event, suggestion);
	};

	const highlight = () => {
		highlighted = suggestion;
	};

	let divRef: HTMLDivElement;
</script>

<li>
	<div
		role="button"
		class="w-full cursor-pointer px-2.5 py-1.5"
		bind:this={divRef}
		onclick={(ev) => {
			if (ev.target === divRef) {
				navigateList(ev);
			}
		}}
		onkeydown={navigateList}
		onmouseenter={highlight}
		onfocus={highlight}
		class:bg-color-interactive-primary-100={highlighted === suggestion}
		tabindex="0"
		data-geocoder-suggestion-id={suggestion.id}
	>
		{#if suggestion.name}
			<h1 class="pointer-events-none mb-1 underline">{suggestion.name}</h1>
		{/if}
		{#if suggestion.address}
			<p class="pointer-events-none leading-4">{suggestion.address}</p>
		{/if}
	</div>
</li>
