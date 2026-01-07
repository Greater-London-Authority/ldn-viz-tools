<script>
	import { Select } from '@ldn-viz/ui';

	let { pageSize = $bindable(), page = $bindable() } = $props();

	const numRowOptions = [
		{ value: 10, label: '10' },
		{ value: 25, label: '25' },
		{ value: 50, label: '50' },
		{ value: 100, label: '100' }
	];

	let numRowSelection = $state(pageSize.toString());

	const changePageSize = (ev) => {
		pageSize = ev.value;
		page = 1;
	};
</script>

<div class="mb-4" style="width: 192px">
	<Select
		onChange={changePageSize}
		bind:value={numRowSelection}
		options={numRowOptions}
		label="Entries per page"
	></Select>
</div>
