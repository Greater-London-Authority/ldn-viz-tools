<script lang="ts">
	import type { ColGroup } from '$lib/core/lib/types';

	interface Props {
		table: any;
		/**
		 * Index of column that precedes this gap.
		 */
		i: number;
	}

	let { table, i }: Props = $props();

	const gapPositions: number[] = (table.colGroups || []).map(
		(colGroup: ColGroup) => colGroup.endCol
	);
</script>

{#if gapPositions.includes(i) && table.colGroupGap}
	<div style:width={`${table.colGroupGap}px`} class="col-group-gap"></div>
{/if}
