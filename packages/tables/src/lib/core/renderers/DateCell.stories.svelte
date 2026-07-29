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

<!-- `alignText` positions the text left, right or centre within the cell. -->
<Story name="Text alignment variants">
	{#snippet template()}
		<div class="flex w-64 flex-col divide-y">
			<DateCell value={new Date('2024-01-15')} formatString="%d %B %Y" alignText="left" />
			<DateCell value={new Date('2024-01-15')} formatString="%d %B %Y" alignText="center" />
			<DateCell value={new Date('2024-01-15')} formatString="%d %B %Y" alignText="right" />
		</div>
	{/snippet}
</Story>

<!-- A custom `formatString` in d3-time-format notation. -->
<Story name="Custom formatString">
	{#snippet template()}
		<DateCell value={new Date('2024-01-15')} formatString="%d %B %Y" />
	{/snippet}
</Story>

<!-- A falsy `formatString` prints the raw value rather than a formatted date. -->
<Story name="Raw value">
	{#snippet template()}
		<DateCell value={new Date('2024-01-15')} formatString="" />
	{/snippet}
</Story>
