<script>
	import { getContext } from 'svelte';

	import SidebarToggle from './SidebarToggle.svelte';
	import DefaultSidebarContent from './DefaultSidebarContent.svelte';

	export let classes = '';

	const sidebarContainer = getContext('sidebarContainer');
	$: slidesFromRight = $sidebarContainer.mode === $sidebarContainer.MODE_HORIZONTAL;
</script>

<section
	class="relative bg-core-grey-800 w-full h-full flex flex-col text-white text-sm z-30 {classes}"
>
	<div
		class="absolute"
		style:top={slidesFromRight ? '0' : 'unset'}
		style:right={slidesFromRight ? '100%' : 'unset'}
		style:bottom={slidesFromRight ? 'unset' : '100%'}
		style:left={slidesFromRight ? 'unset' : '0'}
	>
		<slot name="toggle">
			<SidebarToggle />
		</slot>
	</div>

	<div class="dark grow overflow-y-auto overscroll-contain p-6 pb-2 flex flex-col gap-6">
		<slot>
			<DefaultSidebarContent />
		</slot>
	</div>

	<slot name="footer" />
</section>
