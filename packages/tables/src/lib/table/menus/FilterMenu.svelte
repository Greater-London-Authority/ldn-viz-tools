<script lang="ts">
	import { Button, Popover, Select } from '@ldn-viz/ui';
	import { Funnel } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let col;
	export let table;

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

	let selectedFilterType: { label: string; value: string } | undefined;

	const applyFilter = () => {
		if (!table || !selectedFilterType) {
			return;
		}

		table.setFilters([
			{
				type: selectedFilterType.value,
				field: col.short_label,
				value: selectedFilterType.value === 'isOneOf' ? val1.split(',') : val1,
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

	let val1: string;
	let val2: string;
</script>

<Popover>
	<svelte:fragment slot="hint">
		<Icon src={Funnel} theme="mini" class="w-4 h-4" aria-hidden="true" />

		<span class="sr-only">Open Popover</span>
	</svelte:fragment>

	<h2 class="text-large font-bold">Filter</h2>

	<Select
		items={filterTypes}
		bind:value={selectedFilterType}
		{filterTypes}
		label="Show only rows that are:"
	/>

	<input type="text" bind:value={val1} />

	{#if selectedFilterType && selectedFilterType.value === 'range'}
		<input type="text" bind:value={val2} />
	{/if}
	<span>TODO: These should be proper Input components...</span>

	<Button on:click={applyFilter}>Apply</Button>
	<Button on:click={clearFilter}>Clear</Button>
</Popover>
