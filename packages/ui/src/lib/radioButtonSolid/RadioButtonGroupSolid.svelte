<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import RadioButtonSolid from './RadioButtonSolid.svelte';
	export let selectedId = '';
	export let name: string;

	export let options: {
		id: string;
		label: string;
		disabled?: boolean;
		icon?: SVGElement;
		iconPosition?: 'above' | 'below';
	}[] = [];

	const val: Writable<string> = writable(selectedId);
	val.subscribe((newVal) => (selectedId = newVal));

	setContext('selectedId', {
		selectedId: val
	});

	$: {
		// update Id of store when Id of prop changes
		$val = selectedId;
	}
</script>

<div class="flex">
	{#if options.length}
		{#each options as option}
			<RadioButtonSolid id={option.id} label={option.label} disabled={option.disabled} {name} />
		{/each}
	{:else}
		<slot />
	{/if}
</div>

<!-- <script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let selectedValue;

	const val: Writable<string> = writable(selectedValue);
	val.subscribe((newVal) => (selectedValue = newVal));

	setContext('selectedValue', {
		selectedValue: val
	});

	$: {
		// update value of store when value of prop changes
		$val = selectedValue;
	}
</script>

<div>
	<slot />
</div> -->
