<script>
	import { ChevronDown, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import Scaffolding from '../Scaffolding.svelte';

	import ColGroupSpacer from '../../cells/ColGroupSpacer.svelte';
	import EncodingType from '../../menus/EncodingType.svelte';
	import FilterMenu from '../../menus/FilterMenu.svelte';
	import MergeMenu from '../../menus/MergeMenu.svelte';

	let { table } = $props();
</script>

<Scaffolding {table}>
	{#snippet groupControl()}
	
			{#each table.groupingFields || [] as _field, i}
				<button
					style:width={table.widths.groupControl}
					id="groupControl"
					onclick={() => table.openOrCloseLevel(i)}
				>
					<Icon
						src={(table.expansionState[i] ?? true) ? ChevronDown : ChevronRight}
						theme="solid"
						class="w-[18px] h-[18px] ml-0.5"
						aria-hidden="true"
					/>
				</button>
			{/each}
			<div style:width={table.widths.groupControl} id="groupControl"></div>
		
	{/snippet}

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

	{#snippet dataColumns()}
	
			{#each table.columnSpec as col, i}
				{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
					<div class="flex was-th" role="columnheader" style:width={col.computedWidth + 'px'}>
						<FilterMenu {table} {col} />
						<EncodingType {col} />

						{#if col.allowGrouping}
							<MergeMenu {table} {col} />
						{/if}
					</div>
				{/if}
				<ColGroupSpacer {table} {i} />
			{/each}
		
	{/snippet}
</Scaffolding>
