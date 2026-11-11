<script lang="ts">
	import type { TableState } from '$lib/core/lib/tableState.svelte';
	import type { DataRow } from '$lib/core/lib/types';
	import Mean from '../../../core/aggregateRenderers/Mean.svelte';
	import ColGroupSpacer from '../../cells/ColGroupSpacer.svelte';
	import Scaffolding from '../Scaffolding.svelte';

	interface ColumnSummariesRowProps {
		table: TableState;
		data: DataRow[];
	}

	let { table, data }: ColumnSummariesRowProps = $props();
</script>

<Scaffolding {table}>
	{#snippet dataColumns()}
		{#each table.resolvedColumnSpec as col, i (col)}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<div role="columnheader" class="was-th flex" style:width={col.computedWidth + 'px'}>
					<!-- or 100 width -->
					{#if col.column && col.column.renderer && typeof col.column.renderer !== 'string'}
						<col.column.renderer
							{table}
							values={data.map((d: DataRow) => d[col.short_label])}
							extent={table.extents[col.short_label]}
							color={table.scales[col.short_label]}
							posScale={table.posScales[col.short_label]}
							colSpec={col}
							{...col.column}
						/>
					{:else}
						<Mean
							{data}
							values={data.map((d: DataRow) => d[col.short_label]) as any}
							colSpec={col}
							{...col.column}
						/>
					{/if}
				</div>
			{/if}

			<ColGroupSpacer {table} {i} />
		{/each}
	{/snippet}
</Scaffolding>
