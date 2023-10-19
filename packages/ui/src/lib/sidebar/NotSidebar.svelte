<script>
	import { browser } from '$app/environment';
	import { sidebarLayout, sidebarIsOpen } from './Sidebar.svelte';

	export let hideContent = false;

	let size = {
		width: '100%',
		height: '100%'
	};

	const fitToParent = () => ({
		width: window.innerWidth,
		height: window.innerHeight
	});

	const adjustForSidebar = (size) => {
		if ($sidebarLayout.isHorizontal()) {
			size.width -= $sidebarLayout.contentWidth;
		} else {
			size.height -= $sidebarLayout.contentHeight;
		}
	};

	$: if (browser && $sidebarLayout) {
		const pxSize = fitToParent();

		if ($sidebarIsOpen) {
			adjustForSidebar(pxSize);
		}

		size = {
			width: `${pxSize.width}px`,
			height: `${pxSize.height}px`
		};
	}
</script>

<div
	{...$$restProps}
	class="absolute top-0 left-0"
	style:width={size.width}
	style:height={size.height}
	style:transition-delay={!$sidebarIsOpen ? '0ms' : '150ms'}
>
	{#if !hideContent}
		<slot />
	{/if}
</div>
