<script module lang="ts">
	import TabList from './TabList.svelte';
	import TabPanel from './TabPanel.svelte';
	import Tabs from './Tabs.svelte';

	import { Map as MapIcon, Square3Stack3d } from '@steeze-ui/heroicons';

	//Example components passed to panel In reality these would be contained in your app
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import { First, Fourth, Second, Third } from './demoSections';
	import type { Tab } from './types';

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

	let selectedTabId = $state('chargers');

	let description = $derived(descriptions.find((t) => t.id === selectedTabId)?.value);
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
