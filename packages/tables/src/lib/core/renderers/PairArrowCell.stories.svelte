<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { theme } from '@ldn-viz/ui';
	import PairArrowCell from './PairArrowCell.svelte';

	/**
	 * The `PairArrowCell` component renders a table cell containing an arrow pointing from a context value to the cell's value.
	 * The color of the arrow indicates whether it is increasing or decreasing
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/PairArrow/PairArrowCell',
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
			<PairArrowCell
				value={-2}
				extent={[-2, +2]}
				positiveColor={theme.tokenNameToValue('data.secondary')}
				negativeColor={theme.tokenNameToValue('data.primary')}
			/>
			<PairArrowCell
				value={-1}
				extent={[-2, +2]}
				negativeColor={theme.tokenNameToValue('data.secondary')}
				positiveColor={theme.tokenNameToValue('data.primary')}
			/>
			<PairArrowCell
				value={+1}
				extent={[-2, +2]}
				negativeColor={theme.tokenNameToValue('data.secondary')}
				positiveColor={theme.tokenNameToValue('data.primary')}
			/>
			<PairArrowCell
				value={+2}
				extent={[-2, +2]}
				negativeColor={theme.tokenNameToValue('data.secondary')}
				positiveColor={theme.tokenNameToValue('data.primary')}
			/>
		</div>
	{/snippet}
</Story>

<!-- When the value is below the context value, the arrow points the other way and uses `negativeColor`. -->
<Story name="Decreasing arrow">
	{#snippet template()}
		<PairArrowCell value={0.2} contextVals={[0.8]} extent={[0, 1]} />
	{/snippet}
</Story>

<!-- When the value equals contextVals[0], the arrow has zero length (the `value > contextVals[0]` test is false at equality, so it uses negativeColor). -->
<Story name="Value equals contextVals[0]">
	{#snippet template()}
		<PairArrowCell value={0.5} contextVals={[0.5]} extent={[0, 1]} />
	{/snippet}
</Story>

<!-- A custom origin point via `contextVals`. -->
<Story name="Custom contextVals">
	{#snippet template()}
		<PairArrowCell value={0.9} contextVals={[0.4]} extent={[0, 1]} />
	{/snippet}
</Story>

<!-- `positiveColor` and `negativeColor` can be functions of the value. -->
<Story name="Color as a function of value">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<PairArrowCell
				value={0.8}
				contextVals={[0.2]}
				extent={[0, 1]}
				positiveColor={(value) => (value > 0.5 ? 'green' : 'orange')}
				negativeColor={(value) => (value < 0.5 ? 'red' : 'orange')}
			/>
			<PairArrowCell
				value={0.1}
				contextVals={[0.6]}
				extent={[0, 1]}
				positiveColor={(value) => (value > 0.5 ? 'green' : 'orange')}
				negativeColor={(value) => (value < 0.5 ? 'red' : 'orange')}
			/>
		</div>
	{/snippet}
</Story>
