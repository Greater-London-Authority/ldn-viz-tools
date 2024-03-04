<script context="module">
	const newDebouncer = (func, delay) => {
		let timerId = null;

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

<script lang='ts'>
	import { MagnifyingGlass } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import GeocoderSuggestionList from './GeocoderSuggestionList.svelte';
		import type { GeocoderAdapter } from './GeocoderAdapter'
			import type { MapControlLocationUpdate } from './types'

	export let adapter: GeocoderAdapter;

	// delay in ms after a key stroke to minimise redundant API requests.
	export let delay = 250;

	// onLocationSelected is called when a user clicks a location from the
	// suggestions list.
	export let onLocationSelected: MapControlLocationUpdate = undefined;

	// results can be bound via 'bind:results' to be notified of new search
	// results reactively.
	export let results = null;

	// disableSuggestionList can be used to disable to dropdown suggestion
	// list. The suggestion property will still be updated.
	//
	// This is useful if you're binding to the results property and showing
	// the results in custom way.
	export let disableSuggestionList = false;

	// classes is a space separated list of additional classes applied to the
	// root container.
	export let classes = '';

	// inputClasses is a space separated list of additional classes applied to
	// the input element because laying input elements can be quite fiddly.
	export let inputClasses = '';

	let container: HTMLElement;
	let query = '';
	let showSuggestionList = false;

	const updateSuggestionsNow = async () => {
		if (!query || query.length < 3) {
			results = null;
			showSuggestionList = false;
			return;
		}

		try {
			results = (await adapter.search(query)) || [];
			showSuggestionList = !disableSuggestionList;
		} catch (e: Error) {
			console.error(e);
			showSuggestionList = false;
		}
	};

	const [scheduleUpdate, cancelUpdate] = newDebouncer(updateSuggestionsNow, delay);

	const closeSuggestionsList = () => {
		cancelUpdate();
		showSuggestionList = false;
	};

	const onSelect = (suggestion) => {
		closeSuggestionsList();

		if (onLocationSelected) {
			onLocationSelected(suggestion);
		}
	};

	const hideSuggestionList = (event) => {
		if (!isElementOrChildOf(event.target, container)) {
			closeSuggestionsList();
		}
	};

	const isElementOrChildOf = (element, possibleParent) => {
		const position = element.compareDocumentPosition(possibleParent);
		return !!(position & Node.DOCUMENT_POSITION_CONTAINS);
	};

	const reshowSuggestionList = () => {
		if (results) {
			showSuggestionList = !disableSuggestionList;
		}
	};

	const selectFirstSuggestion = (event) => {
		if (!disableSuggestionList && results && results.length > 0 && event.key === 'Enter') {
			onSelect(results[0]);
		}
	};

	$: scheduleUpdate(query);
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
		type="search"
		placeholder="Location search"
		bind:value={query}
		on:focus={reshowSuggestionList}
		on:click={reshowSuggestionList}
		on:keyup={reshowSuggestionList}
		on:keypress={selectFirstSuggestion}
	/>

	{#if showSuggestionList && results}
		<GeocoderSuggestionList {adapter} suggestions={results} {onSelect} />
	{/if}
</search>
