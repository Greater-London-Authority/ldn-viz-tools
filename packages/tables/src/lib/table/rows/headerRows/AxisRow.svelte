<script lang="ts">
	import ColGroupSpacer from '../../cells/ColGroupSpacer.svelte';
	import Scaffolding from '../Scaffolding.svelte';

	let { table } = $props();
</script>

<Scaffolding {table}>
	{#snippet dataColumns()}
		{#each table.columnSpec as col, i}
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
