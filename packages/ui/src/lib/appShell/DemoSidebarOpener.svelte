<script lang="ts">
	import Button from '../button/Button.svelte';
	import { getSidebarState } from '../sidebar/sidebarState.svelte';

	const sidebarState = getSidebarState();
</script>

<Button onclick={() => (sidebarState.isOpen = !sidebarState.isOpen)}>Toggle sidebar</Button>
<div class="p-4">Main Content</div>
