<script lang="ts">
	import { slide } from 'svelte/transition';
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';
	import TabPanel from './../tabs/TabPanel.svelte';
	import SidebarTabList from './elements/sidebarTabs/SidebarTabList.svelte';
	import SidebarToggle from './elements/sidebarToggle/SidebarToggle.svelte';
	import {
		heightLookup,
		keylineLookup,
		placementLookup,
		tabPlacementLookup,
		togglePlacementLookup,
		transitionAxis,
		widthLookup
	} from './sidebarUtils';

	import { getSidebarState } from './sidebarState.svelte';
	import type { SidebarProps } from './types';

	let sidebarState = getSidebarState();

	let {
		width = 'standard',
		position = 'absolute',
		theme = 'dark',
		placement = 'right',
		tabs = [],
		selectedTabId = $bindable(undefined),
		state = $bindable(),
		sidebarAriaLabel = 'Sidebar with information and controls',
		tabsAriaLabel = 'Switch sidebar panel',
		sidebarId = randomId(),
		unstyledContent,
		header,
		footer,
		sections,
		icon,
		class: classes
	}: SidebarProps = $props();

	const wrapperClasses = $derived(`${position} z-30 ${theme}`);
	const sidebarClasses = $derived(`flex flex-col grow bg-color-container-level-1 pb-6 ${classes}`); // p-6 pad on container or elements (overflow position)

	// expose internal state to parent component
	state = sidebarState;

	// If a context provides a reactive placement use that
	// svelte-ignore state_referenced_locally
	sidebarState.placement = placement;

	// set a store containing the width of the sidebar (for use in app shell and elsewhere up the tree)
	// svelte-ignore state_referenced_locally
	sidebarState.width = width;

	let component = $derived(tabs.find((tab) => tab.id === selectedTabId)?.content);
	let placementClasses = $derived(placementLookup[sidebarState.placement]);
	let togglePlacementClasses = $derived(togglePlacementLookup[sidebarState.placement]);
	let tabPlacementClasses = $derived(tabPlacementLookup[sidebarState.placement]);
	let widthClasses = $derived(widthLookup[sidebarState.width][sidebarState.placement]);
	let heightClasses = $derived(heightLookup[sidebarState.width][sidebarState.placement]);

	const tabKeylineClasses = (placement: string, open: boolean) => {
		let classes = keylineLookup[placement];
		if (placement === 'left') {
			if (open) {
				classes = '!border-0';
			} else {
				classes = keylineLookup[placement];
			}
		}

		return classes;
	};

	const sidebarKeylineClasses = (placement: string, tabs: boolean) => {
		let classes = keylineLookup[placement];
		if (tabs) {
			if (placement === 'left') {
				classes = `border-r border-color-ui-border-secondary`;
			} else {
				classes = `!border-0`;
			}
		}

		return classes;
	};
</script>

<div class={classNames(wrapperClasses, placementClasses)}>
	{#if tabs.length}
		<div
			class={classNames(
				'bg-color-container-level-0 absolute',
				tabPlacementClasses,
				tabKeylineClasses(sidebarState.placement, sidebarState.isOpen)
			)}
		>
			<!-- A `<SidebarTabList>`, if the sidebar has tabs-->
			<SidebarTabList {tabs} ariaLabel={tabsAriaLabel} bind:selectedTabId />
		</div>
	{:else if sidebarState.isAlwaysOpen !== true}
		<div class={classNames('absolute', togglePlacementClasses)}>
			<SidebarToggle {sidebarId} {icon} />
		</div>
	{/if}

	{#if sidebarState.isOpen}
		<aside
			id={sidebarId}
			aria-label={sidebarAriaLabel}
			class={classNames(
				'flex',
				heightClasses,
				sidebarKeylineClasses(sidebarState.placement, !!tabs.length)
			)}
			transition:slide={{ duration: 300, axis: transitionAxis[sidebarState.placement] }}
		>
			<div
				class={classNames(
					sidebarClasses,
					widthClasses,
					tabs.length && sidebarState.placement === 'left' ? 'ml-[80px]' : ''
				)}
			>
				{#if unstyledContent}
					{#if header}
						<div class="pb-4">
							<!-- typically contains a `<SidebarHeader>` -->
							{@render header()}
						</div>
					{/if}

					<!-- can be used to display completely unstyled content - usually not required-->
					{@render unstyledContent()}

					<!-- usually contains a `<SidebarFooter>` -->
					{@render footer?.()}
				{:else}
					<div class="text-color-text-primary flex h-full flex-col overflow-y-auto px-6 pt-6">
						{#if header}
							<div class="pb-4">
								<!-- typically contains a `<SidebarHeader>` -->
								{@render header()}
							</div>
						{/if}

						{#if tabs.length}
							{#each tabs as tab}
								{#if component && selectedTabId === tab.id}
									<TabPanel
										tabPanelId={`${tab.id}-panel`}
										tabId={tab.id}
										class="bg-color-container-level-1 space-y-4"
									>
										{@const SvelteComponent = component}
										<SvelteComponent />
									</TabPanel>
								{/if}
							{/each}
						{/if}

						{#if sections || header}
							<div class="space-y-4">
								<!-- contains main sidebar content - typically a sequence of `<SidebarSection>`s -->
								{@render sections?.()}
							</div>
						{/if}

						<!-- typically contains a `<SidebarFooter>` -->
						{@render footer?.()}
					</div>
				{/if}
			</div>
		</aside>
	{/if}
</div>
