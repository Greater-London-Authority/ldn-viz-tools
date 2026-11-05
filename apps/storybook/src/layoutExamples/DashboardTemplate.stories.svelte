<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DataExplorer from './Dashboards/DataExplorer/DataExplorer.svelte';
	import MapApplication from './Dashboards/MapApplication.svelte';
	import OverviewDashboard from './Dashboards/OverviewDashboard.svelte';
	import StarterDashboard from './Dashboards/StarterDashboard.svelte';

	let { Story } = defineMeta({
		title: 'Example Layouts/Dashboards',
		parameters: {
			layout: 'fullscreen'
		},
		tags: ['!autodocs']
	});
</script>

<!-- The smallest complete dashboard: page-wide filters in the sidebar and two charts that read them. -->
<Story name="Starter">
	{#snippet template()}
		<StarterDashboard />
	{/snippet}
</Story>

<!-- Several sections: metrics, charts of different widths, a card with two related charts, and a table. A filter for one chart sits in that chart's controls. -->
<Story name="Overview">
	{#snippet template()}
		<OverviewDashboard />
	{/snippet}
</Story>

<!-- A map application: the map fills the canvas, map controls sit on the map, and layer controls sit in the sidebar. -->
<Story name="Map application">
	{#snippet template()}
		<MapApplication />
	{/snippet}
</Story>

<!-- A multi-page explorer: page navigation in the header, a tabbed sidebar, and loading and empty states. -->
<Story name="Data explorer">
	{#snippet template()}
		<DataExplorer />
	{/snippet}
</Story>
