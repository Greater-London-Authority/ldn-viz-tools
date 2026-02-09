<script lang="ts">
	import type { TableState } from '$lib/core/lib/tableState.svelte';
	import { CheckboxGroup, Overlay } from '@ldn-viz/ui';

	interface Props {
		table: TableState;
		onChange: () => void;
	}

	let { table, onChange }: Props = $props();

	type Options = {
		label: string;
		id: string;
		value: string;
	};

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

	let fieldSelection = $derived(table.visibleFields);
	const updateVisibility = (newFields) => {
		table.visibleFields = newFields;
		onChange();
	};
</script>

<Overlay overlayType="popover" hintLabel="Show/Hide Columns">
	<h2 class="font-bold">Select which columns to display:</h2>

	<CheckboxGroup
		options={fields}
		bind:selectedOptions={fieldSelection}
		onChange={updateVisibility}
	/>
</Overlay>
