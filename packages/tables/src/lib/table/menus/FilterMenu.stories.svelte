<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import FilterMenu from './FilterMenu.svelte';

	/**
	 * The `FilterMenu` component renders a popover (via `Overlay`) for filtering a
	 * column. It takes the column (`col`) and the `table` (a `TableState`). The user
	 * picks a filter type from the `Select`, enters a value, and applies or clears
	 * the filter (which updates `table.filters`). Choosing the `range` type reveals
	 * a second value input.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Menus/FilterMenu',
		component: FilterMenu,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { TableState } from '../../core/lib/tableState.svelte';
	import type { TableSpec } from '../../core/lib/types';

	const data = [
		{ metric: 'Monday (avg)', previous: 150, current: 100 },
		{ metric: 'Tuesday (avg)', previous: 200, current: 50 }
	];

	const tableSpec: TableSpec = {
		columns: [
			{ short_label: 'metric', label: 'Metric', cell: { renderer: 'TextCell' } },
			{ short_label: 'previous', label: 'Previous', cell: { renderer: 'TextCell' } },
			{ short_label: 'current', label: 'Current', cell: { renderer: 'TextCell' } }
		]
	};

	const table = new TableState(tableSpec);
	table.rawData = data;
	table.columnSpec = tableSpec.columns;

	const col = table.columnSpec[1];
</script>

<Story name="Default (filter popover)">
	{#snippet template()}
		<FilterMenu {col} {table} />
	{/snippet}
</Story>

<!-- Selecting the `range` filter type in the Select reveals a second value
     (val2) input alongside the first. There is no prop to pre-seed the
     selection, so open the popover and choose "range" to see it. -->
<Story name="Range filter">
	{#snippet template()}
		<FilterMenu {col} {table} />
	{/snippet}
</Story>
