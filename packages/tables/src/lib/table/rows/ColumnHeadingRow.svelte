<script>
	import { sum } from 'd3-array';

	import Header from '../../core/renderers/Header.svelte';
	import Scaffolding from './Scaffolding.svelte';
	import ColGroupGap from '../cells/ColGroupGap.svelte';

	export let table;

	export let allowSorting;

	const sumWidths = (widths) => sum(widths.map((w) => +w.replace('px', ''))) + 'px';

	const getCol = (colName) => table.columnSpec.find((d) => d.short_label === colName);
	const getLabel = (colName) => getCol(colName).label ?? colName;
</script>

<Scaffolding {table}>
	<svelte:fragment slot="groupSizes">
		{#each table.groupingFields as colName}
			<div
				class="flex font-bold was-th"
				role="columnheader"
				colspan="1"
				style="flex-shrink: 0"
				style:width={sumWidths([
					table.widths.groupLabel,
					table.widths.groupSizeLabel,
					table.widths.groupSizeBar,
					((table.colGroups || []).length * (table.colGroupGap ?? 0)).toString()
				])}
			>
				{getLabel(colName)}
			</div>
		{/each}
	</svelte:fragment>

	<div
		class="flex font-bold was-th"
		role="columnheader"
		slot="groupSizeLabel"
		style="flex-shrink: 0"
	>
		{table.groups.length > 1 ? 'Count' : ''}
	</div>

	<svelte:fragment slot="dataColumns">
		{#each table.columnSpec as col, i}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<div
					class="flex font-bold was-th"
					role="columnheader"
					colspan="1"
					style="flex-shrink: 0"
					style:width={col.cell.width ?? table.widths.defaultCell}
				>
					<Header
						label={col.label ?? col.short_label}
						order={undefined}
						toggle={() => allowSorting && table.toggleSort(col.short_label)}
						{allowSorting}
						{...col}
					/>
				</div>
			{/if}
			<ColGroupGap {table} {i} />
		{/each}
	</svelte:fragment>
</Scaffolding>
