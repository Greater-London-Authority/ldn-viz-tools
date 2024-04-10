<script lang="ts">
	import type {
		GeolocationNamed, //
		OnGeolocationSearchResult
	} from './types';

	export let suggestion: GeolocationNamed;
	export let onLocationSelected: undefined | OnGeolocationSearchResult;
	export let highlighted: null | GeolocationNamed;

	const select = () => {
		onLocationSelected && onLocationSelected(suggestion);
	};

	const highlight = () => {
		highlighted = suggestion;
	};
</script>

<li>
	<div
		role="button"
		class="w-full px-2.5 py-1.5 cursor-pointer"
		on:click|self={select}
		on:keypress={select}
		on:mouseenter={highlight}
		on:focus={highlight}
		class:bg-core-blue-600={highlighted === suggestion}
		tabindex="0"
	>
		{#if suggestion.name}
			<h1 class="underline pointer-events-none mb-1">{suggestion.name}</h1>
		{/if}
		{#if suggestion.address}
			<p class="pointer-events-none leading-4">{suggestion.address}</p>
		{/if}
	</div>
</li>
