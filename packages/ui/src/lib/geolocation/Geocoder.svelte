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

	import type { GeocoderAdapter } from './GeocoderAdapter';
	import type {
		GeolocationNamed, //
		Geolocation,
		GeolocationSearchError,
		OnGeolocationSearchResult,
		OnGeolocationSearchError,
		OnSuggestionListInteraction
	} from './types';

	/**
	 * adapter to source location suggestions from.
	 */
	export let adapter: GeocoderAdapter;

	/**
	 * delay in ms after a key stroke to minimise redundant API requests.
	 */
	export let delay = 250;

	/**
	 * called when a user clicks a location from the suggestions list.
	 */
	export let onLocationSelected: undefined | OnGeolocationSearchResult;

	/**
	 * called when the adapter promise rejects a search request.
	 */
	export let onSearchError: undefined | OnGeolocationSearchError;

	/**
	 * suggestions can be bound via 'bind:suggestions' to reactively receive
	 * changes to search results.
	 */
	export let suggestions: GeolocationNamed[] = [];

	/**
	 * The currently selected location.
	 */
	export let selected = null;

	/**
	 * a space-separated list of additional classes applied to the root container.
	 */
	export let classes = '';

	/**
	 * a space-separated list of additional classes applied to
	 * the input element because laying input elements can be quite fiddly.
	 */
	export let inputClasses = '';

	/**
	 * `showClearButton` forces the showing of the clear button at the end of the
	 * input element.
	 *
	 * It is set to `false` each time the user clicks the button so binding on this
	 * prop is useful.
	 */
	export let showClearButton = false;

	let container: HTMLElement;
	let input: HTMLInputElement;
	let query = '';
	let silentQueryUpdate = false;
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
		selected = suggestion;

		if (suggestion.address) {
			query = suggestion.address;
			silentQueryUpdate = true;
		} else if (suggestion.name) {
			query = suggestion.name;
			silentQueryUpdate = true;
		}

		onLocationSelected && onLocationSelected(suggestion);
	};

	const onSuggestionEvent: OnSuggestionListInteraction = (
		event: Event,
		suggestion: GeolocationNamed
	) => {
		const pressEvent = event as KeyboardEvent;
		const clickEvent = event as PointerEvent;

		if (pressEvent.key === 'Enter' || clickEvent.type === 'click') {
			onSelect(suggestion);
			return;
		}

		if (pressEvent.key === 'Escape') {
			closeSuggestionsList();
			return;
		}

		if (pressEvent.key === 'ArrowDown') {
			focusOnNextSuggestion(suggestion);
			return;
		}

		if (pressEvent.key === 'ArrowUp') {
			if (isFirstSuggestion(suggestion)) {
				focusOnInput();
				return;
			}

			focusOnPrevSuggestion(suggestion);
		}
	};

	const findSuggestionIndex = (suggestion?: GeolocationNamed) => {
		if (!suggestion || !suggestions) {
			return -1;
		}

		for (let i = 0; i < suggestions.length; i++) {
			if (suggestions[i].id === suggestion.id) {
				return i;
			}
		}

		return -1;
	};

	const isFirstSuggestion = (suggestion: GeolocationNamed) => {
		return findSuggestionIndex(suggestion) === 0;
	};

	const focusOnPrevSuggestion = (suggestion: GeolocationNamed) => {
		const i = findSuggestionIndex(suggestion);
		if (i >= 0) {
			const prev = i - 1 >= 0 ? suggestions[i - 1] : undefined;
			focusOnLocation(prev);
		}
	};

	const focusOnNextSuggestion = (suggestion: GeolocationNamed) => {
		const i = findSuggestionIndex(suggestion);
		if (i >= 0) {
			const next = i + 1 < suggestions.length ? suggestions[i + 1] : undefined;
			focusOnLocation(next);
		}
	};

	const focusOnLocation = (suggestion?: GeolocationNamed) => {
		if (!suggestion) {
			return;
		}

		const elem = document.querySelector(`[data-geocoder-suggestion-id="${suggestion.id}"]`);
		if (elem) {
			(elem as HTMLElement).focus();
		}
	};

	const focusOnInput = () => {
		input.focus();
		setTimeout(() => {
			const end = input.value.length;
			input.setSelectionRange(end, end);
		}, 0);
	};

	const hideSuggestionList = (event: Event) => {
		const target = event.target as HTMLElement;
		if (!target || !container || !isElementOrChildOf(target, container)) {
			closeSuggestionsList();
		}
	};

	const isElementOrChildOf = (element: HTMLElement, parent: HTMLElement) => {
		const positionBitmask = element.compareDocumentPosition(parent);
		return !!(positionBitmask & Node.DOCUMENT_POSITION_CONTAINS);
	};

	const reshowSuggestionList = (event: Event) => {
		if (suggestions) {
			showSuggestionList = !!$$slots.default;
		}

		navigateSuggestionList(event);
	};

	const navigateSuggestionList = (event: Event) => {
		if (!showSuggestionList || !suggestions || suggestions.length === 0) {
			return;
		}

		const pressEvent = event as KeyboardEvent;

		if (pressEvent.key === 'Enter') {
			onSelect(suggestions[0]);
			return;
		}

		if (pressEvent.key === 'Escape') {
			closeSuggestionsList();
			return;
		}

		if (pressEvent.key === 'ArrowDown') {
			focusOnLocation(suggestions[0]);
		}
	};

	const clearSearch = () => {
		showClearButton = false;
		query = '';
		selected = null;
		suggestions = [];
		showSuggestionList = false;
	};

	$: {
		query;
		if (!silentQueryUpdate) {
			scheduleUpdate();
		} else {
			silentQueryUpdate = false;
		}
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
		bind:this={input}
		type="search"
		placeholder="Location search"
		class="min-w-0 w-64 max-w-[100%] pl-10 grow shrink bg-core-grey-600 border-core-grey-600 placeholder-core-grey-300 h-full text-white {inputClasses}"
		class:pr-8={showClearButton}
		bind:value={query}
		on:focus={reshowSuggestionList}
		on:click={reshowSuggestionList}
		on:keyup={reshowSuggestionList}
	/>

	{#if showClearButton || query?.length > 0}
		<button
			on:click={clearSearch}
			class="absolute top-0 right-0 flex items-center justify-center"
			title="Clear search and marker"
		>
			<Icon src={XMark} class="w-10 h-10 py-1 pl-2 pr-1 stroke-white" />
		</button>
	{/if}

	{#if showSuggestionList && suggestions}
		<!-- component that will render the list of suggestions (e.g, `<GeocoderSuggestionList>`)-->
		<slot
			attribution={adapter?.attribution ? adapter.attribution() : undefined}
			{suggestions}
			{onSuggestionEvent}
		/>
	{/if}
</search>
