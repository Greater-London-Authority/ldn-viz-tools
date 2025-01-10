<script>
	import DataRow from '../DataRow.svelte';
	import GroupHeadingRow from './GroupHeadingRow.svelte';
	import GroupSummaryRow from './GroupSummaryRow.svelte';

	export let group;
	export let table;
</script>

<GroupHeadingRow {group} {table} />

<GroupSummaryRow {group} {table} />

{#if group.isExpanded}
	{#each table.fetchGroupContents(group) as row}
		<DataRow {row} {table} />
	{/each}
{/if}
