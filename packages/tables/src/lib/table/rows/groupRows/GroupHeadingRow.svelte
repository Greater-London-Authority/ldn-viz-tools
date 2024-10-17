<script>
	import { ChevronDown, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import GroupSizeBar from './GroupSizeBar.svelte';

	export let group;
	export let table;

	const constructLabel = (group) => {
		if (typeof group.maxRows !== 'undefined' && group.order.length > group.maxRows) {
			return `${group.name} (${group.order.length} rows, ${group.order.length - group.maxRows} hidden)`;
		}
		return `${group.name} `;
		//  return `${group.name} (${group.order.length} rows)`
	};
	const getGroupLevel = (name) => (name.match(new RegExp(' ∩ ', 'g')) || []).length;
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
	<div style:width={table.widths.groupLabel} class="was-td">
		{constructLabel(group)}
	</div>

	<!-- padding of equivalent siex to chevrons on other rows -->
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
