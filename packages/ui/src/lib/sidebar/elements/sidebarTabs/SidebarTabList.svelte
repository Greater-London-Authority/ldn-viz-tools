<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getContext, setContext } from 'svelte';
	import { get, writable, type Writable } from 'svelte/store';
	import type { PlacementType } from '../../../sidebar/types';
	import { tabFocus } from '../../../tabs/actions';
	import type { Tab } from '../../../tabs/types';
	import { classNames } from '../../../utils/classNames';
	import { tabLayoutOverride } from '../../sidebarUtils';
	import SidebarTabLabel from './SidebarTabLabel.svelte';

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
	 * Enables screen reader to describe purpose of tab list
	 */
	export let ariaLabel: string = 'Switch sidebar panel';

	/**
	 * Sidebar placement retrieved from context and passed down, to inform orientation of TabList
	 */
	export let placement: PlacementType = 'right';

	/**
	 * orientation of the list of tabs, used for screen reader and keyboard accessibility to move tabFocus correctly
	 */
	const getOrientationFromContext = (placement: PlacementType): 'vertical' | 'horizontal' => {
		if (placement == 'right' || placement == 'left') {
			return 'vertical';
		} else return 'horizontal';
	};

	$: orientation = getOrientationFromContext(placement);

	// Context required to make sidebar open/ close
	const sidebarIsOpen = getContext<Writable<boolean>>('sidebarIsOpen');

	// Context provided by wrapping component to force always open
	const sidebarAlwaysOpen = getContext<Writable<'true' | 'false'>>('sidebarAlwaysOpen');

	const val: Writable<Tab['id']> = writable(selectedValue);
	val.subscribe((newVal) => (selectedValue = newVal));

	const respondToExternalChange = (newVal: Tab['id']) => {
		if ($val !== newVal) {
			$val = newVal;
		}
	};
	$: respondToExternalChange(selectedValue);

	setContext('sidebarTabContext', {
		selectedValue: val
	});

	$: sidebarTabListClasses = classNames(tabLayoutOverride[placement]);

	const iconClasses = classNames('h-5 w-5 mb-1');

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

	export let handleSelect = (id: Tab['id']) => {
		onChange(id);
		$val = id;
	};
</script>

<div
	class={sidebarTabListClasses}
	role="tablist"
	aria-label={ariaLabel}
	aria-orientation={orientation}
	use:tabFocus={{ orientation }}
>
	{#each tabs as tab}
		<SidebarTabLabel tabId={tab.id} {handleSelect}>
			{#if tab.icon}
				<Icon src={tab.icon} theme="solid" class={iconClasses} aria-hidden="true" />
			{:else if tab.rawIcon}
				<svelte:component this={tab.rawIcon} class={iconClasses} aria-hidden="true" />
			{/if}
			{tab.label}
		</SidebarTabLabel>
	{/each}
</div>
