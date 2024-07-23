<script>
	import { sum } from 'd3-array';

	export let table;

	const sumWidths = (widths) => sum(widths.map((w) => +w.replace('px', '')));
</script>

<!-- items-center - came from DataRow -->
<!-- controlRows added an m-2 -->
<div class="flex was-tr items-stretch">
	<!-- controls for expanding/collapsing groups -->
	<slot name="groupControl">
		{#each table.groupingFields || [] as field, i}
			<div style:width={table.widths.groupControl} id="groupControl"></div>
		{/each}
		<div style:width={table.widths.groupControl} id="groupControl"></div>
	</slot>

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
			{#each new Array(table.groupingFields.length) as i}
				<div style:width={table.widths.groupLabel} id="groupLabel"></div>
				<div style:width={table.widths.groupSizeLabel} id="groupSizeLabel"></div>
				<div style:width={table.widths.groupSizeBar} id="groupSizeBar"></div>
			{/each}
		</slot>
	</div>
	<slot name="dataColumns" />
</div>
