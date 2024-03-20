<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import TabList from '../../../tabs/TabList.svelte';

	export let selectedValue: string | undefined = undefined;
	let orientation: 'vertical' | 'horizontal' = 'vertical';

	const val: Writable<string | undefined> = writable(selectedValue);
	val.subscribe((newVal) => (selectedValue = newVal));

	setContext('tabContext', {
		selectedValue: val,
		orientation
	});
</script>

<TabList {orientation} bind:selectedValue>
	<slot />
</TabList>
