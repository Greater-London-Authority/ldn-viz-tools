<script lang="ts">
	//TODO: RESTRUCTURE TABS USING REACTIVE CONTECT INSTEAD OF BINDING TO PASS STATE

	/**
	 * The `<Tabs>` component creates an accessible set uf tabs comprised of a `<TabList>` containing a set of `<TabLabel>`. Selecting a tab will make the relevant content in the associated `<TabPanel>` visible.
	 *
	 * @component
	 */

	import { classNames } from './../utils/classNames';
	import TabList from './TabList.svelte';
	import TabPanel from './TabPanel.svelte';
	import { getTabState, setTabState } from './tabState.svelte';
	import type { Tab } from './types';

	setTabState();
	let tabState = getTabState();

	interface Props {
		/**
		 * List of tabs. An array, of which each entry is an object with the following properties:
		 * * `id` (string): the value that will be assigned to `selectedTabId` when this tab is selected
		 * * `label` (string): the text that should be displayed in the tab label
		 * * `icon` (optional): an icon component (imported from `@steeze-ui/heroicons`) that should be rendered in the tab label
		 * * `rawIcon` (optional): a Svelte component that directly renders an SVG that should be displayed in the tab label
		 * * `content`: a Svelte component that should be rendered in the sidebar when this tab is selected.
		 */
		tabs?: Tab[];

		/**
		 * `id` of the currently selected tab - defaults to first in array
		 */
		selectedTabId?: Tab['id'];

		/**
		 * orientation of the list of tabs
		 */
		orientation?: 'vertical' | 'horizontal';

		/**
		 * Enables screen reader to describe purpose of tab list. Required.
		 */
		ariaLabel: string;
	}

	let {
		tabs = [],
		selectedTabId = $bindable(),
		orientation = 'horizontal',
		ariaLabel
	}: Props = $props();

	tabState.current = selectedTabId ? selectedTabId : tabs.length ? tabs[0].id : undefined;

	let component = $derived(tabs.find((tab) => tab.id === tabState.current)?.content);

	const orientationClasses = {
		vertical: 'flex w-full',
		horizontal: 'flex-col'
	};

	let tabClasses = $derived(classNames(orientationClasses[orientation]));
</script>

<div class={tabClasses}>
	<TabList {ariaLabel} {orientation} {tabs} bind:selectedTabId={tabState.current} />

	{#each tabs as tab}
		{#if component && tabState.current === tab.id}
			<TabPanel tabPanelId={`${tab.id}-panel`} tabId={tab.id}>
				{@const SvelteComponent = component}
				<SvelteComponent />
			</TabPanel>
		{/if}
	{/each}
</div>
