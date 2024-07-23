<script>
	import GroupHeadingRow from './GroupHeadingRow.svelte';
	import GroupSummaryRow from './GroupSummaryRow.svelte';
	import DataRow from './DataRow.svelte';
	import GroupRowCombined from './GroupRowCombined.svelte';

	export let spec;

	export let table;
	export let tableSpec;
</script>

{#if spec.type === 'GroupHeadingRow'}
	<GroupHeadingRow {table} {tableSpec} group={spec.group} />
{:else if spec.type === 'GroupSummaryRow'}
	<GroupSummaryRow {table} {tableSpec} group={spec.group} />
{:else if spec.type === 'GroupRowCombined'}
	<GroupRowCombined {table} {tableSpec} group={spec.group} />
{:else if spec.type === 'DataRow'}
	<DataRow {table} {tableSpec} row={spec.row} />
{/if}
