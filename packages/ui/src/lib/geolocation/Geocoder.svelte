<script lang="ts" context="module">
	type Timeout = ReturnType<typeof setTimeout>;

	const newDebouncer = (func: () => void, delay: number) => {
		let timerId: undefined | Timeout = undefined;

		const restart = () => {
			clearTimeout(timerId);
			timerId = setTimeout(func, delay);
		};

		const clear = () => {
			clearTimeout(timerId);
		};

		return [restart, clear];
	};
</script>

<script lang="ts">
	import { MagnifyingGlass, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import GeocoderSuggestionList from './GeocoderSuggestionList.svelte';

	import type { GeocoderAdapter } from './GeocoderAdapter';
	import type {
		GeolocationNamed, //
		Geolocation,
		GeolocationSearchError,
		OnGeolocationSearchResult,
		OnGeolocationSearchError
	} from './types';

	// adapter to source location suggestions from.
	export let adapter: GeocoderAdapter;

	// delay in ms after a key stroke to minimise redundant API requests.
	export let delay = 250;

	// onLocationSelected is called when a user clicks a location from the
	// suggestions list.
	export let onLocationSelected: undefined | OnGeolocationSearchResult;

	// onSearchError is called when the adapter promise rejects a search request.
	export let onSearchError: undefined | OnGeolocationSearchError;

	// suggestions can be bound via 'bind:suggestions' to reactively receive
	// changes to search results.
	export let suggestions: GeolocationNamed[] = [];

	// classes is a space separated list of additional classes applied to the
	// root container.
	export let classes = '';

	// inputClasses is a space separated list of additional classes applied to
	// the input element because laying input elements can be quite fiddly.
	export let inputClasses = '';

	// showClearButton forces the showing of the clear button at the end of the
	// input element.
	//
	// It is set to false each time the user clicks the button so binding on this
	// prop is useful.
	export let showClearButton = false;

	let container: HTMLElement;
	let query = '';
	let showSuggestionList = false;

	const updateSuggestionsNow = async () => {
		if (!query || query.length < 3) {
			suggestions = [];
			showSuggestionList = false;
			return;
		}

		try {
			suggestions = await adapter
				.search(query)
				.then((res) => res || [])
				.catch((err: unknown) => {
					console.error('[Location Search] Search suggestions could not be retrieved.');
					onSearchError && onSearchError(err as GeolocationSearchError);
					return [];
				});
			showSuggestionList = !!$$slots.default;
		} catch (e: unknown) {
			console.error(e);
			showSuggestionList = false;
		}
	};

	const [scheduleUpdate, cancelUpdate] = newDebouncer(updateSuggestionsNow, delay);

	const closeSuggestionsList = () => {
		cancelUpdate();
		showSuggestionList = false;
	};

	const onSelect = (suggestion: Geolocation) => {
		closeSuggestionsList();
		onLocationSelected && onLocationSelected(suggestion);
	};

	const hideSuggestionList = (event: MouseEvent | KeyboardEvent) => {
		const target = event.target as HTMLElement;
		if (!target || !container || !isElementOrChildOf(target, container)) {
			closeSuggestionsList();
		}
	};

	const isElementOrChildOf = (element: HTMLElement, parent: HTMLElement) => {
		const position = element.compareDocumentPosition(parent);
		return !!(position & Node.DOCUMENT_POSITION_CONTAINS);
	};

	const reshowSuggestionList = () => {
		if (suggestions) {
			showSuggestionList = !!$$slots.default;
		}
	};

	const selectFirstSuggestion = (event: KeyboardEvent) => {
		if (event.key !== 'Enter') {
			return;
		}

		if (showSuggestionList && suggestions && suggestions.length > 0) {
			onSelect(suggestions[0]);
		}
	};

	const clearSearch = () => {
		showClearButton = false;
		query = '';
		suggestions = [];
		showSuggestionList = false;
	};

	$: {
		query;
		scheduleUpdate();
	}
</script>

<svelte:window on:mousedown={hideSuggestionList} on:keyup={hideSuggestionList} />

<search
	bind:this={container}
	class="bg-core-grey-600 pointer-events-auto relative w-full h-10 flex {classes}"
>
	<div class="absolute top-0 left-0 flex items-center justify-center">
		<Icon src={MagnifyingGlass} class="w-10 h-10 py-1 p-2 stroke-white" />
	</div>

	<input
		class="min-w-0 w-64 max-w-[100%] pl-10 grow shrink bg-core-grey-600 border-core-grey-600 placeholder-core-grey-300 h-full text-white {inputClasses}"
		class:pr-8={showClearButton}
		type="search"
		placeholder="Location search"
		bind:value={query}
		on:focus={reshowSuggestionList}
		on:click={reshowSuggestionList}
		on:keyup={reshowSuggestionList}
		on:keypress={selectFirstSuggestion}
	/>

	{#if showClearButton || query?.length > 0}
		<button on:click={clearSearch} class="absolute top-0 right-0 flex items-center justify-center">
			<Icon src={XMark} class="w-10 h-10 py-1 pl-2 pr-1 stroke-white" />
		</button>
	{/if}

	{#if showSuggestionList && suggestions}
		<slot
			onLocationSelected={onSelect}
			attribution={adapter?.attribution ? adapter.attribution() : undefined}
			{suggestions}
		/>
	{/if}
</search>
