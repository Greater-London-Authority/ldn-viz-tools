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

	const handleSelection = () => {
		if ($sidebarIsOpen === false) {
			// if we're collapsed, clicking any tab label will open that tab
			$sidebarIsOpen = true;
			$selectedValue = tabId;
		} else if ($selectedValue === tabId) {
			// The sidebarAlways open context is provided by the app shell
			if ($sidebarAlwaysOpen === 'false' || $sidebarAlwaysOpen === undefined) {
				// if we're expanded, clicking the currently selected tab label triggers collapse
				$sidebarIsOpen = false;
				$selectedValue = '';
			}
		} else {
			// if we're expanded, clicking a different tab label switched tab
			$selectedValue = tabId;
		}
	};

	const keydownHandler = (ev: KeyboardEvent) => {
		if (ev.key === 'Enter' || ev.key === ' ') {
			handleSelection();
		}
	};

	const themeClasses = [
		'bg-color-action-background-secondary hover:bg-color-action-background-secondary-hover text-color-text-primary'
	];

	const orientationClasses = {
		vertical:
			'text-xs w-20 h-20 p-2 flex flex-col items-center justify-center text-center cursor-pointer',
		horizontal: 'text-base py-2 px-4 flex items-center select-none'
	};

	$: tabLabelClasses = classNames(...themeClasses, orientationClasses[orientation], 'select-none');
</script>

<div
	on:click={handleSelection}
	on:keydown={keydownHandler}
	tabindex="0"
	role="tab"
	class={classNames(
		tabLabelClasses,
		tabId === $selectedValue
			? '!bg-color-action-background-primary cursor-default !text-color-static-white hover:!bg-color-action-background-primary-hover'
			: 'cursor-pointer'
	)}
>
	<!-- Label and/or icon -->
	<slot />
</div>
