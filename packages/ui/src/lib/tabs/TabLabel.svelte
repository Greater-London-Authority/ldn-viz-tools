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
		'bg-color-action-background-secondary hover:bg-color-action-background-secondary-hover text-color-text-primary',
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
			? '!bg-color-action-background-primary cursor-default text-color-static-white'
			: 'cursor-pointer'
	)}
>
	<!-- contents of the tab label (name and/or icon) -->
	<slot />
</div>
