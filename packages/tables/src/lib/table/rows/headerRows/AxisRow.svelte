<script lang="ts">
	import ColGroupSpacer from '../../cells/ColGroupSpacer.svelte';
	import Scaffolding from '../Scaffolding.svelte';

	export let table;
</script>

<Scaffolding {table}>
	<svelte:fragment slot="dataColumns">
		{#each table.columnSpec as col, i}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<div style:width={col.computedWidth + 'px'} class="was-td" style="flex-shrink: 0">
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
			<ColGroupSpacer {table} {i} />
		{/each}
	</svelte:fragment>
</Scaffolding>
