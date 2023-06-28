<script lang="ts">
	import Button from '../button/Button.svelte';
	import RadioButton from './RadioButton.svelte';
	export let selectedId: string;
	export let name: string;
	export let options: { id: string; label: string; color: string; disabled?: boolean }[] = [];
	export let buttonsHidden = false;
</script>

<div>
	{#if !buttonsHidden}
		<Button variant="ghost" on:click={() => (selectedId = '')}>Clear</Button>
	{/if}
	{#each options as option}
		<RadioButton
			id={option.id}
			label={option.label}
			color={option.color}
			disabled={option.disabled}
			bind:selectedId
			{name}
		/>
	{/each}
</div>
