<script lang="ts">
	import { Button, CheckboxGroup } from '@ldn-viz/ui';
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

	let fieldSelection = table.visibleFields; // TODO: set from table
	const updateVisibility = () => table.setVisibleFields(fieldSelection);
	$: {
		if (JSON.stringify(table.visibleFields) !== JSON.stringify(fieldSelection)) {
			updateVisibility(fieldSelection);
		}
	}
</script>

<PopoverMenu>
	<svelte:fragment slot="trigger">
		<Button variant="text">Show/Hide Columns</Button>

		<span class="sr-only">Open Popover</span>
	</svelte:fragment>

	<h2 class="text-large font-bold">Select which columns to display:</h2>

	<CheckboxGroup options={fields} bind:selectedOptions={fieldSelection} />
</PopoverMenu>
