<script lang="ts" context="module">
	import { get } from 'svelte/store';

	/**
	 * The default function called when a user clicks on a `TabLabel`.
	 */
	export const handleSelection = (
		sidebarIsOpen: Writable<boolean>,
		sidebarAlwaysOpen: Writable<'true' | 'false'>,
		selectedValue: Writable<string>,
		tabId: string
	) => {
		if (get(sidebarIsOpen) === false) {
			// if we're collapsed, clicking any tab label will open that tab
			sidebarIsOpen.set(true);
			selectedValue.set(tabId);
		} else if (get(selectedValue) === tabId) {
			// The sidebarAlways open context is provided by the app shell
			if (get(sidebarAlwaysOpen) === 'false' || get(sidebarAlwaysOpen) === undefined) {
				// if we're expanded, clicking the currently selected tab label triggers collapse
				sidebarIsOpen.set(false);
				selectedValue.set('');
			}
		} else {
			// if we're expanded, clicking a different tab label switched tab
			selectedValue.set(tabId);
		}
	};
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import TabLabel from '../../../tabs/TabLabel.svelte';
	import { classNames } from '../../../utils/classNames';

	/**
	 * Value that will be stored as `selectedValue` in the parent `<SidebarTabList>` if this item is selected.
	 */
	export let tabId: string;

	/**
	 * Value that corresponds to panel this tab opens
	 */
	export let sidebarSectionId: string;

	const { selectedValue } = getContext<{
		selectedValue: Writable<string>;
	}>('tabContext');

	// Context required to make sidebar open/ close
	const sidebarIsOpen = getContext<Writable<boolean>>('sidebarIsOpen');

	// Context provided by wrapping component to force always open
	const sidebarAlwaysOpen = getContext<Writable<'true' | 'false'>>('sidebarAlwaysOpen');

	/**
	 * Function called when user clicks on a tab label.
	 */
	export let handler = (tabId: string) =>
		handleSelection(sidebarIsOpen, sidebarAlwaysOpen, selectedValue, tabId);

	$: isSelected = tabId === $selectedValue;

	/**
	 * Function called to set tabindex. When sidebar is closed, all TabLabels have tabindex="0".
	 */
	const setTabIndex = (isSelected: boolean, sidebarIsOpen: boolean) => {
		if (sidebarIsOpen == undefined) {
			return isSelected ? 0 : -1;
		}

		if (!sidebarIsOpen) {
			return 0;
		} else if (sidebarIsOpen && isSelected) {
			return 0;
		} else return -1;
	};

	const themeClasses = [
		'bg-color-container-level-0 hover:bg-color-action-background-secondary-muted-hover text-color-text-primary'
	];

	const orientationClasses =
		'text-xs w-20 h-20 p-2 flex flex-col items-center justify-center text-center';

	$: tabLabelClasses = classNames(...themeClasses, orientationClasses, 'select-none');
</script>

<TabLabel
	{tabId}
	tabPanelId={sidebarSectionId}
	handleSelection={() => {
		handler(tabId);
	}}
	{tabLabelClasses}
	setTabIndex={() => setTabIndex(isSelected, $sidebarIsOpen)}
>
	<!-- Label and/or icon -->
	<slot />
</TabLabel>
