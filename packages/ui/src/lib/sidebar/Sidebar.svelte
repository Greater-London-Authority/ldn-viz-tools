<script>
	import { getContext } from 'svelte';

	import DefaultSidebarContent from './DefaultSidebarContent.svelte';
	import SidebarContent from './SidebarContent.svelte';
	import SidebarToggle from './SidebarToggle.svelte';

	export let classes = '';

	const sidebarContainer = getContext('sidebarContainer');
	$: isAlignedRight = $sidebarContainer.isAlignedRight();
</script>

<section
	class="relative bg-core-grey-800 w-full h-full flex flex-col text-white text-sm z-30 {classes}"
>
	<div
		class="absolute"
		style:top={isAlignedRight ? '0' : 'unset'}
		style:right={isAlignedRight ? '100%' : 'unset'}
		style:bottom={isAlignedRight ? 'unset' : '100%'}
		style:left={isAlignedRight ? 'unset' : '0'}
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
