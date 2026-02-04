<script lang="ts">
	import type { TableState } from '$lib/core/lib/tableState.svelte';
	import type { DataRow as DataRowType } from '$lib/core/lib/types';
	import ColoredCell from '../../core/renderers/ColoredCell.svelte';
	import ColGroupSpacer from '../cells/ColGroupSpacer.svelte';
	import DataCell from '../cells/DataCell.svelte';
	import Scaffolding from './Scaffolding.svelte';

	interface DataRowProps {
		row: DataRowType;
		table: TableState;
	}

	let { row, table }: DataRowProps = $props();
</script>

<Scaffolding {table}>
	{#snippet dataColumns()}
		{#each table.resolvedColumnSpec as col, i (col)}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<!-- <td>{row[col.short_label]}</td> -->
				<div style:width={col.computedWidth + 'px'} class="was-td" role="cell">
					{#if col.cell && col.cell.renderer && typeof col.cell.renderer !== 'string'}
						<DataCell href={col.href} {row}>
							<col.cell.renderer
								color={table.scales[col.short_label]}
								posScale={table.posScales[col.short_label]}
								value={row[col.short_label]}
								contextVals={col.cell.contextFields
									? col.cell.contextFields.map((c: string) => row[c])
									: []}
								extent={table.extents[col.short_label]}
								width={col.computedWidth}
								{...col.cell}
							/>
						</DataCell>
					{:else}
						<DataCell href={col.href} {row}>
							<ColoredCell
								value={row[col.short_label] as any}
								color={table.scales[col.short_label]}
							/>
						</DataCell>
					{/if}
				</div>
			{/if}
			<ColGroupSpacer {table} {i} />
		{/each}
	{/snippet}
</Scaffolding>
