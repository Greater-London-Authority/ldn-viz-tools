<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import TableContainer from './TableContainer.svelte';
	import { Card } from '@ldn-viz/ui';

	/**
	 * `TableContainer` wraps a table with the shared chrome primitives — a `ChromeHeader`
	 * (title / subtitle / optional hint) above and a `ChromeFooter` row (source / byline / note
	 * + data/image download buttons) below — the same pieces used by `Card` and `ChartContainer`.
	 *
	 * It has **no surface of its own** (no border, padding or shadow); compose it inside a `Card`
	 * when a surface is wanted. That is what lets several tables share one Card: the Card title
	 * takes `emphasis="secondary"` (an eyebrow labelling the group) while each `TableContainer`
	 * keeps its own dominant title — the primary-slot rule (see the last two stories).
	 *
	 * The table is supplied via the `table` snippet; `beforeTable`, `numRowsControlSlot` and
	 * `paginationControls` snippets remain for content and pagination controls.
	 *
	 * **Note** Mirrors [ChartContainer](./?path=/docs/charts-components-chartcontainer--documentation)
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

<!--
	`hint` shows an information affordance beside the title (shared `ChromeHeader` with `ChartContainer`).
	A string opens an `Overlay`; `hintType` selects `tooltip` (default), `popover`, or `modal`.
-->
<Story name="With hint (tooltip)">
	{#snippet template()}
		<TableContainer
			title="Some famous people"
			subtitle="A guess of their favourite pets"
			hint="Favourite pets are illustrative guesses, not survey data."
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

<!--
	`description` is a longer account of the table. Provided once, it is exposed to screen readers
	(visually hidden, `aria-describedby`) and to sighted users via a "View description" link in the
	footer that opens a Modal. `alt` remains the short text alternative.
-->
<Story name="With description (both audiences)">
	{#snippet template()}
		<TableContainer
			title="Some famous people"
			alt="A table of famous people and a guess of their favourite pets"
			description="This table lists three well-known figures alongside an illustrative guess of the kind of pet they might have kept. It is placeholder data for demonstration only."
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

<!--
	`TableContainer` has no surface of its own — no border, padding or shadow. When a surface is
	wanted, compose it inside a `Card` (which supplies border/padding/shadow), exactly as with
	`ChartContainer`. Here the Card owns the title (primary slot), so the single table is untitled.
-->
<Story name="Inside a Card (single table)">
	{#snippet template()}
		<div class="max-w-xl">
			<Card title="Some famous people" subtitle="A guess of their favourite pets">
				<TableContainer source="Made-up data" byline="Compiled by the GLA">
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
			</Card>
		</div>
	{/snippet}
</Story>

<!--
	Several tables in one Card. The Card title yields the primary slot (`emphasis="secondary"`, so it
	renders as an eyebrow labelling the group), and each `TableContainer` carries its own dominant
	title — the primary-slot rule from the spec.
-->
<Story name="Multiple tables in a Card">
	{#snippet template()}
		<div class="max-w-3xl">
			<Card title="Directory" emphasis="secondary">
				<div class="grid gap-x-12 gap-y-6 sm:grid-cols-2">
					<TableContainer title="Dog people">
						{#snippet table()}
							<table class="w-full text-left text-sm text-color-text">
								<tbody>
									{#each data.filter((r) => r.pet === 'dog') as row}
										<tr>
											<td class="pr-4">{row.first_name}</td>
											<td>{row.last_name}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						{/snippet}
					</TableContainer>
					<TableContainer title="Cat people">
						{#snippet table()}
							<table class="w-full text-left text-sm text-color-text">
								<tbody>
									{#each data.filter((r) => r.pet === 'cat') as row}
										<tr>
											<td class="pr-4">{row.first_name}</td>
											<td>{row.last_name}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						{/snippet}
					</TableContainer>
				</div>
			</Card>
		</div>
	{/snippet}
</Story>
