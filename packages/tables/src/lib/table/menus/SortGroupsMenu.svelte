<script lang="ts">
	import { Button, Select } from '@ldn-viz/ui';
	import { type GroupOrderCriterion } from '../../core/lib/types';
	import PopoverMenu from './PopoverMenu.svelte';

	export let table;

	/////
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

		console.log({ fields });
	}

	let fieldSelection; // TODO: set from table

	////

	const orderOptions = ['ascending', 'descending'];
	let orderSelection;

	//
	const aggregationOptions = ['min', 'mean', 'median', 'max', 'q1', 'q3', 'count'];
	let aggregationSelection;

	///

	$: {
		if (
			!orderSelection ||
			!aggregationSelection ||
			(aggregationSelection?.value !== 'count' && !fieldSelection)
		) {
		} else {
			const newOrdering: GroupOrderCriterion[] = [
				{
					field: fieldSelection?.id,
					direction: orderSelection?.value,
					aggregation: aggregationSelection?.value
				}
			];

			console.log({ newOrdering, tableSpec: table.groupingOrderSpec });

			if (JSON.stringify(table.groupingOrderSpec) !== JSON.stringify(newOrdering)) {
				table.setGroupOrdering(newOrdering);
			}
		}
	}
</script>

<PopoverMenu>
	<svelte:fragment slot="trigger">
		<Button variant="text" disabled={table.groupingFields.length === 0}>Sort groups</Button>

		<span class="sr-only">Open Popover</span>
	</svelte:fragment>

	<h2 class="text-large font-bold">Sort groups by</h2>

	<span>the</span>

	<Select
		items={aggregationOptions}
		bind:value={aggregationSelection}
		label=""
		id="labelled-input"
		placeholder="Placeholder text"
	/>

	{#if aggregationSelection?.value !== 'count'}
		<span>of their</span>
		<Select
			items={fields}
			bind:value={fieldSelection}
			label=""
			id="labelled-input"
			placeholder="Placeholder text"
		/>
	{/if}

	<span>in</span>

	<Select
		items={orderOptions}
		bind:value={orderSelection}
		label=""
		id="labelled-input"
		placeholder="Placeholder text"
	/>

	<span>order.</span>
</PopoverMenu>
