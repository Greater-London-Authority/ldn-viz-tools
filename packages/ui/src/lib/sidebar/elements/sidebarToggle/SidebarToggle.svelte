<script lang="ts">
	/**
	 * The `<SidebarToggle>` component is the button that can be clicked on to open or close the `<Sidebar>`.
	 * @component
	 */

	import { Bars3, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Button from '../../../button/Button.svelte';
	import { getSidebarState } from '../../../sidebar/sidebarState.svelte';

	interface Props {
		// `id` for sidebar container, to point to for screen readers
		sidebarId?: string; //FROM STATE
		icon?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { sidebarId, icon, ...rest }: Props = $props();

	let sidebarState = getSidebarState();

	const toggleOpen = () => {
		sidebarState.isOpen = !sidebarState.isOpen;
	};
</script>

<div class:ldn-viz-sidebar-toggle={true} {...rest}>
	<Button
		title="Toggle sidebar"
		variant="square"
		emphasis="secondary"
		class="!bg-color-container-level-1 !text-color-text-primary hover:!text-color-action-text-secondary-hover cursor-pointer"
		onclick={toggleOpen}
		aria-controls={sidebarId}
		aria-expanded={sidebarState?.isOpen}
	>
		{#if sidebarState?.isOpen === false}
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
