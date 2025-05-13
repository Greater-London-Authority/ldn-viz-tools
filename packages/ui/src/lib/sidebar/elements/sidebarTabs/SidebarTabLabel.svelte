<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Tab } from '../../../tabs/types';
	import { classNames } from '../../../utils/classNames';

	/**
	 * Unique identifier that is used to set the value of `selectedValue` for the parent `TabList` when this item is selected.
	 * Also connects SidebarTabLabel to relevant TabPanel
	 */
	export let tabId: Tab['id'];

	export let handleSelect;

	const { selectedValue } = getContext<{
		selectedValue: Writable<string>;
	}>('sidebarTabContext');

	$: isSelected = tabId === $selectedValue;

	$: sidebarTabLabelClasses = classNames(
		'bg-color-container-level-0 text-color-text-primary hover:bg-color-input-background-hover',
		'focus:ring-inset focus:ring-offset-2 focus:ring-offset-color-action-primary-focussed focus:ring-2 focus:outline-none focus:ring-color-ui-background-primary',
		'text-xs w-20 h-20 p-2 flex flex-col items-center justify-center text-center'
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
		sidebarTabLabelClasses,
		isSelected ? '!bg-color-input-background-active !text-color-static-white cursor-default' : ''
	)}
>
	<!-- contents of the tab label (name and/or icon) -->
	<slot />
</button>
