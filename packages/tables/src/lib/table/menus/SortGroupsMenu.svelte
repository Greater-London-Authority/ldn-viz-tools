<script lang="ts">
	import type { TableData } from '$lib/core/lib/dataObj';
	import { Overlay, Select } from '@ldn-viz/ui';
	import {
		type Aggregation,
		type GroupOrderCriterion,
		type SortDirection
	} from '../../core/lib/types';

	interface Props {
		table: TableData;
		onChange: () => void;
	}

	let { table, onChange }: Props = $props();

	let fields: Options[] = $derived.by(() => {
		let new_fields: any[] = [];

		if (table) {
			new_fields = table.columnSpec.map((f) => ({
				label: f.label ?? f.short_label,
				id: f.short_label,
				value: f.short_label
			}));
		}

		return new_fields;
	});

	let fieldSelection: string = $state(table.groupingOrderSpec[0]?.field); // TODO: set from table

	const orderOptions = ['ascending', 'descending'].map((o) => ({
		label: o,
		value: o
	}));

	let orderSelection: SortDirection = $state(table.groupingOrderSpec[0]?.direction);

	const aggregationOptions = ['min', 'mean', 'median', 'max', 'q1', 'q3', 'count'].map((o) => ({
		label: o,
		value: o
	}));
	let aggregationSelection: Aggregation = $state(table.groupingOrderSpec[0]?.aggregation);

	const updateIfAppropriate = () => {
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
				onChange();
			}
		}
	};
</script>

<Overlay hintLabel="Sort groups" overlayType="popover">
	<div class="flex flex-col gap-2">
		<h2 class="text-large font-bold">Sort groups</h2>

		<Select
			options={aggregationOptions}
			bind:value={aggregationSelection}
			label="by the"
			id="labelled-input"
			onChange={updateIfAppropriate}
		/>

		{#if aggregationSelection !== 'count'}
			<Select
				options={fields}
				bind:value={fieldSelection}
				label="of their "
				id="labelled-input"
				onChange={updateIfAppropriate}
			/>
		{/if}

		<Select
			options={orderOptions}
			bind:value={orderSelection}
			label="ordered"
			id="labelled-input"
			onChange={updateIfAppropriate}
		/>
	</div>
</Overlay>
