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
			colorScale: () => 'red'
		}
	});
</script>

{#snippet defaultTemplate({ args })}
	<ColoredCell {...args} />
{/snippet}

<Story name="Default" />
