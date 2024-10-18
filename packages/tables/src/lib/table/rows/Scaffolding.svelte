<script lang="ts">
	import { sum } from 'd3-array';

	export let table;

	const sumWidths = (widths) => {
		const colWidths = sum(widths.map((w) => +w.replace('px', '')));
		const colGroupGaps = (table.colGroups || []).length * (table.colGroupGap ?? 0);
		return colWidths + colGroupGaps + 'px';
	};
</script>

<!-- items-center - came from DataRow -->
<!-- controlRows added an m-2 -->
<div class="flex was-tr items-stretch">
	<!-- controls for expanding/collapsing groups -->
	<slot name="groupControl">
		{#each table.groupingFields || [] as _field}
			<div style:width={table.widths.groupControl} id="groupControl"></div>
		{/each}
	</slot>

	{#if table.groupingFields.length > 0}
		<div
			class="flex"
			style:width={sumWidths([
				table.widths.groupLabel,
				table.widths.groupSizeLabel,
				table.widths.groupSizeBar
			]) *
				table.groupingFields.length +
				'px'}
		>
			<slot name="groupSizes">
				{#each new Array(table.groupingFields.length) as _i}
					<div style:width={table.widths.groupLabel} id="groupLabel"></div>
					<div style:width={table.widths.groupSizeLabel} id="groupSizeLabel"></div>
					<div style:width={table.widths.groupSizeBar} id="groupSizeBar"></div>
				{/each}
			</slot>
		</div>
	{/if}

	<slot name="dataColumns" />
</div>
