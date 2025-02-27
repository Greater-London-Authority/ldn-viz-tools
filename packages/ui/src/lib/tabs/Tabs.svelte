<script lang="ts">
	import type { ComponentType } from 'svelte';
	/**
	 * The `<Tabs>` component creates an accessible set uf tabs comprised of a `<TabList>` containing a set of `<TabLabel>`. Selecting a tab will make the relevant content in the associated `<TabPanel>` visible.
	 *
	 * @component
	 */

	import { classNames } from './../utils/classNames';
	import TabList from './TabList.svelte';
	import TabPanel from './TabPanel.svelte';
	import type { Tab } from './types';

	/**
	 * List of tabs. An array, of which each entry is an object with the following properties:
	 * * `id` (string): the value that will be assigned to `selectedValue` when this tab is selected
	 * * `label` (string): the text that should be displayed in the tab label
	 * * `icon` (optional): an icon component (imported from `@steeze-ui/heroicons`) that should be rendered in the tab label
	 * * `rawIcon` (optional): a Svelte component that directly renders an SVG that should be displayed in the tab label
	 * * `content`: a Svelte component that should be rendered in the sidebar when this tab is selected.
	 */
	export let tabs: Tab[] = [];

	/**
	 * `id` of the currently selected tab - defaults to first in array
	 */
	export let selectedValue: Tab['id'] = tabs[0].id;

	/**
	 * orientation of the list of tabs
	 */
	export let orientation: 'vertical' | 'horizontal' = 'horizontal';

	/**
	 * Enables screen reader to describe purpose of tab list. Required.
	 */
	export let ariaLabel: string;

	let component: ComponentType | undefined;
	$: component = tabs.find((tab) => tab.id === selectedValue)?.content;

	const orientationClasses = {
		vertical: 'flex w-full',
		horizontal: 'flex-col'
	};

	$: tabClasses = classNames(orientationClasses[orientation]);
</script>

<div class={tabClasses}>
	<TabList bind:selectedValue {ariaLabel} {orientation} {tabs} />

	{#each tabs as tab}
		{#if component && selectedValue === tab.id}
			<TabPanel tabPanelId={`${tab.id}-panel`} tabId={tab.id}>
				<svelte:component this={component} />
			</TabPanel>
		{/if}
	{/each}
</div>
