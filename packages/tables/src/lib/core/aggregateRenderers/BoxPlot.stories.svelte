<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import BoxPlot from './BoxPlot.svelte';
	/**
	 * The `BoxPlot` component renders a set of values as a BoxPlot.
	 */

	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/BoxPlot',
		component: BoxPlot,
		tags: ['autodocs'],

		args: {
			values: [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8],
			extent: [0, 1]
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<BoxPlot {...args} values={args.values ?? [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8]} />
	{/snippet}
</Story>

<!-- `showAllPoints` overlays every individual data point on top of the box. -->
<Story name="Show all points">
	{#snippet template()}
		<BoxPlot values={[0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8]} extent={[0, 1]} showAllPoints={true} />
	{/snippet}
</Story>

<!-- With no values, nothing is rendered. -->
<Story name="Empty values">
	{#snippet template()}
		<BoxPlot values={[]} extent={[0, 1]} />
	{/snippet}
</Story>

<!-- A single value collapses min, max and median to the same position. -->
<Story name="Single value">
	{#snippet template()}
		<BoxPlot values={[0.5]} extent={[0, 1]} />
	{/snippet}
</Story>

<!-- A wider extent than the default [0, 1] rescales the whole plot. -->
<Story name="Custom extent">
	{#snippet template()}
		<BoxPlot values={[10, 20, 25, 30, 40, 55, 70]} extent={[0, 100]} />
	{/snippet}
</Story>

<!-- Long-tailed data produces asymmetric whiskers and separates the mean (dashed) from the median. -->
<Story name="Skewed / outlier data">
	{#snippet template()}
		<BoxPlot values={[0.05, 0.08, 0.1, 0.1, 0.12, 0.15, 0.2, 0.9]} extent={[0, 1]} />
	{/snippet}
</Story>
