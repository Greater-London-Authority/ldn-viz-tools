<script lang="ts">
	import { TableData } from '../core/lib/dataObj';
	import TableContainer from './TableContainer.svelte';
	import RowRenderer from './rows/RowRenderer.svelte';
	import VirtualScroll from 'svelte-virtual-scroll-list';
	import PaginationControls from './rows/PaginationControls.svelte';
	import NumRowsControls from './rows/NumRowsControls.svelte';
	import ControlRow from './rows/ControlRow.svelte';
	import ColumnGroupHeadingRow from './rows/ColumnGroupHeadingRow.svelte';
	import ColumnHeadingRow from './rows/ColumnHeadingRow.svelte';
	import ColumnSummariesRow from './rows/ColumnSummariesRow.svelte';
	import GroupRowsMenu from './menus/GroupRowsMenu.svelte';
	import SortGroupsMenu from './menus/SortGroupsMenu.svelte';
	import ToggleColumnsMenu from './menus/ToggleColumnsMenu.svelte';

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
	 * If true, then the rows of the table will be split across multiple pages.
	 */
	export let paginate = false;

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

	let rows = [];
	const onRowsChange = (groups, rows) => {
		table = table; // eslint-disable-line no-self-assign
	};

	const createTable = (data) => {
		// create the data object
		table = new TableData(tableSpec);

		table.setOnRowsChange(onRowsChange);

		table.setData(data);
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

	<TableContainer {data} {title} {subTitle} {exportBtns} exportData={data}>
		<div class="table-auto text-sm w-full" slot="table">
			<div class="border-t border-b" style="border-color: black">
				{#if tableSpec.colGroups}
					<ColumnGroupHeadingRow {table} />
				{/if}

				<ColumnHeadingRow {table} {allowSorting} />

				{#if tableSpec.showColumnControls}
					<ControlRow {table} />
				{/if}

				{#if tableSpec.showColSummaries !== false}
					<ColumnSummariesRow {table} {data} />
				{/if}
			</div>

			<div
				style:height={paginate ? '' : `${height - 100}px`}
				class:striped={zebraStripe && paginate}
				class:stripedVirtual={zebraStripe && !paginate}
			>
				{#if paginate}
					{#each visualRows as visualRow, i}
						{#if i > (page - 1) * pageSize + 1 && i <= page * pageSize + 1}
							<RowRenderer spec={visualRow} {table} {tableSpec} />
						{/if}
					{/each}
				{:else}
					<VirtualScroll data={visualRows} key="uniqueKey" let:data>
						<RowRenderer spec={data} {table} {tableSpec} />
					</VirtualScroll>
				{/if}
			</div>
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

<style>
	:global(.striped > div:nth-child(odd)) {
		background-color: #f5f5f5; /* core-grey-50 */
	}

	:global(.stripedVirtual > div:first-child > div:first-child > div:nth-child(odd)) {
		background-color: #f5f5f5; /* core-grey-50 */
	}
</style>
