<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TextCellWithUncertainty from './TextCellWithUncertainty.svelte';

	/**
	 * The `TextCellWithUncertainty` component formats a single value as text and displays it in a table cell.
	 * The first entry of `contextVals` is interpreted as indicating whether the value is uncertain;
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/TextCellWithUncertainty',
		component: TextCellWithUncertainty,
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
		<TextCellWithUncertainty color={() => 'red'} {...args} value={args.value ?? '500 cars'} />
	{/snippet}
</Story>

<Story name="Example">
	{#snippet template()}
		<TextCellWithUncertainty value="Value that is known" contextVals={[true]} />
		<TextCellWithUncertainty value="Value that is merely estimated" contextVals={[false]} />
	{/snippet}
</Story>

<!-- The `alignText` prop controls horizontal alignment (the component default is `center`). -->
<Story name="Alignment variants">
	{#snippet template()}
		<div class="flex w-64 flex-col gap-1">
			<TextCellWithUncertainty value="Left" alignText="left" contextVals={[true]} />
			<TextCellWithUncertainty value="Center" alignText="center" contextVals={[true]} />
			<TextCellWithUncertainty value="Right" alignText="right" contextVals={[true]} />
		</div>
	{/snippet}
</Story>

<!-- A numeric value can be formatted with a `formatString`. -->
<Story name="Numeric value with formatString">
	{#snippet template()}
		<TextCellWithUncertainty value={1234.5678} formatString=",.2f" contextVals={[true]} />
	{/snippet}
</Story>

<!-- With an empty `contextVals` array, the length check fails so the value uses the non-muted color. -->
<Story name="Empty contextVals">
	{#snippet template()}
		<TextCellWithUncertainty value="No uncertainty flag" contextVals={[]} />
	{/snippet}
</Story>
