<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { theme } from '@ldn-viz/ui';
	import { scaleThreshold } from 'd3-scale';
	import ColoredCell from './ColoredCell.svelte';

	/**
	 * The `ColoredCell` component renders a table cell representing a numerical value as a label, with the background color encoding the value.
	 * See also [ColorAndLabel](./?path=/docs/tables-components-renderers-colorandlabel--documentation).
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/ColoredCell',
		component: ColoredCell,
		tags: ['autodocs'],

		argTypes: {
			value: {
				type: 'number',
				inputType: 'number'
			}
		},
		args: {
			value: 0.5,
			color: () => theme.tokenNameToValue('data.primary')
		}
	});
</script>

<script lang="ts">
	const thresholdColor = scaleThreshold<string | number, string>()
		.domain([0.33, 0.66])
		.range(['#c5dcf2', '#628dba', '#18446c']);
</script>

<Story name="Default">
	{#snippet template(args)}
		<ColoredCell {...args} value={args.value ?? 0.5} />
	{/snippet}
</Story>

<!-- Text colour switches between black and white depending on the background lightness
     (`hsl(...).l >= 0.6`): light fills get black text, dark fills get white text. -->
<Story name="Light vs dark background">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<ColoredCell value={0.5} color="#e6f0fa" />
			<ColoredCell value={0.5} color="#c5dcf2" />
			<ColoredCell value={0.5} color="#3b6894" />
			<ColoredCell value={0.5} color="#18446c" />
		</div>
	{/snippet}
</Story>

<!-- The `color` prop can be a d3 threshold scale. -->
<Story name="Threshold color scale">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<ColoredCell value={0.2} color={thresholdColor} />
			<ColoredCell value={0.5} color={thresholdColor} />
			<ColoredCell value={0.9} color={thresholdColor} />
		</div>
	{/snippet}
</Story>

<!-- If `value` is falsy, nothing is rendered. -->
<Story name="Falsy value renders nothing">
	{#snippet template()}
		<ColoredCell value={0} color="steelblue" />
	{/snippet}
</Story>

<!-- If `color` is falsy, nothing is rendered. -->
<Story name="No color renders empty span">
	{#snippet template()}
		<ColoredCell value={0.5} color="" />
	{/snippet}
</Story>

<!-- A falsy `formatString` renders the coloured cell without a value label. -->
<Story name="No label">
	{#snippet template()}
		<ColoredCell value={0.5} color="steelblue" formatString="" />
	{/snippet}
</Story>
