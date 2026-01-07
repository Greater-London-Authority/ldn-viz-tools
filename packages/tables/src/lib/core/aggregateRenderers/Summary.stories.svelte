<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Summary from './Summary.svelte';
	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/Summary',
		component: Summary,
		tags: ['autodocs'],

		args: {
			values: [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8],
			extent: [0, 1],
			formatString: '0.2f'
		}
	});
</script>

{#snippet defaultTemplate({ args })}
	<Summary {...args} />
{/snippet}

<Story name="Default" source />
