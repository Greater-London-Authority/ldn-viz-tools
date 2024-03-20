<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';
	import SidebarToggle from './elements/sidebarToggle/SidebarToggle.svelte';
	import type { SidebarConfig } from './types';

	export let width: 'standard' | 'wide' = 'standard';

	const config = getContext<SidebarConfig>('sidebarConfig');
	const sidebarIsOpen = getContext<Writable<boolean>>('sidebarIsOpen');

	const togglePosition = $$slots.tabs ? 'right' : config.inFrom;

	const darkThemeClasses = 'dark:bg-core-grey-800 dark:text-white';
	const lightThemeClasses = 'bg-white text-core-grey-700';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	const widthClasses = {
		standard: 'w-[408px]',
		wide: 'w-[608px]'
	};

	const translateClasses = {
		standard: { left: '-translate-x-[408px]', right: 'translate-x-[408px]' },
		wide: { left: '-translate-x-[608px]', right: 'translate-x-[608px]' }
	};

	// const pushClasses = config.push ? '' : '';

	$: wrapperClasses = classNames(
		'fixed inset-y-0 end-0 transition-x duration-300 dark',
		config.inFrom === 'left' ? 'start-0' : 'end-0',
		$sidebarIsOpen ? translateClasses[width][config.inFrom] : ''
	);

	$: sidebarClasses = classNames(
		'fixed h-dvh inset-y-0 end-0 flex flex-col',
		widthClasses[width],
		...themeClasses,
		config.inFrom === 'left' ? 'start-0' : 'end-0'
	);
</script>

<div class:navOpen={$sidebarIsOpen} class={wrapperClasses}>
	<div class={sidebarClasses}>
		{#if $$slots.tabs}
			<div
				class={`absolute inset-y-0 bg-core-grey-100 dark:bg-core-grey-900 ${config.inFrom === 'left' ? '-start-20' : '-start-20'}`}
			>
				<slot name="tabs" />
			</div>
		{:else}
			<div class={`absolute inset-y-0 ${togglePosition === 'left' ? '-end-10' : '-start-10'}`}>
				<SidebarToggle />
			</div>
		{/if}

		<div class={`p-6 h-full flex flex-col`}>
			<div class="space-y-4">
				<slot name="header" />
				<slot name="sections" />
			</div>
			<slot name="footer" />
		</div>
	</div>
</div>
