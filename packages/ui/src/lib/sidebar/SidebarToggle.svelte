<script>
	import { Bars3 } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getContext } from 'svelte';
	import Button from '../button/Button.svelte';

	const sidebarIsOpen = getContext('sidebarIsOpen');
	const toggleOpen = () => {
		sidebarIsOpen.update((isOpen) => !isOpen);
	};
</script>

<div class:ldn-viz-sidebar-toggle={true} {...$$restProps}>
	<Button title="Toggle sidebar" variant="square" emphasis="secondary" on:click={toggleOpen}>
		<Icon
			src={Bars3}
			class="w-full h-full p-1 stroke-1 bg-core-grey-800 stroke-white hover:bg-core-grey-500"
			aria-hidden="true"
		/>
	</Button>
</div>

<style>
	.ldn-viz-sidebar-toggle {
		--size: clamp(40px, 2.5rem, 80px);

		width: var(--size);
		height: var(--size);
	}
</style>
