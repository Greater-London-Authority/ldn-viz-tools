<script context="module">
	import { SidebarLeftContext, SidebarTopContext } from '@ldn-viz/docs';
	import SidebarTabList from './SidebarTabList.svelte';

	export const meta = {
		title: 'Ui/Sidebar/elements/SidebarTabs',
		component: SidebarTabList,
		decorators: [() => SidebarLeftContext],
		subcomponents: { SidebarTabLabel }
	};
</script>

<script lang="ts">
	import { ChartBar, Funnel, Map, MapPin } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import SidebarTabLabel, { handleSelection } from './SidebarTabLabel.svelte';

	let selectedValue = 'markers';
</script>

<Template let:args>
	<SidebarTabList bind:selectedValue {...args}>
		<SidebarTabLabel tabId="markers">Markers</SidebarTabLabel>
		<SidebarTabLabel tabId="filters">Filters</SidebarTabLabel>
		<SidebarTabLabel tabId="analysis">Analysis</SidebarTabLabel>
		<SidebarTabLabel tabId="layers">Layers</SidebarTabLabel>
	</SidebarTabList>
</Template>

<Story name="Default (Vertical)">
	<SidebarTabList bind:selectedValue>
		<SidebarTabLabel tabId="markers">Markers</SidebarTabLabel>
		<SidebarTabLabel tabId="filters">Filters</SidebarTabLabel>
		<SidebarTabLabel tabId="analysis">Analysis</SidebarTabLabel>
		<SidebarTabLabel tabId="layers">Layers</SidebarTabLabel>
	</SidebarTabList>
</Story>

<Story name="Vertical with Icons">
	<SidebarTabList bind:selectedValue>
		<SidebarTabLabel tabId="markers">
			<Icon src={MapPin} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Data Markers
		</SidebarTabLabel>
		<SidebarTabLabel tabId="filters">
			<Icon src={Funnel} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Filters
		</SidebarTabLabel>
		<SidebarTabLabel tabId="analysis">
			<Icon src={ChartBar} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Analysis
		</SidebarTabLabel>
		<SidebarTabLabel tabId="layers">
			<Icon src={Map} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Layers
		</SidebarTabLabel>
	</SidebarTabList>
</Story>

<Story name="Horizontal with Icons" decorators={[() => SidebarTopContext]}>
	<SidebarTabList bind:selectedValue>
		<SidebarTabLabel tabId="markers">
			<Icon src={MapPin} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Data Markers
		</SidebarTabLabel>
		<SidebarTabLabel tabId="filters">
			<Icon src={Funnel} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Filters
		</SidebarTabLabel>
		<SidebarTabLabel tabId="analysis">
			<Icon src={ChartBar} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Analysis
		</SidebarTabLabel>
		<SidebarTabLabel tabId="layers">
			<Icon src={Map} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Layers
		</SidebarTabLabel>
	</SidebarTabList>
</Story>

<!-- A custom event can be passed to selectionHandler. The default function handleSelection is exported so that it can be called as part of the custom event if required -->
<Story name="With Custom Selection Handler">
	<SidebarTabList bind:selectedValue>
		<SidebarTabLabel
			tabId="markers"
			selectionHandler={(...args) => {
				alert('Clicked on Markers tab!');
				handleSelection(...args);
			}}
		>
			<Icon src={MapPin} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Click Me!
		</SidebarTabLabel>
		<SidebarTabLabel tabId="filters">
			<Icon src={Funnel} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Filters
		</SidebarTabLabel>
		<SidebarTabLabel tabId="analysis">
			<Icon src={ChartBar} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Analysis
		</SidebarTabLabel>
		<SidebarTabLabel tabId="layers">
			<Icon src={Map} theme="mini" class="h-5 w-5 mb-1" aria-hidden="true" />
			Layers
		</SidebarTabLabel>
	</SidebarTabList>
</Story>
