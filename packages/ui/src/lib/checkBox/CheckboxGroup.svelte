<script lang="ts">
	import Button from '../button/Button.svelte';
	import Checkbox from './Checkbox.svelte';

	export let options: { id: string; label: string; disabled?: boolean; color?: string }[] = [];

	export let buttonsHidden = false;

	export let selectedOptions: string[] = [];
	let selectionState = Object.fromEntries(options.map((o) => [o.id, false]));

	const numAvailableOptions = options.filter((o) => !o.disabled).length;
	let numAvailableOptionsSelected: number;

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

	$: {
		selectedOptions = options.map((o) => o.id).filter((id) => selectionState[id]);
		numAvailableOptionsSelected = options.filter(
			(o, i) => !o.disabled && selectionState[o.id]
		).length;
	}
</script>

<div>
	{#if !buttonsHidden}
		<Button
			style="ghost"
			size="sm"
			on:click={selectAll}
			disabled={numAvailableOptionsSelected === numAvailableOptions}
			>Select all
		</Button>
		<Button style="ghost" size="sm" on:click={clearAll} disabled={numAvailableOptionsSelected === 0}
			>Clear all</Button
		>
	{/if}

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
