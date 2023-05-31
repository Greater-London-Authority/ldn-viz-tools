<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let selectedValue;

	const val: Writable<string> = writable(selectedValue);
	val.subscribe((newVal) => (selectedValue = newVal));

	setContext('selectedValue', {
		selectedValue: val
	});
</script>

<div class="flex">
	<slot />
</div>
