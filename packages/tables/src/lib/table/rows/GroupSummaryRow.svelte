<script>
	import Scaffolding from './Scaffolding.svelte';

	export let group;
	export let table;
	export let tableSpec;
</script>

<Scaffolding {table}>
	<svelte:fragment slot="dataColumns">
		{#each table.columnSpec as col}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<div style:width={col.cell.width ?? table.widths.defaultCell} class="was-td">
					{#if col.group && col.group.renderer}
						<svelte:component
							this={col.group.renderer}
							{table}
							colSpec={col}
							values={table.getValsForGroup(group, col.short_label)}
							extent={table.extents[col.short_label]}
							{...col.group}
						/>

						<!-- <td>{row[col.short_label]}</td> -->
					{/if}
				</div>
			{/if}
		{/each}
	</svelte:fragment>
</Scaffolding>
