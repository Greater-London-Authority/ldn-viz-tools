<script lang="ts">
	import type { Tab } from './sidebarState';

	import { selectedTabId } from './sidebarState';
	import Sidebar from './Sidebar.svelte';
	import TabList from './TabList.svelte';
	import TabPanel from './TabPanel.svelte';

	export let tabs: Tab[] = [];
	export let initialTabId: null | string = null;

	if (initialTabId) {
		selectedTabId.set(initialTabId);
	}
</script>

<Sidebar {...$$restProps}>
	<TabList slot="hood" {tabs} />
	<TabPanel slot="content">
		<slot />
	</TabPanel>
</Sidebar>
