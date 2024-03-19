<script>
	import { Bars3, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getContext } from 'svelte';
	import Button from '../../../button/Button.svelte';
	import { classNames } from '../../../utils/classNames';

	export let isOpen;

	const darkThemeClasses =
		'dark:bg-core-grey-800 dark:hover:bg-core-grey-900 dark:!text-white dark:hover:!text-core-grey-100';
	const lightThemeClasses = 'bg-white !text-core-grey-700 hover:!text-white';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	$: sidebarToggleClasses = classNames('cursor-pointer', ...themeClasses);
</script>

<div class:ldn-viz-sidebar-toggle={true} {...$$restProps}>
	<Button
		title="Toggle sidebar"
		variant="square"
		emphasis="secondary"
		class={sidebarToggleClasses}
		on:click={() => (isOpen = !isOpen)}
	>
		{#if isOpen === false}
			{#if !$$slots.icon}
				<Icon src={Bars3} class="p-1" aria-hidden="true" />
			{:else}
				<slot name="icon" />
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
