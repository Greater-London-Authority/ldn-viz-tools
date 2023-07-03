<script>
	import { onMount } from 'svelte'
	import { isSidebarOpen, sidebarAlignment, isWideView } from './sidebar-state.js'

	import DefaultHood from './DefaultHood.svelte'
	import DefaultContent from './DefaultContent.svelte'

	export let top = false // Default is bottom
	export let left = false // Default is right

	let contentElem = null
	let contentSize = 0

	onMount(() => {
		resize()
	})

	const resize = () => {
		updateAppState()
		updateContentSize()
		updateSidebarAlignment(top, left)
	}

	const updateAppState = () => {
		// TODO: Get the value from themes.screens?
		const laptopView = window.matchMedia('(min-width: 900px)').matches
		isWideView.set(laptopView)
	}

	const updateContentSize = (elem) => {
		const rect = contentElem.getBoundingClientRect()
		contentSize = $isWideView ? rect.width : rect.height
	}

	const updateSidebarAlignment = (top, left) => {
		if ($isWideView) {
			sidebarAlignment.set(left ? 'left' : 'right')
		} else {
			sidebarAlignment.set(top ? 'top' : 'bottom')
		}
	}

	$: updateSidebarAlignment(top, left)
	$: hoodOnLeftOrTop = ['left', 'top'].includes($sidebarAlignment)
</script>

<svelte:window on:resize={resize} />

<section
	style:--content-size={`${contentSize}px`}
	class="sidebar"
	class:open={$isSidebarOpen}
	class:closed={!$isSidebarOpen}
	class:top
	class:bottom={!top}
	class:left
	class:right={!left}>

	{#if !hoodOnLeftOrTop}
		<div class="hood">
			<slot name="hood">
				<DefaultHood />
			</slot>
		</div>
	{/if}

	<div bind:this={contentElem} class="content">
		<slot name="content">
			<DefaultContent />
		</slot>
	</div>

	{#if hoodOnLeftOrTop}
		<div class="hood">
			<slot name="hood">
				<DefaultHood />
			</slot>
		</div>
	{/if}
</section>

<style>
	.sidebar {
		position: absolute;

		width: 100%;
		height: auto;

		pointer-events: none;
	}

	.sidebar :global(*) {
		pointer-events: auto;
	}

	.hood,
	.content {
		pointer-events: none;
	}

	.top {
		bottom: unset;
		transition: top 0.4s ease-out;
	}

	.bottom {
		top: unset;
		transition: bottom 0.4s ease-out;
	}

	.left {
		right: unset;
		left: 0;
	}

	.right {
		left: unset;
		right: 0;
	}

	.open.top {
		top: 0;
	}

	.open.bottom {
		bottom: 0;
	}

	.closed.top {
		top: calc(-1 * var(--content-size));
	}

	.closed.bottom {
		bottom: calc(-1 * var(--content-size));
	}

	@media (min-width: 900px) {
		.sidebar {
			display: flex;

			width: auto;
			height: 100%;
		}

		.top {
			bottom: unset;
			top: 0;
		}

		.bottom {
			top: unset;
			bottom: 0;
		}

		.left {
			right: unset;
			transition: left 0.4s ease-out;
		}

		.right {
			left: unset;
			transition: right 0.4s ease-out;
		}

		.open.left {
			left: 0;
		}

		.open.right {
			right: 0;
		}

		.closed.left {
			top: 0;
			left: calc(-1 * var(--content-size));
		}

		.closed.right {
			bottom: 0;
			right: calc(-1 * var(--content-size));
		}
	}
</style>
