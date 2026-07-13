<script lang="ts">
	import type { TableState } from '$lib/core/lib/tableState.svelte';
	import { sum } from 'd3-array';
	import type { Snippet } from 'svelte';

	interface ScaffoldingProps {
		table: TableState;
		groupControl?: Snippet;
		groupSizes?: Snippet;
		dataColumns?: Snippet;
	}

	let { table, groupControl, groupSizes, dataColumns }: ScaffoldingProps = $props();

	const sumWidths = (widths: string[]) => {
		const colWidths = sum(widths.map((w) => +w.replace('px', '')));
		const colGroupGaps = (table.colGroups || []).length * (table.colGroupGap ?? 0);
		// return colWidths + colGroupGaps + 'px';
		return colWidths + colGroupGaps;
	};
</script>

<!-- items-center - came from DataRow -->
<!-- controlRows added an m-2 -->
<div class="was-tr flex items-stretch" role="row">
	<!-- controls for expanding/collapsing groups -->
	{#if groupControl}{@render groupControl()}{:else}
		{#each table.groupingFields || [] as _field (_field)}
			<div style:width={table.widths.groupControl} id="groupControl"></div>
		{/each}
	{/if}

	{#if table.groupingFields.length > 0}
		<div
			class="flex"
			style:width={sumWidths([
				table.widths.groupLabel,
				table.widths.groupSizeLabel,
				table.widths.groupSizeBar
			]) *
				table.groupingFields.length +
				'px'}
		>
			{#if groupSizes}{@render groupSizes()}{:else}
				{#each new Array(table.groupingFields.length) as _i (_i)}
					<div style:width={table.widths.groupLabel} id="groupLabel"></div>
					<div style:width={table.widths.groupSizeLabel} id="groupSizeLabel"></div>
					<div style:width={table.widths.groupSizeBar} id="groupSizeBar"></div>
				{/each}
			{/if}
		</div>
	{/if}

	{@render dataColumns?.()}
</div>
