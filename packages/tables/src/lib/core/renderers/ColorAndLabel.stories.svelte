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

<Story name="Default">
	{#snippet template(args)}
		<ColorAndLabel {...args} value={args.value ?? 0.5} />
	{/snippet}
</Story>
