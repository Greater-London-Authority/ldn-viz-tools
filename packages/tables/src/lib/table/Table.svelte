<script lang="ts">
	import { TableData } from '../core/lib/dataObj';
	import TableContainer from './wrapper/TableContainer.svelte';
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

	export let data;
	export let tableSpec;

	export let title;
	export let subTitle;
	export let exportBtns = false;

	export let height = 1000;

	export let table; // expose the table object, so it can be programmatially manipulated

	export let zebraStripe;
	export let paginate = false;
	export let pageSize = 10;
	export let page = 1;

	let rows = [];
	const onRowsChange = (groups, rows) => {
		// console.log({groups, rows});
		table = table; // hack to force re-render
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
			console.log('SETTING SPEC', tableSpec.columns);
			table.setColumnSpec(tableSpec.columns);
		}
	};
	$: setColSpec(tableSpec);

	let visualRows = [];
	$: {
		visualRows = [];
		console.log({ table });

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

	$: console.log('TABLE CHANGED:', table);
</script>

{#if table && table.extents}
	<div class="flex gap-2 ml-4 w-[430px]">
		<GroupRowsMenu {table} />
		<SortGroupsMenu {table} />
		<ToggleColumnsMenu {table} />
	</div>

	<TableContainer {data} {title} {subTitle} {exportBtns} exportData={data}>
		<div class="table-auto text-sm w-full" slot="table">
			<div class="border-y border-core-grey-800">
				{#if tableSpec.colGroups}
					<ColumnGroupHeadingRow {table} />
				{/if}

				<ColumnHeadingRow {table} />

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
			{#if paginate}
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
