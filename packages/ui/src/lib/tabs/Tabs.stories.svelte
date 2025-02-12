<script context="module">
	import TabLabel from './TabLabel.svelte';
	import TabList from './TabList.svelte';

	export const meta = {
		title: 'Ui/Components/Tabs',
		component: TabList,
		subcomponents: { TabLabel },

		argTypes: {
			orientation: {
				options: ['horizontal', 'vertical'],
				control: { type: 'radio' }
			}
		}
	};
</script>

<script lang="ts">
	import { ChartBar, Funnel, Map, MapPin } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	let selectedValue = 'aggregates';
</script>

<Template let:args>
	<TabList bind:selectedValue {...args}>
		<TabLabel tabId="aggregates">Aggregated counts across London</TabLabel>
		<TabLabel tabId="chargers">Details of chargers</TabLabel>
		<TabLabel tabId="averages">Averages of charge events</TabLabel>
		<TabLabel tabId="histograms">Histograms of charge events</TabLabel>
	</TabList>

	<div class="text-black dark:text-white p-4">
		<p>Selected value is: <code>{selectedValue}</code></p>
	</div>
</Template>

<Story name="Default" source />

<Story name="Vertical">
	<div class="flex">
		<TabList bind:selectedValue orientation="vertical">
			<TabLabel tabId="aggregates">Aggregated counts across London</TabLabel>
			<TabLabel tabId="chargers">Details of chargers</TabLabel>
			<TabLabel tabId="averages">Averages of charge events</TabLabel>
			<TabLabel tabId="histograms">Histograms of charge events</TabLabel>
		</TabList>

		<div class="text-black dark:text-white p-4">
			<p>Selected value is: <code>{selectedValue}</code></p>
		</div>
	</div>
</Story>

<Story name="Vertical with Icons">
	<div class="flex">
		<TabList bind:selectedValue orientation="vertical">
			<TabLabel tabId="markers">
				<Icon src={MapPin} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
				Data Markers
			</TabLabel>
			<TabLabel tabId="filters">
				<Icon src={Funnel} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
				Filters
			</TabLabel>
			<TabLabel tabId="analysis">
				<Icon src={ChartBar} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
				Analysis
			</TabLabel>
			<TabLabel tabId="layers">
				<Icon src={Map} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
				Layers
			</TabLabel>
		</TabList>

		<div class="text-black dark:text-white p-4">
			<p>Selected value is: <code>{selectedValue}</code></p>
		</div>
	</div>
</Story>

<Story name="Horizontal with Icons">
	<TabList bind:selectedValue>
		<TabLabel tabId="markers" tabPanelId="markers-panel">
			<Icon src={MapPin} theme="mini" class="h-5 w-5 mr-1" aria-hidden="true" />
			Data Markers
		</TabLabel>
		<TabLabel tabId="filters" tabPanelId="filters-panel">
			<Icon src={Funnel} theme="mini" class="h-5 w-5 mr-1" aria-hidden="true" />
			Filters
		</TabLabel>
		<TabLabel tabId="analysis" tabPanelId="analysis-panel">
			<Icon src={ChartBar} theme="mini" class="h-5 w-5 mr-1" aria-hidden="true" />
			Analysis
		</TabLabel>
		<TabLabel tabId="layers" tabPanelId="layers-panel">
			<Icon src={Map} theme="mini" class="h-5 w-5 mr-1" aria-hidden="true" />
			Layers
		</TabLabel>
	</TabList>

	<div class="text-black dark:text-white p-4">
		<p>Selected value is: <code>{selectedValue}</code></p>
	</div>
</Story>
