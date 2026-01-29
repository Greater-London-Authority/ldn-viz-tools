<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { theme } from '@ldn-viz/ui';
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
			colorScale: () => theme.tokenNameToValue('data.primary')
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<ColorAndLabel {...args} value={args.value ?? 0.5} />
	{/snippet}
</Story>
