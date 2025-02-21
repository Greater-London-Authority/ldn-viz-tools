<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';

	// unique identifier: will be used to set the value of `selectedValue` for the parent `TabList` when this item is selected
	export let tabId: string;

	const { selectedValue, orientation } = getContext<{
		selectedValue: Writable<string>;
		orientation: 'vertical' | 'horizontal';
	}>('tabContext');

	const handleSelection = () => {
		$selectedValue = tabId;
	};
	const keydownHandler = (ev: KeyboardEvent) => {
		if (ev.key === 'Enter' || ev.key === ' ') {
			handleSelection();
		}
	};

	const orientationClasses = {
		vertical:
			'text-xs w-20 h-20 p-2 flex flex-col items-center justify-center text-center cursor-pointer',
		horizontal: 'text-base py-2 px-4 flex items-center select-none'
	};

	$: tabLabelClasses = classNames(
		'bg-color-input-background-off text-color-text-primary underline hover:bg-color-input-background-hover hover:no-underline',
		orientationClasses[orientation]
	);
</script>

<div
	on:click={handleSelection}
	on:keydown={keydownHandler}
	tabindex="0"
	role="tab"
	class={classNames(
		tabLabelClasses,
		tabId === $selectedValue
			? '!bg-color-input-background-active cursor-default !text-color-static-white no-underline'
			: 'cursor-pointer'
	)}
>
	<!-- contents of the tab label (name and/or icon) -->
	<slot />
</div>
