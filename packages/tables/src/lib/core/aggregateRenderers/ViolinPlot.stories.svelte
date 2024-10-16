<script context="module">
	import ViolinPlot from './ViolinPlot.svelte';
	export const meta = {
		title: 'Tables/AggregateRenderers/ViolinPlot',
		component: ViolinPlot,

		args: {
			values: [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8],
			extent: [0, 1]
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<ViolinPlot {...args} />
</Template>

<Story name="Default" source />
