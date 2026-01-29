<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { theme } from '@ldn-viz/ui';
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
