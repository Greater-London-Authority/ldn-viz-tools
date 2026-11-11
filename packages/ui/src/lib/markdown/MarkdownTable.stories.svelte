<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MarkdownTable from './MarkdownTable.svelte';

	/**
	 * `MarkdownTable` is rendered instead of the `<table>` HTML element in markdown processed by mdsvex.
	 * It wraps the table in a `<figure>` that scrolls horizontally when the table is wider than its container.
	 *
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Markdown/MarkdownTable',
		component: MarkdownTable,
		tags: ['autodocs']
	});

	const boroughs = [
		{ name: 'Barnet', population: 389344, area: 86.7 },
		{ name: 'Croydon', population: 390719, area: 86.5 },
		{ name: 'Newham', population: 351036, area: 36.2 }
	];
</script>

<Story name="Default">
	{#snippet template()}
		<div class="typeset-longform">
			<MarkdownTable>
				<thead>
					<tr><th>Borough</th><th>Population</th><th>Area (km²)</th></tr>
				</thead>
				<tbody>
					{#each boroughs as b (b.name)}
						<tr><td>{b.name}</td><td>{b.population}</td><td>{b.area}</td></tr>
					{/each}
				</tbody>
			</MarkdownTable>
		</div>
	{/snippet}
</Story>

<!-- The figure scrolls horizontally when the table is wider than it. -->
<Story name="Wide table">
	{#snippet template()}
		<div class="typeset-longform max-w-sm">
			<MarkdownTable>
				<thead>
					<tr>
						{#each ['Borough', '2019', '2020', '2021', '2022', '2023', '2024'] as heading (heading)}
							<th class="whitespace-nowrap">{heading}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each boroughs as b (b.name)}
						<tr>
							<td>{b.name}</td>
							{#each [0, 1, 2, 3, 4, 5] as offset (offset)}
								<td>{b.population + offset * 1000}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</MarkdownTable>
		</div>
	{/snippet}
</Story>
