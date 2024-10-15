<script lang="ts">
	import { sum } from 'd3-array';
	import VirtualScroll from 'svelte-virtual-scroll-list';
	import { TableData } from '../core/lib/dataObj';
	import TableContainer from './TableContainer.svelte';
	import GroupRowsMenu from './menus/GroupRowsMenu.svelte';
	import SortGroupsMenu from './menus/SortGroupsMenu.svelte';
	import ToggleColumnsMenu from './menus/ToggleColumnsMenu.svelte';
	import AxisRow from './rows/AxisRow.svelte';
	import ColumnGroupHeadingRow from './rows/ColumnGroupHeadingRow.svelte';
	import ColumnHeadingRow from './rows/ColumnHeadingRow.svelte';
	import ColumnSummariesRow from './rows/ColumnSummariesRow.svelte';
	import ControlRow from './rows/ControlRow.svelte';
	import NumRowsControls from './rows/NumRowsControls.svelte';
	import PaginationControls from './rows/PaginationControls.svelte';
	import RowRenderer from './rows/RowRenderer.svelte';

	/**
	 * The data to be displayed in the table. An array of objects: one object per row, and one field per columns.
	 */
	export let data: any[];

	/**
	 * Specification for how the table should be displayed.
	 */
	export let tableSpec;

	/**
	 * Title to be displayed above the chart (optional).
	 */
	export let title = '';

	/**
	 * Subtitle to be displayed above the chart, below the main title (optional).
	 */
	export let subTitle = '';

	/**
	 * If `true`, there will be buttons to download the data or an image of the table.
	 */
	export let exportBtns = false;

	/**
	 * Height of the table (pixels).
	 */
	export let height = 1000;

	/**
	 * Exposes the internal table object, so that it can be programmatially manipulated.
	 */
	export let table;

	/**
	 * If `ture`, then rows of the table will alternate in color, making it easier to see which cells are on the same row.
	 */
	export let zebraStripe = false;

	/**
	 * If true, then the rows of the table will be split across multiple pages. Cannot be used at the same time as `virtualise`.
	 */
	export let paginate = false;

	/**
	 * If true, then the rows of the table will be virtualised. Cannot be used at the same time as `paginate`.
	 */
	export let virtualise = false;

	/**
	 * The number of table rows to include on each page.
	 */
	export let pageSize = 10;

	/**
	 * If `true`, then user can control the number of rows per page.
	 */
	export let allowPageSizeChanges = false;

	/**
	 * The current page.
	 */
	export let page = 1;

	/**
	 * If `true`, then display controls allowing user to group rows (and order groups).
	 */
	export let allowRowGrouping = false;

	/**
	 * If `true`, then display controls allowing user to select which columns are displayed.
	 */
	export let allowColumnHiding = false;

	/**
	 * If `true`, then allow user to sort rows by interacting with column headings.
	 */
	export let allowSorting = false;

	/**
	 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the downloaded file.
	 */
	export let columnMapping: undefined | { [oldName: string]: string } = undefined;

	const onRowsChange = () => {
		table = table; // eslint-disable-line no-self-assign
	};

	const createTable = (data) => {
		// create the data object
		table = new TableData(tableSpec);

		table.setOnRowsChange(onRowsChange);

		table.setData(data);
		table.setColumnSpec(tableSpec.columns);
		table.setRowOrder([
			{
				field: 'a',
				direction: 'ascending'
			}
		]);
	};

	$: createTable(data);

	const setColSpec = (tableSpec) => {
		if (table) {
			table.setColumnSpec(tableSpec.columns);
		}
	};
	$: setColSpec(tableSpec);

	let visualRows = [];
	$: {
		visualRows = [];

		for (let group of table.groups) {
			if (group.parentGroup && !group.parentGroup.isExpanded) {
				continue;
			}

			if (group.name !== 'Default') {
				visualRows.push({ type: 'GroupRowCombined', group, uniqueKey: visualRows.length });
			}

			if (group.isExpanded && (!group.childGroups || group.childGroups.length === 0)) {
				for (let row of table.fetchGroupContents(group)) {
					visualRows.push({ type: 'DataRow', row, uniqueKey: visualRows.length });
				}
			}
		}
	}
	const sumWidths = (widths) => sum(widths.map((w) => +w.replace('px', ''))) + 'px';

	$: tableWidth = sumWidths([
		// TODO: may need to add some of the values from table.widths to account for chrome added when rows grouped
		...table.columnSpec.map((c) => c.cell.width ?? table.widths.defaultCell)
	]);
</script>

{#if table && table.extents}
	<div class="flex gap-2 ml-4 w-[430px]">
		{#if allowRowGrouping}
			<GroupRowsMenu {table} />
			<SortGroupsMenu {table} />
		{/if}

		{#if allowColumnHiding}
			<ToggleColumnsMenu {table} />
		{/if}
	</div>

	<TableContainer {data} {title} {subTitle} {exportBtns} exportData={data} {columnMapping}>
		<div class="table-auto text-sm w-full text-color-text-primary" slot="table">
			<div class="border-t border-b border-color-ui-border-primary" style:width={tableWidth}>
				{#if tableSpec.colGroups}
					<ColumnGroupHeadingRow {table} />
				{/if}

				<ColumnHeadingRow {table} {allowSorting} />

				{#if tableSpec.showColumnControls}
					<ControlRow {table} />
				{/if}

				{#if tableSpec.showColSummaries === true}
					<ColumnSummariesRow {table} {data} />
				{/if}

				<AxisRow {table} />
			</div>

			{#if paginate}
				<div style:width={tableWidth} class:striped={zebraStripe}>
					{#each visualRows as visualRow, i}
						{#if i > (page - 1) * pageSize + 1 && i <= page * pageSize + 1}
							<RowRenderer spec={visualRow} {table} {tableSpec} />
						{/if}
					{/each}
				</div>
			{:else if virtualise}
				<div
					style:height={`${height - 100}px`}
					style:width={tableWidth}
					class:stripedVirtual={zebraStripe}
				>
					<VirtualScroll data={visualRows} key="uniqueKey" let:data>
						<RowRenderer spec={data} {table} {tableSpec} />
					</VirtualScroll>
				</div>
			{:else}
				<div style:width={tableWidth} class:striped={zebraStripe}>
					{#each visualRows as visualRow}
						<RowRenderer spec={visualRow} {table} {tableSpec} />
					{/each}
				</div>
			{/if}
		</div>

		<div slot="paginationControls">
			{#if paginate}
				<PaginationControls {pageSize} numRows={data.length} bind:page />
			{/if}
		</div>

		<div slot="numRowsControlSlot">
			{#if paginate && allowPageSizeChanges}
				<NumRowsControls bind:pageSize bind:page />
			{/if}
		</div>
	</TableContainer>
{/if}

<style lang="postcss">
	:global(.striped > div:nth-child(odd)) {
		@apply bg-color-ui-background-secondary;
	}

	:global(.stripedVirtual > div:first-child > div:first-child > div:nth-child(odd)) {
		@apply bg-color-ui-background-secondary;
	}
</style>
