<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ColoredCell from './ColoredCell.svelte';

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
			color: () => 'red'
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<ColoredCell {...args} />
	{/snippet}
</Story>
