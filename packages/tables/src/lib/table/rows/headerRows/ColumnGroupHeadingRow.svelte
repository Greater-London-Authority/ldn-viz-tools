<script lang="ts">
	import { sum } from 'd3-array';
	import Scaffolding from '../Scaffolding.svelte';

	export let table;

	$: cellWidths = table.columnSpec.map((c) => c.computedWidth);

	const getWidth = (colGroup) => {
		if (colGroup.endCol < 0) {
			return 0;
		}

		return sum(cellWidths.slice(colGroup.startCol, colGroup.endCol + 1)) + 'px';
	};
</script>

<Scaffolding {table}>
	<svelte:fragment slot="dataColumns">
		{#each table.colGroups || [] as colGroup}
			<div class="flex flex-col font-bold was-th" style:width={getWidth(colGroup)}>
				<div role="cell" tabindex="0" class="flex flex-col">
					<div class="flex items-end pt-2 mb-2">
						<div class="text-center w-full"><span>{colGroup.label}</span></div>
					</div>
				</div>
			</div>

			{#if table.colGroupGap}
				<div style:width={`${table.colGroupGap}px`} />
			{/if}
		{/each}
	</svelte:fragment>
</Scaffolding>
