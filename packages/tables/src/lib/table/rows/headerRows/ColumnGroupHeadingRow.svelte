<script lang="ts">
	import { sum } from 'd3-array';
	import type { TableState } from '$lib/core/lib/tableState.svelte';
	import Scaffolding from '../Scaffolding.svelte';

	interface Props {
		table: TableState;
	}

	let { table }: Props = $props();

	let cellWidths = $derived(table.columnSpec.map((c: { computedWidth: any }) => c.computedWidth));

	const getWidth = (colGroup: { endCol: number; startCol: any }) => {
		if (colGroup.endCol < 0) {
			return 0;
		}

		return sum(cellWidths.slice(colGroup.startCol, colGroup.endCol + 1)) + 'px';
	};
</script>

<Scaffolding {table}>
	{#snippet dataColumns()}
		{#each table.colGroups || [] as colGroup (colGroup)}
			<div class="was-th" style:width={getWidth(colGroup)}>
				<div role="cell" tabindex="0" class="w-full">
					<div class="text-center font-bold" style:color={colGroup.color ?? 'currentColor'}>
						{colGroup.label}
					</div>
				</div>
			</div>

			{#if table.colGroupGap}
				<div style:width={`${table.colGroupGap}px`}></div>
			{/if}
		{/each}
	{/snippet}
</Scaffolding>
