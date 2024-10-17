<script context="module">
	import Table from './Table.svelte';

	export const meta = {
		title: 'Tables/Table -  Column Widths',
		component: Table,
		args: []
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	const data = [
		{ id: 1, first_name: 'Marilyn', last_name: 'Monroe', pet: 'dog' },
		{ id: 2, first_name: 'Abraham', last_name: 'Lincoln', pet: 'dog' },
		{ id: 3, first_name: 'Mother', last_name: 'Teresa', pet: '' },
		{ id: 4, first_name: 'John F.', last_name: 'Kennedy', pet: 'dog' },
		{ id: 5, first_name: 'Martin Luther', last_name: 'King', pet: 'dog' },
		{ id: 6, first_name: 'Nelson', last_name: 'Mandela', pet: 'cat' },
		{ id: 7, first_name: 'Winston', last_name: 'Churchill', pet: 'cat' },
		{ id: 8, first_name: 'George', last_name: 'Soros', pet: 'bird' },
		{ id: 9, first_name: 'Bill', last_name: 'Gates', pet: 'cat' },
		{ id: 10, first_name: 'Muhammad', last_name: 'Ali', pet: 'dog' },
		{ id: 11, first_name: 'Mahatma', last_name: 'Gandhi', pet: 'bird' },
		{ id: 12, first_name: 'Margaret', last_name: 'Thatcher', pet: 'cat' },
		{ id: 13, first_name: 'Christopher', last_name: 'Columbus', pet: 'dog' },
		{ id: 14, first_name: 'Charles', last_name: 'Darwin', pet: 'dog' },
		{ id: 15, first_name: 'Elvis', last_name: 'Presley', pet: 'dog' },
		{ id: 16, first_name: 'Albert', last_name: 'Einstein', pet: 'dog' },
		{ id: 17, first_name: 'Paul', last_name: 'McCartney', pet: 'cat' },
		{ id: 18, first_name: 'Queen', last_name: 'Victoria', pet: 'dog' },
		{ id: 19, first_name: 'Pope', last_name: 'Francis', pet: 'cat' }
	];

	const tableSpec = {
		showColSummaries: false,
		columns: [
			{
				short_label: 'first_name',
				label: 'First Name',
				cell: {
					renderer: 'TextCell'
				},

				column: { renderer: 'TextCell', value: '' }
			},

			{
				short_label: 'last_name',
				label: 'Last Name',
				cell: { renderer: 'TextCell' },
				column: { renderer: 'TextCell', value: '' }
			},

			{
				short_label: 'pet',
				label: 'Pet',
				cell: { renderer: 'TextCell' },
				column: { renderer: 'TextCell', value: '' }
			}
		]
	};

	const tableSpecFixedCol = {
		showColSummaries: false,
		columns: [
			{
				short_label: 'first_name',
				label: 'First Name',
				width: 248, // 248 px could also be used
				cell: {
					renderer: 'TextCell'
				},

				column: { renderer: 'TextCell', value: '' }
			},

			{
				short_label: 'last_name',
				label: 'Last Name',
				cell: { renderer: 'TextCell' },
				column: { renderer: 'TextCell', value: '' }
			},

			{
				short_label: 'pet',
				label: 'Pet',
				cell: { renderer: 'TextCell' },
				column: { renderer: 'TextCell', value: '' }
			}
		]
	};

	const tableSpecRelativeColSizes = {
		showColSummaries: false,
		columns: [
			{
				short_label: 'first_name',
				label: 'First Name',
				relativeWidth: 3,
				cell: {
					renderer: 'TextCell'
				},

				column: { renderer: 'TextCell', value: '' }
			},

			{
				short_label: 'last_name',
				label: 'Last Name',
				cell: { renderer: 'TextCell' },
				column: { renderer: 'TextCell', value: '' }
			},

			{
				short_label: 'pet',
				label: 'Pet',
				relativeWidth: 2,
				cell: { renderer: 'TextCell' },
				column: { renderer: 'TextCell', value: '' }
			}
		]
	};
</script>

<Template let:args>
	<Table {data} {tableSpec} {...args} />
</Template>

<!-- This is the default behaviour: equally sized columns, which respond to changes in the width of the parent container. -->
<Story name="Default" source />

<!-- Here the table has a fixed width. -->
<Story name="Fixed-width table">
	<Table {data} {tableSpec} fixedTableWidth={600} />
</Story>

<!-- Here the first column has a fixed width. -->
<Story name="One column with fixed size" source>
	<Table {data} tableSpec={tableSpecFixedCol} />
</Story>

<!-- Here the column sizes are set to 3, 1, and 2 (in relative units). -->
<Story name="Relative column sizes" source>
	<Table {data} tableSpec={tableSpecRelativeColSizes} />
</Story>
