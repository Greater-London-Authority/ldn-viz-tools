<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TextCell from './TextCell.svelte';
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

{#snippet defaultTemplate({ args })}
	<TextCell value={'500 cars'} {...args} />
{/snippet}

<Story name="Default" source />

<Story name="Bold text" source>
	{#snippet template(args)}
		<TextCell value={'500 cars'} fontWeight="bold" />
	{/snippet}
</Story>
