<script context="module">
	import BarDivergingCell from './BarDivergingCell.svelte';

	export const meta = {
		title: 'Tables/Renderers/BarDivergingCell',
		component: BarDivergingCell,

		args: {
			value: 0.5
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<BarDivergingCell {...args} />
</Template>

<Story name="Default" source />

<Story name="Custom colors" let:args>
	<div class="w-36 flex flex-col">
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
</Story>

<Story name="Custom text size" let:args>
	<div class="w-36 flex flex-col">
		<BarDivergingCell {...args} value={-1} extent={[-2, +2]} textSize={8} />
		<BarDivergingCell {...args} value={-1} extent={[-2, +2]} textSize={10} />
		<BarDivergingCell {...args} value={-1} extent={[-2, +2]} textSize={16} />
		<BarDivergingCell {...args} value={+1} extent={[-2, +2]} textSize={18} />
	</div>
</Story>
