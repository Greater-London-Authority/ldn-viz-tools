<script module lang="ts">
	import { SidebarLeftContext, SidebarTopContext } from '@ldn-viz/docs';

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

	let selectedValue: string | undefined = undefined;

	// const horizontalContext = SidebarTopContext as unknown as DecoratorReturnType;

	let { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Sidebar/elements/SidebarTabs',
		component: SidebarTabList,
		decorators: [() => SidebarLeftContext],
		args: { tabs: tabs }
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<SidebarTabList {...args} bind:selectedValue />
	{/snippet}
</Story>

<Story name="Horizontal with Icons" decorators={[() => SidebarTopContext]}>
	{#snippet template(args)}
		<SidebarTabList {...args} bind:selectedValue placement="top" />
	{/snippet}
</Story>

<!-- A custom event can be passed to onChange -->
<Story name="With Custom Selection Handler">
	{#snippet template(args)}
		<SidebarTabList
			{...args}
			bind:selectedValue
			onChange={() => {
				alert('Clicked on Markers tab!');
			}}
		/>
	{/snippet}
</Story>
