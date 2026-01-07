<script lang="ts">
	/**
	 * The `<TabList>` component allows users to select a tab from a list of options.
	 *
	 * **Alternatives**: if the user's choice doesn't replace what is rendered below (or, for vertical tabs, to the side of) the control then use the [RadioButton](./?path=/docs/uicomponents-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation) or [RadioButtonSolid](.-components-radiobuttons-radiobuttongroupsolid--documentation).
	 * @component
	 */

	import { Icon } from '@steeze-ui/svelte-icon';
	import { classNames } from '../utils/classNames';
	import { tabFocus } from './actions';
	import TabLabel from './TabLabel.svelte';
	import type { Tab } from './types';

	const orientationClasses = {
		vertical: 'flex-col w-20 space-y-0.5 pb-0.5',
		horizontal: 'flex border-b-4 border-b-color-ui-primary w-full pt-5 pb-0 space-x-0.5 items-end'
	};

	const iconOrientationClasses = {
		vertical: 'h-5 w-5 mb-1',
		horizontal: 'h-5 w-5 mr-1'
	};

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
		 * orientation of the list of tabs
		 */
		orientation?: 'vertical' | 'horizontal';
		/**
		 * Enables screen reader to describe purpose of tab list. Required.
		 */
		ariaLabel: string;
		onChange?: any;
		handleSelect?: any;
		class?: string;
	}

	let {
		tabs = [],
		selectedTabId = $bindable(),
		orientation = 'horizontal',
		ariaLabel,
		onChange = (_id: Tab['id']) => {},
		handleSelect = (id: Tab['id']) => {
			onChange(id);
			selectedTabId = id;
		},
		class: classes = ''
	}: Props = $props();

	let tabListClasses = $derived(
		classNames(
			'bg-color-container-level-0 text-color-text-primary',
			orientationClasses[orientation],
			classes
		)
	);
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
			<TabLabel tabId={tab.id} {handleSelect} {orientation} bind:selectedTabId>
				{#if tab.icon}
					<Icon
						src={tab.icon}
						theme="solid"
						class={iconOrientationClasses[orientation]}
						aria-hidden="true"
					/>
				{:else if tab.rawIcon}
					<tab.rawIcon class={iconOrientationClasses[orientation]} aria-hidden="true" />
				{/if}
				{tab.label}
			</TabLabel>
		{/each}
	</div>
{/key}
