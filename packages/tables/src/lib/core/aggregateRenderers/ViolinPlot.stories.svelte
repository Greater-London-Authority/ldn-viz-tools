<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ViolinPlot from './ViolinPlot.svelte';

	/**
	 * The `ViolinPlot` component renders a set of values as a violin plot.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/AggregateRenderers/ViolinPlot',
		component: ViolinPlot,
		tags: ['autodocs'],

		args: {
			values: [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8],
			extent: [0, 1]
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<ViolinPlot {...args} values={args.values ?? [0.2, 0.2, 0.2, 0.2, 0.3, 0.4, 0.8]} />
	{/snippet}
</Story>

<!-- A larger, bimodal dataset shows two humps in the density. -->
<Story name="Larger / multimodal dataset">
	{#snippet template()}
		<ViolinPlot
			values={[
				...Array.from({ length: 100 }, () => 0.2 + Math.random() * 0.1),
				...Array.from({ length: 100 }, () => 0.7 + Math.random() * 0.1)
			]}
			extent={[0, 1]}
		/>
	{/snippet}
</Story>

<!-- A differing extent rescales the horizontal axis. -->
<Story name="Custom extent">
	{#snippet template()}
		<ViolinPlot values={[10, 20, 25, 30, 40, 55, 70]} extent={[0, 100]} />
	{/snippet}
</Story>

<!-- With no values, nothing is rendered. -->
<Story name="Empty values">
	{#snippet template()}
		<ViolinPlot values={[]} extent={[0, 1]} />
	{/snippet}
</Story>

<!-- Skewed data separates the solid median line from the dashed mean line. -->
<Story name="Mean vs median (skewed)">
	{#snippet template()}
		<ViolinPlot values={[0.05, 0.08, 0.1, 0.1, 0.12, 0.15, 0.2, 0.9]} extent={[0, 1]} />
	{/snippet}
</Story>
