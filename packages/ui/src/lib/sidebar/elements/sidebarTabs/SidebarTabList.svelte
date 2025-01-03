<script lang="ts">
	/**
	 * The `<SidebarTabList>` component is a wrapper around the `<TabList>` component it uses `sidebarPlacement` context provided by the `<Sidebar>` to determine it's vertical or horizontal orientation,
	 * As with the `<TabList>` the selected Value is bound to `selectedValue`.
	 *
	 * @component
	 */

	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { tabLayoutOverride } from '../../../sidebar/sidebarUtils';
	import type { PlacementType } from '../../../sidebar/types';
	import TabList from '../../../tabs/TabList.svelte';
	import { classNames } from '../../../utils/classNames';

	/**
	 * The `tabId` of the currently-selected child `<SidebarTabLabel>` component
	 */
	export let selectedValue: string | undefined = undefined;
	let orientation: 'vertical' | 'horizontal' = 'vertical';

	// Get the sidebar placement prop from context and use that to apply classes that make the tabs run horizontal or vertical
	const sidebarPlacementFromContext = getContext<Writable<PlacementType>>('sidebarPlacement');

	const val: Writable<string | undefined> = writable(selectedValue);
	val.subscribe((newVal) => (selectedValue = newVal));

	const respondToExternalChange = (newVal: string | undefined) => {
		if ($val !== newVal) {
			$val = newVal;
		}
	};
	$: respondToExternalChange(selectedValue);

	setContext('tabContext', {
		selectedValue: val,
		orientation
	});
</script>

<TabList
	{orientation}
	bind:selectedValue
	class={classNames(tabLayoutOverride[$sidebarPlacementFromContext])}
>
	<!-- A series of `<SidebarTabLabel>` components -->
	<slot />
</TabList>
