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

	const sidebarIsOpen = getContext<Writable<boolean>>('sidebarIsOpen');
	$: isOpen = $sidebarIsOpen;

	const toggleOpen = () => {
		sidebarIsOpen.update((isOpen) => !isOpen);
	};

	const darkThemeClasses =
		'dark:!bg-core-grey-800 dark:hover:!bg-core-grey-900 dark:!text-white dark:hover:!text-core-grey-100';
	const lightThemeClasses = '!bg-core-grey-50 !text-core-grey-700 hover:!text-core-grey-300';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	$: sidebarToggleClasses = classNames('cursor-pointer', ...themeClasses);
</script>

<div class:ldn-viz-sidebar-toggle={true} {...$$restProps}>
	<Button
		title="Toggle sidebar"
		variant="square"
		emphasis="secondary"
		class={sidebarToggleClasses}
		on:click={toggleOpen}
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
