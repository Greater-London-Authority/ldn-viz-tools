<script lang="ts">
	import TabbedSidebarTabLabel from './TabbedSidebarTabLabel.svelte';
	import TabbedSidebarTabList from './TabbedSidebarTabList.svelte';

	import { setContext, type ComponentType } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let selectedValue;
	export let collapsed = false;

	const val: Writable<string> = writable(selectedValue);
	val.subscribe((newVal) => (selectedValue = newVal));
	setContext('selectedValue', {
		selectedValue: val
	});

	const isCollapsed: Writable<boolean> = writable(collapsed);
	isCollapsed.subscribe((newVal) => (collapsed = newVal));
	setContext('collapsed', {
		collapsed: isCollapsed
	});

	export let tabs: { id: string; label: string; icon: ComponentType }[] = [];
</script>

<div
	id="sidebar"
	class="bg-core-grey-800 h-screen flex"
	class:collapsed
	class:expanded={!collapsed}
>
	<TabbedSidebarTabList>
		{#each tabs as tab}
			<TabbedSidebarTabLabel tabId={tab.id}>
				<svelte:component this={tab.icon} class="h-5 w-5 mb-1" aria-hidden="true" />
				{tab.label}
			</TabbedSidebarTabLabel>
		{/each}
	</TabbedSidebarTabList>

	<div class="p-6" role="tabpanel">
		<slot />
	</div>
</div>

<style>
	.expanded {
		width: 488px;
	}

	.collapsed {
		width: 80px;
		overflow-x: hidden;
	}
</style>
