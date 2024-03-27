<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const sidebarPlacementStore = writable('left');
	setContext('sidebarPlacement', sidebarPlacementStore);
</script>

<div>
	<slot />
</div>
