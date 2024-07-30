<script>
	import GroupHeadingRow from './GroupHeadingRow.svelte';
	import GroupSummaryRow from './GroupSummaryRow.svelte';
	import DataRow from './DataRow.svelte';

	export let group;
	export let table;

	export let tableSpec; // TODO: should be able to access col details directly from obj
</script>

<GroupHeadingRow {group} {table} {tableSpec} />

<GroupSummaryRow {group} {table} {tableSpec} />

{#if group.isExpanded}
	{#each table.fetchGroupContents(group) as row}
		<DataRow {row} {table} {tableSpec} />
	{/each}
{/if}
