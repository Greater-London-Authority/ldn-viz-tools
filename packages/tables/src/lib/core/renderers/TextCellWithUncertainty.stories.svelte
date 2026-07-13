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
