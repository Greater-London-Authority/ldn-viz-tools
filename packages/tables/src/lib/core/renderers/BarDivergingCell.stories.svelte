<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import BarDivergingCell from './BarDivergingCell.svelte';

	/**
	 * The `BarDivergingCell` component renders a table cell representing a numerical value as a bar, where the length of the bar encodes the value.
	 * There is a vertical line at x=0, and the bar color indicates whether the value is greater than or less than 0.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/BarDivergingCell',
		component: BarDivergingCell,
		tags: ['autodocs'],

		args: {
			value: 0.5
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<BarDivergingCell {...args} value={args.value ?? 0.5} />
	{/snippet}
</Story>

<Story name="Custom colors">
	{#snippet template(args)}
		<div class="flex w-36 flex-col">
			<BarDivergingCell
				{...args}
				value={-2}
				extent={[-2, +2]}
				positiveColor="pink"
				negativeColor="gold"
			/>
			<BarDivergingCell
				{...args}
				value={-1}
				extent={[-2, +2]}
				positiveColor="pink"
				negativeColor="gold"
			/>
			<BarDivergingCell
				{...args}
				value={+1}
				extent={[-2, +2]}
				positiveColor="pink"
				negativeColor="gold"
			/>
			<BarDivergingCell
				{...args}
				value={+2}
				extent={[-2, +2]}
				positiveColor="pink"
				negativeColor="gold"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Custom text size">
	{#snippet template({ args })}
		<div class="flex w-36 flex-col">
			<BarDivergingCell {...args} value={-1} extent={[-2, +2]} textSize={8} />
			<BarDivergingCell {...args} value={-1} extent={[-2, +2]} textSize={10} />
			<BarDivergingCell {...args} value={-1} extent={[-2, +2]} textSize={16} />
			<BarDivergingCell {...args} value={+1} extent={[-2, +2]} textSize={18} />
		</div>
	{/snippet}
</Story>
