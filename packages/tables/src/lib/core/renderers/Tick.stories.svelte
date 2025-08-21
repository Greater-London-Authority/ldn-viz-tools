<script context="module">
	import Tick from './Tick.svelte';

	export const meta = {
		title: 'Tables/Components/Renderers/Tick',
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

<Story name="Multiple">
	<div class="flex flex-col">
		<Tick value={0.2} extent={[0, 1]} formatString="0.1f" />
		<Tick value={0.7} extent={[0, 1]} formatString="0.1f" />
		<Tick value={0.5} extent={[0, 1]} formatString="0.1f" />
		<Tick value={0.3} extent={[0, 1]} formatString="0.1f" />
	</div>
</Story>
