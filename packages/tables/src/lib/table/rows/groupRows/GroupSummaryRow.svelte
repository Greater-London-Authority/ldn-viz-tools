<script lang="ts">
	import type { TableState } from '$lib/core/lib/tableState.svelte';
	import type { Group } from '$lib/core/lib/types';
	import ColGroupSpacer from '../../cells/ColGroupSpacer.svelte';
	import Scaffolding from '../Scaffolding.svelte';

	interface Props {
		group: Group;
		table: TableState;
	}

	let { group, table }: Props = $props();
</script>

<Scaffolding {table}>
	{#snippet dataColumns()}
		{#each table.resolvedColumnSpec as col, i (col)}
			{#if !table.visibleFields || table.visibleFields.includes(col.short_label)}
				<div style:width={col.computedWidth + 'px'} class="was-td">
					{#if col.group && col.group.renderer}
						<col.group.renderer
							values={table.getValsForGroup(group, col.short_label)}
							extent={table.extents[col.short_label]}
							color={table.scales[col.short_label]}
							posScale={table.posScales[col.short_label]}
							{...col.group}
						/>

						<!-- <td>{row[col.short_label]}</td> -->
					{/if}
				</div>
			{/if}
			<ColGroupSpacer {table} {i} />
		{/each}
	{/snippet}
</Scaffolding>
