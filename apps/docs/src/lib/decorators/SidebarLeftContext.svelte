<script>
	import { getSidebarState, setSidebarState } from '@ldn-viz/ui';

	setSidebarState();
	let sidebarState = getSidebarState();

	sidebarState.placement = 'left';

	let { children } = $props();
</script>

<div>
	{@render children?.()}
</div>
