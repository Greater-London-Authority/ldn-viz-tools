<script lang="ts">
	import { Button, Popover, Select } from '@ldn-viz/ui';
	import { type GroupOrderCriterion } from '../../core/lib/types';

	export let table;

	let fields;
	$: if (table) {
		const new_fields = table.columnSpec.map((f) => ({
			label: f.label ?? f.short_label,
			id: f.short_label,
			value: f.short_label
		}));

		if (JSON.stringify(new_fields) !== JSON.stringify(fields)) {
			fields = new_fields;
		}
	}

	let fieldSelection; // TODO: set from table

	const orderOptions = ['ascending', 'descending'];
	let orderSelection;

	const aggregationOptions = ['min', 'mean', 'median', 'max', 'q1', 'q3', 'count'];
	let aggregationSelection;

	$: {
		const incompleteState =
			!orderSelection ||
			!aggregationSelection ||
			(aggregationSelection?.value !== 'count' && !fieldSelection);

		if (!incompleteState) {
			const newOrdering: GroupOrderCriterion[] = [
				{
					field: fieldSelection?.id,
					direction: orderSelection?.value,
					aggregation: aggregationSelection?.value
				}
			];

			if (JSON.stringify(table.groupingOrderSpec) !== JSON.stringify(newOrdering)) {
				table.setGroupOrdering(newOrdering);
			}
		}
	}
</script>

<Popover>
	<svelte:fragment slot="hint">
		<Button variant="text" disabled={table.groupingFields.length === 0}>Sort groups</Button>

		<span class="sr-only">Open Popover</span>
	</svelte:fragment>
	<div class="flex flex-col gap-2">
		<h2 class="text-large font-bold">Sort groups</h2>

		<Select
			items={aggregationOptions}
			bind:value={aggregationSelection}
			label="by the"
			id="labelled-input"
			placeholder="Placeholder text"
		/>

		{#if aggregationSelection?.value !== 'count'}
			<Select
				items={fields}
				bind:value={fieldSelection}
				label="of their "
				id="labelled-input"
				placeholder="Placeholder text"
			/>
		{/if}

		<Select
			items={orderOptions}
			bind:value={orderSelection}
			label="in"
			id="labelled-input"
			placeholder="Placeholder text"
		/>

		<span>order.</span>
	</div>
</Popover>
