<script lang="ts">
	/**
	 * The `TableHeader` component renders the header above the table body.
	 * There are several tracks that may be included, depending on the table specification and the props provided to the `Table` component:
	 * * A horizontal rule delimiting the top of the header(if `showHeaderTopRule` is `true` in the spec)
	 * * Labels for column groups (if these are defined in the `colGroups` section of the spec)
	 * * The headings for each column (determined by the value of the `label` for each entry of `column` in the spec)
	 * * Controls for filtering and changing the visual encoding (if `showColumnControls` is `true` in the spec)
	 * * Summaries of the values in each column (if `showColumnControls` is `true` in the spec)
	 * * A labelled axis, if one exists for the column's cell renderer
	 * * A horizontal rule delimiting the bottom of the header (if `colGroupGap` is set in the spec, then a gap of this size will be left between columns in different groups)
	 * Font size is inherited from the table
	 * @component
	 */

	import { classNames } from '@ldn-viz/ui';

	import AxisRow from './rows/headerRows/AxisRow.svelte';
	import ColumnGroupHeadingRow from './rows/headerRows/ColumnGroupHeadingRow.svelte';
	import ColumnGroupHeadingRuleRow from './rows/headerRows/ColumnGroupHeadingRuleRow.svelte';
	import ColumnHeadingRow from './rows/headerRows/ColumnHeadingRow.svelte';
	import ColumnSummariesRow from './rows/headerRows/ColumnSummariesRow.svelte';
	import ControlRow from './rows/headerRows/ControlRow.svelte';

	interface Props {
		tableSpec: any;
		table: any;
		data: any;
		allowSorting?: boolean;
		tableWidth: any;
		onChange: () => void;
	}

	let { tableSpec, table, data, allowSorting = false, tableWidth, onChange }: Props = $props();

	let topRuleClass = $derived(tableSpec.showHeaderTopRule === false ? '' : 'border-t');
	let bottomRuleClass = $derived(
		tableSpec.showHeaderBottomRule === false || tableSpec.colGroups ? '' : 'border-b'
	);
</script>

<div
	class={classNames(topRuleClass, bottomRuleClass, 'border-color-ui-border-primary py-2')}
	style:width={tableWidth}
	role="rowgroup"
>
	{#if tableSpec.colGroups && tableSpec.colGroups.some((c) => c.label)}
		<ColumnGroupHeadingRow {table} />
	{/if}

	<ColumnHeadingRow {table} {allowSorting} {onChange} />

	{#if tableSpec.showColumnControls}
		<ControlRow {table} />
	{/if}

	{#if tableSpec.showColSummaries === true}
		<ColumnSummariesRow {table} {data} />
	{/if}

	{#if table.columnSpec.some((c) => c.cell.axisRenderer)}
		<AxisRow {table} />
	{/if}
</div>

{#if tableSpec.colGroups && tableSpec.showHeaderBottomRule !== false}
	<ColumnGroupHeadingRuleRow {table} />
{/if}
