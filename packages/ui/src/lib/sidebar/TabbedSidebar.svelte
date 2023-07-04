<script lang='ts'>
	import type { Tab } from './sidebarState'

	import { selectedTabId } from './sidebarState'
	import Sidebar from './Sidebar.svelte'
	import TabbedHood from './TabbedHood.svelte'
	import TabbedContent from './TabbedContent.svelte'

	export let tabs: Tab[] = []
	export let initialTabId: null | string = null

	if (initialTabId) {
		selectedTabId.set(initialTabId)
	}
</script>

<Sidebar {...$$restProps}>
	<TabbedHood slot="hood" {tabs} />
	<TabbedContent slot="content" {tabs}>
		<slot>
			<div class="text-white h-full w-full pt-8 flex justify-center">Todo</div>
		</slot>
	</TabbedContent>
</Sidebar>