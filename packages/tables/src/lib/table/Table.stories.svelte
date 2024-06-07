<script context="module">
	import Table from './Table.svelte';

	export const meta = {
		title: 'Tables/Table',
		component: Table
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
		columns: [
			{
				short_label: 'first_name',
				label: 'First Name',

				cell: {
					renderer: 'TextCell',
					width: '248px'
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
</script>

<Template let:args>
	<Table {data} {tableSpec} />
</Template>

<Story name="Default" source />

<Story name="Zebra Striping" source>
	<Table {data} {tableSpec} zebraStripe />
</Story>

<Story name="Export buttons" source>
	<Table {data} {tableSpec} exportBtns />
</Story>
