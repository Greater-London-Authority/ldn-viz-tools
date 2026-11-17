<script>
	// import { getSidebarState, setSidebarState } from '@ldn-viz/ui';

	import {
		getSidebarState,
		setSidebarState
	} from '../../../../../packages/ui/src/lib/sidebar/sidebarState.svelte';

	setSidebarState();
	let sidebarState = getSidebarState();

	sidebarState.placement = 'left';

	let { children } = $props();
</script>

<div class="relative min-h-dvh">
	{@render children?.()}
</div>
