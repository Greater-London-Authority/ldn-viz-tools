<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import {
		ChartBarIcon,
		FilterIcon,
		LocationMarkerIcon,
		MapIcon
	} from '@rgossiaux/svelte-heroicons/solid';
	import SideIconSidebar from './SideIconSidebar.svelte';
	import SideIconSidebarWrapper from './SideIconSidebarWrapper.svelte';
	import SideIconSidebarTabLabel from './SideIconSidebarTabLabel.svelte';
	import SideIconSidebarTabList from './SideIconSidebarTabList.svelte';

	let selectedValue = 'filters';

	let tabs = [
		{ id: 'markers', label: 'Data Markers', icon: LocationMarkerIcon },
		{ id: 'filters', label: 'Filters', icon: FilterIcon },
		{ id: 'analysis', label: 'Analysis', icon: ChartBarIcon },
		{ id: 'layers', label: 'Layers', icon: MapIcon }
	];

	let collapsed = true;
</script>

<Meta title="Ui/SideIconSidebar" component={SideIconSidebarWrapper} />

<Template let:args>
	<SideIconSidebarWrapper {...args} />
</Template>

<Story name="Constructed from list">
	<p>This example constructs the sidebar from an array of options.</p>
	<p>
		In actual use, would probably have a separate component for each pane of the tab, and render
		conditionally.
	</p>

	<SideIconSidebarWrapper {tabs} bind:selectedValue>
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
	</SideIconSidebarWrapper>
</Story>

<Story name="Constructed from nested components">
	<p>
		Rather than defining the list of tabs with an array, we can encode it as a series of
		<code>&lt;SideIconSidebaTabLabel&gt;</code> components inside a <code>&lt;SideIconSidebaTabList&gt;</code> component. This allows
		greater flexibility over the appearance of tab labels (e.g., the use of an alternative icon set).
	</p>

	<SideIconSidebar bind:selectedValue>
		<SideIconSidebarTabList>
			<SideIconSidebarTabLabel tabId="markers">
				<LocationMarkerIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Markers
			</SideIconSidebarTabLabel>

			<SideIconSidebarTabLabel tabId="filters">
				<FilterIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Filters
			</SideIconSidebarTabLabel>

			<SideIconSidebarTabLabel tabId="analysis">
				<ChartBarIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Analysis
			</SideIconSidebarTabLabel>

			<SideIconSidebarTabLabel tabId="layers">
				<MapIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Layers
			</SideIconSidebarTabLabel>
		</SideIconSidebarTabList>

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
	</SideIconSidebar>
</Story>

<Story name="Collapsed">
	<SideIconSidebar {collapsed}>
		<SideIconSidebarTabList>
			<SideIconSidebarTabLabel tabId="markers">
				<LocationMarkerIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Markers
			</SideIconSidebarTabLabel>

			<SideIconSidebarTabLabel tabId="filters">
				<FilterIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Filters
			</SideIconSidebarTabLabel>

			<SideIconSidebarTabLabel tabId="analysis">
				<ChartBarIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Analysis
			</SideIconSidebarTabLabel>

			<SideIconSidebarTabLabel tabId="layers">
				<MapIcon class="h-5 w-5 mb-1" aria-hidden="true" />
				Layers
			</SideIconSidebarTabLabel>
		</SideIconSidebarTabList>

		<div class="p-6 text-white" role="tabpanel">This sidebar is empty...</div>
	</SideIconSidebar>
</Story>
