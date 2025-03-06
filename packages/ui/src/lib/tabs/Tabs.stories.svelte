<script context="module">
	import TabPanel from './TabLabel.svelte';
	import TabList from './TabList.svelte';

	export const meta = {
		title: 'Ui/Components/Tabs',
		component: Tabs,
		subcomponents: { TabPanel, TabList },

		argTypes: {
			orientation: {
				options: ['horizontal', 'vertical'],
				control: { type: 'radio' }
			}
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Tabs from './Tabs.svelte';

	import { Map as MapIcon, Square3Stack3d } from '@steeze-ui/heroicons';

	//Example components passed to panel In reality these would be contained in your app
	import { First, Fourth, Second, Third } from './demoSections';

	let selectedValue: string | undefined = undefined;

	let tabs = [
		{ id: 'aggregates', label: 'Aggregated counts across London', content: First },
		{ id: 'chargers', label: 'Details of chargers', content: Second },
		{ id: 'averages', label: 'Averages of charge events', content: Third },
		{ id: 'histograms', label: 'Histograms of charge events', content: Fourth }
	];

	let tabsWithIcons = [
		{ id: 'aggregates', label: 'Aggregates', icon: Square3Stack3d, content: First },
		{ id: 'chargers', label: 'Details', icon: MapIcon, content: Second },
		{ id: 'averages', label: 'Averages', icon: Square3Stack3d, content: Third },
		{ id: 'histograms', label: 'Histograms', icon: MapIcon, content: Fourth }
	];
</script>

<Template let:args>
	<Tabs {...args} bind:selectedValue ariaLabel="View information on EV chargers" />
</Template>

<Story name="Default" source args={{ tabs: tabs }} />

<Story name="With Icons" source args={{ tabs: tabsWithIcons }} />

<Story name="Vertical" source args={{ tabs: tabs, orientation: 'vertical' }} />

<Story name="Vertical with Icons" source args={{ tabs: tabsWithIcons, orientation: 'vertical' }} />
