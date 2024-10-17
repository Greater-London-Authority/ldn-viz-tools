<script context="module">
	import ProportionalSymbol from './ProportionalSymbol.svelte';

	export const meta = {
		title: 'Tables/Renderers/ProportionalSymbol',
		component: ProportionalSymbol,

		argTypes: {
			value: {
				type: 'number',
				inputType: 'number'
			}
		},
		args: {
			value: 0.5,
			colorScale: () => 'red',

			extent: [0, 1]
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<ProportionalSymbol {...args} />
</Template>

<Story name="Default" source />
