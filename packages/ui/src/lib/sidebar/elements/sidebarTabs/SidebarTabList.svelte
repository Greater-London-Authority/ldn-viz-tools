<script lang="ts">
	import { XCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getSidebarState } from '../../../sidebar/sidebarState.svelte';
	import {
		tabIconOverride,
		tabLabelOverride,
		tabLayoutOverride,
		tabThemeOverride
	} from '../../../sidebar/sidebarUtils';
	import TabList from '../../../tabs/TabList.svelte';
	import type { Tab } from '../../../tabs/types';
	import { classNames } from '../../../utils/classNames';

	let sidebarState = getSidebarState();

	interface Props {
		/**
		 * List of tabs. An array, of which each entry is an object with the following properties:
		 * * `id` (string): the value that will be assigned to `selectedTabId` when this tab is selected
		 * * `label` (string): the text that should be displayed in the tab label
		 * * `icon` (optional): an icon component (imported from `@steeze-ui/heroicons`) that should be rendered in the tab label
		 * * `rawIcon` (optional): a Svelte component that directly renders an SVG that should be displayed in the tab label
		 * * `content`: a Svelte component that should be rendered in the sidebar when this tab is selected
		 */
		tabs?: Tab[];
		/**
		 * `id` of the currently selected tab
		 */
		selectedTabId?: Tab['id'];

		/**
		 * Enables screen reader to describe purpose of tab list
		 */
		ariaLabel?: string;
		onChange?: any;
	}

	let {
		tabs = [],
		selectedTabId = $bindable(),
		ariaLabel = 'Switch sidebar panel',
		onChange = (tabId: Tab['id']) => {
			if (sidebarState?.isOpen === false) {
				// if we're collapsed, clicking any tab label will open that tab
				sidebarState.isOpen = true;
				selectedTabId = tabId;
			} else if (selectedTabId === tabId) {
				// The sidebarAlways open context is provided by the app shell
				if (sidebarState?.isAlwaysOpen === false || sidebarState?.isAlwaysOpen === undefined) {
					// if we're expanded, clicking the currently selected tab label triggers collapse
					sidebarState.isOpen = !sidebarState?.isOpen;
					selectedTabId = '';
				}
			} else {
				// if we're expanded, clicking a different tab label switched tab
				selectedTabId = tabId;
			}
		}
	}: Props = $props();
</script>

<div class="flex justify-between {tabLayoutOverride[sidebarState?.orientation]}">
	<TabList
		bind:selectedTabId
		{ariaLabel}
		orientation={sidebarState?.orientation}
		{tabs}
		{onChange}
		class={classNames(
			tabLayoutOverride[sidebarState?.orientation],
			tabThemeOverride,
			tabLabelOverride,
			tabIconOverride
		)}
	/>
	{#if sidebarState?.isOpen && !sidebarState?.isAlwaysOpen}
		<div
			class={`text-color-text-muted hover:bg-color-interactive-muted-muted-hover ${tabLabelOverride}`}
		>
			<button onclick={() => (sidebarState.isOpen = !sidebarState?.isOpen)}>
				<Icon src={XCircle} theme="outline" class="mb-1 h-7 w-7" aria-hidden="true" />
				Close
			</button>
		</div>
	{/if}
</div>
