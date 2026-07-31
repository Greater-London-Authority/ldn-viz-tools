<script lang="ts">
	/**
	 * `GeocoderSuggestion` renders a single suggested location; it is used indirectly via the
	 * [GeocoderSuggestionList](./?path=/docs/ui-components-geocoder-geocodersuggestionlist--documentation)
	 *
	 * @component
	 */
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
		class="w-full cursor-pointer px-2.5 py-1.5 focus-visible:outline-none"
		bind:this={divRef}
		onclick={(ev) => {
			if (ev.target === divRef) {
				navigateList(ev);
			}
		}}
		onkeydown={navigateList}
		onmouseenter={highlight}
		onfocus={highlight}
		class:bg-color-interactive-primary-muted={highlighted === suggestion}
		tabindex="0"
		data-geocoder-suggestion-id={suggestion.id}
	>
		{#if suggestion.name}
			<p class="label-tight pointer-events-none mb-1 underline">{suggestion.name}</p>
		{/if}
		{#if suggestion.address}
			<p class="body-sm pointer-events-none">{suggestion.address}</p>
		{/if}
	</div>
</li>
