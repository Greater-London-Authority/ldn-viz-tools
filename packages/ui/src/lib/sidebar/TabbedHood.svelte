<script lang='ts'>
	import type { Tab } from './sidebarState'

	import { isWideView } from './sidebarState'
	import TabbedHoodTab from './TabbedHoodTab.svelte'

	export let tabs: Tab[] = [];

	let classes = 'w-full'
	$: classes = $isWideView ? 'flex-col h-full' : 'w-full'
</script>

<div class="bg-core-grey-800 flex {classes}">
	{#each tabs as { id, label, icon } (id)}
		<TabbedHoodTab {id} {label} {icon} />
	{/each}
</div>