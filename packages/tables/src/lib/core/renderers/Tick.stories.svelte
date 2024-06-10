<script context="module">
	import Tick from './Tick.svelte';

	export const meta = {
		title: 'Tables/Encodings/Tick',
		component: Tick,

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
	<Tick {...args} />
</Template>

<Story name="Default" source />
