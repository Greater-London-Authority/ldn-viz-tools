<script context="module">
	export const meta = {
		title: 'Ui/Example Layouts/Dashboards',
		parameters: {
			layout: 'fullscreen'
		},
		tags: ['!autodocs']
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';

	import LeggiExplorer from './Dashboards/LeggiExplorer.svelte';
	import PopulationProjection from './Dashboards/PopulationProjection.svelte';
	import RiverHealth from './Dashboards/RiverHealth.svelte';
	import SimpleDashboard from './Dashboards/SimpleDashboard.svelte';
</script>

<Story name="Simple Dashboard" id="SimpleDash">
	<SimpleDashboard />
</Story>

<Story name="Population Projection" id="PopulationProjectionDash">
	<PopulationProjection />
</Story>

<Story name="River Health" id="RiverHealthDash">
	<RiverHealth />
</Story>

<Story name="Leggi Explorer" id="LeggiDash">
	<LeggiExplorer />
</Story>
