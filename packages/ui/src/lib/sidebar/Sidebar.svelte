<script context="module" lang="ts">
	// Sidebar is the core component for applications with sidebars.

	import { writable } from 'svelte/store';

	type Mode = 'vertical' | 'horizontal';
	type Alignment = 'right' | 'bottom';
	type Layout = {
		mode: Mode,
		alignment: Alignment,
		hoodWidth: number,
		hoodHeight: number,
		contentWidth: number,
		contentHeight: number,
		isVertical: () => boolean,
		isHorizontal: () => boolean,
		isRight: () => boolean,
		isBottom: () => boolean,

	}


	const newSidebarLayout = () => {
		const layout = {
			mode: 'vertical',
			alignment: 'bottom',
			hoodWidth: 0,
			hoodHeight: 0,
			contentWidth: 0,
			contentHeight: 0,

			isVertical: () => false,
			isHorizontal: () => false,
			isRight: () => false,
			isBottom: () => false,
		};

		layout.isVertical = () => layout.mode === 'vertical';
		layout.isHorizontal = () => layout.mode === 'horizontal';

		layout.isRight = () => layout.mode === 'right';
		layout.isBottom = () => layout.mode === 'bottom';

		return layout as Layout;
	};

	const newLayoutStyle = () => {
		return {
			bottom: 'unset',
			right: 'unset',
			width: 'auto',
			height: 'auto',
			maxWidth: '100dvw',
			maxHeight: '100dvh'
		};
	};

	export const sidebarLayout = writable(newSidebarLayout());
	export const sidebarOpen = writable(false);

	const identifyMode = () => {
		return isMobileScreen() ? 'vertical' : 'horizontal';
	};

	const isMobileScreen = () => {
		return window.matchMedia('(max-width: 639px)').matches;
	};

	const identifyAlignment = (mode: Mode) => {
		return mode === 'horizontal' ? 'right' : 'bottom';
	};
</script>

<script>
	import { onMount, tick } from 'svelte';
	import SidebarToggle from './SidebarToggle.svelte';
	import SidebarContent from './SidebarContent.svelte';

	let hoodElem: HTMLElement;
	let contentElem: HTMLElement;
	let visibility = 'hidden';
	let styles = newLayoutStyle();

	const resize = async () => {
		// Because this and other components need to be rendered in the DOM before
		// the full correct layout can be identified, relayout is called multiple
		// times. Smartphones can be a bit funny with sizing due to their
		// dynamic view heights so this is called a third time. The performance
		// hit is negligible in comparison to an applications main content load.

		relayout();
		await tick();

		relayout();
		visibility = 'visible';

		await tick();
		relayout();
	};

	const relayout = async () => {
		if (!hoodElem || !contentElem) {
			return;
		}
		const layout = newSidebarLayout();

		layout.mode = identifyMode();
		layout.alignment = identifyAlignment(layout.mode);

		let rect = hoodElem.getBoundingClientRect();
		layout.hoodWidth = rect.width;
		layout.hoodHeight = rect.height;

		rect = contentElem.getBoundingClientRect();
		layout.contentWidth = rect.width;
		layout.contentHeight = rect.height;

		sidebarLayout.set(layout);
		updateLayoutStyles(layout);
	};

	const updateLayoutStyles = (layout: Layout) => {
		styles = newLayoutStyle();

		if (!layout) {
			layout = $sidebarLayout;
		}

		const openBy = (size) => {
			return $sidebarOpen ? 0 : size + 'px';
		};

		if (layout.alignment === 'bottom') {
			styles.bottom = openBy(-layout.contentHeight);
			styles.width = '100%';
			styles.maxHeight = `calc(100dvh - ${layout.hoodHeight}px - 72px`;
			return;
		}

		styles.right = openBy(-layout.contentWidth);
		styles.height = '100%';
		styles.maxWidth = `calc(100dvw - ${layout.hoodWidth}px - 72px`;
	};

	onMount(resize);
	$: updateLayoutStyles(null, $sidebarOpen);
</script>

<svelte:window on:resize={resize} />

<!--
	<aside> is not suitable here because the sidebar contains primary	content and
	sometimes primary controls, not just supplementary stuff, e.g. title and
	description.
-->
<section
	id="gla-sidebar"
	class="fixed z-20 pointer-events-none"
	style:display={$sidebarLayout.isHorizontal() ? 'flex' : 'block'}
	style:visibility
	style:bottom={styles.bottom}
	style:right={styles.right}
	style:width={styles.width}
	style:height={styles.height}
>
	<div bind:this={hoodElem}>
		<slot name="hood">
			<SidebarToggle />
		</slot>
	</div>

	<div
		bind:this={contentElem}
		class="pointer-events-auto overflow-y-auto"
		style:max-width={styles.maxWidth}
		style:max-height={styles.maxHeight}
	>
		<slot>
			<SidebarContent />
		</slot>
	</div>
</section>

<style>
	#gla-sidebar {
		transition-property: bottom, right;
		transition-duration: 150ms;
		transition-timing-function: ease-out;
	}
</style>
