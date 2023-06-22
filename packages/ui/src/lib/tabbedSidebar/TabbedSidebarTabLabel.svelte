<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/types/runtime/store';

	export let tabId: string;

	const { selectedValue } = getContext<{ selectedValue: Writable<string> }>('selectedValue');
	const { collapsed } = getContext<{ collapsed: Writable<boolean> }>('collapsed');

	const handleSelection = () => {
		if ($collapsed) {
			// if we're collapsed, clicking any tab label will open that tab
			$collapsed = false;
			$selectedValue = tabId;
		} else if ($selectedValue == tabId) {
			// if we're expanded, clicking the currently selected tab label triggers collapse
			$collapsed = true;
			$selectedValue = '';
		} else {
			// if we're expanded, clicking a different tab label switched tab
			$selectedValue = tabId;
		}
	};

	const keydownHandler = (ev: KeyboardEvent) => {
		if (ev.key === 'Enter' || ev.key === ' ') {
			handleSelection();
		}
	};

	const classNames = (...classes: string[]) => {
		return classes.filter(Boolean).join(' ');
	};
</script>

<div
	on:click={handleSelection}
	on:keydown={keydownHandler}
	tabindex="0"
	role="tab"
	class={classNames(
		tabId === $selectedValue ? 'bg-core-blue-600 hover:bg-core-blue-700' : 'hover:bg-core-grey-600',
		'w-20 h-20 p-2 flex flex-col items-center justify-center text-white text-xs text-center select-none cursor-pointer'
	)}
>
	<slot />
</div>
