<script lang="ts">
	/**
	 * The `<Sidebar>` component renders a sidebar that is typically used to display controls and textual explanation.
	 *
	 * It should generally be used inside an [AppShell](.//?path=/docs/app-appshell--documentation).
	 *
	 * Note that when the sidebar is collapsed, it is removed by the `AppShell` (rather than merely being hidden).
	 * Any state that should be restored when it is re-opened should be persisted in a Svelte Store.
	 *
	 * @component
	 */
	import { getContext, type ComponentType } from 'svelte';
	import { type Writable } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';
	import TabPanel from './../tabs/TabPanel.svelte';
	import type { Tab } from './../tabs/types';
	import SidebarTabList from './elements/sidebarTabs/SidebarTabList.svelte';
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
	export let selectedValue: Tab['id'] | undefined = undefined;

	let component: ComponentType | undefined;
	$: component = tabs.find((tab) => tab.id === selectedValue)?.content;

	/**
	 * Aria label to describe purpose of sidebar
	 */
	export let sidebarAriaLabel: string = 'Sidebar with information and controls';

	/**
	 * Aria label applied to tabs list
	 */
	export let tabsAriaLabel: string = 'Switch sidebar panel';

	/**
	 * Randomly generated id for sidebar container. Used by `SidebarToggle` to tell screen readers what the toggle controls.
	 */
	export let sidebarId: string = randomId();

	const sidebarPlacementFromContext = getContext<Writable<PlacementType>>('sidebarPlacement');
	const sidebarIsOpen = getContext<Writable<boolean>>('sidebarIsOpen');
	const sidebarAlwaysOpen = getContext<Writable<'true' | 'false'>>('sidebarAlwaysOpen');

	const wrapperClasses = `${position} z-30 ${theme}`;
	const sidebarClasses = 'flex flex-col grow bg-color-container-level-1 pb-6'; // p-6 pad on container or elements (overflow position)

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
	{#if tabs.length}
		<div class={classNames('absolute bg-color-container-level-0', tabPlacementClasses)}>
			<!-- A `<SidebarTabList>`, if the sidebar has tabs-->
			<SidebarTabList {tabs} ariaLabel={tabsAriaLabel} bind:selectedValue />
		</div>
	{:else if $sidebarAlwaysOpen !== 'true'}
		<div class={classNames('absolute', togglePlacementClasses)}>
			<SidebarToggle {sidebarId} />
		</div>
	{/if}

	{#if $sidebarIsOpen}
		<aside
			id={sidebarId}
			aria-label={sidebarAriaLabel}
			class={classNames('flex', heightClasses)}
			transition:slide={{ duration: 300, axis: transitionAxis[placement] }}
		>
			<div
				class={classNames(
					sidebarClasses,
					widthClasses,
					tabs.length && placement === 'left' ? 'ml-[80px]' : ''
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

						{#if tabs.length}
							{#each tabs as tab}
								{#if component && selectedValue === tab.id}
									<TabPanel
										tabPanelId={`${tab.id}-panel`}
										tabId={tab.id}
										class="space-y-4 bg-color-container-level-1"
									>
										<svelte:component this={component} />
									</TabPanel>
								{/if}
							{/each}
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
		</aside>
	{/if}
</div>
