<script>
	import { Select } from '@ldn-viz/ui';

	export let pageSize;
	export let page;

	const numRowOptions = [
		{ value: 10, label: '10' },
		{ value: 25, label: '25' },
		{ value: 50, label: '50' },
		{ value: 100, label: '100' }
	];

	let numRowSelection = numRowOptions.find((d) => d.value === pageSize);

	const changePageSize = (newVal) => {
		pageSize = newVal;
		page = 1;
	};
	$: {
		if (numRowSelection) {
			changePageSize(numRowSelection.value);
		}
	}
</script>

<div class="mb-4" style="width: 192px">
	<Select bind:value={numRowSelection} items={numRowOptions} label="Entries per page"></Select>
</div>
