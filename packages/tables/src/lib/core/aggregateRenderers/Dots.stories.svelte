<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Dots from './Dots.svelte';

	/**
	 * The `Dots` component renders a set of values as something like a beeswarm plot or jittered Cleveland dot plot.
	 * Different plots in the same column have a consistent x-axis based on computed extent of column.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/Dots',
		component: Dots,
		tags: ['autodocs'],

		args: {
			values: [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8],
			extent: [0, 1]
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Dots {...args} values={args.values ?? [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8]} />
	{/snippet}
</Story>
