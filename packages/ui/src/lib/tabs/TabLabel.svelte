<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';
	import type { Tab } from './types';

	/**
	 * Unique identifier that is used to set the value of `selectedValue` for the parent `TabList` when this item is selected.
	 * Also connects TabLabel to relevant TabPanel
	 */
	export let tabId: Tab['id'];

	export let handleSelect;

	const { selectedValue, orientation } = getContext<{
		selectedValue: Writable<string>;
		orientation: 'vertical' | 'horizontal';
	}>('tabContext');

	$: isSelected = tabId === $selectedValue;

	const orientationClasses = {
		vertical: 'text-xs w-20 h-20 p-2 flex flex-col items-center justify-center text-center',
		horizontal: 'text-base py-2 px-4 flex items-center select-none'
	};

	$: tabLabelClasses = classNames(
		'bg-color-input-background-off text-color-text-primary underline hover:bg-color-input-background-hover hover:no-underline',
		'focus:ring-inset focus:ring-offset-2 focus:ring-offset-color-action-primary-focussed focus:ring-2 focus:outline-none focus:ring-color-ui-background-primary',
		orientationClasses[orientation]
	);
</script>

<button
	on:click={() => handleSelect(tabId)}
	id={tabId}
	role="tab"
	aria-controls={`${tabId}-panel`}
	aria-selected={isSelected}
	tabindex={isSelected ? 0 : -1}
	class={classNames(
		tabLabelClasses,
		orientationClasses[orientation],
		isSelected
			? '!bg-color-input-background-active !text-color-static-white cursor-default no-underline'
			: ''
	)}
>
	<!-- contents of the tab label (name and/or icon) -->
	<slot />
</button>
