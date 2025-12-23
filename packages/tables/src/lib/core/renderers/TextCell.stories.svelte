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

<Story name="Default">
	{#snippet template(args)}
		<TextCell {...args} />
	{/snippet}
</Story>

<Story name="Bold text">
	{#snippet template()}
		<TextCell fontWeight="bold" />
	{/snippet}
</Story>
