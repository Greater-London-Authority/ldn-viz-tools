<script>
	import {
		setSidebarState,
		getSidebarState
	} from '../../../../../packages/ui/src/lib/sidebar/sidebarState.svelte';

	setSidebarState();
	let sidebarState = getSidebarState();

	sidebarState.placement = 'left';

	let { children } = $props();
</script>

<div>
	{@render children?.()}
</div>
