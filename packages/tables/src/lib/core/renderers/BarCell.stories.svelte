<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { theme } from '@ldn-viz/ui';
	import BarCell from './BarCell.svelte';

	/**
	 * The `BarCell` component renders a table cell representing a numerical value as a bar, where the length of the bar encodes the value.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/BarCell',
		component: BarCell,
		tags: ['autodocs'],

		args: {
			value: 0.5,
			color: theme.tokenNameToValue('data.primary')
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<BarCell {...args} value={args.value ?? 0.5} />
	{/snippet}
</Story>

<!-- 
Values at or below 0.4 place the label outside/after the bar; values above 0.4
place a white label inside the bar. 
-->
<Story name="Label inside vs outside threshold">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<BarCell value={0.2} color={theme.tokenNameToValue('data.primary')} formatString="0.1f" />
			<BarCell value={0.4} color={theme.tokenNameToValue('data.primary')} formatString="0.1f" />
			<BarCell value={0.6} color={theme.tokenNameToValue('data.primary')} formatString="0.1f" />
			<BarCell value={0.9} color={theme.tokenNameToValue('data.primary')} formatString="0.1f" />
		</div>
	{/snippet}
</Story>

<!-- The `color` prop can be a function of the value. -->
<Story name="Color as a function of value">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<BarCell
				value={0.2}
				color={(val) => (val > 0.5 ? 'crimson' : 'steelblue')}
				formatString="0.1f"
			/>
			<BarCell
				value={0.5}
				color={(val) => (val > 0.5 ? 'crimson' : 'steelblue')}
				formatString="0.1f"
			/>
			<BarCell
				value={0.8}
				color={(val) => (val > 0.5 ? 'crimson' : 'steelblue')}
				formatString="0.1f"
			/>
		</div>
	{/snippet}
</Story>

<!-- A `domain` prop overrides the automatically-extracted `extent` when scaling the bar. -->
<Story name="Custom domain override">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<BarCell
				value={5}
				domain={[0, 10]}
				color={theme.tokenNameToValue('data.primary')}
				formatString="0.0f"
			/>
			<BarCell
				value={8}
				domain={[0, 10]}
				color={theme.tokenNameToValue('data.primary')}
				formatString="0.0f"
			/>
		</div>
	{/snippet}
</Story>

<!-- A falsy `formatString` suppresses the value label. -->
<Story name="No label">
	{#snippet template()}
		<BarCell value={0.5} color={theme.tokenNameToValue('data.primary')} formatString="" />
	{/snippet}
</Story>

<!-- A value above `extent[1]` produces a bar wider than the track. -->
<Story name="Out of extent value">
	{#snippet template()}
		<BarCell
			value={1.5}
			extent={[0, 1]}
			color={theme.tokenNameToValue('data.primary')}
			formatString="0.1f"
		/>
	{/snippet}
</Story>
