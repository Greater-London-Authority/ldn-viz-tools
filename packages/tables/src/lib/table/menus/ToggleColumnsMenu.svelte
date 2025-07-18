<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { TableData } from '$lib/core/lib/dataObj';
	import { Button, CheckboxGroup, Popover } from '@ldn-viz/ui';

	interface Props {
		table: TableData;
	}

	let { table }: Props = $props();

	type Options = {
		label: string;
		id: string;
		value: string;
	};

	let fields: Options[] = $state();
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

	let fieldSelection = $state(table.visibleFields);
	const updateVisibility = () => table.setVisibleFields(fieldSelection);
	run(() => {
		if (JSON.stringify(table.visibleFields) !== JSON.stringify(fieldSelection)) {
			updateVisibility();
		}
	});
</script>

<Popover>
	{#snippet hint()}
	
			<Button variant="text" size="sm">Show/Hide Columns</Button>

			<span class="sr-only">Open Popover</span>
		
	{/snippet}

	<h2 class="font-bold">Select which columns to display:</h2>

	<CheckboxGroup options={fields} bind:selectedOptions={fieldSelection} />
</Popover>
