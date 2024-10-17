<script>
	import { ChevronDown, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import Scaffolding from '../Scaffolding.svelte';

	import ColGroupSpacer from '../../cells/ColGroupSpacer.svelte';
	import EncodingType from '../../menus/EncodingType.svelte';
	import FilterMenu from '../../menus/FilterMenu.svelte';
	import MergeMenu from '../../menus/MergeMenu.svelte';

	export let table;
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
		{#each table.columnSpec as col, i}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<div
					class="flex font-bold was-th"
					role="columnheader"
					style:width={col.computedWidth + 'px'}
				>
					<FilterMenu {table} {col} />
					<EncodingType {col} />

					{#if col.allowGrouping}
						<MergeMenu {table} {col} />
					{/if}
				</div>
			{/if}
			<ColGroupSpacer {table} {i} />
		{/each}
	</svelte:fragment>
</Scaffolding>
