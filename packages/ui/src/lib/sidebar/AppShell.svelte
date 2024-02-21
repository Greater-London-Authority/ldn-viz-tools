<script context="module">
	export const ALIGNMENT_BOTTOM = 'bottom';
	export const ALIGNMENT_RIGHT = 'right';
	export const ALIGMENT_LEFT = 'left';
</script>

<script>
	import { setContext } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import Sidebar from './Sidebar.svelte';
	import SidebarLeft from './SidebarLeft.svelte';

	const ssr = import.meta.env.SSR;

	export let containerWidth = '100dvw';
	export let containerHeight = '100dvh';

	export let sidebarWidth = '408px';
	export let sidebarHeight = 'calc(100% - 8rem)';

	export let startOpen = false;
	export const isOpen = writable(startOpen);

	export let sidebarLeft = false;

	const refresher = writable(false);
	const refresh = () => refresher.update((v) => !v);

	const isSmallScreen = () => {
		return window.matchMedia('(max-width: 639px)').matches;
	};

	const identifyAlignment = () => {
		if (ssr || isSmallScreen() ){
			return ALIGNMENT_BOTTOM;
		} else if (sidebarLeft){
			return ALIGMENT_LEFT;
		}
		return ALIGNMENT_RIGHT;
	};

	const generateConfig = ([open, refresher]) => {
		const alignment = identifyAlignment();
		const rightAligned = alignment === ALIGNMENT_RIGHT;
		const botAligned = alignment === ALIGNMENT_BOTTOM;
		const leftAligned = alignment === ALIGMENT_LEFT;

		const c = {
			ALIGNMENT_BOTTOM,
			ALIGNMENT_RIGHT,
			ALIGMENT_LEFT,
			alignment,
			// Container
			containerWidth,
			containerHeight,
			// Content
			contentWidth: botAligned || !open ? '100%' : `calc(100% - ${sidebarWidth})`,
			contentHeight: rightAligned || leftAligned || !open ? '100%' : `calc(100% - ${sidebarHeight})`,
			contentTransitionDelay: open ? '150ms' : '0ms',
			// Sidebar
			sidebarWidth: rightAligned || leftAligned ? sidebarWidth : '100%',
			sidebarHeight: rightAligned || leftAligned ? '100%' : sidebarHeight,
			sidebarRight: botAligned || open ? 0 : `-${sidebarWidth}`, // ?
			sidebarLeft: (leftAligned && !open) ? `-${sidebarWidth}` : 0,
			sidebarBottom: rightAligned || leftAligned || open ? 0 : `calc(0px - ${sidebarHeight})`,
			sidebarIsOpen: isOpen
		};

		c.isAlignedBottom = () => c.alignment === c.ALIGNMENT_BOTTOM;
		c.isAlignedRight = () => c.alignment === c.ALIGNMENT_RIGHT;
		c.isAlignedLeft = () => c.alignment === c.ALIGMENT_LEFT;

		return c;
	};

	export const config = derived(
		[isOpen, refresher], //
		generateConfig, //
		generateConfig([startOpen, refresher]) //
	);

	setContext('sidebarIsOpen', isOpen);
	setContext('appShell', config);
</script>

<svelte:window on:resize={refresh} />

<div
	class="relative bg-core-grey-600 overflow-hidden"
	style:width={$config.containerWidth}
	style:height={$config.containerHeight}
	{...$$restProps}
>
	{#if sidebarLeft}
		<div
			class="absolute"
			style:left={$config.sidebarLeft}
			style:bottom={$config.sidebarBottom}
			style:width={$config.sidebarWidth}
			style:height={$config.sidebarHeight}
			style:transition-property={'bottom, right'}
			style:transition-duration={'150ms'}
			style:transition-timing-function={'ease-out'}
		>
			<slot name="sidebar">
				<SidebarLeft />
			</slot>
		</div>

		<div
			class="absolute top-0 left-0"
			style:left={$config.sidebarWidth}
			style:width={$config.contentWidth}
			style:height={$config.contentHeight}
			style:transition-property={'width, height'}
			style:transition-duration={'0ms'}
			style:transition-delay={$config.contentTransitionDelay}
		>
			<slot name="content" />
		</div>
	{:else}
		<div
			class="absolute top-0 left-0"
			style:width={$config.contentWidth}
			style:height={$config.contentHeight}
			style:transition-property={'width, height'}
			style:transition-duration={'0ms'}
			style:transition-delay={$config.contentTransitionDelay}
		>
			<slot name="content" />
		</div>

		<div
			class="absolute"
			style:right={$config.sidebarRight}
			style:bottom={$config.sidebarBottom}
			style:width={$config.sidebarWidth}
			style:height={$config.sidebarHeight}
			style:transition-property={'bottom, right'}
			style:transition-duration={'150ms'}
			style:transition-timing-function={'ease-out'}
		>
			<slot name="sidebar">
				<Sidebar />
			</slot>
		</div>
	{/if}
</div>
