<script lang="ts">
	import type { TableState } from '$lib/core/lib/tableState.svelte';
	import ColGroupSpacer from '../../cells/ColGroupSpacer.svelte';
	import Scaffolding from '../Scaffolding.svelte';

	interface Props {
		table: TableState;
	}

	let { table }: Props = $props();
</script>

<Scaffolding {table}>
	{#snippet dataColumns()}
		{#each table.resolvedColumnSpec as col, i (col)}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<div style:width={col.computedWidth + 'px'} class="was-td">
					{#if col.cell && col.cell.axisRenderer}
						<col.cell.axisRenderer
							color={table.scales[col.short_label]}
							posScale={table.posScales[col.short_label]}
							extent={table.extents[col.short_label]}
							{...col.cell}
							width={col.computedWidth}
						/>
					{/if}
				</div>
			{/if}
			<ColGroupSpacer {table} {i} />
		{/each}
	{/snippet}
</Scaffolding>
