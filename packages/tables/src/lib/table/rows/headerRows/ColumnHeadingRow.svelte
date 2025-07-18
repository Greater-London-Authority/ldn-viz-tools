<script lang="ts">
	import { sum } from 'd3-array';

	import Header from '../../../core/renderers/Header.svelte';
	import ColGroupSpacer from '../../cells/ColGroupSpacer.svelte';
	import Scaffolding from '../Scaffolding.svelte';


	let { table, allowSorting } = $props();

	const sumWidths = (widths: any[]) => sum(widths.map((w) => +w.replace('px', ''))) + 'px';

	const getCol = (colName: any) =>
		table.columnSpec.find((d: { short_label: any }) => d.short_label === colName);
	const getLabel = (colName: any) => getCol(colName).label ?? colName;
</script>

<Scaffolding {table}>
	{#snippet groupSizes()}
	
			{#each table.groupingFields as colName}
				<div
					class="flex font-bold was-th"
					role="columnheader"
					style:width={sumWidths([
						table.widths.groupLabel,
						table.widths.groupSizeLabel,
						table.widths.groupSizeBar,
						((table.colGroups || []).length * (table.colGroupGapSpacer ?? 0)).toString()
					])}
				>
					{getLabel(colName)}
				</div>
			{/each}
		
	{/snippet}

	<!-- This is a warn for unexpected slot -->
	<!-- <div class="flex was-th" role="columnheader" slot="groupSizeLabel">
		{table.groups.length > 1 ? 'Count' : ''}
	</div> -->

	{#snippet dataColumns()}
	
			{#each table.columnSpec as col, i}
				{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
					{@const colIsSortable = allowSorting && col.sortable !== false}
					{@const order = table.rowOrderSpec.find((f) => f.field === col.short_label)?.direction}

					{@const SvelteComponent = col.header?.renderer || Header}
				<div
						class="flex was-th"
						role="columnheader"
						style:width={col.computedWidth + 'px'}
						aria-sort={colIsSortable ? order : ''}
					>
						<SvelteComponent
							label={col.label ?? col.short_label}
							{order}
							toggle={() => colIsSortable && table.toggleSort(col.short_label)}
							allowSorting={allowSorting && col.sortable !== false}
							alignHeader={col.alignHeader}
							superscriptText={col.superscriptText}
							hintText={col.hintText}
							hintComponent={col.hintComponent}
							hintType={col.hintType ?? 'tooltip'}
							{...col.header || {}}
						/>
					</div>
				{/if}
				<ColGroupSpacer {table} {i} />
			{/each}
		
	{/snippet}
</Scaffolding>
