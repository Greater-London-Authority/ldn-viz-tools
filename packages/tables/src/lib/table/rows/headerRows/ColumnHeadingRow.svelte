<script lang="ts">
	import { sum } from 'd3-array';

	import type { TableData } from '$lib/core/lib/dataObj';
	import type { LeafOrderCriterion } from '$lib/core/lib/types';
	import Header from '../../../core/renderers/Header.svelte';
	import ColGroupSpacer from '../../cells/ColGroupSpacer.svelte';
	import Scaffolding from '../Scaffolding.svelte';

	interface ColunnHeadingRowProps {
		table: TableData;
		allowSorting?: boolean;
		onChange: () => void;
	}

	let { table, allowSorting, onChange }: ColunnHeadingRowProps = $props();

	const sumWidths = (widths: any[]) => sum(widths.map((w) => +w.replace('px', ''))) + 'px';

	const getCol = (colName: any) =>
		table.columnSpec.find((d: { short_label: any }) => d.short_label === colName);
	const getLabel = (colName: any) => getCol(colName)?.label ?? colName;
</script>

<Scaffolding {table}>
	{#snippet groupSizes()}
		{#each table.groupingFields as colName (colName)}
			<div
				class="was-th flex font-bold"
				role="columnheader"
				style:width={sumWidths([
					table.widths.groupLabel,
					table.widths.groupSizeLabel,
					table.widths.groupSizeBar,
					((table.colGroups || []).length * (table.colGroupGap ?? 0)).toString()
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
		{#each table.columnSpec as col, i (col)}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				{@const colIsSortable = allowSorting && col.sortable !== false}
				{@const order = table.rowOrderSpec.find(
					(f: LeafOrderCriterion) => f.field === col.short_label
				)?.direction}

				{@const SvelteComponent =
					(typeof col.header?.renderer === 'string' ? Header : col.header?.renderer) || Header}
				<div
					class="was-th flex"
					role="columnheader"
					style:width={col.computedWidth + 'px'}
					aria-sort={colIsSortable ? order : undefined}
				>
					<SvelteComponent
						label={col.label ?? col.short_label}
						{order}
						toggle={() => {
							if (colIsSortable) {
								table.toggleSort(col.short_label);
								onChange();
							}
						}}
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
