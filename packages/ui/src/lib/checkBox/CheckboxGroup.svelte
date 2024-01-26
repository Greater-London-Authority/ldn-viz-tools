<script lang="ts">
	import Checkbox from './Checkbox.svelte';

	export let options: {
		id: string;
		name: string;
		label: string;
		disabled?: boolean;
		color?: string;
	}[] = [];

	export let buttonsHidden = false;

	export let selectedOptions: string[] = [];
	$: selectedOptions = options.map((o) => o.name).filter((name) => selectionState[name]);

	let selectionState = Object.fromEntries(
		options.map((o) => [o.name, selectedOptions.includes(o.name)])
	);

	let allCheckboxesCheckedOrDisabled;
	$: allCheckboxesCheckedOrDisabled = options.every((o) =>
		o.disabled ? true : selectionState[o.name]
	);

	let noCheckboxesChecked;
	$: noCheckboxesChecked = !Object.values(selectionState).some((d) => d);

	const selectAll = () => {
		selectionState = Object.fromEntries(
			options.map((o) => [o.name, o.disabled ? selectionState[o.name] : true])
		);
	};

	const clearAll = () => {
		selectionState = Object.fromEntries(
			options.map((o) => [o.name, o.disabled ? selectionState[o.name] : false])
		);
	};

	const toggleAll = () => {
		console.log('TOGGLING!');

		if (!allCheckboxesCheckedOrDisabled) {
			selectAll();
		} else {
			clearAll();
		}
	};
</script>

<div>
	{#if !buttonsHidden}
		<Checkbox
			label="Select all"
			color="#3787D2"
			checked={allCheckboxesCheckedOrDisabled}
			indeterminate={!allCheckboxesCheckedOrDisabled && !noCheckboxesChecked}
			on:change={toggleAll}
		/>
	{/if}

	<div class={buttonsHidden ? '' : 'pl-[28px]'}>
		{#each options as option}
			<Checkbox
				id={option.id}
				name={option.name}
				label={option.label}
				color={option.color}
				disabled={option.disabled}
				bind:checked={selectionState[option.name]}
			/>
		{/each}
	</div>
</div>
