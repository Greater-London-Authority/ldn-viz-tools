<script lang="ts" context="module">
	import { get } from 'svelte/store';

	/**
	 * The default function called when a user clicks on a `TabLabel`.
	 */
	export const handleSelection = (
		sidebarIsOpen: Writable<boolean>,
		sidebarAlwaysOpen: Writable<'true' | 'false'>,
		selectedValue: Writable<string>,
		tabId: string
	) => {
		if (get(sidebarIsOpen) === false) {
			// if we're collapsed, clicking any tab label will open that tab
			sidebarIsOpen.set(true);
			selectedValue.set(tabId);
		} else if (get(selectedValue) === tabId) {
			// The sidebarAlways open context is provided by the app shell
			if (get(sidebarAlwaysOpen) === 'false' || get(sidebarAlwaysOpen) === undefined) {
				// if we're expanded, clicking the currently selected tab label triggers collapse
				sidebarIsOpen.set(false);
				selectedValue.set('');
			}
		} else {
			// if we're expanded, clicking a different tab label switched tab
			selectedValue.set(tabId);
		}
	};
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { classNames } from '../../../utils/classNames';

	/**
	 * Value that will be stored as `selectedValue` in the parent `<SidebarTabList>` if this item is selected.
	 */
	export let tabId: string;

	const { selectedValue, orientation } = getContext<{
		selectedValue: Writable<string>;
		orientation: 'vertical' | 'horizontal';
	}>('tabContext');

	// Context required to make sidebar open/ close
	const sidebarIsOpen = getContext<Writable<boolean>>('sidebarIsOpen');

	// Context provided by wrapping component to force always open
	const sidebarAlwaysOpen = getContext<Writable<'true' | 'false'>>('sidebarAlwaysOpen');

	/**
	 * Function called when user clicks on a tab label.
	 */
	export let selectionHandler = handleSelection;

	const keydownHandler = (ev: KeyboardEvent) => {
		if (ev.key === 'Enter' || ev.key === ' ') {
			selectionHandler(sidebarIsOpen, sidebarAlwaysOpen, selectedValue, tabId);
		}
	};

	const themeClasses = [
		'bg-color-container-level-0 hover:bg-color-action-background-secondary-muted-hover text-color-text-primary'
	];

	const orientationClasses = {
		vertical:
			'text-xs w-20 h-20 p-2 flex flex-col items-center justify-center text-center cursor-pointer',
		horizontal: 'text-base py-2 px-4 flex items-center select-none'
	};

	$: tabLabelClasses = classNames(...themeClasses, orientationClasses[orientation], 'select-none');
</script>

<div
	on:click={() => selectionHandler(sidebarIsOpen, sidebarAlwaysOpen, selectedValue, tabId)}
	on:keydown={keydownHandler}
	tabindex="0"
	role="tab"
	class={classNames(
		tabLabelClasses,
		tabId === $selectedValue
			? '!bg-color-action-background-primary cursor-default !text-color-static-white hover:!bg-color-action-background-primary-hover dark:hover:!text-color-text-inverse-primary'
			: 'cursor-pointer'
	)}
>
	<!-- Label and/or icon -->
	<slot />
</div>
