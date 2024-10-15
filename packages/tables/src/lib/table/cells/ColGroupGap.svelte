<script lang="ts">
	export let table;

	/**
	 * Index of column that preceeds this gap.
	 */
	export let i: number;

	const gapPositions: number[] = (table.colGroups || []).map((colGroup) => colGroup.endCol);

	$: console.log('gapPositions', gapPositions, i);
	$: console.log('gapWidth', table.colGroupGap);
</script>

{#if gapPositions.includes(i) && table.colGroupGap}
	<div style:width={`${table.colGroupGap}px`} class="col-group-gap" />
{/if}
