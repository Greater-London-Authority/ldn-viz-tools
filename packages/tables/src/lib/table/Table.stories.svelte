<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { Select } from '@ldn-viz/ui';
	import Table from './Table.svelte';

	const { Story } = defineMeta({
		title: 'Tables/Components/Table',
		component: Table,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import type { ColSpec } from '$lib/core/lib/types';
	import { Button, Input, theme } from '@ldn-viz/ui';

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
				color: theme.tokenNameToValue('data.categorical.red', theme.currentTheme)
			},
			{
				label: 'Pet',
				startCol: 2,
				endCol: 2,
				color: theme.tokenNameToValue('data.categorical.blue', theme.currentTheme)
			}
		],

		columns: [
			{
				short_label: 'first_name',
				label: 'First Name',

				alignHeader: 'center',

				header: {
					color: theme.tokenNameToValue('data.categorical.red', theme.currentTheme)
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
					color: theme.tokenNameToValue('data.categorical.red', theme.currentTheme)
				},

				cell: { renderer: 'TextCell' }
			},

			{
				short_label: 'pet',
				label: 'Pet',
				sortable: false,
				alignHeader: 'center',

				header: {
					color: theme.tokenNameToValue('data.categorical.blue', theme.currentTheme)
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

	let dataSubset: Record<string, string | number>[] = $state([]);
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

	interface Props {
		page?: number;
	}

	let { page = $bindable(1) }: Props = $props();

	let pageInput = {
		get value() {
			return String(page);
		},
		set value(val: string) {
			page = parseInt(val) || 1;
		}
	};

	let selectedPet: undefined | string = $state(undefined);
</script>

<Story name="Default">
	{#snippet template(args)}
		<Table {...args} {tableSpec} {data} />
	{/snippet}
</Story>

<Story name="Table updates when data changes">
	{#snippet template()}
		<Button onclick={randomlySelectRows}>Update</Button>
		<Table data={dataSubset} {tableSpec} allowSorting filename="My Table" />
	{/snippet}
</Story>

<Story name="Sortable Rows">
	{#snippet template()}
		<Table {data} {tableSpec} allowSorting />
	{/snippet}
</Story>

<Story name="Sortable - but only on some columns">
	{#snippet template()}
		<Table {data} tableSpec={tableSpecPartiallySortable} allowSorting />
	{/snippet}
</Story>

<Story name="Title">
	{#snippet template()}
		<Table
			{data}
			{tableSpec}
			title="Some famous people, and a guess of their favourite pets"
			subTitle="Note that these are only guesses!"
		/>
	{/snippet}
</Story>

<Story name="Content above table">
	{#snippet template()}
		<Table
			{data}
			{tableSpec}
			title="Some famous people, and a guess of their favourite pets"
			subTitle="Note that these are only guesses!"
		>
			{#snippet beforeTable()}
				<div>This will appear before the table.</div>
			{/snippet}
		</Table>
	{/snippet}
</Story>

<Story name="Zebra Striping">
	{#snippet template()}
		<Table {data} {tableSpec} zebraStripe />
	{/snippet}
</Story>

<Story name="Export buttons">
	{#snippet template()}
		<Table {data} {tableSpec} dataDownloadButton imageDownloadButton />
	{/snippet}
</Story>

<Story name="Export buttons - relabel columns">
	{#snippet template()}
		<Table
			{data}
			{tableSpec}
			dataDownloadButton
			imageDownloadButton
			columnMapping={{ first_name: 'First Name', last_name: 'Last Name', pet: 'Pet' }}
		/>
	{/snippet}
</Story>

<Story name="Row Grouping">
	{#snippet template()}
		<Table {data} {tableSpec} allowRowGrouping />
	{/snippet}
</Story>

<Story name="User selection of columns to show">
	{#snippet template()}
		<Table {data} {tableSpec} allowColumnHiding />
	{/snippet}
</Story>

<Story name="Paginated">
	{#snippet template()}
		<Table {data} {tableSpec} paginate pageSize={5} />
	{/snippet}
</Story>

<Story name="Paginated - page size control">
	{#snippet template()}
		<Table {data} {tableSpec} paginate allowPageSizeChanges />
	{/snippet}
</Story>

<Story name="Paginated - page externally controlled">
	{#snippet template()}
		<div class="flex max-w-2xl flex-col gap-4">
			<div class="border-color-ui-border-secondary border p-2">
				<span class="font-bold">Separate control</span>
				<Input bind:value={pageInput.value} type="text" label="Set page here"></Input>
			</div>

			<div class="border-color-ui-border-secondary border p-2">
				<span class="font-bold">Table component</span>

				<Table {data} {tableSpec} paginate pageSize={5} bind:page />
			</div>
		</div>
	{/snippet}
</Story>

<!-- Example of a table that is wider than its parent and needs to be scrolled -->
<Story name="Wide table with fixed width">
	{#snippet template()}
		<Table
			data={wideTableData}
			tableSpec={wideTableSpec}
			paginate
			pageSize={5}
			fixedTableWidth={1200}
			bind:page
		/>
	{/snippet}
</Story>
<!-- TODO: add example of filtering -->

<Story name="Externally implemented filtering">
	{#snippet template()}
		<Select
			label="Show only people whose favourite pet is"
			bind:value={selectedPet}
			options={[
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
	{/snippet}
</Story>

<!-- If required, the table header can be removed entirely-->
<Story name="No header">
	{#snippet template()}
		<Table {data} tableSpec={tableSpecNoHeader} fixedTableWidth={1200} bind:page />
	{/snippet}
</Story>

<!-- tableSpecCustomHeaderColors -->
<Story name="Coloured headers">
	{#snippet template()}
		<Table {data} tableSpec={tableSpecCustomHeaderColors} fixedTableWidth={500} bind:page />
	{/snippet}
</Story>
