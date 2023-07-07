<script lang="ts">
	import type { Tab } from './sidebarState';

	import { sidebarTabId } from './sidebarState';
	import Sidebar from './Sidebar.svelte';
	import SidebarTabList from './SidebarTabList.svelte';
	import SidebarTabPanel from './SidebarTabPanel.svelte';

	export let tabs: Tab[] = [];
	export let initialTabId: null | string = null;
	export let hideSpace = false;

	if (initialTabId) {
		sidebarTabId.set(initialTabId);
	}
</script>

<Sidebar {...$$restProps}>
	<SidebarTabList slot="hood" {tabs} {hideSpace} />
	<SidebarTabPanel slot="content">
		<slot />
	</SidebarTabPanel>
</Sidebar>
