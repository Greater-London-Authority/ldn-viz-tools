<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ColorAndLabel from './ColorAndLabel.svelte';

	/**
	 * The `ColorAndLabel` component renders a table cell representing a numerical value as a label, next to a small square with a background color encoding the value.
	 * See also [ColoredCell](./?path=/docs/tables-components-renderers-coloredcell--documentation).
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/ColorAndLabel',
		component: ColorAndLabel,
		tags: ['autodocs'],

		argTypes: {
			value: {
				type: 'number',
				inputType: 'number'
			}
		},
		args: {
			value: 0.5,
			colorScale: () => 'red'
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<ColorAndLabel {...args} value={args.value ?? 0.5} />
	{/snippet}
</Story>
