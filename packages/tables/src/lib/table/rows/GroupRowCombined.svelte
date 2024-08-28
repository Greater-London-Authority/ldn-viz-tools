<script>
	//TODO: background:white?
	import { ChevronDown, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import GroupSizeBar from '../cells/GroupSizeBar.svelte';

	export let group;
	export let table;

	const constructLabel = (group) => {
		return group.name.split(' ∩ ').slice(-1);
	};
	const getGroupLevel = (name) => (name.match(new RegExp(' ∩ ', 'g')) || []).length;

	const DEFAULT_CELL_WIDTH = '100px';

	const getNthAncestor = (group, i, n) => {
		while (n > 0) {
			group = group.parentGroup;
			n--;
		}
		return group;
	};
</script>

<div class="flex was-tr">
	{#each new Array(getGroupLevel(group.name)) as _i}
		<!-- {@const g  = getGroup(group, i)} -->

		<div style:width={table.widths.groupControl}></div>
	{/each}

	<div
		style:width={table.widths.groupControl}
		on:click={() => table.toggleGroupCollapsed(group, true)}
	>
		<Icon
			src={group.isExpanded ? ChevronDown : ChevronRight}
			theme="solid"
			class="w-[18px] h-[18px] ml-0.5"
			aria-hidden="true"
			on:click={() => table.toggleGroupCollapsed(group, true)}
		/>
	</div>

	<!-- label for group name -->
	<!--
    <div
         style:width={table.widths.groupLabel}
         class="was-td">
        {constructLabel(group)}
    </div>
    -->

	<!-- padding of equivalent siex to chevrons on other rows -->
	{#each new Array(table.groupingFields.length - getGroupLevel(group.name)) as _i}
		<!-- {@const g  = getGroup(group, i)} -->

		<div style:width={table.widths.groupControl}></div>
	{/each}

	<!-- padding for group size infor for lower group levels -->
	{#each new Array(getGroupLevel(group.name)) as _, i}
		<div
			style:width={table.widths.groupLabel}
			style:background="white"
			class="text-color-text-secondary"
		>
			{group.name.split(' ∩ ')[i]}
		</div>
		<div style:width={table.widths.groupSizeLabel} style:background="white"></div>

		<!-- <div style:width={table.widths.groupSizeBar} style:background="white"></div> -->

		<GroupSizeBar
			{table}
			group={getNthAncestor(group, i, getGroupLevel(group.name) - i)}
			stretchUp
			fieldName={table.groupingFields[i]}
			val={group.name.split(' ∩ ')[i]}
		/>
	{/each}

	<div style:width={table.widths.groupLabel} class="was-td" style="flex-shrink: 0">
		{constructLabel(group)}
	</div>

	<!-- text of group size -->
	<div style:width={table.widths.groupSizeLabel} style:text-align="right">
		{group.order.length.toLocaleString()}
	</div>

	<!-- column to show group size -->
	<GroupSizeBar
		{table}
		{group}
		fieldName={table.groupingFields[getGroupLevel(group.name)]}
		val={group.name.split(' ∩ ')[getGroupLevel(group.name)]}
	/>

	{#each new Array(Math.max(table.groupingFields.length - getGroupLevel(group.name) - 1, 0)) as _i}
		<div style:width={table.widths.groupLabel} style:background="white"></div>
		<div style:width={table.widths.groupSizeLabel} style:background="white"></div>
		<div style:width={table.widths.groupSizeBar} style:background="white"></div>
	{/each}

	<!--     {#each new Array(table.groupingFields.length - getGroupLevel(group.name)) as i} {/each} -->

	<!-- actual columns -->
	{#each table.columnSpec as col}
		{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
			<div style:width={col.cell.width ?? DEFAULT_CELL_WIDTH} class="was-td" style="flex-shrink: 0">
				{#if col.group && col.group.renderer}
					<svelte:component
						this={col.group.renderer}
						values={table.getValsForGroup(group, col.short_label)}
						extent={table.extents[col.short_label]}
						colorScale={table.scales[col.short_label]}
						posScale={table.posScales[col.short_label]}
						{...col.group}
					/>

					<!-- <td>{row[col.short_label]}</td> -->
				{/if}
			</div>
		{/if}
	{/each}
</div>
