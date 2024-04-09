<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { tabLayoutOverride } from '../../../sidebar/sidebarUtils';
	import type { PlacementType, SidebarPlacement } from '../../../sidebar/types';
	import TabList from '../../../tabs/TabList.svelte';
	import { classNames } from '../../../utils/classNames';

	export let selectedValue: string | undefined = undefined;
	let orientation: 'vertical' | 'horizontal' = 'vertical';

	// Get the sidebar placement prop from context and use that to apply classes that make the tabs run horizontal or vertical
	const sidebarPlacementFromContext = getContext<Writable<PlacementType>>('sidebarPlacement');

	const val: Writable<string | undefined> = writable(selectedValue);
	val.subscribe((newVal) => (selectedValue = newVal));

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
	<slot />
</TabList>
