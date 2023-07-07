<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import StoryAppContainer from './StoryAppContainer.svelte';

	import TabbedSidebar from './TabbedSidebar.svelte';
	import TabbedSidebarExample from './TabbedSidebarExample.svelte';

	import {
		ChartBarIcon,
		FilterIcon,
		LocationMarkerIcon,
		MapIcon
	} from '@rgossiaux/svelte-heroicons/solid';

	const tabs = [
		{ id: 'markers', label: 'Data Markers', icon: LocationMarkerIcon },
		{ id: 'filters', label: 'Filters', icon: FilterIcon },
		{ id: 'analysis', label: 'Analysis', icon: ChartBarIcon },
		{ id: 'layers', label: 'Layers', icon: MapIcon }
	];
</script>

<Meta title="Ui/Sidebars/TabbedSidebar" component={TabbedSidebar} />

<Template let:args>
	<StoryAppContainer>
		<Sidebar {...args} />
	</StoryAppContainer>
</Template>

<Story name="Tabbed sidebar component">
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>
			Tabbed sidebars are becoming a common occurrence. Tabbed sidebar components have been
			encapsulated into an easy to use component &lt;TabbedSidebar&gt;. This should deal with all
			use cases thus far.
		</p>
		<p>
			If exceptions arise we can expose the underlying &lt;SidebarTabList&gt; and
			&lt;SidebarTabPanel&gt; components for greater flexibility (a minor release change).
		</p>
	</div>
	<StoryAppContainer>
		<TabbedSidebarExample />
	</StoryAppContainer>
</Story>

<Story name="Tabbed sidebar left and top">
	<StoryAppContainer>
		<TabbedSidebarExample left top />
	</StoryAppContainer>
</Story>

<Story name="Tabbed sidebar hide space">
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>
			You can hide unused space by passing the boolean '<code>hideSpace</code>' property
			(&lt;TabbedSidebar hideSpace&gt;).
		</p>
	</div>
	<StoryAppContainer>
		<TabbedSidebarExample hideSpace />
	</StoryAppContainer>
</Story>
