<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

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
