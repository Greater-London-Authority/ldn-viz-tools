<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TextCellWithUncertainty from './TextCellWithUncertainty.svelte';
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

<Story name="Default" source>
	{#snippet template(args)}
		<TextCellWithUncertainty value="500 cars" colorScale={() => 'red'} {...args} />
	{/snippet}
</Story>

<Story name="Example" source>
	{#snippet template()}
		<TextCellWithUncertainty value="Value that is known" contextVals={[true]} />
		<TextCellWithUncertainty value="Value that is merely estimated" contextVals={[false]} />
	{/snippet}
</Story>
