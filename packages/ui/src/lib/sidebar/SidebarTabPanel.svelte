<script lang="ts">
	import type { Tab } from './sidebarState';

	import { isWideView, isSidebarOpen, sidebarTabId } from './sidebarState';

	let panelElem;

	$: if (panelElem && $isSidebarOpen) {
		for (const tabContent of panelElem.children) {
			if ($sidebarTabId === tabContent.dataset.tabId) {
				tabContent.classList.add('tab-panel-selected-tab-content');
			} else {
				tabContent.classList.remove('tab-panel-selected-tab-content');
			}
		}
	}
</script>

<div
	bind:this={panelElem}
	role="tabpanel"
	class="tab-panel bg-core-grey-800 p-6 text-white flex wide:flex-col overflow-y-auto"
	class:narrow-view={!$isWideView}
	class:wide-view={$isWideView}
>
	<slot />
</div>

<style>
	.tab-panel > :global(:not(.tab-panel-selected-tab-content)) {
		display: none;
	}

	.narrow-view {
		@apply w-full h-[400px];
	}

	.wide-view {
		@apply h-full w-[400px];
	}
</style>
