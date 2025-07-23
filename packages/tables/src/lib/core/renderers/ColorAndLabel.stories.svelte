<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ColorAndLabel from './ColorAndLabel.svelte';

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

{#snippet defaultTemplate({ args })}
	<ColorAndLabel {...args} />
{/snippet}

<Story name="Default" source />
