<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { TableData } from '$lib/core/lib/dataObj';
	import { Button, Popover, Select } from '@ldn-viz/ui';
	import {
		type Aggregation,
		type GroupOrderCriterion,
		type SortDirection
	} from '../../core/lib/types';

	interface Props {
		table: TableData;
	}

	let { table }: Props = $props();

	let fields: { label: string; id: string; value: string }[] = $state([]);
	run(() => {
		if (table) {
			const new_fields = table.columnSpec.map((f) => ({
				label: f.label ?? f.short_label,
				id: f.short_label,
				value: f.short_label
			}));

			if (JSON.stringify(new_fields) !== JSON.stringify(fields)) {
				fields = new_fields;
			}
		}
	});

	let fieldSelection: string = $state(); // TODO: set from table

	const orderOptions = ['ascending', 'descending'].map((o) => ({
		label: o,
		value: o
	}));

	let orderSelection: SortDirection = $state();

	const aggregationOptions = ['min', 'mean', 'median', 'max', 'q1', 'q3', 'count'].map((o) => ({
		label: o,
		value: o
	}));
	let aggregationSelection: Aggregation = $state();

	run(() => {
		const incompleteState =
			!orderSelection ||
			!aggregationSelection ||
			(aggregationSelection !== 'count' && !fieldSelection);

		if (!incompleteState) {
			const newOrdering: GroupOrderCriterion[] = [
				{
					field: fieldSelection,
					direction: orderSelection,
					aggregation: aggregationSelection
				}
			];

			if (JSON.stringify(table.groupingOrderSpec) !== JSON.stringify(newOrdering)) {
				table.setGroupOrdering(newOrdering);
			}
		}
	});
</script>

<Popover>
	{#snippet hint()}
	
			<Button variant="text" size="sm" disabled={table.groupingFields.length === 0}
				>Sort groups</Button
			>

			<span class="sr-only">Open Popover</span>
		
	{/snippet}
	<div class="flex flex-col gap-2">
		<h2 class="text-large font-bold">Sort groups</h2>

		<Select
			items={aggregationOptions}
			bind:justValue={aggregationSelection}
			label="by the"
			id="labelled-input"
		/>

		{#if aggregationSelection !== 'count'}
			<Select
				items={fields}
				bind:justValue={fieldSelection}
				label="of their "
				id="labelled-input"
			/>
		{/if}

		<Select
			items={orderOptions}
			bind:justValue={orderSelection}
			label="ordered"
			id="labelled-input"
		/>
	</div>
</Popover>
