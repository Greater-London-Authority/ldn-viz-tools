<script>
	import ColoredCell from '../../core/renderers/ColoredCell.svelte';
	import ColGroupSpacer from '../cells/ColGroupSpacer.svelte';
	import DataCell from '../cells/DataCell.svelte';
	import Scaffolding from './Scaffolding.svelte';

	export let row;
	export let table;
</script>

<Scaffolding {table}>
	<svelte:fragment slot="dataColumns">
		{#each table.columnSpec as col, i}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<!-- <td>{row[col.short_label]}</td> -->
				<div style:width={col.computedWidth + 'px'} class="was-td" role="cell">
					{#if col.cell && col.cell.renderer}
						<DataCell href={col.href} {row}>
							<svelte:component
								this={col.cell.renderer}
								colorScale={table.scales[col.short_label]}
								posScale={table.posScales[col.short_label]}
								value={row[col.short_label]}
								contextVals={col.cell.contextFields
									? col.cell.contextFields.map((c) => row[c])
									: []}
								extent={table.extents[col.short_label]}
								width={col.computedWidth}
								{...col.cell}
							/>
						</DataCell>
					{:else}
						<DataCell href={col.href} {row}>
							<ColoredCell
								value={row[col.short_label]}
								colorScale={table.scales[col.short_label]}
							/>
						</DataCell>
					{/if}
				</div>
			{/if}
			<ColGroupSpacer {table} {i} />
		{/each}
	</svelte:fragment>
</Scaffolding>
