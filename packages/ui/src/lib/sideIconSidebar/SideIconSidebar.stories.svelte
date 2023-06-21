<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import {
		ChartBarIcon,
		FilterIcon,
		LocationMarkerIcon,
		MapIcon
	} from '@rgossiaux/svelte-heroicons/solid';
	import SideIconSidebar from './SideIconSidebar.svelte';
	import SideIconSidebarTabLabel from './SideIconSidebarTabLabel.svelte';
	import SideIconSidebarTabList from './SideIconSidebarTabList.svelte';
	import SideIconSidebarWrapper from './SideIconSidebarWrapper.svelte';

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
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>This example constructs the sidebar from an array of options.</p>
		<p>
			In actual use, would probably have a separate component for each pane of the tab, and render
			conditionally.
		</p>
	</div>
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
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>
			Rather than defining the list of tabs with an array, we can encode it as a series of
			<code>&lt;SideIconSidebaTabLabel&gt;</code> components inside a
			<code>&lt;SideIconSidebaTabList&gt;</code> component. This allows greater flexibility over the
			appearance of tab labels (e.g., the use of an alternative icon set).
		</p>
	</div>

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
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5 mb-1"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
					/>
				</svg>

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
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5 mb-1"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
					/>
				</svg>
				Layers
			</SideIconSidebarTabLabel>
		</SideIconSidebarTabList>

		<div class="p-6 text-white" role="tabpanel">This sidebar is empty...</div>
	</SideIconSidebar>
</Story>
