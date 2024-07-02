<script lang="ts">
	/**
	 * The `<Sidebar>` component renders a sidebar that is typically used to display controls and textual explanation.
	 *
	 * It should generally be used inside an [AppShell](.//?path=/docs/app-appshell--documentation)
	 *
	 * @component
	 */
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

	/**
	 * Width of the sidebar.
	 */
	export let width: 'standard' | 'wide' = 'standard';
	/**
	 * Position of the sidebar which can be `fixed` to the screen so it's always shown
	 * in the same screen location regardless of scroll position or `absolute`,
	 * positioned relative to the nearest parent  container with the `relative` CSS
	 * position (usually the `AppShell` component).
	 */
	export let position: 'fixed' | 'absolute' = 'absolute';
	/**
	 * Colour scheme to use, either `light` or `dark`.
	 */
	export let theme: 'light' | 'dark' = 'dark';
	export let placement: PlacementType = 'right';

	const sidebarPlacementFromContext = getContext<Writable<PlacementType>>('sidebarPlacement');
	const sidebarIsOpen = getContext<Writable<boolean>>('sidebarIsOpen');
	const sidebarAlwaysOpen = getContext<Writable<'true' | 'false'>>('sidebarAlwaysOpen');

	const wrapperClasses = `${position} z-30 ${theme}`;
	const sidebarClasses = 'flex flex-col grow bg-color-container-background-level-1 pb-6'; // p-6 pad on container or elements (overflow position)

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
		<div class={classNames('absolute bg-color-container-background-level-0', tabPlacementClasses)}>
			<!-- should contain a `<SidebarTabList>`, if the sidebar has tabs-->
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
				{#if $$slots.unstyledContent}
					{#if $$slots.header}
						<div class="pb-4">
							<!-- typically contains a `<SidebarHeader>` -->
							<slot name="header" />
						</div>
					{/if}

					<!-- can be used to display completely unstyled content - usually not required-->
					<slot name="unstyledContent" />

					<!-- usually contains a `<SidebarFooter>` -->
					<slot name="footer" />
				{:else}
					<div class="overflow-y-auto flex flex-col h-full pt-6 px-6 text-color-text-primary">
						{#if $$slots.header}
							<div class="pb-4">
								<!-- typically contains a `<SidebarHeader>` -->
								<slot name="header" />
							</div>
						{/if}

						{#if $$slots.sections || $$slots.header}
							<div class="space-y-4">
								<!-- contains main sidebar content - typically a sequence of `<SidebarSection>`s -->
								<slot name="sections" />
							</div>
						{/if}

						<!-- typically contains a `<SidebarFooter>` -->
						<slot name="footer" />
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
