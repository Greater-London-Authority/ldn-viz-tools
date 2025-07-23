<script>
	import { getSidebarState, setSidebarState } from '@ldn-viz/ui';

	setSidebarState();
	let sidebarState = getSidebarState();

	sidebarState.placement = 'top';

	let { children } = $props();
</script>

<div>
	{@render children?.()}
</div>
