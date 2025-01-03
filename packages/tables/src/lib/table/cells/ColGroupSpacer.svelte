<script lang="ts">
	import type { ColGroup } from '$lib/core/lib/types';

	export let table;

	/**
	 * Index of column that precedes this gap.
	 */
	export let i: number;

	const gapPositions: number[] = (table.colGroups || []).map(
		(colGroup: ColGroup) => colGroup.endCol
	);
</script>

{#if gapPositions.includes(i) && table.colGroupGap}
	<div style:width={`${table.colGroupGap}px`} class="col-group-gap" />
{/if}
