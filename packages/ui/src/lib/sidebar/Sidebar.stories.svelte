<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import StoryAppContainer from './StoryAppContainer.svelte';

	import Sidebar from './Sidebar.svelte';
	import SidebarContainer from './SidebarContainer.svelte';
	import TabbedSidebar from './TabbedSidebar.svelte';

	import TabbedSidebarUsageExample from './TabbedSidebarUsageExample.svelte';

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

<Meta title="Ui/Sidebar" component={Sidebar} />

<Template let:args>
	<StoryAppContainer>
		<Sidebar {...args} />
	</StoryAppContainer>
</Template>

<Story name="Simple sidebar">
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>
			The minimal amount of code to get a sidebar showing. Reduce to see bottom alignment or
			increase to see right alignment.
		</p>
	</div>
	<StoryAppContainer>
		<Sidebar />
	</StoryAppContainer>
</Story>

<Story name="Sidebars with left and top alignment">
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>
			Left and top alignment depending on screen width. Reduce to see top alignment or increase to
			see left alignment.
		</p>
	</div>
	<StoryAppContainer>
		<Sidebar top left />
	</StoryAppContainer>
</Story>

<Story name="Adding content to a sidebar">
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>Lets add some content.</p>
	</div>
	<StoryAppContainer>
		<Sidebar>
			<SidebarContainer slot="content">
				<div class="m-2">One</div>
				<div class="m-2">word</div>
				<div class="m-2">at</div>
				<div class="m-2">a</div>
				<div class="m-2">time</div>
			</SidebarContainer>
		</Sidebar>
	</StoryAppContainer>
</Story>

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
		<TabbedSidebarUsageExample />
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
		<TabbedSidebarUsageExample hideSpace />
	</StoryAppContainer>
</Story>

<Story name="Tabbed sidebar left and top">
	<StoryAppContainer>
		<TabbedSidebarUsageExample left top />
	</StoryAppContainer>
</Story>
