<script context="module">
	import TableHeader from './TableHeader.svelte';

	export const meta = {
		title: 'Tables/Components/TableHeader',
		component: TableHeader
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';

	import { computeWidths } from '../core/lib/computeWidths';
	import { TableData } from '../core/lib/dataObj';

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

	const tableBasic = new TableData(tableSpecBasic);
	tableBasic.setData(data);
	tableBasic.setColumnSpec(tableSpecBasic.columns);
	computeWidths(tableBasic, FIXED_WIDTH);

	/********************/
	const tableSpecAlignment = {
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

	const tableAlignment = new TableData(tableSpecAlignment);
	tableAlignment.setData(data);
	tableAlignment.setColumnSpec(tableSpecAlignment.columns);
	computeWidths(tableAlignment, FIXED_WIDTH);

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

	const table = new TableData(tableSpec);
	table.setData(data);
	table.setColumnSpec(tableSpec.columns);
	computeWidths(table, FIXED_WIDTH);

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

	const tableColSummaries = new TableData(tableSpecColSummaries);
	tableColSummaries.setData(data);
	tableColSummaries.setColumnSpec(tableSpecColSummaries.columns);
	computeWidths(tableColSummaries, FIXED_WIDTH);

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

	const tableColSummariesGroupHeadings = new TableData(tableSpecColSummariesGroupHeadings);
	tableColSummariesGroupHeadings.setData(data);
	tableColSummariesGroupHeadings.setColumnSpec(tableSpecColSummariesGroupHeadings.columns);
	computeWidths(tableColSummariesGroupHeadings, FIXED_WIDTH);

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

	const tableControls = new TableData(tableSpecControls);
	tableControls.setData(data);
	tableControls.setColumnSpec(tableSpecControls.columns);
	computeWidths(tableControls, FIXED_WIDTH);
</script>

<Story name="Default">
	<TableHeader {data} tableSpec={tableSpecBasic} table={tableBasic} tableWidth={FIXED_WIDTH} />
</Story>

<Story name="Header Alignment">
	<div style:width="600px">
		<TableHeader
			{data}
			tableSpec={tableSpecAlignment}
			table={tableAlignment}
			tableWidth={FIXED_WIDTH}
		/>
	</div>
</Story>

<Story name="With axes and colGroup gaps">
	<TableHeader {data} {tableSpec} {table} tableWidth={FIXED_WIDTH} />
</Story>

<Story name="With sorting enabled">
	<TableHeader {data} {tableSpec} {table} allowSorting={true} tableWidth={FIXED_WIDTH} />
</Story>

<Story name="With column summaries">
	<TableHeader
		{data}
		tableSpec={tableSpecColSummaries}
		table={tableColSummaries}
		tableWidth={FIXED_WIDTH}
	/>
</Story>

<Story name="With column summaries and sorting">
	<TableHeader
		{data}
		tableSpec={tableSpecColSummaries}
		table={tableColSummaries}
		tableWidth={FIXED_WIDTH}
		allowSorting={true}
	/>
</Story>

<Story name="With column summaries, sorting, and col group labels">
	<TableHeader
		{data}
		tableSpec={tableSpecColSummariesGroupHeadings}
		table={tableColSummariesGroupHeadings}
		tableWidth={FIXED_WIDTH}
		allowSorting={true}
	/>
</Story>

<Story name="With column controls">
	<TableHeader
		{data}
		tableSpec={tableSpecControls}
		table={tableControls}
		tableWidth={FIXED_WIDTH}
		allowSorting={true}
	/>
</Story>
