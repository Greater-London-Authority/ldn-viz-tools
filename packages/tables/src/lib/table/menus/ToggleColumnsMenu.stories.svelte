<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ToggleColumnsMenu from './ToggleColumnsMenu.svelte';

	/**
	 * The `ToggleColumnsMenu` component renders a popover (via `Overlay`) with a
	 * `CheckboxGroup` listing the table's columns (from `table.columnSpec`), letting
	 * the user show or hide each. It takes the `table` (a `TableState`) and an
	 * `onChange` callback invoked when the set of visible fields changes.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Menus/ToggleColumnsMenu',
		component: ToggleColumnsMenu,
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

	// A second table where only a subset of fields is visible.
	const tableHidden = new TableState(tableSpec);
	tableHidden.rawData = data;
	tableHidden.columnSpec = tableSpec.columns;
	tableHidden.visibleFields = ['metric', 'current'];

	const noop = () => {};
</script>

<Story name="Default (show/hide popover)">
	{#snippet template()}
		<ToggleColumnsMenu {table} onChange={noop} />
	{/snippet}
</Story>

<!-- The table's visibleFields is a subset, so only "metric" and "current" are
     checked in the CheckboxGroup. -->
<Story name="Some columns hidden">
	{#snippet template()}
		<ToggleColumnsMenu table={tableHidden} onChange={noop} />
	{/snippet}
</Story>
