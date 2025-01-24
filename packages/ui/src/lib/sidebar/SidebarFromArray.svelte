<script lang="ts">
	/**
	 * The `SidebarFromArray` component allows the creation of a tabbed sidebar from a list of objects defining the
	 * tab label and icon, and the component that should be rendered in the sidebar when it is selected.
	 *
	 * @component
	 */

	import { Icon } from '@steeze-ui/svelte-icon';

	import type { IconSource } from '@steeze-ui/heroicons/dist/types';
	import { setContext, type ComponentType } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import {
		LogoCIU,
		LogoMayor,
		//	Sidebar,
		SidebarFooter,
		SidebarTabLabel,
		SidebarTabList
	} from '@ldn-viz/ui';

	import Sidebar from './Sidebar.svelte';
	import type { PlacementType } from '$lib/sidebar/types';

	/**
	 * List of tabs. An array, of which each entry is an object with the following properties:
	 * * `id` (string): the value that wil be assigned to `selectedValue` when this tab is selected
	 * * `label` (string): the text that should be displayed in the tab label
	 * * `icon` (optional): an icon component (imported from `@steeze-ui/heroicons`) that should be rendered in the tab label
	 * * `rawIcon` (optional): a Svelte component that directly renders an SVG that should be displayed in the tab label
	 * * `content`: a Svelte component that should be rendered in the sidebar when this tab is selected
	 */
	export let tabs: {
		id: string;
		label: string;
		icon?: IconSource;
		rawIcon?: ComponentType;
		content: ComponentType;
	}[] = [];

	export let selectedValue = tabs[0].id;

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

	const val: Writable<string> = writable(tabs[0].id);
	val.subscribe((newVal) => (selectedValue = newVal));
	setContext('selectedValue', {
		selectedValue: val
	});

	let component: ComponentType | undefined;
	$: component = tabs.find((d) => d.id === selectedValue)?.content;
</script>

<Sidebar {width} {position} {theme} {placement}>
	<svelte:fragment slot="tabs">
		<SidebarTabList bind:selectedValue>
			{#each tabs as tab}
				<SidebarTabLabel tabId={tab.id}>
					{#if tab.icon}
						<Icon src={tab.icon} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
					{:else if tab.rawIcon}
						<svelte:component this={tab.rawIcon} class="h-5 w-5 mb-1" aria-hidden="true" />
					{/if}
					{tab.label}
				</SidebarTabLabel>
			{/each}
		</SidebarTabList>
	</svelte:fragment>

	<svelte:fragment slot="header">
		<slot name="header" />
	</svelte:fragment>

	<svelte:fragment slot="sections">
		{#if component}
			<svelte:component this={component} />
		{/if}
	</svelte:fragment>

	<SidebarFooter slot="footer">
		<slot name="footer">
			<div class="flex justify-between">
				<div class="w-[165px]">
					<LogoMayor />
				</div>
				<div class="w-[165px]">
					<LogoCIU />
				</div>
			</div>
		</slot>
	</SidebarFooter>
</Sidebar>
