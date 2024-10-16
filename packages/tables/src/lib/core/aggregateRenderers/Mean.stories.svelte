<script context="module">
	import Mean from './Mean.svelte';
	export const meta = {
		title: 'Tables/AggregateRenderers/Mean',
		component: Mean,

		args: {
			values: [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8],
			extent: [0, 1],
			formatString: '0.2f'
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Mean {...args} />
</Template>

<Story name="Default" source />
