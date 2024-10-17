<script lang="ts">
	import { classNames } from '@ldn-viz/ui';

	import AxisRow from './rows/headerRows/AxisRow.svelte';
	import ColumnGroupHeadingRow from './rows/headerRows/ColumnGroupHeadingRow.svelte';
	import ColumnGroupHeadingRuleRow from './rows/headerRows/ColumnGroupHeadingRuleRow.svelte';
	import ColumnHeadingRow from './rows/headerRows/ColumnHeadingRow.svelte';
	import ColumnSummariesRow from './rows/headerRows/ColumnSummariesRow.svelte';
	import ControlRow from './rows/headerRows/ControlRow.svelte';

	export let tableSpec;
	export let table;
	export let data;
	export let allowSorting = false;
	export let tableWidth;

	$: topRuleClass = tableSpec.showHeaderTopRule === false ? '' : 'border-t';
	$: bottomRuleClass = tableSpec.colGroups ? '' : 'border-b';
</script>

<div
	class={classNames(topRuleClass, bottomRuleClass, 'border-color-ui-border-primary')}
	style:width={tableWidth}
>
	{#if tableSpec.colGroups && tableSpec.colGroups.some((c) => c.label)}
		<ColumnGroupHeadingRow {table} />
	{/if}

	<ColumnHeadingRow {table} {allowSorting} />

	{#if tableSpec.showColumnControls}
		<ControlRow {table} />
	{/if}

	{#if tableSpec.showColSummaries === true}
		<ColumnSummariesRow {table} {data} />
	{/if}

	<AxisRow {table} />

	{#if tableSpec.colGroups}
		<ColumnGroupHeadingRuleRow {table} />
	{/if}
</div>
