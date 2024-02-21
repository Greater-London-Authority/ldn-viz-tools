<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';

	import SidebarTabLabel from './SidebarTabLabel.svelte';
	import SidebarTabList from './SidebarTabList.svelte';

	import type { IconSource } from '@steeze-ui/heroicons/dist/types';
	import { setContext, type ComponentType } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let selectedValue;

	const val: Writable<string> = writable(selectedValue);
	val.subscribe((newVal) => (selectedValue = newVal));
	setContext('selectedValue', {
		selectedValue: val
	});

	export let tabs: {
		id: string;
		label: string;
		icon?: IconSource;
		rawIcon?: ComponentType;
	}[] = [];
</script>

<div class="flex">
	<SidebarTabList>
		{#each tabs as tab}
			<SidebarTabLabel tabId={tab.id}>
				{#if tab.icon}
					<Icon src={tab.icon} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
				{:else if tab.rawIcon}
					<svelte:component this={tab.rawIcon} class="h-5 w-5 mb-1" aria-hidden="true" />
				{/if}
				{tab.label}
			</SidebarTabLabel>
		{/each}
	</SidebarTabList>

	<div class="p-6">
		<slot />
	</div>
</div>
