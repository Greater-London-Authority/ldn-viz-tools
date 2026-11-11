<script lang="ts">
	import type { TableState } from '$lib/core/lib/tableState.svelte';
	import type { Group } from '$lib/core/lib/types';
	import DataRow from '../DataRow.svelte';
	import GroupHeadingRow from './GroupHeadingRow.svelte';
	import GroupSummaryRow from './GroupSummaryRow.svelte';

	interface Props {
		group: Group;
		table: TableState;
	}

	let { group, table }: Props = $props();
</script>

<GroupHeadingRow {group} {table} />

<GroupSummaryRow {group} {table} />

{#if group.isExpanded}
	{#each table.fetchGroupContents(group) as row (row)}
		<DataRow {row} {table} />
	{/each}
{/if}
