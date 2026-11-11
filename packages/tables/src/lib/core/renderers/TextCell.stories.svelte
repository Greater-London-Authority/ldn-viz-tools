<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { theme } from '@ldn-viz/ui';
	import TextCell from './TextCell.svelte';

	/**
	 * The `TextCell` component formats a single value as text and displays it in a table cell.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/TextCell',
		component: TextCell,
		tags: ['autodocs'],

		argTypes: {
			alignText: {
				options: ['left', 'right', 'center'],
				control: { type: 'radio' }
			}
		},

		args: {
			alignText: 'left',
			value: '500 cars'
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<TextCell {...args} value={args.value} />
	{/snippet}
</Story>

<Story name="Bold text">
	{#snippet template(args)}
		<TextCell {...args} value={args.value} fontWeight="bold" />
	{/snippet}
</Story>

<Story name="Custom color">
	{#snippet template(args)}
		<TextCell {...args} value={args.value} color={theme.tokenNameToValue('surface.positive')} />
	{/snippet}
</Story>

<!-- The `alignText` prop controls the horizontal alignment of the text within the cell. -->
<Story name="Alignment variants">
	{#snippet template()}
		<div class="flex w-64 flex-col gap-1">
			<TextCell value="Left" alignText="left" />
			<TextCell value="Center" alignText="center" />
			<TextCell value="Right" alignText="right" />
		</div>
	{/snippet}
</Story>

<!-- `visibility` can be a static value or a function of the value; here cells with value 0 are hidden. -->
<Story name="Conditional visibility">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<TextCell value={1} visibility={(value) => (+value === 0 ? 'hidden' : 'visible')} />
			<TextCell value={0} visibility={(value) => (+value === 0 ? 'hidden' : 'visible')} />
			<TextCell value={2} visibility={(value) => (+value === 0 ? 'hidden' : 'visible')} />
		</div>
	{/snippet}
</Story>

<!-- `fontWeight` can be a function of the value; larger values are rendered bold. -->
<Story name="Font weight as a function of value">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<TextCell value={10} fontWeight={(value) => (+value > 50 ? 'bold' : 'normal')} />
			<TextCell value={80} fontWeight={(value) => (+value > 50 ? 'bold' : 'normal')} />
		</div>
	{/snippet}
</Story>

<!-- A numeric value can be formatted with a `formatString`. -->
<Story name="Numeric value with formatString">
	{#snippet template()}
		<TextCell value={1234.5678} formatString=",.2f" />
	{/snippet}
</Story>
