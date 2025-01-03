<script context="module">
	import ColorAndLabel from './ColorAndLabel.svelte';

	export const meta = {
		title: 'Tables/Renderers/ColorAndLabel',
		component: ColorAndLabel,

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
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<ColorAndLabel {...args} />
</Template>

<Story name="Default" source />
