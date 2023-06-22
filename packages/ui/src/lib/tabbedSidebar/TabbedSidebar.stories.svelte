<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import {
		ChartBarIcon,
		FilterIcon,
		LocationMarkerIcon,
		MapIcon
	} from '@rgossiaux/svelte-heroicons/solid';
	import TabbedSidebar from './TabbedSidebar.svelte';
	import TabbedSidebarWrapper from './TabbedSidebarWrapper.svelte';
	import TabbedSidebarTabLabel from './TabbedSidebarTabLabel.svelte';
	import TabbedSidebarTabList from './TabbedSidebarTabList.svelte';

	let selectedValue = 'filters';

	let tabs = [
		{ id: 'markers', label: 'Data Markers', icon: LocationMarkerIcon },
		{ id: 'filters', label: 'Filters', icon: FilterIcon },
		{ id: 'analysis', label: 'Analysis', icon: ChartBarIcon },
		{ id: 'layers', label: 'Layers', icon: MapIcon }
	];

	let collapsed = true;
</script>

<Meta title="Ui/TabbedSidebar" component={TabbedSidebarWrapper} />

<Template let:args>
	<TabbedSidebarWrapper {...args} />
</Template>

<Story name="Constructed from list">
	<p>This example constructs the sidebar from an array of options.</p>
	<p>
		In actual use, would probably have a separate component for each pane of the tab, and render
		conditionally.
	</p>

	<TabbedSidebarWrapper {tabs} bind:selectedValue>
		{#if selectedValue === 'markers'}
			<div class="text-white">
				Markers is selected, so we'd render a
				<code> &lt;Marker /&gt;</code>
				component
			</div>
		{:else if selectedValue === 'filters'}
			<div class="text-white">
				Filter is selected, so we'd render a
				<code> &lt;Filters /&gt;</code>
				component
			</div>
		{:else if selectedValue === 'analysis'}
			<div class="text-white">
				Analysis is selected, so we'd render a
				<code> &lt;Analysis /&gt;</code>
				component
			</div>
		{:else if selectedValue === 'layers'}
			<div class="text-white">
				Layers is selected, so we'd render a
				<code> &lt;Layer /&gt;</code>
				component
			</div>
		{/if}
	</TabbedSidebarWrapper>
</Story>

<Story name="Constructed from nested components">
	<p>
		Rather than defining the list of tabs with an array, we can encode it as a series of
		<code>&lt;SideIconSidebaTabLabel&gt;</code> components inside a <code>&lt;SideIconSidebaTabList&gt;</code> component. This allows
		greater flexibility over the appearance of tab labels (e.g., the use of an alternative icon set).
	</p>

	<TabbedSidebar bind:selectedValue>
		<TabbedSidebarTabList>
			<TabbedSidebarTabLabel tabId="markers">
				<LocationMarkerIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Markers
			</TabbedSidebarTabLabel>

			<TabbedSidebarTabLabel tabId="filters">
				<FilterIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Filters
			</TabbedSidebarTabLabel>

			<TabbedSidebarTabLabel tabId="analysis">
				<ChartBarIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Analysis
			</TabbedSidebarTabLabel>

			<TabbedSidebarTabLabel tabId="layers">
				<MapIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Layers
			</TabbedSidebarTabLabel>
		</TabbedSidebarTabList>

		<div class="p-6" role="tabpanel">
			{#if selectedValue === 'markers'}
				<div class="text-white">
					Markers is selected, so we'd render a
					<code> &lt;Marker /&gt;</code>
					component
				</div>
			{:else if selectedValue === 'filters'}
				<div class="text-white">
					Filter is selected, so we'd render a
					<code> &lt;Filters /&gt;</code>
					component
				</div>
			{:else if selectedValue === 'analysis'}
				<div class="text-white">
					Analysis is selected, so we'd render a
					<code> &lt;Analysis /&gt;</code>
					component
				</div>
			{:else if selectedValue === 'layers'}
				<div class="text-white">
					Layers is selected, so we'd render a
					<code> &lt;Layer /&gt;</code>
					component
				</div>
			{/if}
		</div>
	</TabbedSidebar>
</Story>

<Story name="Collapsed">
	<TabbedSidebar {collapsed}>
		<TabbedSidebarTabList>
			<TabbedSidebarTabLabel tabId="markers">
				<LocationMarkerIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Markers
			</TabbedSidebarTabLabel>

			<TabbedSidebarTabLabel tabId="filters">
				<FilterIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Filters
			</TabbedSidebarTabLabel>

			<TabbedSidebarTabLabel tabId="analysis">
				<ChartBarIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Analysis
			</TabbedSidebarTabLabel>

			<TabbedSidebarTabLabel tabId="layers">
				<MapIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Layers
			</TabbedSidebarTabLabel>
		</TabbedSidebarTabList>

		<div class="p-6 text-white" role="tabpanel">This sidebar is empty...</div>
	</TabbedSidebar>
</Story>
