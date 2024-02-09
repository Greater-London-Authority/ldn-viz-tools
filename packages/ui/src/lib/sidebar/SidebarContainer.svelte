<script context="module">
	export const MODE_VERTICAL = 'vertical';
	export const MODE_HORIZONTAL = 'horizontal';
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
	export const open = writable(startOpen);

	const refresher = writable(false);
	const refresh = () => refresher.update((v) => !v);

	const isSmallScreen = () => {
		return window.matchMedia('(max-width: 639px)').matches;
	};

	const identifyMode = () => {
		return ssr || isSmallScreen() ? MODE_VERTICAL : MODE_HORIZONTAL;
	};

	const generateConfig = ([isOpen, refresher]) => {
		const mode = identifyMode();
		const slideFromRight = mode === MODE_HORIZONTAL;

		const ctd = isOpen ? '150ms' : '0ms';

		const cw = !slideFromRight || !isOpen ? '100%' : `calc(100% - ${sidebarWidth})`;
		const sw = slideFromRight ? sidebarWidth : '100%';
		const sr = !slideFromRight || isOpen ? 0 : `-${sidebarWidth}`;

		const ch = slideFromRight || !isOpen ? '100%' : `calc(100% - ${sidebarHeight})`;
		const sh = slideFromRight ? '100%' : sidebarHeight;
		const sb = slideFromRight || isOpen ? 0 : `calc(0px - ${sidebarHeight})`;

		const c = {
			MODE_VERTICAL,
			MODE_HORIZONTAL,
			mode,
			// Container
			containerWidth,
			containerHeight,
			// Content
			contentWidth: cw,
			contentHeight: ch,
			contentTransitionDelay: ctd,
			// Sidebar
			sidebarWidth: sw,
			sidebarHeight: sh,
			sidebarRight: sr,
			sidebarBottom: sb,
			sidebarOpen: isOpen
		};

		return c;
	};

	export const config = derived(
		[open, refresher], //
		generateConfig, //
		generateConfig([startOpen, refresher]) //
	);

	setContext('sidebarOpen', open);
	setContext('sidebarContainer', config);
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
