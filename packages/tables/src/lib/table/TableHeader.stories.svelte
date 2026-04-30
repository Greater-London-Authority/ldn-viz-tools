<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TableHeader from './TableHeader.svelte';

	/**
	 * The `TableHeader` component renders the header above the table body.
	 * There are several tracks that may be included, depending on the table specification and the props provided to the `Table` component:
	 * * A horizontal rule delimiting the top of the header(if `showHeaderTopRule` is `true` in the spec)
	 * * Labels for column groups (if these are defined in the `colGroups` section of the spec)
	 * * The headings for each column (determined by the value of the `label` for each entry of `column` in the spec)
	 * * Controls for filtering and changing the visual encoding (if `showColumnControls` is `true` in the spec)
	 * * Summaries of the values in each column (if `showColSummaries` is `true` in the spec)
	 * * A labelled axis, if one exists for the column's cell renderer
	 * * A horizontal rule delimiting the bottom of the header (if `colGroupGap` is set in the spec, then a gap of this size will be left between columns in different groups)
	 * Font size is inherited from the table
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/TableHeader',
		component: TableHeader,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { TableState } from '../core/lib/tableState.svelte';
	import type { TableSpec } from '../core/lib/types';

	const FIXED_WIDTH = 600;

	const data = [
		{
			metric: 'Monday (avg)',
			previous: 150,
			current: 100
		},
		{
			metric: 'Tuesday (avg)',
			previous: 200,
			current: 50
		}
	].map((d) => ({
		...d,
		percentage_change: (100 * (d.current - d.previous)) / d.previous
	}));

	/********************/
	const tableSpecBasic = {
		showHeaderTopRule: false,

		columns: [
			{
				short_label: 'metric',
				label: 'Metric',

				cell: {
					renderer: 'TextCell'
				}
			},

			{
				short_label: 'previous',
				label: 'Previous',

				cell: {
					renderer: 'TextCell',
					formatString: ',.0f',
					alignText: 'right'
				}
			},

			{
				short_label: 'current',
				label: 'Current',

				cell: {
					renderer: 'TextCell',
					formatString: ',.0f',
					alignText: 'right'
				}
			},

			{
				short_label: 'current',
				label: 'Actual',

				cell: {
					renderer: 'PairArrow',
					formatString: ',.0f',
					alignText: 'right',
					contextFields: ['previous'],
					extent: [0, 250]
				}
			},

			{
				short_label: 'percentage_change',
				label: '% Change',
				domainType: 'MinToMax',

				cell: {
					renderer: 'BarDivergingCell',
					formatString: ',.0f',
					alignText: 'right',
					extent: [-140, +140],

					numTicks: 5
				}
			}
		]
	};

	const tableBasic = new TableState(tableSpecBasic);
	tableBasic.rawData = data;
	tableBasic.columnSpec = tableSpecBasic.columns;
	tableBasic.tableWidth = FIXED_WIDTH;

	/********************/
	const tableSpecAlignment: TableSpec = {
		showHeaderTopRule: false,

		columns: [
			{
				short_label: 'metric',
				label: 'Left',
				alignHeader: 'left',

				cell: {
					renderer: 'TextCell'
				}
			},

			{
				short_label: 'previous',
				label: 'Center',
				alignHeader: 'center',

				cell: {
					renderer: 'TextCell',
					formatString: ',.0f',
					alignText: 'right'
				}
			},

			{
				short_label: 'current',
				label: 'Right',
				alignHeader: 'right',

				cell: {
					renderer: 'TextCell',
					formatString: ',.0f',
					alignText: 'right'
				}
			}
		]
	};

	const tableAlignment = new TableState(tableSpecAlignment);
	tableAlignment.rawData = data;
	tableAlignment.columnSpec = tableSpecAlignment.columns;
	tableAlignment.tableWidth = FIXED_WIDTH;

	/*************/
	const tableSpec = {
		colGroupGap: 10,
		colGroups: [
			{
				label: '',
				startCol: 0,
				endCol: 2
			},
			{
				label: '',
				startCol: 3,
				endCol: 3
			},
			{
				label: '',
				startCol: 4,
				endCol: 4
			}
		],

		showHeaderTopRule: false,
		columns: [
			{
				short_label: 'metric',
				label: 'Metric',

				cell: {
					renderer: 'TextCell'
				}
			},

			{
				short_label: 'previous',
				label: 'Previous',

				cell: {
					renderer: 'TextCell',
					formatString: ',.0f',
					alignText: 'right'
				}
			},

			{
				short_label: 'current',
				label: 'Current',

				cell: {
					renderer: 'TextCell',
					formatString: ',.0f',
					alignText: 'right'
				}
			},

			{
				short_label: 'current',
				label: 'Actual',

				cell: {
					renderer: 'PairArrow',
					formatString: ',.0f',
					alignText: 'right',
					contextFields: ['previous'],
					extent: [0, 250],

					axisRenderer: 'PairArrowAxis'
				}
			},

			{
				short_label: 'percentage_change',
				label: '% Change',
				domainType: 'MinToMax',

				cell: {
					renderer: 'BarDivergingCell',
					formatString: ',.0f',
					alignText: 'right',
					extent: [-140, +140],

					axisRenderer: 'BarDivergingAxis',
					numTicks: 5
				}
			}
		]
	};

	const table = new TableState(tableSpec);
	table.rawData = data;
	table.columnSpec = tableSpec.columns;
	table.tableWidth = FIXED_WIDTH;

	/*************************/

	const tableSpecColSummaries = {
		colGroupGap: 10,
		colGroups: [
			{
				label: '',
				startCol: 0,
				endCol: 2
			},
			{
				label: '',
				startCol: 3,
				endCol: 3
			},
			{
				label: '',
				startCol: 4,
				endCol: 4
			}
		],

		showHeaderTopRule: false,

		showColSummaries: true,

		columns: [
			{
				short_label: 'metric',
				label: 'Metric',

				cell: {
					renderer: 'TextCell'
				},

				column: { renderer: 'TextCell', value: '' }
			},

			{
				short_label: 'previous',
				label: 'Previous',

				cell: {
					renderer: 'TextCell',
					formatString: ',.0f',
					alignText: 'right'
				},

				column: { renderer: 'Mean' }
			},

			{
				short_label: 'current',
				label: 'Current',

				cell: {
					renderer: 'TextCell',
					formatString: ',.0f',
					alignText: 'right'
				},

				column: { renderer: 'Mean' }
			},

			{
				short_label: 'current',
				label: 'Actual',

				cell: {
					renderer: 'PairArrow',
					formatString: ',.0f',
					alignText: 'right',
					contextFields: ['previous'],
					extent: [0, 250],

					axisRenderer: 'PairArrowAxis'
				},

				column: { renderer: 'TextCell', value: '' }
			},

			{
				short_label: 'percentage_change',
				label: '% Change',
				domainType: 'MinToMax',

				cell: {
					renderer: 'BarDivergingCell',
					formatString: ',.0f',
					alignText: 'right',
					extent: [-140, +140],

					axisRenderer: 'BarDivergingAxis',
					numTicks: 5
				},

				column: { renderer: 'TextCell', value: '' }
			}
		]
	};

	const tableColSummaries = new TableState(tableSpecColSummaries);
	tableColSummaries.rawData = data;
	tableColSummaries.columnSpec = tableSpecColSummaries.columns;
	tableColSummaries.tableWidth = FIXED_WIDTH;

	/**************/

	const tableSpecColSummariesGroupHeadings = {
		colGroupGap: 10,
		colGroups: [
			{
				label: 'Group 1',
				startCol: 0,
				endCol: 2
			},
			{
				label: 'Group 2',
				startCol: 3,
				endCol: 3
			},
			{
				label: 'Group 3',
				startCol: 4,
				endCol: 4
			}
		],

		showHeaderTopRule: false,

		showColSummaries: true,

		columns: [
			{
				short_label: 'metric',
				label: 'Metric',

				cell: {
					renderer: 'TextCell'
				},

				column: { renderer: 'TextCell', value: '' }
			},

			{
				short_label: 'previous',
				label: 'Previous',

				cell: {
					renderer: 'TextCell',
					formatString: ',.0f',
					alignText: 'right'
				},

				column: { renderer: 'Mean' }
			},

			{
				short_label: 'current',
				label: 'Current',

				cell: {
					renderer: 'TextCell',
					formatString: ',.0f',
					alignText: 'right'
				},

				column: { renderer: 'Mean' }
			},

			{
				short_label: 'current',
				label: 'Actual',

				cell: {
					renderer: 'PairArrow',
					formatString: ',.0f',
					alignText: 'right',
					contextFields: ['previous'],
					extent: [0, 250],

					axisRenderer: 'PairArrowAxis'
				},

				column: { renderer: 'TextCell', value: '' }
			},

			{
				short_label: 'percentage_change',
				label: '% Change',
				domainType: 'MinToMax',

				cell: {
					renderer: 'BarDivergingCell',
					formatString: ',.0f',
					alignText: 'right',
					extent: [-140, +140],

					axisRenderer: 'BarDivergingAxis',
					numTicks: 5
				},

				column: { renderer: 'TextCell', value: '' }
			}
		]
	};

	const tableColSummariesGroupHeadings = new TableState(tableSpecColSummariesGroupHeadings);
	tableColSummariesGroupHeadings.rawData = data;
	tableColSummariesGroupHeadings.columnSpec = tableSpecColSummariesGroupHeadings.columns;
	tableColSummariesGroupHeadings.tableWidth = FIXED_WIDTH;

	/*********************************/
	const tableSpecControls = {
		showHeaderTopRule: false,

		showColumnControls: true,

		columns: [
			{
				short_label: 'metric',
				label: 'Metric',

				cell: {
					renderer: 'TextCell'
				}
			},

			{
				short_label: 'previous',
				label: 'Previous',

				cell: {
					renderer: 'TextCell',
					formatString: ',.0f',
					alignText: 'right'
				}
			},

			{
				short_label: 'current',
				label: 'Current',

				cell: {
					renderer: 'TextCell',
					formatString: ',.0f',
					alignText: 'right'
				}
			},

			{
				short_label: 'current',
				label: 'Actual',

				cell: {
					renderer: 'PairArrow',
					formatString: ',.0f',
					alignText: 'right',
					contextFields: ['previous'],
					extent: [0, 250]
				}
			},

			{
				short_label: 'percentage_change',
				label: '% Change',
				domainType: 'MinToMax',

				cell: {
					renderer: 'BarDivergingCell',
					formatString: ',.0f',
					alignText: 'right',
					extent: [-140, +140],

					numTicks: 5
				}
			}
		]
	};

	const tableControls = new TableState(tableSpecControls);
	tableControls.rawData = data;
	tableControls.columnSpec = tableSpecControls.columns;
	tableControls.tableWidth = FIXED_WIDTH;
</script>

<Story name="Default">
	{#snippet template()}
		<TableHeader {data} tableSpec={tableSpecBasic} table={tableBasic} tableWidth={FIXED_WIDTH} />
	{/snippet}
</Story>

<Story name="Header Alignment">
	{#snippet template()}
		<div style:width="600px">
			<TableHeader
				{data}
				tableSpec={tableSpecAlignment}
				table={tableAlignment}
				tableWidth={FIXED_WIDTH}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Header Alignment with sorting">
	{#snippet template()}
		<div style:width="600px">
			<TableHeader
				{data}
				tableSpec={tableSpecAlignment}
				table={tableAlignment}
				tableWidth={FIXED_WIDTH}
				allowSorting={true}
			/>
		</div>
	{/snippet}
</Story>

<Story name="With axes and colGroup gaps">
	{#snippet template()}
		<TableHeader {data} {tableSpec} {table} tableWidth={FIXED_WIDTH} />
	{/snippet}
</Story>

<Story name="With sorting enabled">
	{#snippet template()}
		<TableHeader {data} {tableSpec} {table} allowSorting={true} tableWidth={FIXED_WIDTH} />
	{/snippet}
</Story>

<Story name="With column summaries">
	{#snippet template()}
		<TableHeader
			{data}
			tableSpec={tableSpecColSummaries}
			table={tableColSummaries}
			tableWidth={FIXED_WIDTH}
		/>
	{/snippet}
</Story>

<Story name="With column summaries and sorting">
	{#snippet template()}
		<TableHeader
			{data}
			tableSpec={tableSpecColSummaries}
			table={tableColSummaries}
			tableWidth={FIXED_WIDTH}
			allowSorting={true}
		/>
	{/snippet}
</Story>

<Story name="With column summaries, sorting, and col group labels">
	{#snippet template()}
		<TableHeader
			{data}
			tableSpec={tableSpecColSummariesGroupHeadings}
			table={tableColSummariesGroupHeadings}
			tableWidth={FIXED_WIDTH}
			allowSorting={true}
		/>
	{/snippet}
</Story>

<Story name="With column controls">
	{#snippet template()}
		<TableHeader
			{data}
			tableSpec={tableSpecControls}
			table={tableControls}
			tableWidth={FIXED_WIDTH}
			allowSorting={true}
		/>
	{/snippet}
</Story>
