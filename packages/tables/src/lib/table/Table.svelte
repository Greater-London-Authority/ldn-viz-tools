<script lang="ts">
	import { computeWidths } from '../core/lib/computeWidths';

	import VirtualScroll from 'svelte-virtual-scroll-list';
	import { TableData } from '../core/lib/dataObj';
	import TableContainer from './TableContainer.svelte';
	import GroupRowsMenu from './menus/GroupRowsMenu.svelte';
	import SortGroupsMenu from './menus/SortGroupsMenu.svelte';
	import ToggleColumnsMenu from './menus/ToggleColumnsMenu.svelte';
	import NumRowsControls from './paginationControls/NumRowsControls.svelte';
	import PaginationControls from './paginationControls/PaginationControls.svelte';
	import RowRenderer from './rows/RowRenderer.svelte';

	import TableHeader from './TableHeader.svelte';

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
	 * What appears in the footer:
	 *
	 * * `byline` (string) - statement of who created the visualization
	 * * `source` (string) - statement of where the data came from
	 * * `note` (string) - any additional footnotes
	 */
	export let source = '';

	export let byline = '';

	export let note = '';

	/**
	 * Data Download Button in the footer
	 *
	 * Defaults to `true` which allows user to select download in either 'CSV' or 'JSON' format.
	 * Supply a custom list of formats as an array of strings. Current options either 'CSV', or 'JSON'.
	 * If set to `false`, then the button is hidden.
	 *
	 */
	export let dataDownloadButton: true | false | ('CSV' | 'JSON')[] = true;

	/**
	 * Image Download Button in the footer
	 *
	 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
	 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'.
	 * If set to `false`, then the button is hidden.
	 *
	 */
	export let imageDownloadButton: true | false | ('PNG' | 'SVG')[] = true;

	/**
	 * Height of the table (pixels).
	 */
	export let height = 1000;

	/**
	 * Exposes the internal table object, so that it can be programmatically manipulated.
	 */
	export let table: TableData | undefined = undefined;

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

	/**
	 * An (optional) fixed width in pixels. If not set, the table will expand to fill the width of its parent container.
	 */
	export let fixedTableWidth: number | undefined = undefined;

	const onRowsChange = () => {
		table = table; // eslint-disable-line no-self-assign
	};

	const createTable = (data: any[]) => {
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

		if (fixedTableWidth) {
			computeWidths(table, fixedTableWidth);
			// TODO: should set tableWidth to match
		}
	};

	$: createTable(data);

	const setColSpec = (tableSpec: { columns: any }) => {
		if (table) {
			table.setColumnSpec(tableSpec.columns);
		}
	};
	$: setColSpec(tableSpec);

	let visualRows: any[] = [];
	$: {
		visualRows = [];

		for (let group of table!.groups) {
			if (group.parentGroup && !group.parentGroup.isExpanded) {
				continue;
			}

			if (group.name !== 'Default') {
				visualRows.push({ type: 'GroupRowCombined', group, uniqueKey: visualRows.length });
			}

			if (group.isExpanded && (!group.childGroups || group.childGroups.length === 0)) {
				for (let row of table!.fetchGroupContents(group)) {
					visualRows.push({ type: 'DataRow', row, uniqueKey: visualRows.length });
				}
			}
		}
	}

	let tableWidth;

	const updateTableWidths = (newWidth) => {
		if (table && !fixedTableWidth) {
			computeWidths(table, newWidth);
			table = table; // eslint-disable-line no-self-assign
		}
	};

	$: updateTableWidths(tableWidth);
</script>

{#if table && table.extents}
	<div style:width={fixedTableWidth ? fixedTableWidth + 'px' : '100%'}>
		<div class="flex gap-2 ml-4 w-[430px]">
			{#if allowRowGrouping}
				<GroupRowsMenu {table} />
				<SortGroupsMenu {table} />
			{/if}

			{#if allowColumnHiding}
				<ToggleColumnsMenu {table} />
			{/if}
		</div>

		<TableContainer
			{data}
			{title}
			{subTitle}
			{source}
			{byline}
			{note}
			{dataDownloadButton}
			{imageDownloadButton}
			{columnMapping}
		>
			<div
				class="table-auto text-sm w-full text-color-text-primary"
				slot="table"
				bind:clientWidth={tableWidth}
			>
				<TableHeader {tableSpec} {table} {data} {allowSorting} {tableWidth} />

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
	</div>
{/if}

<style lang="postcss">
	:global(.striped > div:nth-child(odd)) {
		@apply bg-color-ui-background-secondary;
	}

	:global(.stripedVirtual > div:first-child > div:first-child > div:nth-child(odd)) {
		@apply bg-color-ui-background-secondary;
	}
</style>
