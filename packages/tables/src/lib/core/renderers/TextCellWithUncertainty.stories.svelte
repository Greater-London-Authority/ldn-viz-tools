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

{#snippet defaultTemplate({ args })}
	<TextCellWithUncertainty value={'500 cars'} colorScale={() => 'red'} {...args} />
{/snippet}

<Story name="Default" source />

<Story name="Example" source>
	{#snippet template(args)}
		<TextCellWithUncertainty value={'Value that is known'} contextVals={[true]} />
		<TextCellWithUncertainty value={'Value that is merely estimated'} contextVals={[false]} />
	{/snippet}
</Story>
