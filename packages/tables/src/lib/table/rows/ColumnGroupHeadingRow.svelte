<script lang="ts">
	import { sum, type Numeric } from 'd3-array';
	import Scaffolding from './Scaffolding.svelte';

	export let table;

	let cellWidths: (Numeric | null | undefined)[];
	$: {
		cellWidths = table.columnSpec.map(
			(col: { cell: { width: any } }) =>
				+(col.cell.width ?? table.widths.defaultCell).replace('px', '')
		);
	}

	const getWidth = (colGroup: { endCol: number; startCol: number | undefined }) => {
		if (colGroup.endCol < 0) {
			return 0;
		}

		return sum(cellWidths.slice(colGroup.startCol, colGroup.endCol + 1)) + 'px';
	};
</script>

<Scaffolding {table}>
	<svelte:fragment slot="dataColumns">
		{#each table.colGroups || [] as colGroup}
			<div
				class="flex flex-col font-bold was-th"
				style:width={getWidth(colGroup)}
				style="flex-shrink: 0"
			>
				<div role="cell" tabindex="0" class="flex flex-col">
					<div class="flex items-end pt-2 mb-2">
						<div class="text-center w-full"><span>{colGroup.label}</span></div>
					</div>
				</div>
			</div>
		{/each}
	</svelte:fragment>
</Scaffolding>
