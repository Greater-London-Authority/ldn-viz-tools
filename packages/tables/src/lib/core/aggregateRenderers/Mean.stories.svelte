<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Mean from './Mean.svelte';

	/**
	 * The `Mean` component renders the (arithmetic) mean of a set of values.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/Mean',
		component: Mean,
		tags: ['autodocs'],

		args: {
			values: [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8],
			extent: [0, 1],
			formatString: '0.2f'
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Mean {...args} values={args.values ?? [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8]} />
	{/snippet}
</Story>
