<script>
	import DataRow from './DataRow.svelte';
	import GroupHeadingRow from './groupRows/GroupHeadingRow.svelte';
	import GroupRowCombined from './groupRows/GroupRowCombined.svelte';
	import GroupSummaryRow from './groupRows/GroupSummaryRow.svelte';

	let { spec, table } = $props();
</script>

{#if spec.type === 'GroupHeadingRow'}
	<GroupHeadingRow {table} group={spec.group} />
{:else if spec.type === 'GroupSummaryRow'}
	<GroupSummaryRow {table} group={spec.group} />
{:else if spec.type === 'GroupRowCombined'}
	<GroupRowCombined {table} group={spec.group} />
{:else if spec.type === 'DataRow'}
	<DataRow {table} row={spec.row} />
{/if}
