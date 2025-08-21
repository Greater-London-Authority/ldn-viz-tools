<script lang="ts">
	/**
	 * The `<TabList>` component allows users to select a tab from a list of options.
	 *
	 * **Alternatives**: if the user's choice doesn't replace what is rendered below (or, for vertical tabs, to the side of) the control then use the [RadioButton](./?path=/docs/uicomponents-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation) or [RadioButtonSolid](.-components-radiobuttons-radiobuttongroupsolid--documentation).
	 * @component
	 */

	import { Icon } from '@steeze-ui/svelte-icon';
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';
	import { tabFocus } from './actions';
	import TabLabel from './TabLabel.svelte';
	import type { Tab } from './types';

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
	 * orientation of the list of tabs
	 */
	export let orientation: 'vertical' | 'horizontal' = 'horizontal';

	/**
	 * Enables screen reader to describe purpose of tab list. Required.
	 */
	export let ariaLabel: string;

	const val: Writable<Tab['id']> = writable(selectedValue);
	val.subscribe((newVal) => (selectedValue = newVal));

	const respondToExternalChange = (newVal: Tab['id']) => {
		if ($val !== newVal) {
			$val = newVal;
		}
	};
	$: respondToExternalChange(selectedValue);

	setContext('tabContext', {
		selectedValue: val
	});

	const orientationClasses = {
		vertical: 'flex-col w-20 space-y-0.5 pb-0.5',
		horizontal: 'flex border-b-4 border-b-color-ui-primary w-full pt-5 pb-0 space-x-0.5 items-end'
	};

	const iconOrientationClasses = {
		vertical: 'h-5 w-5 mb-1',
		horizontal: 'h-5 w-5 mr-1'
	};

	$: tabListClasses = classNames(
		'bg-color-container-level-0 text-color-text-primary',
		orientationClasses[orientation],
		$$props.class
	);

	export let onChange = (_id: Tab['id']) => {};

	export let handleSelect = (id: Tab['id']) => {
		onChange(id);
		$val = id;
	};
</script>

{#key orientation}
	<div
		class={tabListClasses}
		role="tablist"
		aria-label={ariaLabel}
		aria-orientation={orientation}
		use:tabFocus={{ orientation }}
	>
		{#each tabs as tab}
			<TabLabel tabId={tab.id} {handleSelect} {orientation}>
				{#if tab.icon}
					<Icon
						src={tab.icon}
						theme="solid"
						class={iconOrientationClasses[orientation]}
						aria-hidden="true"
					/>
				{:else if tab.rawIcon}
					<svelte:component
						this={tab.rawIcon}
						class={iconOrientationClasses[orientation]}
						aria-hidden="true"
					/>
				{/if}
				{tab.label}
			</TabLabel>
		{/each}
	</div>
{/key}
