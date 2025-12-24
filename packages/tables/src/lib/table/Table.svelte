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

	interface Props {
		/**
		 * The data to be displayed in the table. An array of objects: one object per row, and one field per column.
		 */
		data: any[];
		/**
		 * Specification for how the table should be displayed.
		 */
		tableSpec: any;
		/**
		 * Title to be displayed above the table (optional).
		 */
		title?: string;
		/**
		 * Subtitle to be displayed above the table, below the main title (optional).
		 */
		subTitle?: string;
		/**
		 * What appears in the footer:
		 *
		 * * `byline` (string) - statement of who created the visualization
		 * * `source` (string) - statement of where the data came from
		 * * `note` (string) - any additional footnotes
		 */
		source?: string;
		byline?: string;
		note?: string;
		/**
		 * Data Download Button in the footer
		 *
		 * Defaults to `true` which allows user to select download in either 'CSV' or 'JSON' format.
		 * Supply a custom list of formats as an array of strings. Current options either 'CSV', or 'JSON'.
		 * If set to `false`, then the button is hidden.
		 *
		 */
		dataDownloadButton?: true | false | ('CSV' | 'JSON')[];
		/**
		 * Image Download Button in the footer
		 *
		 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
		 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'.
		 * If set to `false`, then the button is hidden.
		 *
		 */
		imageDownloadButton?: true | false | ('PNG' | 'SVG')[];
		/**
		 * The file name to be used for the downloaded data or image file.
		 */
		filename?: string;
		/**
		 * Height of the table (pixels).
		 */
		height?: number;
		/**
		 * Exposes the internal table object, so that it can be programmatically manipulated.
		 */
		// tableObj?: TableData | undefined;
		/**
		 * If `true`, then rows of the table will alternate in color, making it easier to see which cells are on the same row.
		 */
		zebraStripe?: boolean;
		/**
		 * If true, then the rows of the table will be split across multiple pages. Cannot be used at the same time as `virtualise`.
		 */
		paginate?: boolean;
		/**
		 * If true, then the rows of the table will be virtualised. Cannot be used at the same time as `paginate`.
		 */
		virtualise?: boolean;
		/**
		 * The number of table rows to include on each page.
		 */
		pageSize?: number;
		/**
		 * If `true`, then user can control the number of rows per page.
		 */
		allowPageSizeChanges?: boolean;
		/**
		 * The current page (1-indexed).
		 */
		page?: number;
		/**
		 * If `true`, then display controls allowing user to group rows (and order groups).
		 */
		allowRowGrouping?: boolean;
		/**
		 * If `true`, then display controls allowing user to select which columns are displayed.
		 */
		allowColumnHiding?: boolean;
		/**
		 * If `true`, then allow user to sort rows by interacting with column headings.
		 */
		allowSorting?: boolean;
		/**
		 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the downloaded file.
		 */
		columnMapping?: undefined | { [oldName: string]: string };
		/**
		 * An (optional) fixed width in pixels. If not set, the table will expand to fill the width of its parent container.
		 */
		fixedTableWidth?: number | undefined;
		beforeTable?: import('svelte').Snippet;
	}

	let {
		data,
		tableSpec,
		title = '',
		subTitle = '',
		source = '',
		byline = '',
		note = '',
		dataDownloadButton = true,
		imageDownloadButton = ['PNG'],
		filename = '',
		height = 1000,
		// tableObj = $bindable(undefined),
		zebraStripe = false,
		paginate = false,
		virtualise = false,
		pageSize = $bindable(10),
		allowPageSizeChanges = false,
		page = $bindable(1),
		allowRowGrouping = false,
		allowColumnHiding = false,
		allowSorting = false,
		columnMapping = undefined,
		fixedTableWidth = undefined,
		beforeTable
	}: Props = $props();

	let colWidths = $state([]);

	// this is a hack to trigger updates after the tableObj object ha changes in a way that Svelte isn't keeping track of
	let updateTrigger = $state(0);

	const createTable = (data: any[]) => {
		const to = new TableData(tableSpec);

		// to.setOnRowsChange(() => tableObj = tableObj));

		to.setData(data);
		to.setColumnSpec(tableSpec.columns);
		to.setRowOrder([
			{
				field: 'a',
				direction: 'ascending'
			}
		]);

		if (fixedTableWidth) {
			computeWidths(to, fixedTableWidth);
			// TODO: should set tableWidth to match
		}

		return to;
	};

	const setColSpec = (tableObj: TableData, tableSpec: { columns: any }) => {
		if (tableObj) {
			tableObj.setColumnSpec(tableSpec.columns);
		}
	};

	let tableObj = $derived.by(() => {
		const to = createTable(data);

		setColSpec(to, tableSpec);

		return to;
	});

	let visualRows: any[] = $derived.by(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		updateTrigger; // run when grouping or ordering changes

		const vr = [];

		for (let group of tableObj!.groups) {
			if (group.parentGroup && !group.parentGroup.isExpanded) {
				continue;
			}

			if (group.name !== 'Default') {
				vr.push({ type: 'GroupRowCombined', group, uniqueKey: vr.length });
			}

			if (group.isExpanded && (!group.childGroups || group.childGroups.length === 0)) {
				for (let row of tableObj!.fetchGroupContents(group)) {
					vr.push({ type: 'DataRow', row, uniqueKey: vr.length });
				}
			}
		}

		return vr;
	});

	let tableWidth: number | undefined = $state();

	const updateTableWidths = (tableObj: any, newWidth: number) => {
		if (tableObj && !fixedTableWidth) {
			computeWidths(tableObj, newWidth);
			colWidths = tableObj.columnSpec.map((col: { computedWidth: any }) => col.computedWidth);
		}
	};

	$effect(() => {
		if (tableWidth) updateTableWidths(tableObj, tableWidth);
	});

	const beforeTable_render = $derived(beforeTable);
</script>

{#key [colWidths, updateTrigger]}
	{#if tableObj && tableObj.extents}
		<div style:width={fixedTableWidth ? fixedTableWidth + 'px' : '100%'}>
			<div class="ml-4 flex w-[430px] gap-2">
				{#if allowRowGrouping}
					<GroupRowsMenu table={tableObj} onChange={() => updateTrigger++} />
					<SortGroupsMenu table={tableObj} onChange={() => updateTrigger++} />
				{/if}

				{#if allowColumnHiding}
					<ToggleColumnsMenu table={tableObj} onChange={() => updateTrigger++} />
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
				{filename}
				{columnMapping}
			>
				{#snippet beforeTable()}
					{#if beforeTable}
						<!-- Content to be inserted below the title and subtitle, but above the table itself. -->
						{@render beforeTable_render?.()}
					{/if}
				{/snippet}

				{#snippet table()}
					<div
						class="text-color-text-primary w-full table-auto text-sm"
						bind:clientWidth={tableWidth}
						role="table"
					>
						{#if tableSpec.showTableHeader !== false}
							<TableHeader
								{tableSpec}
								table={tableObj}
								{data}
								{allowSorting}
								{tableWidth}
								onChange={() => updateTrigger++}
							/>
						{/if}

						{#if paginate}
							<div style:width={tableWidth} class:striped={zebraStripe} role="rowgroup">
								{#each visualRows as visualRow, i}
									{#if i >= (page - 1) * pageSize && i <= page * pageSize - 1}
										<RowRenderer spec={visualRow} table={tableObj} />
									{/if}
								{/each}
							</div>
						{:else if virtualise}
							<div
								style:height={`${height - 100}px`}
								style:width={tableWidth}
								class:stripedVirtual={zebraStripe}
								role="rowgroup"
							>
								<VirtualScroll data={visualRows} key="uniqueKey">
									{#snippet children({ data }: any)}
										<RowRenderer spec={data} table={tableObj} />
									{/snippet}
								</VirtualScroll>
							</div>
						{:else}
							<div style:width={tableWidth} class:striped={zebraStripe} role="rowgroup">
								{#each visualRows as visualRow}
									<RowRenderer spec={visualRow} table={tableObj} />
								{/each}
							</div>
						{/if}
					</div>
				{/snippet}

				{#snippet paginationControls()}
					<div>
						{#if paginate}
							<PaginationControls {pageSize} numRows={data.length} bind:page />
						{/if}
					</div>
				{/snippet}

				{#snippet numRowsControlSlot()}
					<div>
						{#if paginate && allowPageSizeChanges}
							<NumRowsControls bind:pageSize bind:page />
						{/if}
					</div>
				{/snippet}
			</TableContainer>
		</div>
	{/if}
{/key}

<style lang="postcss">
	:global(.striped > div:nth-child(odd)) {
		@apply bg-color-ui-background-secondary;
	}

	:global(.stripedVirtual > div:first-child > div:first-child > div:nth-child(odd)) {
		@apply bg-color-ui-background-secondary;
	}
</style>
