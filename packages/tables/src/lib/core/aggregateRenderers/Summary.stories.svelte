<script context="module">
	import Summary from './Summary.svelte';
	export const meta = {
		title: 'Tables/Components/AggregateRenderers/Summary',
		component: Summary,

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
	<Summary {...args} />
</Template>

<Story name="Default" source />
