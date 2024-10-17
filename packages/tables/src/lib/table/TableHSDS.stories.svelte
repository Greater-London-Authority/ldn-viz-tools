<script context="module">
	import Table from './Table.svelte';

	export const meta = {
		title: 'Tables/Table - HSDS',
		component: Table
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';

	const footfallData = [
		{
			metric: 'Monday (avg)',
			previous: 150,
			current: 100
		},
		{
			metric: 'Tuesday (avg)',
			previous: 200,
			current: 50
		},
		{
			metric: 'Wednesday (avg)',
			previous: 100,
			current: 150
		},
		{
			metric: 'Thursday (avg)',
			previous: 25,
			current: 60
		},
		{
			metric: 'Friday (avg)',
			previous: 100,
			current: 200
		},
		{
			metric: 'Saturday (avg)',
			previous: 250,
			current: 200
		},
		{
			metric: 'Sunday (avg)',
			previous: 200,
			current: 50
		}
	].map((d) => ({
		...d,
		percentage_change: (100 * (d.current - d.previous)) / d.previous
	}));

	const footfallTableSpec = {
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
					renderer: 'TextCell',
					width: '248px'
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
				relativeWidth: 4,

				cell: {
					renderer: 'PairArrow',
					formatString: ',.0f',
					alignText: 'right',
					contextFields: ['previous'],
					extent: [0, 250],
					width: '200px',

					axisRenderer: 'PairArrowAxis'
				}
			},

			{
				short_label: 'percentage_change',
				label: '% Change',
				domainType: 'MinToMax',
				relativeWidth: 3,

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
</script>

<Story name="Footfall table">
	<Table data={footfallData} tableSpec={footfallTableSpec} />
</Story>
