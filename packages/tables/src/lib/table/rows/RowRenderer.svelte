<script lang="ts">
	import type { TableState } from '$lib/core/lib/tableState.svelte';
	import type { DataRow as DataRowType, Group } from '$lib/core/lib/types';
	import DataRow from './DataRow.svelte';
	import GroupHeadingRow from './groupRows/GroupHeadingRow.svelte';
	import GroupRowCombined from './groupRows/GroupRowCombined.svelte';
	import GroupSummaryRow from './groupRows/GroupSummaryRow.svelte';

	type RowSpec =
		| { type: 'GroupHeadingRow'; group: Group }
		| { type: 'GroupSummaryRow'; group: Group }
		| { type: 'GroupRowCombined'; group: Group }
		| { type: 'DataRow'; row: DataRowType };

	interface Props {
		spec: RowSpec;
		table: TableState;
	}

	let { spec, table }: Props = $props();
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
