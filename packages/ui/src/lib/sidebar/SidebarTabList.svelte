<script lang="ts">
	import type { Tab } from './sidebarState';

	import { isWideView } from './sidebarState';
	import SidebarTabLabel from './SidebarTabLabel.svelte';

	export let hideSpace = false;
	export let tabs: Tab[] = [];
</script>

<div
	role="tablist"
	class="bg-core-grey-800 flex pointer-events-auto"
	class:hideSpace
	class:narrow-view={!$isWideView}
	class:wide-view={$isWideView}
>
	{#each tabs as { id, label, icon } (id)}
		<SidebarTabLabel {id} {label} {icon} />
	{/each}
</div>

<style>
	.narrow-view {
		@apply w-full;
	}

	.wide-view {
		@apply h-full flex-col;
	}

	.hideSpace.narrow-view {
		@apply w-min;
	}

	.hideSpace.wide-view {
		@apply h-min;
	}
</style>
