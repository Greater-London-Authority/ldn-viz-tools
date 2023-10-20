<script>
	// SidebarToggle is the standard sidebar hood containing an open close
	// toggle.

	import Menu from '@rgossiaux/svelte-heroicons/outline/Menu';
	import Button from '../button/Button.svelte';
	import { sidebarIsOpen } from './Sidebar.svelte';

	const toggleOpen = () => {
		sidebarIsOpen.update((isOpen) => !isOpen);
	};
</script>

<div class="pointer-events-auto gla-sidebar-toggle">
	<Button variant="square" emphasis="secondary">
		<Menu class="w-full h-full p-2 stroke-1" aria-hidden="true" on:click={toggleOpen} />
	</Button>
</div>

<style>
	.gla-sidebar-toggle {
		--size: clamp(40px, 2.5rem, 80px);

		width: var(--size);
		height: var(--size);
	}
</style>
