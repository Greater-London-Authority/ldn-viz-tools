<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { theme } from '@ldn-viz/ui';
	import BarDivergingCell from './BarDivergingCell.svelte';

	/**
	 * The `BarDivergingCell` component renders a table cell representing a numerical value as a bar, where the length of the bar encodes the value.
	 * There is a vertical line at x=0, and the bar color indicates whether the value is greater than or less than 0.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/BarDiverging/BarDivergingCell',
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
				positiveColor={theme.tokenNameToValue('surface.positive')}
				negativeColor={theme.tokenNameToValue('surface.negative')}
			/>
			<BarDivergingCell
				{...args}
				value={-1}
				extent={[-2, +2]}
				positiveColor={theme.tokenNameToValue('surface.positive')}
				negativeColor={theme.tokenNameToValue('surface.negative')}
			/>
			<BarDivergingCell
				{...args}
				value={+1}
				extent={[-2, +2]}
				positiveColor={theme.tokenNameToValue('surface.positive')}
				negativeColor={theme.tokenNameToValue('surface.negative')}
			/>
			<BarDivergingCell
				{...args}
				value={+2}
				extent={[-2, +2]}
				positiveColor={theme.tokenNameToValue('surface.positive')}
				negativeColor={theme.tokenNameToValue('surface.negative')}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Changing background colors">
	{#snippet template(args)}
		<div class="flex w-36 flex-col">
			<BarDivergingCell {...args} value={-1} extent={[-2, +2]} backgroundColor="lightGrey" />
			<BarDivergingCell {...args} value={-1} extent={[-2, +2]} backgroundColor="aliceblue" />
			<BarDivergingCell {...args} value={-1} extent={[-2, +2]} backgroundColor="cornsilk" />
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

<!-- A value of exactly zero renders a zero-width positive bar. -->
<Story name="Value at exactly zero">
	{#snippet template()}
		<BarDivergingCell value={0} extent={[-2, +2]} />
	{/snippet}
</Story>

<!-- Labels sit inside the bar when its magnitude passes half the extent
     (`value < extent[0] / 2` or `value > extent[1] / 2`), and outside otherwise. -->
<Story name="Label inside vs outside bar">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<BarDivergingCell value={-1.5} extent={[-2, +2]} />
			<BarDivergingCell value={-0.5} extent={[-2, +2]} />
			<BarDivergingCell value={+0.5} extent={[-2, +2]} />
			<BarDivergingCell value={+1.5} extent={[-2, +2]} />
		</div>
	{/snippet}
</Story>

<!-- A falsy `formatString` suppresses the value label. -->
<Story name="No label">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<BarDivergingCell value={-1} extent={[-2, +2]} formatString="" />
			<BarDivergingCell value={+1} extent={[-2, +2]} formatString="" />
		</div>
	{/snippet}
</Story>

<!-- `positiveColor` / `negativeColor` can each be a function of the value. -->
<Story name="Color as function of value">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<BarDivergingCell
				value={-1.5}
				extent={[-2, +2]}
				negativeColor={(value) => (value < -1 ? 'darkred' : 'salmon')}
				positiveColor={(value) => (value > 1 ? 'darkgreen' : 'lightgreen')}
			/>
			<BarDivergingCell
				value={-0.5}
				extent={[-2, +2]}
				negativeColor={(value) => (value < -1 ? 'darkred' : 'salmon')}
				positiveColor={(value) => (value > 1 ? 'darkgreen' : 'lightgreen')}
			/>
			<BarDivergingCell
				value={+0.5}
				extent={[-2, +2]}
				negativeColor={(value) => (value < -1 ? 'darkred' : 'salmon')}
				positiveColor={(value) => (value > 1 ? 'darkgreen' : 'lightgreen')}
			/>
			<BarDivergingCell
				value={+1.5}
				extent={[-2, +2]}
				negativeColor={(value) => (value < -1 ? 'darkred' : 'salmon')}
				positiveColor={(value) => (value > 1 ? 'darkgreen' : 'lightgreen')}
			/>
		</div>
	{/snippet}
</Story>
