<script>
	import { getContext } from 'svelte';

	import DefaultSidebarContent from './DefaultSidebarContent.svelte';
	import SidebarToggle from './SidebarToggle.svelte';

	export let classes = '';

	const appShell = getContext('appShell');
	$: isAlignedLeft = $appShell.isAlignedLeft();

	$: console.log('width:', $appShell.sidebarWidth);
</script>

<section
	class="relative bg-core-grey-800 w-full h-full flex flex-col text-white text-sm z-30 {classes}"
>
	<div
		class="absolute"
		style:top={isAlignedLeft ? '0' : 'unset'}
		style:bottom={isAlignedLeft ? 'unset' : '100%'}
		style:left={isAlignedLeft ? $appShell.sidebarWidth : 'unset'}
	>
		<slot name="toggle">
			<SidebarToggle />
		</slot>
	</div>

	<slot name="unpadded-content" />

	<div class="dark grow overflow-y-auto overscroll-contain p-6 pb-2 flex flex-col gap-6">
		<slot>
			{#if !$$slots['unpadded-content']}<DefaultSidebarContent />{/if}
		</slot>
	</div>

	<slot name="footer" />
</section>
