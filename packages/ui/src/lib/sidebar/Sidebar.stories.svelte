<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import DummyScreen from './DummyScreen.svelte'
	import Sidebar from './Sidebar.svelte';
	import TabbedHood from './TabbedHood.svelte'
	import TabbedContent from './TabbedContent.svelte'
	import TabbedSidebar from './TabbedSidebar.svelte'

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
	]
</script>

<Meta title="Ui/Sidebar" component={Sidebar} />

<Template let:args>
	<DummyScreen>
		<Sidebar {...args} />
	</DummyScreen>
</Template>

<Story name="Minimal">
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>The minimal amount of code to get a sidebar showing. Reduce to see bottom alignment or increase to see right alignment</p>
	</div>
	<DummyScreen>
		<Sidebar />
	</DummyScreen>
</Story>

<Story name="Left & top aligned">
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>Left and top alignment depending on screen width. Reduce to see top alignment or increase to see left alignment.</p>
	</div>
	<DummyScreen>
		<Sidebar top left />
	</DummyScreen>
</Story>

<Story name="Tabbed content">
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>Here the sidebar slots in &lt;TabbedHood&gt; and &lt;TabbedContent&gt; for a tabbed sidebar.</p>
	</div>
	<DummyScreen>
		<Sidebar>
			<TabbedHood slot="hood" {tabs} />
			<TabbedContent slot="content" {tabs} />
		</Sidebar>
	</DummyScreen>
</Story>

<Story name="TabbedSidebar">
	<div class="my-4 text-core-grey-500 dark:text-core-grey-200 space-y-2">
		<p>Because tabbed sidebars are becoming a common occurrence, the above setup has been encapsulated into a component of its own &lt;TabbedSidebar&gt;.</p>
	</div>
	<DummyScreen>
		<TabbedSidebar {tabs} initialTabId={tabs[0].id} />
	</DummyScreen>
</Story>