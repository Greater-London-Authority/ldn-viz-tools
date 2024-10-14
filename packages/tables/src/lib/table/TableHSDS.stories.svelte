<script context="module">
	import Table from './Table.svelte';

	export const meta = {
		title: 'Tables/Table - HSDS',
		component: Table
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';

	const footfallDataDayOrNight = [
		{
			metric: 'Nighttime (total)',
			previous: 300,
			current: 500,
			percentage_change: (100 * (500 - 300)) / 300
		},
		{
			metric: 'Daytime (total)',
			previous: 400,
			current: 200,
			percentage_change: (100 * (200 - 400)) / 400
		}
	];

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
		showHeaderTopRule: false,
		columns: [
			{
				short_label: 'metric',
				label: 'Metric',

				cell: {
					renderer: 'TextCell',
					width: '248px'
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

				column: { renderer: 'TextCell', value: '' }
			},

			{
				short_label: 'current',
				label: 'Current',

				cell: {
					renderer: 'TextCell',
					formatString: ',.0f',
					alignText: 'right'
				},

				column: { renderer: 'TextCell', value: '' }
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
					width: '200px',

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
</script>

<Story name="Footfall table">
	<Table data={footfallData} tableSpec={footfallTableSpec} />
</Story>
