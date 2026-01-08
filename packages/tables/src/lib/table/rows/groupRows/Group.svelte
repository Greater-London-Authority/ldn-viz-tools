<script>
	import DataRow from '../DataRow.svelte';
	import GroupHeadingRow from './GroupHeadingRow.svelte';
	import GroupSummaryRow from './GroupSummaryRow.svelte';

	let { group, table } = $props();
</script>

<GroupHeadingRow {group} {table} />

<GroupSummaryRow {group} {table} />

{#if group.isExpanded}
	{#each table.fetchGroupContents(group) as row (row)}
		<DataRow {row} {table} />
	{/each}
{/if}
