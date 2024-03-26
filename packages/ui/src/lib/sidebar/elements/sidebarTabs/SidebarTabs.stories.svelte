<script context="module">
	import SidebarTabList from './SidebarTabList.svelte';

	export const meta = {
		title: 'Ui/Sidebar/elements/SidebarTabs',
		component: SidebarTabList
	};
</script>

<script lang="ts">
	import { ChartBar, Funnel, Map, MapPin } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import SidebarTabLabel from './SidebarTabLabel.svelte';
	let selectedValue = 'aggregates';
</script>

<Template let:args>
	<SidebarTabList bind:selectedValue {...args}>
		<SidebarTabLabel tabId="aggregates">Aggregated counts across London</SidebarTabLabel>
		<SidebarTabLabel tabId="chargers">Details of chargers</SidebarTabLabel>
		<SidebarTabLabel tabId="averages">Averages of charge events</SidebarTabLabel>
		<SidebarTabLabel tabId="histograms">Histograms of charge events</SidebarTabLabel>
	</SidebarTabList>
</Template>

<Story name="Default">
	<SidebarTabList bind:selectedValue>
		<SidebarTabLabel tabId="aggregates">Aggregated counts across London</SidebarTabLabel>
		<SidebarTabLabel tabId="chargers">Details of chargers</SidebarTabLabel>
		<SidebarTabLabel tabId="averages">Averages of charge events</SidebarTabLabel>
		<SidebarTabLabel tabId="histograms">Histograms of charge events</SidebarTabLabel>
	</SidebarTabList>

	<div class="text-black dark:text-white p-4">
		<p>Selected value is: <code>{selectedValue}</code></p>
	</div>
</Story>

<Story name="Vertical">
	<div class="flex">
		<SidebarTabList bind:selectedValue>
			<SidebarTabLabel tabId="aggregates">Aggregated counts across London</SidebarTabLabel>
			<SidebarTabLabel tabId="chargers">Details of chargers</SidebarTabLabel>
			<SidebarTabLabel tabId="averages">Averages of charge events</SidebarTabLabel>
			<SidebarTabLabel tabId="histograms">Histograms of charge events</SidebarTabLabel>
		</SidebarTabList>

		<div class="text-black dark:text-white p-4">
			<p>Selected value is: <code>{selectedValue}</code></p>
		</div>
	</div>
</Story>

<Story name="Vertical with Icons">
	<div class="flex">
		<SidebarTabList bind:selectedValue>
			<SidebarTabLabel tabId="markers">
				<Icon src={MapPin} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
				Data Markers
			</SidebarTabLabel>
			<SidebarTabLabel tabId="filters">
				<Icon src={Funnel} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
				Filters
			</SidebarTabLabel>
			<SidebarTabLabel tabId="analysis">
				<Icon src={ChartBar} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
				Analysis
			</SidebarTabLabel>
			<SidebarTabLabel tabId="layers">
				<Icon src={Map} theme="solid" class="h-5 w-5 mb-1" aria-hidden="true" />
				Layers
			</SidebarTabLabel>
		</SidebarTabList>

		<div class="text-black dark:text-white p-4">
			<p>Selected value is: <code>{selectedValue}</code></p>
		</div>
	</div>
</Story>

<Story name="Horizontal with Icons">
	<SidebarTabList bind:selectedValue>
		<SidebarTabLabel tabId="markers">
			<Icon src={MapPin} theme="mini" class="h-5 w-5 mr-1" aria-hidden="true" />
			Data Markers
		</SidebarTabLabel>
		<SidebarTabLabel tabId="filters">
			<Icon src={Funnel} theme="mini" class="h-5 w-5 mr-1" aria-hidden="true" />
			Filters
		</SidebarTabLabel>
		<SidebarTabLabel tabId="analysis">
			<Icon src={ChartBar} theme="mini" class="h-5 w-5 mr-1" aria-hidden="true" />
			Analysis
		</SidebarTabLabel>
		<SidebarTabLabel tabId="layers">
			<Icon src={Map} theme="mini" class="h-5 w-5 mr-1" aria-hidden="true" />
			Layers
		</SidebarTabLabel>
	</SidebarTabList>

	<div class="text-black dark:text-white p-4">
		<p>Selected value is: <code>{selectedValue}</code></p>
	</div>
</Story>
