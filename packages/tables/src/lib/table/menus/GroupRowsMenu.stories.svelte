<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import GroupRowsMenu from './GroupRowsMenu.svelte';

	/**
	 * The `GroupRowsMenu` component renders a popover (via `Overlay`) with a
	 * multi-select `Select` listing the table's columns (from `table.columnSpec`),
	 * letting the user group rows by one or more fields. It takes the `table`
	 * (a `TableState`) and an `onChange` callback invoked when the grouping changes.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Menus/GroupRowsMenu',
		component: GroupRowsMenu,
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

	// A second table already grouped by "region".
	const tableGrouped = new TableState(tableSpec);
	tableGrouped.rawData = data;
	tableGrouped.columnSpec = tableSpec.columns;
	tableGrouped.groupingFields = ['region'];

	const noop = () => {};
</script>

<Story name="Default (grouping popover)">
	{#snippet template()}
		<GroupRowsMenu {table} onChange={noop} />
	{/snippet}
</Story>

<!-- The table already has a non-empty groupingFields, so the Select shows
     "region" as a pre-selected grouping. -->
<Story name="Pre-existing grouping">
	{#snippet template()}
		<GroupRowsMenu table={tableGrouped} onChange={noop} />
	{/snippet}
</Story>
