<script lang="ts">
	import type { ComponentType } from 'svelte';

	import { isSidebarOpen, selectedTabId } from './sidebarState';

	export let id: string;
	export let label: string;
	export let icon: ComponentType;

	const keydownHandler = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			clickHandler();
		}
	};

	const clickHandler = () => {
		if ($isSidebarOpen && $selectedTabId === id) {
			selectedTabId.set(null);
			isSidebarOpen.set(false); // Collapse sidebar
			return;
		}

		selectedTabId.set(id);

		if (!$isSidebarOpen) {
			isSidebarOpen.set(true); // Open sidebar
		}
	};

	$: selected = $selectedTabId === id;
</script>

<div
	on:keydown={keydownHandler}
	on:click={clickHandler}
	tabindex="0"
	role="tab"
	class="w-20 h-20 p-2 flex flex-col items-center justify-center text-white text-xs text-center select-none cursor-pointer"
	class:not-selected={!selected}
	class:selected
>
	{label}
	<svelte:component this={icon} class="h-5 w-5 mb-1" aria-hidden="true" />
</div>

<style>
	.not-selected {
		@apply hover:bg-core-grey-600;
	}

	.selected {
		@apply bg-core-blue-600 hover:bg-core-blue-700;
	}
</style>
