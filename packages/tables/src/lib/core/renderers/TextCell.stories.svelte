<script context="module">
	import TextCell from './TextCell.svelte';
	export const meta = {
		title: 'Tables/Components/Renderers/TextCell',
		component: TextCell,

		argTypes: {
			alignText: {
				options: ['left', 'right', 'center'],
				control: { type: 'radio' }
			}
		},

		args: {
			alignText: 'left'
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<TextCell value={'500 cars'} colorScale={() => 'red'} {...args} />
</Template>

<Story name="Default" source />

<Story name="Bold text" source>
	<TextCell value={'500 cars'} colorScale={() => 'red'} fontWeight="bold" />
</Story>
