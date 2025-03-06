<script lang="ts">
	import { getContext } from 'svelte';
	import { get, type Writable } from 'svelte/store';
	import { tabLayoutOverride, tabThemeOverride } from '../../../sidebar/sidebarUtils';
	import type { PlacementType } from '../../../sidebar/types';
	import TabList from '../../../tabs/TabList.svelte';
	import type { Tab } from '../../../tabs/types';
	import { classNames } from '../../../utils/classNames';

	// Get the sidebar placement prop from context and use that to apply classes that make the tabs run horizontal or vertical
	const sidebarPlacementFromContext = getContext<Writable<PlacementType>>('sidebarPlacement');

	/**
	 * List of tabs. An array, of which each entry is an object with the following properties:
	 * * `id` (string): the value that will be assigned to `selectedValue` when this tab is selected
	 * * `label` (string): the text that should be displayed in the tab label
	 * * `icon` (optional): an icon component (imported from `@steeze-ui/heroicons`) that should be rendered in the tab label
	 * * `rawIcon` (optional): a Svelte component that directly renders an SVG that should be displayed in the tab label
	 * * `content`: a Svelte component that should be rendered in the sidebar when this tab is selected
	 */
	export let tabs: Tab[] = [];

	/**
	 * `id` of the currently selected tab
	 */
	export let selectedValue: Tab['id'] = tabs[0].id;

	/**
	 * orientation of the list of tabs
	 */
	export let orientation: 'vertical' | 'horizontal' = 'vertical';

	/**
	 * Enables screen reader to describe purpose of tab list
	 */
	export let ariaLabel: string = 'Switch sidebar panel';

	// Context required to make sidebar open/ close
	const sidebarIsOpen = getContext<Writable<boolean>>('sidebarIsOpen');

	// Context provided by wrapping component to force always open
	const sidebarAlwaysOpen = getContext<Writable<'true' | 'false'>>('sidebarAlwaysOpen');

	export let onChange = (tabId: Tab['id']) => {
		if (get(sidebarIsOpen) === false) {
			// if we're collapsed, clicking any tab label will open that tab
			sidebarIsOpen.set(true);
			selectedValue = tabId;
		} else if (selectedValue === tabId) {
			// The sidebarAlways open context is provided by the app shell
			if (get(sidebarAlwaysOpen) === 'false' || get(sidebarAlwaysOpen) === undefined) {
				// if we're expanded, clicking the currently selected tab label triggers collapse
				sidebarIsOpen.set(false);
				selectedValue = '';
			}
		} else {
			// if we're expanded, clicking a different tab label switched tab
			selectedValue = tabId;
		}
	};
</script>

<TabList
	bind:selectedValue
	{ariaLabel}
	{orientation}
	{tabs}
	class={classNames(tabLayoutOverride[$sidebarPlacementFromContext], tabThemeOverride)}
	{onChange}
/>
