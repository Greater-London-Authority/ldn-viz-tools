<script lang="ts">
	import { getContext } from 'svelte';
	import { type Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import { classNames } from '../utils/classNames';
	import SidebarToggle from './elements/sidebarToggle/SidebarToggle.svelte';
	import {
		heightLookup,
		placementLookup,
		tabPlacementLookup,
		togglePlacementLookup,
		transitionAxis,
		widthLookup
	} from './sidebarUtils';
	import { sidebarWidthStore } from './stores';
	import type { PlacementType } from './types';

	export let width: 'standard' | 'wide' = 'standard';
	export let position: 'fixed' | 'absolute' = 'absolute';
	export let theme: 'light' | 'dark' = 'dark';
	export let placement: PlacementType = 'right';

	const sidebarPlacementFromContext = getContext<Writable<PlacementType>>('sidebarPlacement');
	const sidebarIsOpen = getContext<Writable<boolean>>('sidebarIsOpen');
	const sidebarAlwaysOpen = getContext<Writable<'true' | 'false'>>('sidebarAlwaysOpen');

	const wrapperClasses = `${position} z-30 ${theme}`;
	const sidebarClasses = 'flex flex-col grow bg-core-grey-50 dark:bg-core-grey-800 pb-6'; // p-6 pad on container or elements (overflow position)

	// If a context provides a reactive placement use that
	$: placement = $sidebarPlacementFromContext ? $sidebarPlacementFromContext : placement;

	$: placementClasses = placementLookup[placement];
	$: togglePlacementClasses = togglePlacementLookup[placement];
	$: tabPlacementClasses = tabPlacementLookup[placement];
	$: widthClasses = widthLookup[width][placement];
	$: heightClasses = heightLookup[width][placement];

	// set a store containing the width of the sidebar (for use in app shell and elsewhere up the tree)
	$: $sidebarWidthStore = width;
</script>

<div class={classNames(wrapperClasses, placementClasses)}>
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
		<div
			class={classNames('flex', heightClasses)}
			transition:slide={{ duration: 300, axis: transitionAxis[placement] }}
		>
			<div
				class={classNames(
					sidebarClasses,
					widthClasses,
					$$slots.tabs && placement === 'left' ? 'ml-[80px]' : ''
				)}
			>
				{#if $$slots.header}
					<div class="p-6 pb-0">
						<slot name="header" />
					</div>
				{/if}

				{#if $$slots.unstyledContent}
					<slot name="unstyledContent" />
					<slot name="footer" />
				{:else}
					<div class="overflow-y-auto flex flex-col h-full pt-6 px-6">
						{#if $$slots.sections}
							<div class="space-y-4">
								<slot name="sections" />
							</div>
						{/if}

						<slot name="footer" />
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
