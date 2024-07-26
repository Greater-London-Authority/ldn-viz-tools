<script context="module">
	import Table from './Table.svelte';

	export const meta = {
		title: 'Tables/Table - Visual Encodings',
		component: Table
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	/******************************************************************************************************************/
	import dataBenchmarks from './demoData/benchmarkData.json';

	const tableSpecBenchmarks = {
		columns: [
			{
				short_label: 'label',
				label: 'High Streets',

				cell: {
					renderer: 'TextCell',
					width: '248px',
					href: (row) =>
						`https://dev.ldn-gis.co.uk/hsds-hub/overview?loc=E09000003&area_type=highstreet&area_id=${row.id}`,
					onClick: (row) => console.log('User clicked on High sTreet cell for row', row)
				},

				column: {
					renderer: 'TextCell',
					value: 'All High Streets average'
				},

				superscriptText: 'Area type'
			},
			{
				short_label: 'avg_night_foot',
				label: 'Average total nighttime footfall',
				data_type: 'float',
				type: 'count',
				display_unit: ' people',
				good_is: 'high',
				agg_by: 'mean',
				domainType: 'MinToMax',

				cell: {
					formatString: ',.0f'
				}
			},
			{
				short_label: 'non-caz',
				label: 'Non-Caz',
				data_type: 'float',
				type: 'benchmark',
				display_unit: ' people',
				good_is: 'high',
				domainType: 'MinToMax',

				cell: {
					formatString: ',.0f'
				}
			},
			{
				short_label: 'caz',
				label: 'Caz',
				data_type: 'float',
				type: 'benchmark',
				display_unit: ' people',
				good_is: 'high',
				agg_by: 'mean',
				domainType: 'MinToMax',

				cell: {
					formatString: ',.0f'
				}
			},
			{
				short_label: 'Inner',
				label: 'Inner London',
				data_type: 'float',
				type: 'benchmark',
				display_unit: ' people',
				good_is: 'high',
				domainType: 'MinToMax',

				cell: {
					formatString: ',.0f'
				}
			},
			{
				short_label: 'Outer',
				label: 'Outer London',
				data_type: 'float',
				type: 'benchmark',
				display_unit: ' people',
				good_is: 'high',
				resolution: 'hex',
				domainType: 'MinToMax',

				cell: {
					formatString: ',.0f'
				}
			},
			{
				short_label: 'london',
				label: 'London',
				data_type: 'float',
				type: 'benchmark',
				display_unit: ' people',
				good_is: 'high',
				agg_by: 'mean',
				domainType: 'MinToMax',

				cell: {
					formatString: ',.0f'
				}
			}
		]
	};

	/******************************************************************************************************************/

	import dataPaginatedRaw from './demoData/salaryData.json';
	const colNames = ['Name', 'Position', 'Office', 'Extension', 'Start Date', 'Salary'];
	const dataPaginated = dataPaginatedRaw
		.map((row) => Object.fromEntries(row.map((val, i) => [colNames[i], val])))
		.map((row) => ({ ...row, Salary: +row.Salary.slice(1).replace(/,/g, '') }));

	const tableSpecPaginated = {
		//  showColSummaries: false,
		columns: [
			{
				short_label: 'Name',
				cell: { renderer: 'TextCell', width: '160px' },
				column: { renderer: 'TextCell', value: '' }
			},

			{
				short_label: 'Position',
				//cell: {renderer: TextCell, width: "240px"},
				cell: { renderer: 'ColorAndLabel', width: '240px' },
				column: { renderer: 'BarChart' }
			},

			{
				short_label: 'Office',
				cell: { renderer: 'ColorAndLabel' },
				column: { renderer: 'BarChart' }
			},

			{
				short_label: 'Extension',
				cell: { renderer: 'TextCell' },
				column: { renderer: 'TextCell', value: '' }
			},

			{
				short_label: 'Start Date',
				cell: { renderer: 'TextCell' },
				column: { renderer: 'TextCell', value: '' }
			},

			{
				short_label: 'Salary',
				cell: { renderer: 'TextCell', formatString: '$,.0f' },
				column: { renderer: 'TextCell', value: '' }
			}
		]
	};

	/******************************************************************************************************************/

	import dataMetrics from './demoData/metricData.json';

	const tableSpecMetrics = {
		// this is a bt of a hack that won't survive re-ordering
		colGroups: [
			{
				label: '',
				startCol: 0,
				endCol: 0
			},
			{
				label: 'Daytime footfall by type',
				startCol: 1,
				endCol: 3
			},

			{
				label: 'Daytime footfall by type',
				startCol: 4,
				endCol: 6
			},

			{
				label: 'Midweek footfall by type',
				startCol: 7,
				endCol: 9
			},
			{
				label: 'Saturday footfall by type',
				startCol: 10,
				endCol: 12
			}
		],

		columns: [
			{
				short_label: 'area',
				label: 'High Streets',

				cell: {
					renderer: 'TextCell',
					alignText: 'left',
					width: '300px',
					href: (row) =>
						`https://dev.ldn-gis.co.uk/hsds-hub/overview?loc=E09000003&area_type=highstreet&area_id=${row.area_id}`
				},

				column: {
					renderer: 'TextCell',
					value: 'All High Streets average'
				},

				superscriptText: 'Area type'
			},

			{
				short_label: 'pct_day_res_foot',
				label: 'Resident',

				cell: {
					renderer: 'BarCell',
					color: '#B05CC1',
					domain: [0, 1],
					formatString: '0.0%'
				},

				column: {
					renderer: 'Mean',
					formatString: '0.0%'
				}
			},
			{
				short_label: 'pct_day_wk_foot',
				label: 'Worker',

				cell: {
					renderer: 'BarCell',
					color: 'rgb(235, 134, 30)',
					domain: [0, 1],
					formatString: '0.0%'
				},

				column: {
					renderer: 'Mean',
					formatString: '0.0%'
				}

				// colSummaryRenderer: Summary
			},
			{
				short_label: 'pct_day_vis_foot',
				label: 'Visitor',

				cell: {
					renderer: 'BarCell',
					color: '#63C5B5',
					domain: [0, 1],
					formatString: '0.0%'
				},

				column: {
					renderer: 'Mean',
					formatString: '0.0%'
				}
			},

			{
				short_label: 'pct_night_res_foot',
				label: 'Resident',

				cell: {
					renderer: 'BarCell',
					color: '#B05CC1',
					domain: [0, 1],
					formatString: '0.0%'
				},

				column: {
					renderer: 'Mean',
					formatString: '0.0%'
				}
			},
			{
				short_label: 'pct_night_wk_foot',
				label: 'Worker',

				cell: {
					renderer: 'BarCell',
					color: 'rgb(235, 134, 30)',
					domain: [0, 1],
					formatString: '0.0%'
				},

				column: {
					renderer: 'Mean',
					formatString: '0.0%'
				}
			},
			{
				short_label: 'pct_night_vis_foot',
				label: 'Visitor',

				cell: {
					renderer: 'BarCell',
					color: '#63C5B5',
					domain: [0, 1],
					formatString: '0.0%'
				},

				column: {
					renderer: 'Mean',
					formatString: '0.0%'
				}
			},

			{
				short_label: 'pct_mw_res_foot',
				label: 'Resident',

				cell: {
					renderer: 'BarCell',
					color: '#B05CC1',
					domain: [0, 1],
					formatString: '0.0%'
				},

				column: {
					renderer: 'Mean',
					formatString: '0.0%'
				}
			},
			{
				short_label: 'pct_mw_wk_foot',
				label: 'Worker',

				cell: {
					renderer: 'BarCell',
					color: 'rgb(235, 134, 30)',
					domain: [0, 1],
					formatString: '0.0%'
				},

				column: {
					renderer: 'Mean',
					formatString: '0.0%'
				}
			},
			{
				short_label: 'pct_mw_vis_foot',
				label: 'Visitor',

				cell: {
					renderer: 'BarCell',
					color: '#63C5B5',
					domain: [0, 1],
					formatString: '0.0%'
				},

				column: {
					renderer: 'Mean',
					formatString: '0.0%'
				}
			},

			{
				short_label: 'pct_sat_res_foot',
				label: 'Resident',

				cell: {
					renderer: 'BarCell',
					color: '#B05CC1',
					domain: [0, 1],
					formatString: '0.0%'
				},

				column: {
					renderer: 'Mean',
					formatString: '0.0%'
				}
			},
			{
				short_label: 'pct_sat_wk_foot',
				label: 'Worker',

				cell: {
					renderer: 'BarCell',
					color: 'rgb(235, 134, 30)',
					domain: [0, 1],
					formatString: '0.0%'
				},

				column: {
					renderer: 'Mean',
					formatString: '0.0%'
				}
			},
			{
				short_label: 'pct_sat_vis_foot',
				label: 'Visitor',

				cell: {
					renderer: 'BarCell',
					color: '#63C5B5',
					domain: [0, 1],
					formatString: '0.0%'
				},

				column: {
					renderer: 'Mean',
					formatString: '0.0%'
				}
			}
		]
	};

	////
	import TextCellWithUncertainty from '../core/renderers/TextCellWithUncertainty.svelte';

	const dataUncertain = [
		{
			Name: 'Bar',
			Age: 18,
			age_known: true,
			Sex: 'Female',
			sex_known: true
		},
		{
			Name: 'Foo',
			Age: 12,
			age_known: false,
			Sex: 'Male',
			sex_known: true
		},
		{
			Name: 'Baz',
			Age: 20,
			age_known: true,
			Sex: 'Male',
			sex_known: false
		},
		{
			Name: 'Foobar',
			Age: 22,
			age_known: false,
			Sex: 'Male',
			sex_known: false
		}
	];
	const tableSpecUncertain = {
		showColSummaries: false,
		columns: [
			{
				short_label: 'Name',
				hintText: 'What this person is called.',
				cell: { renderer: 'TextCell', width: '100px' }
			},

			{
				short_label: 'Age',
				hintText: 'How old this person is, in years.',
				cell: { renderer: TextCellWithUncertainty, width: '100px', contextFields: ['age_known'] }
			},

			{
				short_label: 'Sex',
				hintText: 'Whether this person is male or female.',
				cell: { renderer: TextCellWithUncertainty, width: '100px', contextFields: ['sex_known'] }
			}
		]
	};

	export let page = 1;
</script>

<Template let:args>
	<Table data={dataBenchmarks} tableSpec={tableSpecBenchmarks} {...args} />
</Template>

<!--
This example shows how the encoding used for a column can be influenced by the value of a second column.
 In this case, some fields also have associated fields that record whether the value is known or merely estimated.
 -->
<Story name="Table with uncertain values in columns">
	<Table data={dataUncertain} tableSpec={tableSpecUncertain} allowSorting />
</Story>

<Story name="High Streets Benchmark Table" source>
	<Table data={dataBenchmarks} tableSpec={tableSpecBenchmarks} allowSorting />
</Story>

<Story name="Metrics Example" source>
	<Table data={dataMetrics} tableSpec={tableSpecMetrics} allowSorting allowRowGrouping />
</Story>

<!--
 Try sorting by Salary, or **Group Rows** by *Position* then **Sort groups** by *Mean Salary*.
 This example dataset is from the [DataTables project](https://datatables.net/examples/data_sources/js_array.html)
 -->
<Story name="Salary Example" source>
	<Table data={dataPaginated} tableSpec={tableSpecPaginated} allowSorting allowRowGrouping />
</Story>

<!-- TODO: add example of filtering -->
