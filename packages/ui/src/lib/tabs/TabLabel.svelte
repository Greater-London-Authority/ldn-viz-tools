<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Button from '../button/Button.svelte';
	import { classNames } from '../utils/classNames';

	// unique identifier: will be used to set the value of `selectedValue` for the parent `TabList` when this item is selected
	export let tabId: string;

	/**
	 * Unique id that corresponds to the panel this tab opens
	 */
	export let tabPanelId: string;

	const { selectedValue, orientation, tabs } = getContext<{
		selectedValue: Writable<string>;
		orientation: 'vertical' | 'horizontal';
		tabs: NodeListOf<HTMLElement>;
	}>('tabContext');

	const findIndexOfTab = (tabs: NodeListOf<HTMLElement>, currentId: string) => {
		const array = Array.from(tabs);

		return array.findIndex((tab: HTMLElement) => tab.id === currentId);
	};

	const moveFocusToTab = (id: string) => {
		document.getElementById(id)?.focus();
	};

	const moveFocusToPreviousTab = (currentTab: HTMLElement, tabs: NodeListOf<HTMLElement>) => {
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

	const moveFocusToNextTab = (currentTab: HTMLElement, tabs: NodeListOf<HTMLElement>) => {
		let index: number;
		const currentTabId = currentTab.id;
		console.log('tabs', tabs);
		const firstTab = tabs[0];
		const lastTab = tabs[tabs.length - 1];

		if (currentTabId === lastTab.id) {
			moveFocusToTab(firstTab.id);
		} else {
			index = findIndexOfTab(tabs, currentTabId);
			moveFocusToTab(tabs[index + 1].id);
		}
	};

	const handleSelection = () => {
		$selectedValue = tabId;
	};
	const keydownHandler = (ev: KeyboardEvent) => {
		const target = ev.target;
		console.log('target', target);

		if (ev.key === 'Enter' || ev.key === ' ') {
			handleSelection();
		}

		if (target instanceof HTMLElement) {
			if (orientation === 'horizontal' && ev.key === 'ArrowLeft') {
				moveFocusToPreviousTab(target, tabs);
			} else if (orientation === 'horizontal' && ev.key === 'ArrowRight') {
				moveFocusToNextTab(target, tabs);
			} else if (orientation === 'vertical' && ev.key === 'ArrowUp') {
				console.log('move to previous tab');
				moveFocusToPreviousTab(target, tabs);
			} else if (orientation === 'vertical' && ev.key === 'ArrowDown') {
				console.log('move to next tab');
				moveFocusToNextTab(target, tabs);
			}
		}
	};

	$: isSelected = tabId === $selectedValue;

	const orientationClasses = {
		vertical: 'text-xs w-20 h-20 p-2 flex-col text-center',
		horizontal: 'text-base py-2 px-4 select-none'
	};

	// $: tabLabelClasses = classNames(
	// 	'bg-color-input-background-off text-color-text-primary underline hover:bg-color-input-background-hover hover:no-underline',
	// 	orientationClasses[orientation]
	// );
</script>

<Button
	on:click={handleSelection}
	on:keydown={keydownHandler}
	id={tabId}
	role="tab"
	emphasis={isSelected ? 'primary' : 'secondary'}
	ariaControls={tabPanelId}
	ariaSelected={isSelected}
	tabindex={isSelected ? 0 : -1}
	class={classNames(
		orientationClasses[orientation],
		tabId === $selectedValue
			? '!bg-color-input-background-active !text-color-static-white cursor-default'
			: ''
	)}
>
	<!-- contents of the tab label (name and/or icon) -->
	<slot />
</Button>
