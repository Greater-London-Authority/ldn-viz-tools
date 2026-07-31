<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import SortGroupsMenu from './SortGroupsMenu.svelte';

	/**
	 * The `SortGroupsMenu` component renders a popover (via `Overlay`) for ordering
	 * row groups. It takes the `table` (a `TableState`) and an `onChange` callback,
	 * and shows Selects for the aggregation, the field to aggregate, and the sort
	 * order. When the aggregation is `count`, the "of their" field Select is hidden.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Menus/SortGroupsMenu',
		component: SortGroupsMenu,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { TableState } from '../../core/lib/tableState.svelte';
	import type { TableSpec } from '../../core/lib/types';

	const data = [
		{ region: 'North', metric: 'Monday (avg)', current: 100 },
		{ region: 'North', metric: 'Tuesday (avg)', current: 50 },
		{ region: 'South', metric: 'Monday (avg)', current: 80 }
	];

	const tableSpec: TableSpec = {
		columns: [
			{ short_label: 'region', label: 'Region', cell: { renderer: 'TextCell' } },
			{ short_label: 'metric', label: 'Metric', cell: { renderer: 'TextCell' } },
			{ short_label: 'current', label: 'Current', cell: { renderer: 'TextCell' } }
		]
	};

	const table = new TableState(tableSpec);
	table.rawData = data;
	table.columnSpec = tableSpec.columns;
	table.groupingFields = ['region'];

	// A second table whose group ordering uses the `count` aggregation.
	const tableCount = new TableState(tableSpec);
	tableCount.rawData = data;
	tableCount.columnSpec = tableSpec.columns;
	tableCount.groupingFields = ['region'];
	tableCount.groupingOrderSpec = [
		{ field: 'current', direction: 'descending', aggregation: 'count' }
	];

	const noop = () => {};
</script>

<Story name="Default (sort-groups popover)">
	{#snippet template()}
		<SortGroupsMenu {table} onChange={noop} />
	{/snippet}
</Story>

<!-- The table's group ordering uses the `count` aggregation, so the
     "of their" field Select is hidden. -->
<Story name="Count aggregation">
	{#snippet template()}
		<SortGroupsMenu table={tableCount} onChange={noop} />
	{/snippet}
</Story>
