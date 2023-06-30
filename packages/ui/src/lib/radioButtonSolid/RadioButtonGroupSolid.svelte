<script lang="ts">
	import RadioButtonSolid from './RadioButtonSolid.svelte';
	export let selectedId: string;
	export let name: string;

	export let options: {
		id: string;
		label: string;
		disabled?: boolean;
		icon?: SVGElement;
		iconPosition?: 'above' | 'below';
	}[] = [];
</script>

<div class="flex">
	{#each options as option}
		<RadioButtonSolid
			id={option.id}
			label={option.label}
			disabled={option.disabled}
			bind:selectedId
			{name}
		/>
	{/each}
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
