<script lang="ts">
	import { onMount } from 'svelte';
	import { Align } from './sidebarState';
	import { isSidebarOpen, sidebarAlignment, isWideView } from './sidebarState';

	import SidebarToggle from './SidebarToggle.svelte';
	import SidebarContainer from './SidebarContainer.svelte';

	export let top = false; // Default is bottom
	export let left = false; // Default is right

	let contentElem: undefined | HTMLElement;
	let contentSize = 0;

	onMount(() => {
		resize();
	});

	const resize = () => {
		updateWideViewState();
		updateContentSize();
		updateSidebarAlignment(top, left);
	};

	const updateWideViewState = () => {
		// TODO: How to get themes.screens.wide?
		const match = window.matchMedia(`(min-width: 900px)`).matches;
		isWideView.set(match);
	};

	const updateContentSize = () => {
		const rect = contentElem.getBoundingClientRect();
		contentSize = $isWideView ? rect.width : rect.height;
	};

	const updateSidebarAlignment = (top: boolean, left: boolean) => {
		if ($isWideView) {
			sidebarAlignment.set(left ? Align.Left : Align.Right);
		} else {
			sidebarAlignment.set(top ? Align.Top : Align.Bottom);
		}
	};

	$: updateSidebarAlignment(top, left);
	$: style = $isSidebarOpen ? `${$sidebarAlignment}: 0` : `${$sidebarAlignment}: ${-contentSize}px`;

	const hoodAfterContentAlignments = [Align.Left, Align.Top];
	$: hoodAfterContent = hoodAfterContentAlignments.includes($sidebarAlignment);
</script>

<svelte:window on:resize={resize} />

<section
	id="app-sidebar"
	{style}
	class="absolute pointer-events-none w-full not-wide:left-0 wide:top-0 wide:w-auto wide:h-full wide:flex"
>
	{#if !hoodAfterContent}
		<slot name="hood">
			<SidebarToggle />
		</slot>
	{/if}

	<div bind:this={contentElem} class="pointer-events-auto">
		<slot name="content">
			<SidebarContainer />
		</slot>
	</div>

	{#if hoodAfterContent}
		<slot name="hood">
			<SidebarToggle />
		</slot>
	{/if}
</section>

<style>
	#app-sidebar {
		transition-property: top, bottom, left, right;
		transition-duration: 0.4s;
		transition-timing-function: ease-out;
	}
</style>
