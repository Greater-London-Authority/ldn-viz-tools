<script lang="ts">
	import Checkbox from './Checkbox.svelte';

	const selectAllId = crypto.randomUUID().slice(36 - 12);

	export let options: {
		id: string;
		label: string;
		disabled?: boolean;
		color?: string;
		hint?: string;
		hintLabel?: string;
	}[] = [];

	export let buttonsHidden = false;

	export let selectedOptions: string[] = [];
	$: selectedOptions = options.map((o) => o.id).filter((id) => selectionState[id]);

	let selectionState = Object.fromEntries(
		options.map((o) => [o.id, selectedOptions.includes(o.id)])
	);

	let allCheckboxesCheckedOrDisabled;
	$: allCheckboxesCheckedOrDisabled = options.every((o) =>
		o.disabled ? true : selectionState[o.id]
	);

	let noCheckboxesChecked;
	$: noCheckboxesChecked = !Object.values(selectionState).some((d) => d);

	const selectAll = () => {
		selectionState = Object.fromEntries(
			options.map((o) => [o.id, o.disabled ? selectionState[o.id] : true])
		);
	};

	const clearAll = () => {
		selectionState = Object.fromEntries(
			options.map((o) => [o.id, o.disabled ? selectionState[o.id] : false])
		);
	};

	const toggleAll = () => {
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
			id={selectAllId}
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
				hint={option.hint}
				hintLabel={option.hintLabel}
				bind:checked={selectionState[option.id]}
			/>
		{/each}
	</div>
</div>
