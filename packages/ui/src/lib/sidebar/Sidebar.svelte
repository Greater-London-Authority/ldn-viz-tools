<script lang='ts'>
	import type { Align } from './sidebarState'

	import { onMount } from 'svelte'

	import { isSidebarOpen, sidebarAlignment, isWideView } from './sidebarState'
	import DefaultHood from './DefaultHood.svelte'
	import DefaultContent from './DefaultContent.svelte'

	export let top = false // Default is bottom
	export let left = false // Default is right

	let contentElem: undefined | HTMLElement
	let contentSize = 0

	onMount(() => {
		resize()
	})

	const resize = () => {
		updateWideViewState()
		updateContentSize()
		updateSidebarAlignment(top, left)
	}

	const updateWideViewState = () => {
		// TODO: How to get screens.wide?
		const match = window.matchMedia(`(min-width: 900px)`).matches
		isWideView.set(match)
	}

	const updateContentSize = () => {
		const rect = contentElem.getBoundingClientRect()
		contentSize = $isWideView ? rect.width : rect.height
	}

	const updateSidebarAlignment = (top: boolean, left: boolean) => {
		if ($isWideView) {
			sidebarAlignment.set(left ? 'left' : 'right')
		} else {
			sidebarAlignment.set(top ? 'top' : 'bottom')
		}
	}

	$: updateSidebarAlignment(top, left)
	$: style = $isSidebarOpen ? '' : `${$sidebarAlignment}: ${-contentSize}px`
	$: classes = `${$sidebarAlignment}-0`

	const HoodAfterContentAlignments: Align[] = ['left', 'top']
	$: hoodAfterContent = HoodAfterContentAlignments.includes($sidebarAlignment)
</script>

<svelte:window on:resize={resize} />

<section
	id="sidebar"
	style={style}
	class="absolute pointer-events-none w-full not-wide:left-0 wide:top-0 wide:w-auto wide:h-full wide:flex {classes}">

	{#if !hoodAfterContent}
		<div id="sidebar-hood" class="pointer-events-none">
			<slot name="hood">
				<DefaultHood />
			</slot>
		</div>
	{/if}

	<div bind:this={contentElem} class="pointer-events-auto">
		<slot name="content">
			<DefaultContent />
		</slot>
	</div>

	{#if hoodAfterContent}
		<div id="sidebar-hood" class="pointer-events-none">
			<slot name="hood">
				<DefaultHood />
			</slot>
		</div>
	{/if}
</section>

<style>
	#sidebar {
		transition-property: top, bottom, left, right;
		transition-duration: 0.4s;
		transition-timing-function: ease-out;
	}

	#sidebar-hood > :global(*) {
		/* TODO: This might be not be required */
		pointer-events: auto;
	}
</style>
