<script>
	export let table;
</script>

{#each table.groupingFields || [] as field}
	<div style:width={table.widths.groupControl} id="groupControl"></div>
{/each}
<div style:width={table.widths.groupControl} id="groupControl"></div>

<div style:width={table.widths.groupLabel} id="groupLabel"></div>

<div style:width={table.widths.groupSizeLabel} id="groupSizeLabel"></div>

<div style:width={table.widths.groupSizeBar} id="groupSizeBar"></div>
