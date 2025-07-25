<script lang="ts">
	import { ChevronDown, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import type { Group } from '../../../core/lib/types';
	import GroupSizeBar from './GroupSizeBar.svelte';

	let { group, table } = $props();

	const constructLabel = (group: Group) => {
		if (typeof group.maxRows !== 'undefined' && group.order.length > group.maxRows) {
			return `${group.name} (${group.order.length} rows, ${group.order.length - group.maxRows} hidden)`;
		}
		return `${group.name} `;
		//  return `${group.name} (${group.order.length} rows)`
	};
	const getGroupLevel = (name: string) => (name.match(new RegExp(' ∩ ', 'g')) || []).length;
</script>

<div class="was-tr flex">
	{#each new Array(getGroupLevel(group.name)) as _i}
		<!-- {@const g  = getGroup(group, i)} -->

		<div style:width={table.widths.groupControl}></div>
	{/each}

	<button
		style:width={table.widths.groupControl}
		onclick={() => table.toggleGroupCollapsed(group, true)}
	>
		<Icon
			src={group.isExpanded ? ChevronDown : ChevronRight}
			theme="solid"
			class="ml-0.5 h-[18px] w-[18px]"
			aria-hidden="true"
			onclick={() => table.toggleGroupCollapsed(group, true)}
		/>
	</button>

	<!-- label for group name -->
	<div style:width={table.widths.groupLabel} class="was-td">
		{constructLabel(group)}
	</div>

	<!-- padding of equivalent size to chevrons on other rows -->
	{#each new Array(table.groupingFields.length - getGroupLevel(group.name)) as _i}
		<!-- {@const g  = getGroup(group, i)} -->

		<div style:width={table.widths.groupControl}></div>
	{/each}

	<div style:width={table.widths.groupSizeLabel} style:text-align="right">
		{group.order.length.toLocaleString()}
	</div>

	<!-- column to show group size -->
	<GroupSizeBar {table} {group} />
</div>
