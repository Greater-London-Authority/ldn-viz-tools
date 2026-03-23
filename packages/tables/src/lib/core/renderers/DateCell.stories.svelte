<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import DateCell from './DateCell.svelte';

	/**
	 * The `DateCell` component renders a table cell representing a single date or datetime as text.
	 */
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

<Story name="Default">
	{#snippet template(args)}
		<DateCell {...args} value={args.value ?? new Date()} />
	{/snippet}
</Story>
