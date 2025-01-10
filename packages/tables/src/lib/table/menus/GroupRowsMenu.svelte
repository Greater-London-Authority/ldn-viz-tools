<script lang="ts">
	import type { TableData } from '$lib/core/lib/dataObj';
	import { Button, Popover, Select } from '@ldn-viz/ui';

	export let table: TableData;

	type Options = { label: string; id: string; value: string }[];

	let fields: Options;
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

	let groupingSelection: Options = [];
	const applyGrouping = (groupingSelection: Options) => {
		if (table) {
			// re-order cols
			// TODO: lift this to dataObj?
			//  /*
			const sortingCols = table.groupingFields.map((f) =>
				table.columnSpec.find((c) => c.short_label === f)
			);
			table.columnSpec = [
				...sortingCols.filter((d) => !!d),
				...table.columnSpec.filter((f) => !table.groupingFields.includes(f.short_label))
			];
			table.setColumnSpec(table.columnSpec);
			//   */

			const cols = (groupingSelection || []).map((o) => o.id);

			if (JSON.stringify(table.groupingFields) !== JSON.stringify(cols)) {
				table.setGrouping(cols);
			}
		}
	};
	$: applyGrouping(groupingSelection);
</script>

<Popover>
	<svelte:fragment slot="hint">
		<Button variant="text" size="sm">Group rows</Button>

		<span class="sr-only">Open Popover</span>
	</svelte:fragment>

	<Select
		items={fields}
		bind:value={groupingSelection}
		label="Group rows by"
		id="labelled-input"
		multiple
	/>
</Popover>
