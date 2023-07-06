<script lang="ts">
	import type { Tab } from './sidebarState';

	import { isWideView, isSidebarOpen, selectedTabId } from './sidebarState';

	export let tabs: Tab[] = [];
	let parentPanelElem;

	const toggleDisplayedPanel = (tabId) => {
		if (!$isSidebarOpen) {
			// Don't remove content if closing the sidebar.
			// The user may reopen the same tab.
			return;
		}

		const panels = parentPanelElem.children;

		for (const panel of panels) {
			if (tabId === panel.dataset.tabId) {
				panel.classList.add('tab-panel-selected-tab');
			} else {
				panel.classList.remove('tab-panel-selected-tab');
			}
		}
	};

	$: parentPanelElem && toggleDisplayedPanel($selectedTabId);
</script>

<div
	bind:this={parentPanelElem}
	role="tabpanel"
	class="tab-panel bg-core-grey-800"
	class:narrow-view={!$isWideView}
	class:wide-view={$isWideView}
>
	<slot />
</div>

<style>
	.tab-panel > :global(:not(.tab-panel-selected-tab)) {
		display: none;
	}

	.narrow-view {
		@apply w-full h-52;
	}

	.wide-view {
		@apply h-full w-52;
	}
</style>
