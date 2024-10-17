<script>
	import Mean from '../../../core/aggregateRenderers/Mean.svelte';
	import ColGroupSpacer from '../../cells/ColGroupSpacer.svelte';
	import Scaffolding from '../Scaffolding.svelte';

	export let table;
	export let data;
</script>

<Scaffolding {table}>
	<svelte:fragment slot="dataColumns">
		{#each table.columnSpec as col, i}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<div
					role="columnheader"
					colspan="1"
					class="flex font-bold was-th"
					style="flex-shrink: 0"
					style:width={col.computedWidth + 'px'}
				>
					<!-- or 100 width -->
					{#if col.column && col.column.renderer}
						<svelte:component
							this={col.column.renderer}
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
	</svelte:fragment>
</Scaffolding>
