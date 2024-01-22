<script lang="ts">
	// SidebarToggle is the standard sidebar hood containing an open close
	// toggle.

	import { Bars3 } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import Button from '../button/Button.svelte';
	import { sidebarOpen } from './Sidebar.svelte';

	const toggleOpen = () => {
		sidebarOpen.update((isOpen) => !isOpen);
	};
</script>

<div class="pointer-events-auto gla-sidebar-toggle">
	<Button variant="square" emphasis="secondary">
		<Icon
			src={Bars3}
			theme="solid"
			class="w-full h-full p-2 stroke-1"
			aria-hidden="true"
			on:click={toggleOpen}
		/>
	</Button>
</div>

<style>
	.gla-sidebar-toggle {
		--size: clamp(40px, 2.5rem, 80px);

		width: var(--size);
		height: var(--size);
	}
</style>
