<script lang="ts">
	import { sum } from 'd3-array';
	import Scaffolding from '../Scaffolding.svelte';

	export let table;

	let cellWidths;
	$: {
		cellWidths = table.columnSpec.map(
			(col) => +(col.cell.width ?? table.widths.defaultCell).replace('px', '')
		);
	}

	const getWidth = (colGroup) => {
		if (colGroup.endCol < 0) {
			return 0;
		}

		return sum(cellWidths.slice(colGroup.startCol, colGroup.endCol + 1)) + 'px';
	};
</script>

<Scaffolding {table}>
	<svelte:fragment slot="dataColumns">
		{#if table.colGroups && table.colGroups.length > 0}
			{#each table.colGroups || [] as colGroup}
				<div
					class="border-b border-color-ui-border-primary"
					style:width={getWidth(colGroup)}
					style:height="1px"
					style="flex-shrink: 0"
				></div>

				{#if table.colGroupGap}
					<div style:width={`${table.colGroupGap}px`} />
				{/if}
			{/each}
		{:else}
			<div
				class="border-b border-color-ui-border-primary"
				style:width={'100%'}
				style:height="1px"
				style="flex-shrink: 0"
			/>
		{/if}
	</svelte:fragment>
</Scaffolding>
