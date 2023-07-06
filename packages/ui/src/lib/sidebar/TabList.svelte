<script lang="ts">
	import type { Tab } from './sidebarState';

	import { isWideView } from './sidebarState';
	import TabLabel from './TabLabel.svelte';

	export let tabs: Tab[] = [];
</script>

<div
	role="tablist"
	class="bg-core-grey-800 flex"
	class:narrow-view={!$isWideView}
	class:wide-view={$isWideView}
>
	{#each tabs as { id, label, icon } (id)}
		<TabLabel {id} {label} {icon} />
	{/each}
</div>

<style>
	.narrow-view {
		@apply w-full;
	}

	.wide-view {
		@apply h-full flex-col;
	}
</style>
