<script lang="ts">
	import Scaffolding from './Scaffolding.svelte';

	export let table;

	const DEFAULT_CELL_WIDTH = '100px';
</script>

<Scaffolding {table}>
	<svelte:fragment slot="dataColumns">
		{#each table.columnSpec as col}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<div
					style:width={col.cell.width ?? DEFAULT_CELL_WIDTH}
					class="was-td"
					style="flex-shrink: 0"
				>
					{#if col.cell && col.cell.axisRenderer}
						<svelte:component
							this={col.cell.axisRenderer}
							colorScale={table.scales[col.short_label]}
							posScale={table.posScales[col.short_label]}
							extent={table.extents[col.short_label]}
							{...col.cell}
						/>
					{/if}
				</div>
			{/if}
		{/each}
	</svelte:fragment>
</Scaffolding>
