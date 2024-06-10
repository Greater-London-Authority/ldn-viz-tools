<script context="module">
	import Dot from './Dot.svelte';

	export const meta = {
		title: 'Tables/Encodings/Dot',
		component: Dot,

		argTypes: {
			value: {
				type: 'number',
				inputType: 'number'
			}
		},
		args: {
			value: 0.5,
			extent: [0, 1]
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Dot {...args} />
</Template>

<Story name="Default" source />
