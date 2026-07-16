<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TableContainer from './TableContainer.svelte';

	/**
	 * The `TableContainer` is a wrapper around a table that adds additional information such as a title, subtitle, and footer (source/byline/note).
	 * It also provides controls such as data/image download buttons.
	 *
	 * **Note** Similar in structure and functionality to the [ChartContainer](./?path=/docs/charts-components-chartcontainer--documentation)
	 * in @ldn-viz/charts.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/TableContainer',
		component: TableContainer,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	const data = [
		{ first_name: 'Marilyn', last_name: 'Monroe', pet: 'dog' },
		{ first_name: 'Abraham', last_name: 'Lincoln', pet: 'dog' },
		{ first_name: 'Nelson', last_name: 'Mandela', pet: 'cat' }
	];
</script>

<!-- A minimal table rendered through the `table` snippet, with a title and subtitle above it -->
<Story name="Default with title and subtitle">
	{#snippet template()}
		<TableContainer title="Some famous people" subTitle="A guess of their favourite pets">
			{#snippet table()}
				<table class="w-full text-left text-sm text-color-text">
					<thead>
						<tr>
							<th class="pr-4">First name</th>
							<th class="pr-4">Last name</th>
							<th>Pet</th>
						</tr>
					</thead>
					<tbody>
						{#each data as row}
							<tr>
								<td class="pr-4">{row.first_name}</td>
								<td class="pr-4">{row.last_name}</td>
								<td>{row.pet}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/snippet}
		</TableContainer>
	{/snippet}
</Story>

<!-- The `source`, `byline`, and `note` props are forwarded to the footer -->
<Story name="Footer with source, byline, and note">
	{#snippet template()}
		<TableContainer
			title="Some famous people"
			source="Source: made-up data"
			byline="Compiled by the GLA"
			note="These are only guesses!"
		>
			{#snippet table()}
				<table class="w-full text-left text-sm text-color-text">
					<tbody>
						{#each data as row}
							<tr>
								<td class="pr-4">{row.first_name}</td>
								<td class="pr-4">{row.last_name}</td>
								<td>{row.pet}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/snippet}
		</TableContainer>
	{/snippet}
</Story>

<!-- `alt` renders a visually-hidden (`sr-only`) heading describing the table for screen readers -->
<Story name="Alt text">
	{#snippet template()}
		<TableContainer
			title="Some famous people"
			alt="A table of famous people and a guess of their favourite pets"
		>
			{#snippet table()}
				<table class="w-full text-left text-sm text-color-text">
					<tbody>
						{#each data as row}
							<tr>
								<td class="pr-4">{row.first_name}</td>
								<td class="pr-4">{row.last_name}</td>
								<td>{row.pet}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/snippet}
		</TableContainer>
	{/snippet}
</Story>

<!-- Download buttons wired to `data`, with `columnMapping` relabelling the columns in the file -->
<Story name="Download buttons with columnMapping">
	{#snippet template()}
		<TableContainer
			title="Some famous people"
			{data}
			dataDownloadButton
			imageDownloadButton
			columnMapping={{ first_name: 'First Name', last_name: 'Last Name', pet: 'Pet' }}
		>
			{#snippet table()}
				<table class="w-full text-left text-sm text-color-text">
					<tbody>
						{#each data as row}
							<tr>
								<td class="pr-4">{row.first_name}</td>
								<td class="pr-4">{row.last_name}</td>
								<td>{row.pet}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/snippet}
		</TableContainer>
	{/snippet}
</Story>
