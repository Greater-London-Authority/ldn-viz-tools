<script>
	import ColGroupSpacer from '../../cells/ColGroupSpacer.svelte';
	import Scaffolding from '../Scaffolding.svelte';

	export let group;
	export let table;
</script>

<Scaffolding {table}>
	<svelte:fragment slot="dataColumns">
		{#each table.columnSpec as col, i}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<div style:width={col.computedWidth + 'px'} class="was-td">
					{#if col.group && col.group.renderer}
						<svelte:component
							this={col.group.renderer}
							values={table.getValsForGroup(group, col.short_label)}
							extent={table.extents[col.short_label]}
							colorScale={table.scales[col.short_label]}
							posScale={table.posScales[col.short_label]}
							{...col.group}
						/>

						<!-- <td>{row[col.short_label]}</td> -->
					{/if}
				</div>
			{/if}
			<ColGroupSpacer {table} {i} />
		{/each}
	</svelte:fragment>
</Scaffolding>
