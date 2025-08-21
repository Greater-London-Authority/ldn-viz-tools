<script lang="ts">
	/**
	 * The `<SidebarToggle>` component is the button that can be clicked on to open or close the `<Sidebar>`.
	 * @component
	 */

	import { Bars3, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Button from '../../../button/Button.svelte';
	import { classNames } from '../../../utils/classNames';

	// `id` for sidebar container, to point to for screen readers
	export let sidebarId: string;

	const sidebarIsOpen = getContext<Writable<boolean>>('sidebarIsOpen');
	$: isOpen = $sidebarIsOpen;

	const toggleOpen = () => {
		sidebarIsOpen.update((isOpen) => !isOpen);
	};

	const themeClasses = ['!bg-color-container-level-1 !text-color-text-primary'];

	$: sidebarToggleClasses = classNames('cursor-pointer', ...themeClasses);
</script>

<div class:ldn-viz-sidebar-toggle={true} {...$$restProps}>
	<Button
		title="Toggle sidebar"
		variant="square"
		emphasis="secondary"
		class={sidebarToggleClasses}
		on:click={toggleOpen}
		actionProps={{ 'aria-controls': sidebarId, 'aria-expanded': isOpen }}
	>
		{#if isOpen === false}
			{#if $$slots.icon === true}
				<!-- Custom icon to use instead of the 'hamburger' menu icon-->
				<slot name="icon" />
			{:else}
				<Icon src={Bars3} class="p-1" aria-hidden="true" />
			{/if}
		{:else}
			<Icon src={XMark} class="p-1" aria-hidden="true" />
		{/if}
	</Button>
</div>

<style>
	.ldn-viz-sidebar-toggle {
		--size: clamp(40px, 2.5rem, 80px);

		width: var(--size);
		height: var(--size);
	}
</style>
