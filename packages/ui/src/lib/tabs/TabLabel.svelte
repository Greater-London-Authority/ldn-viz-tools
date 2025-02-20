<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';

	/**
	 * Unique identifier: will be used to set the value of `selectedValue` for the parent `TabList` when this item is selected
	 * Also connects TabLabel to relevant TabPanel
	 */
	export let tabId: string;

	/**
	 * Unique id that corresponds to the panel this tab opens
	 */
	export let tabPanelId: string;

	export let setTabIndex = (isSelected: boolean) => {
		return isSelected ? 0 : -1;
	};

	const { selectedValue, orientation, tabs } = getContext<{
		selectedValue: Writable<string>;
		orientation: 'vertical' | 'horizontal';
		tabs: Writable<HTMLElement[]>;
	}>('tabContext');

	/**
	 * Utility functions to handle changing focus on keypresses
	 */

	const findIndexOfTab = (tabs: HTMLElement[], currentId: string) => {
		const array = Array.from(tabs);

		return array.findIndex((tab: HTMLElement) => tab.id === currentId);
	};

	const moveFocusToTab = (id: string) => {
		document.getElementById(id)?.focus();
	};

	const moveFocusToPreviousTab = (currentTab: HTMLElement, tabs: HTMLElement[]) => {
		let index: number;
		const currentTabId = currentTab.id;
		const firstTab = tabs[0];
		const lastTab = tabs[tabs.length - 1];

		if (currentTabId === firstTab.id) {
			moveFocusToTab(lastTab.id);
		} else {
			index = findIndexOfTab(tabs, currentTabId);
			moveFocusToTab(tabs[index - 1].id);
		}
	};

	const moveFocusToNextTab = (currentTab: HTMLElement, tabs: HTMLElement[]) => {
		let index: number;
		const currentTabId = currentTab.id;
		const firstTab = tabs[0];
		const lastTab = tabs[tabs.length - 1];

		if (currentTabId === lastTab.id) {
			moveFocusToTab(firstTab.id);
		} else {
			index = findIndexOfTab(tabs, currentTabId);
			moveFocusToTab(tabs[index + 1].id);
		}
	};

	/**
	 * Event handlers
	 */
	export let handleSelection = () => {
		$selectedValue = tabId;
	};

	const keydownHandler = (ev: KeyboardEvent) => {
		const target = ev.target;

		if (target instanceof HTMLElement) {
			if (orientation === 'horizontal' && ev.key === 'ArrowLeft') {
				moveFocusToPreviousTab(target, $tabs);
			} else if (orientation === 'horizontal' && ev.key === 'ArrowRight') {
				moveFocusToNextTab(target, $tabs);
			} else if (orientation === 'vertical' && ev.key === 'ArrowUp') {
				moveFocusToPreviousTab(target, $tabs);
			} else if (orientation === 'vertical' && ev.key === 'ArrowDown') {
				moveFocusToNextTab(target, $tabs);
			}
		}
	};

	$: isSelected = tabId === $selectedValue;

	const orientationClasses = {
		vertical: 'text-xs w-20 h-20 p-2 flex flex-col items-center justify-center text-center',
		horizontal: 'text-base py-2 px-4 flex items-center select-none'
	};

	export let tabLabelClasses = classNames(
		'bg-color-input-background-off text-color-text-primary underline hover:bg-color-input-background-hover hover:no-underline',
		orientationClasses[orientation]
	);
</script>

<button
	on:click={handleSelection}
	on:keydown={keydownHandler}
	id={tabId}
	role="tab"
	aria-controls={tabPanelId}
	aria-selected={isSelected}
	tabindex={setTabIndex(isSelected)}
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
