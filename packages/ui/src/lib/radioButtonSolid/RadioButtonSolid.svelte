<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';

	export let value: string;
	export let style: "tab" | "radio" = "tab";

	const keydownHandler = (ev: KeyboardEvent) => {
		if (ev.key === 'Enter' || ev.key === ' ') {
			$selectedValue = value;
		}
	};

	const { selectedValue } = getContext<{ selectedValue: Writable<string> }>('selectedValue');

	const styleClasses = {
		tab: 'flex-auto flex flex-col items-center py-2 select-none hover:border-b-2',
		radio: 'flex-auto flex flex-col items-center py-2 select-none hover:border-b-2',

	};

	const activeClasses = {
		tab: 'border-b-2 border-core-grey-700 text-core-grey-700 dark:text-white dark:border-white',
		radio: 'bg-core-blue-500',

	};

	const inactiveClasses = {
		tab: 'text-core-grey-400 bg-core-grey-50 hover:bg-white hover:border-core-blue-600 dark:text-core-grey-200 dark:bg-core-grey-700',
		radio: 'text-core-grey-400 bg-core-grey-50 hover:bg-white hover:border-core-blue-600 dark:text-core-grey-200 dark:bg-core-grey-700',
	}

</script>

<div
	class={classNames(
		$selectedValue === value ? activeClasses[style] : inactiveClasses[style],
		styleClasses[style]
	)}
	on:click={() => ($selectedValue = value)}
	on:keydown={keydownHandler}
	tabindex="0"
	role="button"
>
	<slot />
</div>
