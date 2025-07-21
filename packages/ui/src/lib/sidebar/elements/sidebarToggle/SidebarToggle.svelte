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

	interface Props {
		// `id` for sidebar container, to point to for screen readers
		sidebarId?: string; //FROM STATE
		icon?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { sidebarId, icon, ...rest }: Props = $props();

	const sidebarIsOpen = getContext<Writable<boolean>>('sidebarIsOpen');
	let isOpen = $derived($sidebarIsOpen);

	const toggleOpen = () => {
		sidebarIsOpen.update((isOpen) => !isOpen);
	};
</script>

<div class:ldn-viz-sidebar-toggle={true} {...rest}>
	<Button
		title="Toggle sidebar"
		variant="square"
		emphasis="secondary"
		class={'bg-color-container-level-1 text-color-text-primary cursor-pointer'}
		onclick={toggleOpen}
		aria-controls={sidebarId}
		aria-expanded={isOpen}
	>
		{#if isOpen === false}
			{#if icon}
				<!-- Custom icon to use instead of the 'hamburger' menu icon-->
				{@render icon?.()}
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
