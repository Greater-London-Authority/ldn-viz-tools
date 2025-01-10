<script lang="ts">
	import { sum } from 'd3-array';

	import Header from '../../../core/renderers/Header.svelte';
	import ColGroupSpacer from '../../cells/ColGroupSpacer.svelte';
	import Scaffolding from '../Scaffolding.svelte';

	export let table;

	export let allowSorting;

	const sumWidths = (widths: any[]) => sum(widths.map((w) => +w.replace('px', ''))) + 'px';

	const getCol = (colName: any) =>
		table.columnSpec.find((d: { short_label: any }) => d.short_label === colName);
	const getLabel = (colName: any) => getCol(colName).label ?? colName;
</script>

<Scaffolding {table}>
	<svelte:fragment slot="groupSizes">
		{#each table.groupingFields as colName}
			<div
				class="flex font-bold was-th"
				role="columnheader"
				style:width={sumWidths([
					table.widths.groupLabel,
					table.widths.groupSizeLabel,
					table.widths.groupSizeBar,
					((table.colGroups || []).length * (table.colGroupGapSpacer ?? 0)).toString()
				])}
			>
				{getLabel(colName)}
			</div>
		{/each}
	</svelte:fragment>

	<!-- This is a warn for unexpected slot -->
	<!-- <div class="flex was-th" role="columnheader" slot="groupSizeLabel">
		{table.groups.length > 1 ? 'Count' : ''}
	</div> -->

	<svelte:fragment slot="dataColumns">
		{#each table.columnSpec as col, i}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<div class="flex was-th" role="columnheader" style:width={col.computedWidth + 'px'}>
					<Header
						label={col.label ?? col.short_label}
						order={undefined}
						toggle={() =>
							allowSorting && col.sortable !== false && table.toggleSort(col.short_label)}
						allowSorting={allowSorting && col.sortable !== false}
						alignHeader={col.alignHeader}
						superscriptText={col.superscriptText}
						hintText={col.hintText}
					/>
				</div>
			{/if}
			<ColGroupSpacer {table} {i} />
		{/each}
	</svelte:fragment>
</Scaffolding>
