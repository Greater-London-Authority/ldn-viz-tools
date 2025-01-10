<script context="module">
	import Histogram from './Histogram.svelte';
	export const meta = {
		title: 'Tables/AggregateRenderers/Histogram',
		component: Histogram,

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
	<Histogram {...args} />
</Template>

<Story name="Default" source />
