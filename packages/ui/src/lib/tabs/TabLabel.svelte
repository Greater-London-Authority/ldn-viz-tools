<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';

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

	const darkThemeClasses = 'dark:bg-core-grey-900 dark:hover:bg-core-blue-700 dark:text-white';

	const lightThemeClasses = 'bg-core-grey-100 hover:bg-core-grey-200 text-core-grey-800';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	const orientationClasses = {
		vertical:
			'text-xs w-20 h-20 p-2 flex flex-col items-center justify-center text-center cursor-pointer',
		horizontal: 'text-base py-2 px-4 flex items-center select-none'
	};

	$: tabLabelClasses = classNames(...themeClasses, orientationClasses[orientation]);
</script>

<div
	on:click={handleSelection}
	on:keydown={keydownHandler}
	tabindex="0"
	role="tab"
	class={classNames(
		tabLabelClasses,
		tabId === $selectedValue ? '!bg-core-blue-600 cursor-default text-white' : 'cursor-pointer'
	)}
>
	<slot />
</div>
