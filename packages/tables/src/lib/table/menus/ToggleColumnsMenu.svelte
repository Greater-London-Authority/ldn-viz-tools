<script lang="ts">
	import { Button, CheckboxGroup, Popover } from '@ldn-viz/ui';

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

	let fieldSelection = table.visibleFields;
	const updateVisibility = () => table.setVisibleFields(fieldSelection);
	$: {
		if (JSON.stringify(table.visibleFields) !== JSON.stringify(fieldSelection)) {
			updateVisibility();
		}
	}
</script>

<Popover>
	<svelte:fragment slot="hint">
		<Button variant="text" size="sm">Show/Hide Columns</Button>

		<span class="sr-only">Open Popover</span>
	</svelte:fragment>

	<h2 class="font-bold">Select which columns to display:</h2>

	<CheckboxGroup options={fields} bind:selectedOptions={fieldSelection} />
</Popover>
