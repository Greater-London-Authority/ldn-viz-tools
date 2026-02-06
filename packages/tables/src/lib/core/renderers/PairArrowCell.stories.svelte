<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import PairArrowCell from './PairArrowCell.svelte';

	/**
	 * The `PairArrowCell` component renders a table cell containing an arrow pointing from a context value to the cell's value.
	 * The color of the arrow indicates whether it is increasing or decreasing
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/PairArrowCell',
		component: PairArrowCell,
		tags: ['autodocs'],

		args: {
			value: 0.5,
			contextVals: [0.1]
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<PairArrowCell {...args} value={args.value ?? 0.5} />
	{/snippet}
</Story>

<Story name="Multiple - custom colors">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<PairArrowCell value={-2} extent={[-2, +2]} positiveColor="pink" negativeColor="gold" />
			<PairArrowCell value={-1} extent={[-2, +2]} positiveColor="pink" negativeColor="gold" />
			<PairArrowCell value={+1} extent={[-2, +2]} positiveColor="pink" negativeColor="gold" />
			<PairArrowCell value={+2} extent={[-2, +2]} positiveColor="pink" negativeColor="gold" />
		</div>
	{/snippet}
</Story>
