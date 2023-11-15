<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';

	export let tabId: string;
	const { selectedValue } = getContext<{ selectedValue: Writable<string> }>('selectedValue');

	const handleSelection = () => {
		$selectedValue = tabId;
	};
	const keydownHandler = (ev: KeyboardEvent) => {
		if (ev.key === 'Enter' || ev.key === ' ') {
			handleSelection();
		}
	};
</script>

<div
	on:click={handleSelection}
	on:keydown={keydownHandler}
	tabindex="0"
	role="tab"
	class={classNames(
		tabId === $selectedValue
			? 'bg-core-blue-600 cursor-default text-white'
			: 'bg-core-grey-100 hover:bg-core-grey-200 text-core-grey-800 dark:bg-core-grey-600 dark:hover:bg-core-grey-500 dark:text-white cursor-pointer',
		'text-base py-2 px-4 flex items-center select-none '
	)}
>
	<slot />
</div>
