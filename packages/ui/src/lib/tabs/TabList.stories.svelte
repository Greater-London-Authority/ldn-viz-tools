<script module lang="ts">
	import { Map as MapIcon, Square3Stack3d } from '@steeze-ui/heroicons';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { First, Fourth, Second, Third } from './demoSections';
	import TabList from './TabList.svelte';
	import type { Tab } from './types';

	/**
	 * The `<TabList>` component allows users to select a tab from a list of options.
	 *
	 * It renders just the row (or column) of selectable tab labels, managing
	 * `selectedTabId` and roving-tabindex keyboard focus.
	 * Most applications should use the higher-level [Tabs](./?path=/docs/ui-components-tabs--documentation)
	 * component, which pairs a `<TabList>` with `<TabPanel>`s.
	 *
	 * **Alternatives**: if the user's choice doesn't replace what is rendered below (or, for vertical tabs, to the side of) the control then use the [RadioButton](./?path=/docs/uicomponents-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation) or [RadioButtonSolid](./?path=/docs/ui-components-radiobuttons-radiobuttongroupsolid--documentation).
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Tabs/TabList',
		component: TabList,
		tags: ['autodocs'],
		argTypes: {
			orientation: {
				options: ['horizontal', 'vertical'],
				control: { type: 'radio' }
			}
		}
	});

	let tabs: Tab[] = [
		{ id: 'aggregates', label: 'Aggregates', icon: Square3Stack3d, content: First },
		{ id: 'chargers', label: 'Details', icon: MapIcon, content: Second },
		{ id: 'averages', label: 'Averages', icon: Square3Stack3d, content: Third },
		{ id: 'histograms', label: 'Histograms', icon: MapIcon, content: Fourth }
	];
</script>

<script lang="ts">
	let selectedHorizontal = $state('chargers');
	let selectedVertical = $state('chargers');
</script>

<!--
`<TabList>` shown standalone (no `<TabPanel>`s) in both orientations. Selecting a
tab updates the bound `selectedTabId`; arrow keys move focus between labels via
the roving-tabindex behaviour.
-->
<Story name="Standalone list (horizontal)">
	{#snippet template()}
		<div class="flex flex-col gap-8">
			<p class="pb-2 text-color-text-muted">Horizontal — selected: {selectedHorizontal}</p>
			<TabList
				{tabs}
				orientation="horizontal"
				ariaLabel="View information on EV chargers"
				bind:selectedTabId={selectedHorizontal}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Standalone list (vertical)">
	{#snippet template()}
		<div class="flex flex-col gap-8">
			<div>
				<p class="pb-2 text-color-text-muted">Vertical — selected: {selectedVertical}</p>
				<TabList
					{tabs}
					orientation="vertical"
					ariaLabel="View information on EV chargers"
					bind:selectedTabId={selectedVertical}
				/>
			</div>
		</div>
	{/snippet}
</Story>
