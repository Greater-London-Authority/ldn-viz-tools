<script context="module">
	import BoxPlot from './BoxPlot.svelte';
	export const meta = {
		title: 'Tables/AggregateEncodings/BoxPlot',
		component: BoxPlot,

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
	<BoxPlot {...args} />
</Template>

<Story name="Default" source />
