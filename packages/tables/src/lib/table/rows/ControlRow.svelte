<script>
	import { ChevronRight, ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import Scaffolding from './Scaffolding.svelte';

	import FilterMenu from '../menus/FilterMenu.svelte';
	import EncodingType from '../menus/EncodingType.svelte';
	import MergeMenu from '../menus/MergeMenu.svelte';

	export let table;

	const DEFAULT_CELL_WIDTH = '100px';
</script>

<Scaffolding {table}>
	<svelte:fragment slot="groupControl">
		{#each table.groupingFields || [] as _field, i}
			<div
				style:width={table.widths.groupControl}
				id="groupControl"
				on:click={() => table.openOrCloseLevel(i)}
			>
				<Icon
					src={table.expansionState[i] ?? true ? ChevronDown : ChevronRight}
					theme="solid"
					class="w-[18px] h-[18px] ml-0.5"
					aria-hidden="true"
					on:click={() => console.log('CLICKED')}
				/>
			</div>
		{/each}
		<div style:width={table.widths.groupControl} id="groupControl"></div>
	</svelte:fragment>

	<!-- TODO: re-add somewhere else -->
	<!--
    <svelte:fragment slot="groupSizes">
        <div class="flex gap-8 ml-4" style:width={table.widths.groupLabel}>
            <GroupRowsMenu {table}/>
            <SortGroupsMenu {table}/>
            <ToggleColumnsMenu {table}/>
        </div>
    </svelte:fragment>
    -->

	<svelte:fragment slot="dataColumns">
		{#each table.columnSpec as col}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<div
					class="flex font-bold was-th"
					role="columnheader"
					colspan="1"
					style="flex-shrink: 0"
					style:width={col.cell.width ?? DEFAULT_CELL_WIDTH}
				>
					<FilterMenu {table} {col} />
					<EncodingType {col} />

					{#if col.allowGrouping}
						<MergeMenu {table} {col} />
					{/if}
				</div>
			{/if}
		{/each}
	</svelte:fragment>
</Scaffolding>
