<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import DateCell from './DateCell.svelte';
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/DateCell',
		component: DateCell,
		tags: ['autodocs'],

		argTypes: {
			alignText: {
				options: ['left', 'right', 'center'],
				control: { type: 'radio' }
			}
		},
		args: {
			alignText: 'left',
			value: new Date()
		}
	});
</script>

{#snippet defaultTemplate({ args })}
	<DateCell {...args} />
{/snippet}

<Story name="Default" source />
