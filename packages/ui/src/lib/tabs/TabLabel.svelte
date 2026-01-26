<script lang="ts">
	import { classNames } from '../utils/classNames';
	import type { Tab } from './types';

	interface Props {
		/**
		 * Unique identifier that is used to set the value of `selectedTabId` for the parent `TabList` when this item is selected.
		 * Also connects TabLabel to relevant TabPanel
		 */
		tabId: Tab['id'];
		handleSelect: any;
		orientation?: 'vertical' | 'horizontal';
		selectedTabId?: Tab['id'];
		children?: import('svelte').Snippet;
	}

	let {
		tabId,
		handleSelect,
		orientation = 'vertical',
		selectedTabId = $bindable(),
		children
	}: Props = $props();

	const orientationClasses = {
		vertical: 'text-xs w-20 h-20 p-2 flex flex-col items-center justify-center text-center',
		horizontal: 'text-base py-2 px-4 flex items-center select-none'
	};

	const tabLabelClasses = classNames(
		'bg-color-input-background-off text-color-text underline hover:bg-color-input-background-hover hover:no-underline',
		'focus:ring-inset focus:ring-offset-2 focus:ring-offset-color-interactive-primary-focussed focus:ring-2 focus:outline-none focus:ring-color-surface'
	);

	let isSelected = $derived(tabId === selectedTabId);
</script>

<!-- TODO: Why isn't this a Button? -->
<button
	onclick={() => handleSelect(tabId)}
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
	{@render children?.()}
</button>
