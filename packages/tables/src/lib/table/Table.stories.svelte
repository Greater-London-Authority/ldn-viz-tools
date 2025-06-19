<script context="module">
	import Table from './Table.svelte';
	import { Select } from '@ldn-viz/ui';

	export const meta = {
		title: 'Tables/Components/Table',
		component: Table
	};
</script>

<script lang="ts">
	import type { ColSpec } from '$lib/core/lib/types';
	import { Button, Input } from '@ldn-viz/ui';
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
				}
			},

			{
				short_label: 'last_name',
				label: 'Last Name',
				cell: { renderer: 'TextCell' }
			},

			{
				short_label: 'pet',
				label: 'Pet',
				cell: { renderer: 'TextCell' }
			}
		]
	};

	const tableSpecPartiallySortable = {
		showColSummaries: false,
		columns: [
			{
				short_label: 'first_name',
				label: 'First Name',

				cell: {
					renderer: 'TextCell'
				}
			},

			{
				short_label: 'last_name',
				label: 'Last Name',
				sortable: false,
				cell: { renderer: 'TextCell' }
			},

			{
				short_label: 'pet',
				label: 'Pet',
				sortable: false,
				cell: { renderer: 'TextCell' }
			}
		]
	};

	const tableSpecNoHeader = {
		showTableHeader: false,

		columns: [
			{
				short_label: 'first_name',
				label: 'First Name',

				column: {},

				cell: {
					renderer: 'TextCell'
				}
			},

			{
				short_label: 'last_name',
				label: 'Last Name',
				sortable: false,
				cell: { renderer: 'TextCell' }
			},

			{
				short_label: 'pet',
				label: 'Pet',
				sortable: false,
				cell: { renderer: 'TextCell' }
			}
		]
	};

	const tableSpecCustomHeaderColors = {
		showColSummaries: false,

		showHeaderTopRule: false,
		// showHeaderBottomRule: false,

		colGroups: [
			{
				label: 'Name',
				startCol: 0,
				endCol: 1,
				color: 'red'
			},
			{
				label: 'Pet',
				startCol: 2,
				endCol: 2,
				color: 'blue'
			}
		],

		columns: [
			{
				short_label: 'first_name',
				label: 'First Name',

				alignHeader: 'center',

				header: {
					color: 'red'
				},

				cell: {
					renderer: 'TextCell'
				}
			},

			{
				short_label: 'last_name',
				label: 'Last Name',
				sortable: false,
				alignHeader: 'center',

				header: {
					color: 'green'
				},

				cell: { renderer: 'TextCell' }
			},

			{
				short_label: 'pet',
				label: 'Pet',
				sortable: false,
				alignHeader: 'center',

				header: {
					color: 'blue'
				},

				cell: { renderer: 'TextCell' }
			}
		]
	};

	let wideTableSpec: { columns: ColSpec[] } = { columns: [] };
	for (let i = 0; i < 25; i++) {
		wideTableSpec.columns.push({
			short_label: `field_${i}`,
			label: `Field ${i}`,

			cell: {
				renderer: 'TextCell',
				alignText: 'left'
			},

			column: { renderer: 'TextCell', value: '' }
		});
	}

	let wideTableData = [];
	for (let j = 0; j < 100; j++) {
		let row: Record<string, number> = {};
		for (let i = 0; i < 25; i++) {
			row[`field_${i}`] = Math.round(Math.random() * 100) / 100;
		}
		wideTableData.push(row);
	}

	let dataSubset: Record<string, string | number>[] = [];
	const randomlySelectRows = () => {
		const selectedEntries = [];
		const arrayCopy = [...data]; // Create a shallow copy of the input array

		for (let i = 0; i < 10; i++) {
			const randomIndex = Math.floor(Math.random() * arrayCopy.length);
			selectedEntries.push(arrayCopy.splice(randomIndex, 1)[0]);
		}

		dataSubset = selectedEntries;
	};
	randomlySelectRows();

	export let page = 1;

	let selectedPet: undefined | string = undefined;
</script>

<Template let:args>
	<Table {data} {tableSpec} {...args} />
</Template>

<Story name="Default" source />

<Story name="Table updates when data changes" source>
	<Button on:click={randomlySelectRows}>Update</Button>
	<Table data={dataSubset} {tableSpec} allowSorting filename="My Table" />
</Story>

<Story name="Sortable Rows" source>
	<Table {data} {tableSpec} allowSorting />
</Story>

<Story name="Sortable - but only on some columns" source>
	<Table {data} tableSpec={tableSpecPartiallySortable} allowSorting />
</Story>

<Story name="Title" source>
	<Table
		{data}
		{tableSpec}
		title="Some famous people, and a guess of their favourite pets"
		subTitle="Note that these are only guesses!"
	/>
</Story>

<Story name="Content above table" source>
	<Table
		{data}
		{tableSpec}
		title="Some famous people, and a guess of their favourite pets"
		subTitle="Note that these are only guesses!"
	>
		<div slot="beforeTable">This will appear before the table.</div>
	</Table>
</Story>

<Story name="Zebra Striping" source>
	<Table {data} {tableSpec} zebraStripe />
</Story>

<Story name="Export buttons" source>
	<Table {data} {tableSpec} dataDownloadButton imageDownloadButton />
</Story>

<Story name="Export buttons - relabel columns" source>
	<Table
		{data}
		{tableSpec}
		dataDownloadButton
		imageDownloadButton
		columnMapping={{ first_name: 'First Name', last_name: 'Last Name', pet: 'Pet' }}
	/>
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
		<div class="border-color-ui-border-secondary border p-2">
			<span class="font-bold">Separate control</span>
			<Input bind:value={page} label="Set page here"></Input>
		</div>

		<div class="border-color-ui-border-secondary border p-2">
			<span class="font-bold">Table component</span>

			<Table {data} {tableSpec} paginate pageSize={5} bind:page />
		</div>
	</div>
</Story>

<!-- Example of a table that is wider than its parent and needs to be scrolled -->
<Story name="Wide table with fixed width">
	<Table
		data={wideTableData}
		tableSpec={wideTableSpec}
		paginate
		pageSize={5}
		fixedTableWidth={1200}
		bind:page
	/>
</Story>
<!-- TODO: add example of filtering -->

<Story name="Externally implemented filtering">
	<Select
		label="Show only people whose favourite pet is"
		bind:justValue={selectedPet}
		items={[
			{ value: 'dog', label: 'Dog' },
			{ value: 'cat', label: 'Cat' },
			{ value: 'bird', label: 'Bird' }
		]}
	/>

	<Table
		data={data.filter((d) => !selectedPet || d.pet === selectedPet)}
		{tableSpec}
		allowSorting
		filename="My Table"
	/>
</Story>

<!-- If required, the table header can be removed entirely-->
<Story name="No header">
	<Table {data} tableSpec={tableSpecNoHeader} fixedTableWidth={1200} bind:page />
</Story>

<!-- tableSpecCustomHeaderColors -->
<Story name="Coloured headers">
	<Table {data} tableSpec={tableSpecCustomHeaderColors} fixedTableWidth={500} bind:page />
</Story>
