<script context="module">
	import { SidebarLeftContext } from '@ldn-viz/docs';

	import SidebarTabList from './SidebarTabList.svelte';

	export const meta = {
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarTabs',
		component: SidebarTabList,
		decorators: [() => SidebarLeftContext]
	};
</script>

<script lang="ts">
	import { SidebarTopContext } from '@ldn-viz/docs';
	import { Story, Template, type DecoratorReturnType } from '@storybook/addon-svelte-csf';

	import { Map as MapIcon, Square3Stack3d } from '@steeze-ui/heroicons';

	//Example component passed to panel In reality these would be contained in your app
	import NonIdealState from '../../../nonIdealState/NonIdealState.svelte';

	let selectedValue: string | undefined = undefined;

	let tabs = [
		{ id: 'aggregates', label: 'Aggregates', icon: Square3Stack3d, content: NonIdealState },
		{ id: 'chargers', label: 'Details', icon: MapIcon, content: NonIdealState },
		{ id: 'averages', label: 'Averages', icon: Square3Stack3d, content: NonIdealState },
		{ id: 'histograms', label: 'Histograms', icon: MapIcon, content: NonIdealState }
	];

	const horizontalContext = SidebarTopContext as unknown as DecoratorReturnType;
</script>

<Template let:args>
	<SidebarTabList {...args} bind:selectedValue />
</Template>

<Story name="Default" source args={{ tabs: tabs }} />

<Story name="Horizontal with Icons" decorators={[() => horizontalContext]}>
	<SidebarTabList {tabs} bind:selectedValue />
</Story>

<!-- A custom event can be passed to onChange -->
<Story name="With Custom Selection Handler">
	<SidebarTabList
		{tabs}
		bind:selectedValue
		onChange={() => {
			alert('Clicked on Markers tab!');
		}}
	/>
</Story>
