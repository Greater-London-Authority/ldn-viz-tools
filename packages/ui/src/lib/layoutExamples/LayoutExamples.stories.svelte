<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Ui/Example Layouts/Dashboards',
		parameters: {
			layout: 'fullscreen'
		},
		tags: ['!autodocs']
	});
</script>

<script lang="ts">
	import LeggiExplorerExample from './Dashboards/LeggiExplorer.svelte';
	import PopulationProjectionExample from './Dashboards/PopulationProjection.svelte';
	import RiverHealthExample from './Dashboards/RiverHealth.svelte';
	import SimpleDashboardExample from './Dashboards/SimpleDashboard.svelte';
</script>

<Story name="Simple Dashboard">
	<SimpleDashboardExample />
</Story>

<Story name="Population Projection">
	<PopulationProjectionExample />
</Story>

<Story name="River Health">
	<RiverHealthExample />
</Story>

<Story name="Leggi Explorer">
	<LeggiExplorerExample />
</Story>
