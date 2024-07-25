<script>
	import LinkWrapper from '../cells/LinkWrapper.svelte';
	import ColoredCell from '../../core/renderers/ColoredCell.svelte';
	import Scaffolding from './Scaffolding.svelte';

	export let row;
	export let table;

	const DEFAULT_CELL_WIDTH = '100px';
</script>

<Scaffolding {table}>
	<svelte:fragment slot="dataColumns">
		{#each table.columnSpec as col}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<!-- <td>{row[col.short_label]}</td> -->
				<div
					style:width={col.cell.width ?? DEFAULT_CELL_WIDTH}
					class="was-td"
					style="flex-shrink: 0"
				>
					{#if col.cell && col.cell.renderer}
						<LinkWrapper href={col.href} {row}>
							<svelte:component
								this={col.cell.renderer}
								colorScale={table.scales[col.short_label]}
								posScale={table.posScales[col.short_label]}
								value={row[col.short_label]}
								contextVals={col.cell.contextFields
									? col.cell.contextFields.map((c) => row[c])
									: []}
								extent={table.extents[col.short_label]}
								{...col.cell}
							/>
						</LinkWrapper>
					{:else}
						<LinkWrapper href={col.href} {row}>
							<ColoredCell
								value={row[col.short_label]}
								colorScale={table.scales[col.short_label]}
								extent={table.extents[col.short_label]}
							/>
						</LinkWrapper>
					{/if}
				</div>
			{/if}
		{/each}
	</svelte:fragment>
</Scaffolding>
