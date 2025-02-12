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
	class={classNames(orientationClasses[orientation])}
>
	<!-- contents of the tab label (name and/or icon) -->
	<slot />
</Button>
