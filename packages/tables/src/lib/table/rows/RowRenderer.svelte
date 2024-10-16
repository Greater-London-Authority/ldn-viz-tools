<script>
	import DataRow from './DataRow.svelte';
	import GroupHeadingRow from './groupRows/GroupHeadingRow.svelte';
	import GroupRowCombined from './groupRows/GroupRowCombined.svelte';
	import GroupSummaryRow from './groupRows/GroupSummaryRow.svelte';

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
