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
	import TabPanel from './TabPanel.svelte';
	let selectedValue: string | undefined = undefined;
</script>

<Template let:args>
	<TabList bind:selectedValue {...args}>
		<TabLabel tabPanelId="aggregates-panel" tabId="aggregates"
			>Aggregated counts across London</TabLabel
		>
		<TabLabel tabPanelId="chargers-panel" tabId="chargers">Details of chargers</TabLabel>
		<TabLabel tabPanelId="averages-panel" tabId="averages">Averages of charge events</TabLabel>
		<TabLabel tabPanelId="histograms-panel" tabId="histograms">Histograms of charge events</TabLabel
		>
	</TabList>

	<div class="text-black dark:text-white p-4">
		{#if selectedValue === 'aggregates'}
			<TabPanel tabPanelId="aggregates-panel" tabId="aggregates"
				>You can see aggregated counts across London in this tab!</TabPanel
			>
		{:else if selectedValue === 'chargers'}
			<TabPanel tabPanelId="chargers-panel" tabId="chargers"
				>You can see details of chargers across London in this tab!</TabPanel
			>
		{:else if selectedValue === 'averages'}
			<TabPanel tabPanelId="averages-panel" tabId="averages"
				>You can see averages of charge events across London in this tab!</TabPanel
			>
		{:else if selectedValue === 'histograms'}
			<TabPanel tabPanelId="histograms-panel" tabId="histograms"
				>You can see histograms of charge events across London in this tab!</TabPanel
			>
		{/if}
	</div>
</Template>

<Story name="Default" source />

<Story name="Vertical">
	<div class="flex">
		<TabList bind:selectedValue orientation="vertical">
			<TabLabel tabPanelId="aggregates-panel-2" tabId="aggregates"
				>Aggregated counts across London</TabLabel
			>
			<TabLabel tabPanelId="chargers-panel-2" tabId="chargers">Details of chargers</TabLabel>
			<TabLabel tabPanelId="averages-panel-2" tabId="averages">Averages of charge events</TabLabel>
			<TabLabel tabPanelId="histograms-panel-2" tabId="histograms"
				>Histograms of charge events</TabLabel
			>
		</TabList>

		<div class="text-black dark:text-white p-4">
			{#if selectedValue === 'aggregates'}
				<TabPanel tabPanelId="aggregates-panel-2" tabId="aggregates"
					>You can see aggregated counts across London in this tab!</TabPanel
				>
			{:else if selectedValue === 'chargers'}
				<TabPanel tabPanelId="chargers-panel-2" tabId="chargers"
					>You can see details of chargers across London in this tab!</TabPanel
				>
			{:else if selectedValue === 'averages'}
				<TabPanel tabPanelId="averages-panel-2" tabId="averages"
					>You can see averages of charge events across London in this tab!</TabPanel
				>
			{:else if selectedValue === 'histograms'}
				<TabPanel tabPanelId="histograms-panel-2" tabId="histograms"
					>You can see histograms of charge events across London in this tab!</TabPanel
				>
			{/if}
		</div>
	</div>
</Story>

<Story name="Vertical with Icons">
	<div class="flex">
		<TabList bind:selectedValue orientation="vertical">
			<TabLabel tabPanelId="markers-panel-2" tabId="markers">
				<Icon src={MapPin} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
				Data Markers
			</TabLabel>
			<TabLabel tabPanelId="filters-panel-2" tabId="filters">
				<Icon src={Funnel} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
				Filters
			</TabLabel>
			<TabLabel tabPanelId="analysis-panel-2" tabId="analysis">
				<Icon src={ChartBar} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
				Analysis
			</TabLabel>
			<TabLabel tabPanelId="layers-panel-2" tabId="layers">
				<Icon src={Map} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
				Layers
			</TabLabel>
		</TabList>

		<div class="text-black dark:text-white p-4">
			{#if selectedValue === 'markers'}
				<TabPanel tabPanelId="markers-panel-2" tabId="markers"
					>You can see data markers in this tab!</TabPanel
				>
			{:else if selectedValue === 'filters'}
				<TabPanel tabPanelId="filters-panel-2" tabId="filters"
					>You can see filters in this tab!</TabPanel
				>
			{:else if selectedValue === 'analysis'}
				<TabPanel tabPanelId="analysis-panel-2" tabId="analysis"
					>You can see analysis in this tab!</TabPanel
				>
			{:else if selectedValue === 'layers'}
				<TabPanel tabPanelId="layers-panel-2" tabId="layers"
					>You can see layers in this tab!</TabPanel
				>
			{/if}
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
		{#if selectedValue === 'markers'}
			<TabPanel tabPanelId="markers-panel" tabId="markers"
				>You can see data markers in this tab!</TabPanel
			>
		{:else if selectedValue === 'filters'}
			<TabPanel tabPanelId="filters-panel" tabId="filters"
				>You can see filters in this tab!</TabPanel
			>
		{:else if selectedValue === 'analysis'}
			<TabPanel tabPanelId="analysis-panel" tabId="analysis"
				>You can see analysis in this tab!</TabPanel
			>
		{:else if selectedValue === 'layers'}
			<TabPanel tabPanelId="layers-panel" tabId="layers">You can see layers in this tab!</TabPanel>
		{/if}
	</div>
</Story>
