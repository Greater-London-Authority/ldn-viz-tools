<script lang="ts">
	import { Button, Overlay, Select } from '@ldn-viz/ui';

	let { col, table } = $props();

	let filterTypes = [
		{ label: 'contains', value: 'contains' },
		{ label: 'isDefined', value: 'isDefined' },
		{ label: 'isOneOf', value: 'isOneOf' },

		{ label: '<', value: 'lt' },
		{ label: '<=', value: 'lte' },

		{ label: '==', value: 'equals' },

		{ label: '>=', value: 'gte' },
		{ label: '>', value: 'gt' },

		{ label: 'range', value: 'range' }
	];

	let selectedFilterType: string | undefined = $state();

	const applyFilter = () => {
		if (!table || !selectedFilterType) {
			return;
		}

		table.setFilters([
			{
				type: selectedFilterType,
				field: col.short_label,
				value: selectedFilterType === 'isOneOf' ? val1?.split(',') : val1,
				value2: val2
			}
		]);
	};

	const clearFilter = () => {
		val1 = '';
		selectedFilterType = undefined;
		table.setFilters([]);
	};

	// TODO: set icon based on whether filter applied
	// TODO: position better

	let val1: string | undefined = $state();
	let val2: string | undefined = $state();
</script>

<!-- TODO: funnel-->
<Overlay hintLabel="Filter" overlayType="popover">
	<h2 class="text-large font-bold">Filter</h2>

	<Select options={filterTypes} bind:value={selectedFilterType} label="Show only rows that are:" />

	<input type="text" bind:value={val1} />

	{#if selectedFilterType === 'range'}
		<input type="text" bind:value={val2} />
	{/if}
	<span>TODO: These should be proper Input components...</span>

	<Button onclick={applyFilter}>Apply</Button>
	<Button onclick={clearFilter}>Clear</Button>
</Overlay>
