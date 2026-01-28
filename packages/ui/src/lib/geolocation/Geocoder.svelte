<script lang="ts" module>
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
		GeolocationNamed,
		GeolocationSearchError,
		OnGeolocationSearchError,
		OnGeolocationSearchResult,
		OnSuggestionListInteraction
	} from './types';

	interface Props {
		/**
		 * adapter to source location suggestions from.
		 */
		adapter: GeocoderAdapter;
		/**
		 * delay in ms after a keystroke to minimise redundant API requests.
		 */
		delay?: number;
		/**
		 * called when a user clicks a location from the suggestions list.
		 */
		onLocationSelected: undefined | OnGeolocationSearchResult;
		/**
		 * called when the adapter promise rejects a search request.
		 */
		onSearchError: undefined | OnGeolocationSearchError;
		/**
		 * Called when the user clears the search box.
		 */
		onSearchClear?: any;
		/**
		 * suggestions can be bound via 'bind:suggestions' to reactively receive
		 * changes to search results.
		 */
		suggestions?: GeolocationNamed[];
		/**
		 * The currently selected location.
		 */
		selected?: any;
		/**
		 * a space-separated list of additional classes applied to the root container.
		 */
		classes?: string;
		/**
		 * a space-separated list of additional classes applied to
		 * the input element because laying input elements can be quite fiddly.
		 */
		inputClasses?: string;
		/**
		 * `showClearButton` forces the showing of the clear button at the end of the
		 * input element.
		 *
		 * It is set to `false` each time the user clicks the button so binding on this
		 * prop is useful.
		 */
		showClearButton?: boolean;
		/**
		 * Placeholder text to be displayed in the input element.
		 */
		placeholder?: string;
		children?: import('svelte').Snippet<[any]>;
	}

	let {
		adapter,
		delay = 250,
		onLocationSelected,
		onSearchError,
		onSearchClear = () => {},
		suggestions = $bindable(),
		selected = $bindable(null),
		classes = '',
		inputClasses = '',
		showClearButton = $bindable(false),
		placeholder = 'Location search',
		children
	}: Props = $props();

	let container: HTMLElement | undefined = $state();
	let input: HTMLInputElement | undefined = $state();
	let query = $state('');
	let silentQueryTextUpdate = $state(false);
	let showSuggestionList = $state(false);

	// apply fallback - can't set directly with a bindable
	if (!suggestions) {
		suggestions = [];
	}

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

					// eslint-disable-next-line @typescript-eslint/no-unused-expressions
					onSearchError && onSearchError(err as GeolocationSearchError);
					return [];
				});

			showSuggestionList = !!children;
		} catch (e: unknown) {
			console.error(e);
			showSuggestionList = false;
		}
	};

	const [scheduleUpdate, cancelUpdate] = $derived(newDebouncer(updateSuggestionsNow, delay));

	const closeSuggestionsList = () => {
		cancelUpdate();
		showSuggestionList = false;
	};

	const onSelect = (suggestion: GeolocationNamed) => {
		closeSuggestionsList();
		selected = suggestion;

		if (suggestion.name) {
			query = suggestion.name;
			silentQueryTextUpdate = true;
		} else if (suggestion.address) {
			query = suggestion.address;
			silentQueryTextUpdate = true;
		} else if (suggestion.id) {
			query = suggestion.id;
			silentQueryTextUpdate = true;
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
			const prev = i - 1 >= 0 ? suggestions![i - 1] : undefined;
			focusOnLocation(prev);
		}
	};

	const focusOnNextSuggestion = (suggestion: GeolocationNamed) => {
		const i = findSuggestionIndex(suggestion);
		if (i >= 0) {
			const next = i + 1 < suggestions!.length ? suggestions![i + 1] : undefined;
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
		input!.focus();
		setTimeout(() => {
			const end = input!.value.length;
			input!.setSelectionRange(end, end);
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
			showSuggestionList = !!children;
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

		onSearchClear();
	};

	const updateQuery = (ev: KeyboardEvent) => {
		query = ev.target?.value;

		if (!silentQueryTextUpdate) {
			scheduleUpdate();
		} else {
			silentQueryTextUpdate = false;
		}

		reshowSuggestionList(ev);
	};
</script>

<svelte:window onmousedown={hideSuggestionList} onkeyup={hideSuggestionList} />

<search
	bind:this={container}
	class="bg-color-surface pointer-events-auto relative flex h-10 w-full {classes}"
>
	<div class="absolute left-2 top-2 flex items-center justify-center">
		<Icon src={MagnifyingGlass} class="text-color-input-icon h-6 w-6" />
	</div>

	<input
		bind:this={input}
		type="search"
		{placeholder}
		class="text-color-text form-input border-color-border-muted bg-color-surface placeholder-color-text-wash h-full w-64 min-w-0 max-w-[100%] shrink grow border pl-10 {inputClasses}"
		class:pr-8={showClearButton}
		value={query}
		onfocus={reshowSuggestionList}
		onclick={reshowSuggestionList}
		onkeyup={updateQuery}
	/>

	{#if showClearButton || query?.length > 0}
		<button
			onclick={clearSearch}
			class="y-auto bg-color-surface absolute right-1 top-1 flex items-center justify-center"
			title="Clear search and marker"
		>
			<Icon src={XMark} class="p-0.25 text-color-input-icon h-8 w-8" />
		</button>
	{/if}

	{#if showSuggestionList && suggestions}
		<!-- component that will render the list of suggestions (e.g, `<GeocoderSuggestionList>`)-->
		{@render children?.({
			attribution: adapter?.attribution ? adapter.attribution() : undefined,
			selected,
			suggestions,
			onSuggestionEvent
		})}
	{/if}
</search>

<style>
	[type='search']::-webkit-search-cancel-button {
		appearance: none;
	}
</style>
