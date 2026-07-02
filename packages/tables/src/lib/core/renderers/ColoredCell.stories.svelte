<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { theme } from '@ldn-viz/ui';
	import ColoredCell from './ColoredCell.svelte';

	/**
	 * The `ColoredCell` component renders a table cell representing a numerical value as a label, with the background color encoding the value.
	 * See also [ColorAndLabel](./?path=/docs/tables-components-renderers-colorandlabel--documentation).
	 */
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
			color: () => theme.tokenNameToValue('data.primary')
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<ColoredCell {...args} value={args.value ?? 0.5} />
	{/snippet}
</Story>
