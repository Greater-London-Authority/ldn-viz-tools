<script lang="ts">
	import type { TableData } from '$lib/core/lib/dataObj';
	import { Overlay, Select } from '@ldn-viz/ui';

	interface Props {
		table: TableData;
		onChange: () => void;
	}

	let { table = $bindable(), onChange }: Props = $props();

	type Options = { label: string; id: string; value: string }[];

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

	let groupingSelection: string[] = $state(table.groupingFields);
	const applyGrouping = (groupingSelection: any[]) => {
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
				onChange();
			}
		}
	};
</script>

<Overlay hintLabel="Group rows by" overlayType="popover">
	<Select
		options={fields}
		bind:value={groupingSelection}
		label="Group rows by"
		id="labelled-input"
		multiple
		onChange={applyGrouping}
	/>
</Overlay>
