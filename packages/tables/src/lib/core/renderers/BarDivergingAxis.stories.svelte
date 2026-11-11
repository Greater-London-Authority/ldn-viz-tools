<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import BarDivergingAxis from './BarDivergingAxis.svelte';

	/**
	 * The `BarDivergingAxis` component renders an axis for the `BarDivergingCell` component.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/BarDiverging/BarDivergingAxis',
		component: BarDivergingAxis,
		tags: ['autodocs'],

		args: {
			extent: [0, 1],
			width: 100,
			numTicks: 4
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<BarDivergingAxis {...args} />
	{/snippet}
</Story>

<!-- A symmetric extent produces a diverging axis centred on zero. -->
<Story name="Diverging extent">
	{#snippet template()}
		<BarDivergingAxis extent={[-2, 2]} width={100} numTicks={4} />
	{/snippet}
</Story>

<!-- `numTicks` is a hint passed to d3's `ticks()` for the number of tick marks. -->
<Story name="Custom tick count">
	{#snippet template()}
		<div class="flex flex-col gap-4">
			<BarDivergingAxis extent={[-2, 2]} width={200} numTicks={2} />
			<BarDivergingAxis extent={[-2, 2]} width={200} numTicks={8} />
		</div>
	{/snippet}
</Story>

<!-- `width` sets the pixel width of the axis and `textSize` the tick label size. -->
<Story name="Custom width and text size">
	{#snippet template()}
		<BarDivergingAxis extent={[-2, 2]} width={300} textSize={14} numTicks={4} />
	{/snippet}
</Story>

<!-- A custom `formatString` (d3-format notation), here formatting ticks as percentages. -->
<Story name="Custom formatString">
	{#snippet template()}
		<BarDivergingAxis extent={[0, 1]} width={200} numTicks={4} formatString="0.0%" />
	{/snippet}
</Story>
