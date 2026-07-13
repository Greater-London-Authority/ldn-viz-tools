<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Histogram from './Histogram.svelte';

	/**
	 * The `Histogram` component renders a set of values as a histogram.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/Histogram',
		component: Histogram,
		tags: ['autodocs'],

		args: {
			values: [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8],
			extent: [0, 1]
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Histogram {...args} values={args.values ?? [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8]} />
	{/snippet}
</Story>
