<script module lang="ts">
	import TabPanel from './TabLabel.svelte';
	import TabList from './TabList.svelte';
	import Tabs from './Tabs.svelte';

	import { Map as MapIcon, Square3Stack3d } from '@steeze-ui/heroicons';

	//Example components passed to panel In reality these would be contained in your app
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { First, Fourth, Second, Third } from './demoSections';
	import type { Tab } from './types';

	const { Story } = defineMeta({
		title: 'Ui/Components/Tabs',
		component: Tabs,
		subcomponents: { TabPanel, TabList },
		argTypes: {
			orientation: {
				options: ['horizontal', 'vertical'],
				control: { type: 'radio' }
			}
		}
	});

	let tabs: Tab[] = [
		{ id: 'aggregates', label: 'Aggregated counts across London', content: First },
		{ id: 'chargers', label: 'Details of chargers', content: Second },
		{ id: 'averages', label: 'Averages of charge events', content: Third },
		{ id: 'histograms', label: 'Histograms of charge events', content: Fourth }
	];

	let tabsWithIcons: Tab[] = [
		{ id: 'aggregates', label: 'Aggregates', icon: Square3Stack3d, content: First },
		{ id: 'chargers', label: 'Details', icon: MapIcon, content: Second },
		{ id: 'averages', label: 'Averages', icon: Square3Stack3d, content: Third },
		{ id: 'histograms', label: 'Histograms', icon: MapIcon, content: Fourth }
	];

	let selectedTabId = $state('aggregates');
</script>

<Story name="Default">
	{#snippet template(args)}
		<Tabs {...args} {tabs} bind:selectedTabId ariaLabel="View information on EV chargers" />
	{/snippet}
</Story>

<Story name="With Icons">
	{#snippet template(args)}
		<Tabs
			{...args}
			tabs={tabsWithIcons}
			bind:selectedTabId
			ariaLabel="View information on EV chargers"
		/>
	{/snippet}
</Story>

<Story name="Vertical">
	{#snippet template(args)}
		<Tabs
			{...args}
			{tabs}
			bind:selectedTabId
			ariaLabel="View information on EV chargers"
			orientation="vertical"
		/>
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
