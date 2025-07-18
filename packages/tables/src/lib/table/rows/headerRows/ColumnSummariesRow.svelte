<script>
	import Mean from '../../../core/aggregateRenderers/Mean.svelte';
	import ColGroupSpacer from '../../cells/ColGroupSpacer.svelte';
	import Scaffolding from '../Scaffolding.svelte';

	let { table, data } = $props();
</script>

<Scaffolding {table}>
	{#snippet dataColumns()}
	
			{#each table.columnSpec as col, i}
				{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
					<div role="columnheader" class="flex was-th" style:width={col.computedWidth + 'px'}>
						<!-- or 100 width -->
						{#if col.column && col.column.renderer}
							<col.column.renderer
								{table}
								values={data.map((d) => d[col.short_label])}
								extent={table.extents[col.short_label]}
								colorScale={table.scales[col.short_label]}
								posScale={table.posScales[col.short_label]}
								colSpec={col}
								{...col.column}
							/>
						{:else}
							<Mean
								{data}
								values={data.map((d) => d[col.short_label])}
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
