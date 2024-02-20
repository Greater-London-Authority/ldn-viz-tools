<script context="module">
	export const ALIGNMENT_BOTTOM = 'bottom';
	export const ALIGNMENT_RIGHT = 'right';
</script>

<script>
	import { setContext } from 'svelte';
	import { writable, derived } from 'svelte/store';
	import Sidebar from './Sidebar.svelte';

	const ssr = import.meta.env.SSR;

	export let containerWidth = '100dvw';
	export let containerHeight = '100dvh';

	export let sidebarWidth = '408px';
	export let sidebarHeight = 'calc(100% - 8rem)';

	export let startOpen = false;
	export const isOpen = writable(startOpen);

	const refresher = writable(false);
	const refresh = () => refresher.update((v) => !v);

	const isSmallScreen = () => {
		return window.matchMedia('(max-width: 639px)').matches;
	};

	const identifyAlignment = () => {
		return ssr || isSmallScreen() ? ALIGNMENT_BOTTOM : ALIGNMENT_RIGHT;
	};

	const generateConfig = ([open, refresher]) => {
		const alignment = identifyAlignment();
		const rightAligned = alignment === ALIGNMENT_RIGHT;
		const botAligned = alignment === ALIGNMENT_BOTTOM;

		const c = {
			ALIGNMENT_BOTTOM,
			ALIGNMENT_RIGHT,
			alignment,
			// Container
			containerWidth,
			containerHeight,
			// Content
			contentWidth: botAligned || !open ? '100%' : `calc(100% - ${sidebarWidth})`,
			contentHeight: rightAligned || !open ? '100%' : `calc(100% - ${sidebarHeight})`,
			contentTransitionDelay: open ? '150ms' : '0ms',
			// Sidebar
			sidebarWidth: rightAligned ? sidebarWidth : '100%',
			sidebarHeight: rightAligned ? '100%' : sidebarHeight,
			sidebarRight: botAligned || open ? 0 : `-${sidebarWidth}`,
			sidebarBottom: rightAligned || open ? 0 : `calc(0px - ${sidebarHeight})`,
			sidebarIsOpen: isOpen
		};

		c.isAlignedBottom = () => c.alignment === c.ALIGNMENT_BOTTOM;
		c.isAlignedRight = () => c.alignment === c.ALIGNMENT_RIGHT;

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
</div>
