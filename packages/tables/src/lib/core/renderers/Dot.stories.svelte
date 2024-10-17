<script context="module">
	import Dot from './Dot.svelte';

	export const meta = {
		title: 'Tables/Renderers/Dot',
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

<Story name="Multiple">
	<div class="flex flex-col">
		<Dot value={0.2} extent={[0, 1]} formatString="0.1f" />
		<Dot value={0.7} extent={[0, 1]} formatString="0.1f" />
		<Dot value={0.5} extent={[0, 1]} formatString="0.1f" />
		<Dot value={0.3} extent={[0, 1]} formatString="0.1f" />
	</div>
</Story>
