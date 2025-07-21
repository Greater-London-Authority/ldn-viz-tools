<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const sidebarPlacementStore = writable('top');
	setContext('sidebarPlacement', sidebarPlacementStore);

	let { children } = $props();
</script>

<div>
	{@render children?.()}
</div>
