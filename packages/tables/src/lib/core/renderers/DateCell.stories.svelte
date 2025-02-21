<script context="module">
	import DateCell from './DateCell.svelte';
	export const meta = {
		title: 'Tables/Components/Renderers/DateCell',
		component: DateCell,

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
	<DateCell value={new Date()} colorScale={() => 'red'} {...args} />
</Template>

<Story name="Default" source />
