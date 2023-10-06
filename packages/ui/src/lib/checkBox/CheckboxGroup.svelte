<script lang="ts">
	import Checkbox from './Checkbox.svelte';

	export let options: { id: string; label: string; disabled?: boolean; color?: string }[] = [];

	export let buttonsHidden = false;

	export let selectedOptions: string[] = [];
	$: selectedOptions = options.map((o) => o.id).filter((id) => selectionState[id]);

	let selectionState = Object.fromEntries(
		options.map((o) => [o.id, selectedOptions.includes(o.id)])
	);

	let allCheckboxesCheckedOrDisabled;
	$: allCheckboxesCheckedOrDisabled = options.every(o =>  o.disabled ? true :  selectionState[o.id]);

	let noCheckboxesChecked;
	$: noCheckboxesChecked = !Object.values(selectionState).some(d => d);

	const selectAll = () => {
		selectionState = Object.fromEntries(
			options.map((o, i) => [o.id, o.disabled ? selectionState[o.id] : true])
		);
	};

	const clearAll = () => {
		selectionState = Object.fromEntries(
			options.map((o, i) => [o.id, o.disabled ? selectionState[o.id] : false])
		);
	};

	const toggleAll = () => {
		console.log("TOGGLING!")

		if (!allCheckboxesCheckedOrDisabled){
			selectAll();
		} else {
			clearAll();
		}
	}
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
				label={option.label}
				color={option.color}
				disabled={option.disabled}
				bind:checked={selectionState[option.id]}
			/>
		{/each}
	</div>
</div>
