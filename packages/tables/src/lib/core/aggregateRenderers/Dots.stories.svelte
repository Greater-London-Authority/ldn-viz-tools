<script context="module">
	import Dots from './Dots.svelte';
	export const meta = {
		title: 'Tables/AggregateEncodings/Dots',
		component: Dots,

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
	<Dots {...args} />
</Template>

<Story name="Default" source />
