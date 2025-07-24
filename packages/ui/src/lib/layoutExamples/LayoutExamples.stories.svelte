<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LeggiExplorer from './Dashboards/LeggiExplorer.svelte';
	import MenuDashboard from './Dashboards/MenuDashboard.svelte';
	import PopulationProjection from './Dashboards/PopulationProjection.svelte';
	import RiverHealth from './Dashboards/RiverHealth.svelte';
	import SimpleDashboard from './Dashboards/SimpleDashboard.svelte';

	let { Story } = defineMeta({
		title: 'Ui/Example Layouts/Dashboards',
		parameters: {
			layout: 'fullscreen'
		},
		tags: ['!autodocs']
	});
</script>

<Story name="Simple Dashboard">
	{#snippet template()}
		<SimpleDashboard />
	{/snippet}
</Story>

<Story name="Menu Dashboard">
	{#snippet template()}
		<MenuDashboard />
	{/snippet}
</Story>

<Story name="Population Projection">
	{#snippet template()}
		<PopulationProjection />
	{/snippet}
</Story>

<Story name="River Health">
	{#snippet template()}
		<RiverHealth />
	{/snippet}
</Story>

<Story name="Leggi Explorer">
	{#snippet template()}
		<LeggiExplorer />
	{/snippet}
</Story>
