<script lang="ts">
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';
	import {
		tabLabelOverride,
		tabLayoutOverride,
		tabThemeOverride
	} from '../../../sidebar/sidebarUtils';
	import type { PlacementType } from '../../../sidebar/types';
	import TabList from '../../../tabs/TabList.svelte';
	import { getTabState, setTabState } from '../../../tabs/tabState.svelte';
	import type { Tab } from '../../../tabs/types';
	import { classNames } from '../../../utils/classNames';

	// Context required to make sidebar open/ close
	const sidebarIsOpen = getContext<Writable<boolean>>('sidebarIsOpen');

	// Context provided by wrapping component to force always open
	const sidebarAlwaysOpen = getContext<Writable<'true' | 'false'>>('sidebarAlwaysOpen');

	interface Props {
		/**
		 * List of tabs. An array, of which each entry is an object with the following properties:
		 * * `id` (string): the value that will be assigned to `selectedValue` when this tab is selected
		 * * `label` (string): the text that should be displayed in the tab label
		 * * `icon` (optional): an icon component (imported from `@steeze-ui/heroicons`) that should be rendered in the tab label
		 * * `rawIcon` (optional): a Svelte component that directly renders an SVG that should be displayed in the tab label
		 * * `content`: a Svelte component that should be rendered in the sidebar when this tab is selected
		 */
		tabs?: Tab[];
		/**
		 * `id` of the currently selected tab
		 */
		selectedValue?: Tab['id'];
		/**
		 * Sidebar placement
		 */
		placement?: PlacementType;
		/**
		 * Enables screen reader to describe purpose of tab list
		 */
		ariaLabel?: string;
		onChange?: any;
	}

	let {
		tabs = [],
		selectedValue = $bindable(),
		placement = 'right',
		ariaLabel = 'Switch sidebar panel',
		onChange
	}: Props = $props();

	/**
	 * orientation of the list of tabs
	 */
	let orientation: 'vertical' | 'horizontal' = $derived(
		['top', 'bottom'].includes(placement) ? 'horizontal' : 'vertical'
	);

	setTabState();
	let tabState = getTabState();
	tabState.current = selectedValue ? selectedValue : tabs[0].id;
</script>

<TabList
	bind:selectedValue
	{ariaLabel}
	{orientation}
	{tabs}
	{onChange}
	class={classNames(tabLayoutOverride[orientation], tabThemeOverride, tabLabelOverride)}
/>
