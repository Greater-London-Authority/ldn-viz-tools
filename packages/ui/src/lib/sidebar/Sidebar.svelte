<script lang="ts">
	import { classNames } from '../utils/classNames';
	import SidebarToggle from './elements/sidebarToggle/SidebarToggle.svelte';

	export let width: 'standard' | 'wide' = 'standard';

	const darkThemeClasses = 'dark:bg-core-grey-800 dark:text-white';
	const lightThemeClasses = 'bg-white text-core-grey-700';

	const themeClasses = [darkThemeClasses, lightThemeClasses];

	const widthClasses = {
		standard: 'w-[408px]',
		wide: 'w-[608px]'
	};

	$: sidebarClasses = classNames(
		'p-6 flex flex-0 flex-col h-full',
		...themeClasses,
		widthClasses[width]
	);
</script>

<div class="flex h-screen dark">
	{#if $$slots.tabs}
		<div class="bg-core-grey-100 dark:bg-core-grey-900">
			<slot name="tabs" />
		</div>
	{:else}
		<SidebarToggle isOpen={true} />
	{/if}
	<div class={sidebarClasses}>
		<div class="space-y-4">
			<slot name="header" />
			<slot name="sections" />
		</div>
		<slot name="footer" />
	</div>
</div>
