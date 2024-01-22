<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';

	import TabbedSidebarTabLabel from './TabbedSidebarTabLabel.svelte';
	import TabbedSidebarTabList from './TabbedSidebarTabList.svelte';

	import type { IconSource } from '@steeze-ui/heroicons/dist/types';
	import { setContext, type ComponentType } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let selectedValue;
	export let collapsed = false;
	export let height = "";

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

	export let tabs: {
		id: string;
		label: string;
		icon?: IconSource;
		rawIcon?: ComponentType;
	}[] = [];
</script>

<div
	id="sidebar"
	class="bg-core-grey-800 flex"
	style={`height: ${height ? height : '100vh'}`}
	class:collapsed
	class:expanded={!collapsed}
>
	<TabbedSidebarTabList>
		{#each tabs as tab}
			<TabbedSidebarTabLabel tabId={tab.id}>
				{#if tab.icon}
					<Icon src={tab.icon} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
				{:else if tab.rawIcon}
					<svelte:component this={tab.rawIcon} class="h-5 w-5 mb-1" aria-hidden="true" />
				{/if}
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
		width: calc(408px + 80px);
	}

	.collapsed {
		width: 80px;
		overflow-x: hidden;
	}
</style>
