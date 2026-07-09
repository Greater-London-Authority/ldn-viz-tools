<script module lang="ts">
	import TabList from './TabList.svelte';
	import TabPanel from './TabPanel.svelte';
	import Tabs from './Tabs.svelte';

	import { Map as MapIcon, Square3Stack3d } from '@steeze-ui/heroicons';

	//Example components passed to panel In reality these would be contained in your app
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import OpacityIcon from '../layerControl/OpacityIcon.svelte';
	import { First, Fourth, Second, Third } from './demoSections';
	import type { Tab } from './types';

	/**
	 * The `<Tabs>` component creates an accessible set of tabs comprised of a `<TabList>` containing a set of `<TabLabel>`. Selecting a tab will make the relevant content in the associated `<TabPanel>` visible.
	 *
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Tabs',
		component: Tabs,
		tags: ['autodocs'],
		subcomponents: { TabPanel, TabList },
		argTypes: {
			orientation: {
				options: ['horizontal', 'vertical'],
				control: { type: 'radio' }
			}
		}
	});

	let tabs: Tab[] = [
		{
			id: 'aggregates',
			label: 'Aggregated counts across London',
			content: First
		},
		{
			id: 'chargers',
			label: 'Details of chargers',
			content: Second
		},
		{
			id: 'averages',
			label: 'Averages of charge events',
			content: Third
		},
		{
			id: 'histograms',
			label: 'Histograms of charge events',
			content: Fourth
		}
	];

	let tabsWithIcons: Tab[] = [
		{ id: 'aggregates', label: 'Aggregates', icon: Square3Stack3d, content: First },
		{ id: 'chargers', label: 'Details', icon: MapIcon, content: Second },
		{ id: 'averages', label: 'Averages', icon: Square3Stack3d, content: Third },
		{ id: 'histograms', label: 'Histograms', icon: MapIcon, content: Fourth }
	];

	let descriptions = [
		{
			id: 'aggregates',
			value:
				'You may want a responsive description preceding the Tabs based on the selected tab. The selected tab is: Aggregates'
		},
		{
			id: 'chargers',
			value:
				'The selected tab is: Chargers. You can make this description more or less programmatically...'
		},
		{
			id: 'averages',
			value:
				'You may want a responsive description preceding the Tabs based on the selected tab. The selected tab is: Averages'
		},
		{
			id: 'histograms',
			value:
				'You may want a responsive description preceding the Tabs based on the selected tab. The selected tab is: Histograms of charge events'
		}
	];

	let tabsWithRawIcon: Tab[] = [
		{ id: 'aggregates', label: 'Aggregates', rawIcon: OpacityIcon, content: First },
		{ id: 'chargers', label: 'Details', rawIcon: OpacityIcon, content: Second },
		{ id: 'averages', label: 'Averages', rawIcon: OpacityIcon, content: Third },
		{ id: 'histograms', label: 'Histograms', rawIcon: OpacityIcon, content: Fourth }
	];

	let tabsManyLong: Tab[] = [
		{
			id: 'aggregates',
			label: 'Aggregated counts of charge events across every London borough',
			content: First
		},
		{
			id: 'chargers',
			label: 'Detailed breakdown of individual chargers and their connectors',
			content: Second
		},
		{
			id: 'averages',
			label: 'Averages of charge event durations and energy delivered',
			content: Third
		},
		{
			id: 'histograms',
			label: 'Histograms of charge events grouped by time of day and day of week',
			content: Fourth
		}
	];

	let selectedTabId = $state('chargers');

	let description = $derived(descriptions.find((t) => t.id === selectedTabId)?.value);

	let lastChanged = $state<string | undefined>(undefined);
</script>

<Story name="Default">
	{#snippet template(args)}
		<Tabs {...args} {tabs} ariaLabel="View information on EV chargers" />
	{/snippet}
</Story>

<Story name="With Icons">
	{#snippet template(args)}
		<Tabs {...args} tabs={tabsWithIcons} ariaLabel="View information on EV chargers" />
	{/snippet}
</Story>

<Story name="Vertical">
	{#snippet template(args)}
		<Tabs {...args} {tabs} ariaLabel="View information on EV chargers" orientation="vertical" />
	{/snippet}
</Story>

<Story name="Vertical with Icons">
	{#snippet template(args)}
		<Tabs
			{...args}
			tabs={tabsWithIcons}
			ariaLabel="View information on EV chargers"
			orientation="vertical"
		/>
	{/snippet}
</Story>

<Story name="Without bound state">
	{#snippet template(args)}
		<Tabs {...args} {tabs} ariaLabel="View information on EV chargers" />
	{/snippet}
</Story>

<Story name="Binding to state">
	{#snippet template(args)}
		<Button onclick={() => (selectedTabId = 'histograms')}>Select histograms tab</Button>
		<Tabs {...args} {tabs} bind:selectedTabId ariaLabel="View information on EV chargers" />
	{/snippet}
</Story>

<Story name="Update external description (Binding to state)">
	{#snippet template(args)}
		<p>{description}</p>
		<Tabs {...args} {tabs} bind:selectedTabId ariaLabel="View information on EV chargers" />
	{/snippet}
</Story>

<!--
The `onChange` callback fires with the newly selected tab's `id` whenever the
selection changes, allowing side effects without binding `selectedTabId`.
-->
<Story name="onChange callback">
	{#snippet template(args)}
		<p>Last change fired for tab: {lastChanged ?? '(none yet)'}</p>
		<Tabs
			{...args}
			{tabs}
			onChange={(id: string) => (lastChanged = id)}
			ariaLabel="View information on EV chargers"
		/>
	{/snippet}
</Story>

<!--
Each tab supplies a `rawIcon` (a Svelte component rendering a custom SVG) instead
of an `icon` from `@steeze-ui/heroicons`.
-->
<Story name="With rawIcon">
	{#snippet template(args)}
		<Tabs {...args} tabs={tabsWithRawIcon} ariaLabel="View information on EV chargers" />
	{/snippet}
</Story>

<!--
The horizontal `TabList` is `w-full`; long labels and many tabs surface how the
list handles constrained space.
-->
<Story name="Many / long tab labels">
	{#snippet template(args)}
		<Tabs {...args} tabs={tabsManyLong} ariaLabel="View information on EV chargers" />
	{/snippet}
</Story>
