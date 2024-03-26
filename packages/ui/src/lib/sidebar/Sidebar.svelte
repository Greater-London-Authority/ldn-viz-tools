<script lang="ts">
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';
	import SidebarToggle from './elements/sidebarToggle/SidebarToggle.svelte';
	import {
		placementLookup,
		tabPlacementLookup,
		togglePlacementLookup,
		widthLookup
	} from './sidebarUtils';
	import { sidebarWidthStore } from './stores';
	import type { PlacementType } from './types';

	export let width: 'standard' | 'wide' = 'standard';
	export let position: 'fixed' | 'absolute' = 'absolute';
	export let placement: PlacementType = 'right';

	const sidebarPlacementFromContext = getContext<Writable<PlacementType>>('sidebarPlacement');
	const sidebarIsOpen = getContext<Writable<boolean>>('sidebarIsOpen');
	const sidebarAlwaysOpen = getContext<Writable<'true' | 'false'>>('sidebarAlwaysOpen');

	const wrapperClasses = `${position} dark transition-all max-w-screen max-h-screen`;
	const sidebarClasses = 'flex flex-col bg-core-grey-800 pb-6 h-full '; // p-6 pad on container or elements (overflow position)

	// If a context provides a reactive placement use that
	$: placement = $sidebarPlacementFromContext ? $sidebarPlacementFromContext : placement;

	$: placementClasses = placementLookup[placement];
	$: togglePlacementClasses = togglePlacementLookup[placement];
	$: tabPlacementClasses = tabPlacementLookup[placement];
	$: widthClasses = widthLookup[width][placement];

	// set a store containing the width of the sidebar (for use in app shell and elsewhere up the tree)
	$: $sidebarWidthStore = width;
</script>

<div class={classNames(wrapperClasses, placementClasses, $sidebarIsOpen ? widthClasses : '')}>
	{#if $$slots.tabs}
		<div class={classNames('absolute bg-core-grey-100 dark:bg-core-grey-900', tabPlacementClasses)}>
			<slot name="tabs" />
		</div>
	{:else if $sidebarAlwaysOpen !== 'true'}
		<div class={classNames('absolute', togglePlacementClasses)}>
			<SidebarToggle />
		</div>
	{/if}

	{#if $sidebarIsOpen}
		<div class={classNames(sidebarClasses)}>
			<div class="p-6 pb-0">
				<slot name="header" />
			</div>
			<div class="overflow-y-auto flex flex-col h-full pt-6 px-6">
				<div class="space-y-4">
					<slot name="sections" />
				</div>

				<slot name="footer" />
			</div>
		</div>
	{/if}
</div>
