<script context="module">
	import Table from './Table.svelte';

	export const meta = {
		title: 'Tables/Table',
		component: Table
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Input } from '@ldn-viz/ui';

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

	let wideTableSpec = { columns: [] };
	for (let i = 0; i < 25; i++) {
		wideTableSpec.columns.push({
			short_label: `field_${i}`,
			label: `Field ${i}`,

			cell: {
				renderer: 'TextCell',
				width: '125px',
				alignText: 'left'
			},

			column: { renderer: 'TextCell', value: '' }
		});
	}

	let wideTableData = [];
	for (let j = 0; j < 100; j++) {
		let row = {};
		for (let i = 0; i < 25; i++) {
			row[`field_${i}`] = Math.round(Math.random() * 100) / 100;
		}
		wideTableData.push(row);
	}

	export let page = 1;
</script>

<Template let:args>
	<Table {data} {tableSpec} {...args} />
</Template>

<Story name="Default" source />

<Story name="Sortable Rows" source>
	<Table {data} {tableSpec} allowSorting />
</Story>

<Story name="Title" source>
	<Table
		{data}
		{tableSpec}
		title="Some famous people, and a guess of their favourite pets"
		subTitle="Note that these are only guesses!"
	/>
</Story>

<Story name="Zebra Striping" source>
	<Table {data} {tableSpec} zebraStripe />
</Story>

<Story name="Export buttons" source>
	<Table {data} {tableSpec} exportBtns />
</Story>

<Story name="Row Grouping" source>
	<Table {data} {tableSpec} allowRowGrouping />
</Story>

<Story name="User selection of columns to show" source>
	<Table {data} {tableSpec} allowColumnHiding />
</Story>

<Story name="Paginated" source>
	<Table {data} {tableSpec} paginate pageSize={5} />
</Story>

<Story name="Paginated - page size control" source>
	<Table {data} {tableSpec} paginate allowPageSizeChanges />
</Story>

<Story name="Paginated - page externally controlled" source>
	<div class="flex flex-col gap-4 max-w-2xl">
		<div class="border-core-grey-200 border-2 p-2">
			<span class="font-bold">Separate control</span>
			<Input bind:value={page} label="Set page here"></Input>
		</div>

		<div class="border-core-grey-200 border-2 p-2">
			<span class="font-bold">Table component</span>

			<Table {data} {tableSpec} paginate pageSize={5} bind:page />
		</div>
	</div>
</Story>

<!-- Example of a table that is wider than its parent and needs to be scrolled -->
<Story name="Wide table">
	<Table data={wideTableData} tableSpec={wideTableSpec} paginate pageSize={5} bind:page />
</Story>
<!-- TODO: add example of filtering -->
