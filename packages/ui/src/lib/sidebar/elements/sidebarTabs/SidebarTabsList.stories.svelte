<script module lang="ts">
	import { SidebarLeftContext, SidebarTopContext } from '../../../../../../../apps/docs';

	import { Map as MapIcon, Square3Stack3d } from '@steeze-ui/heroicons';
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import SidebarTabList from './SidebarTabList.svelte';
	import First from './demoSections/First.svelte';
	import Fourth from './demoSections/Fourth.svelte';
	import Second from './demoSections/Second.svelte';
	import Third from './demoSections/Third.svelte';

	let tabs = [
		{ id: 'aggregates', label: 'Aggregates', icon: Square3Stack3d, content: First },
		{ id: 'chargers', label: 'Details', icon: MapIcon, content: Second },
		{ id: 'averages', label: 'Averages', icon: Square3Stack3d, content: Third },
		{ id: 'histograms', label: 'Histograms', icon: MapIcon, content: Fourth }
	];

	let { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarTabs',
		component: SidebarTabList,
		decorators: [() => SidebarLeftContext as any],
		args: { tabs: tabs }
	});

	let selectedTabId = $state('aggregates');
</script>

<Story name="Default">
	{#snippet template(args)}
		<SidebarTabList {...args} bind:selectedTabId />
	{/snippet}
</Story>

<Story name="Horizontal with Icons" decorators={[() => SidebarTopContext as any]}>
	{#snippet template(args)}
		<SidebarTabList {...args} bind:selectedTabId />
	{/snippet}
</Story>

<!-- A custom event can be passed to onChange -->
<Story name="With Custom Selection Handler">
	{#snippet template(args)}
		<SidebarTabList
			{...args}
			bind:selectedTabId
			onChange={() => {
				alert('Clicked on Markers tab!');
			}}
		/>
	{/snippet}
</Story>
