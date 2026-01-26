<script lang="ts">
	/**
	 * The `<MapMarkerStyledContainer>` component is a wrapping container for use
	 * within marker components. It provides standardised styling that is
	 * suitable for the vast majority of map tooltips and popups.
	 * @component
	 */

	interface Props {
		/**
		 * If `true`, then a styled tip/arrow is not drawn at the bottom of the container.
		 */
		noTip?: boolean;
		/**
		 * If `true`, then the standard container padding is not applied.
		 */
		noPad?: boolean;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { noTip = false, noPad = false, children, ...rest }: Props = $props();

	let container = $state();

	const preventZoom = (e) => {
		const hasVerticalScroll = container.scrollHeight > container.clientHeight;
		if (hasVerticalScroll) {
			e.stopPropagation();
		}
	};

	let classes = $state(
		`shadow-lg border border-color-border-muted absolute w-max bottom-[calc(1rem-1px)] left-1/2 transform -translate-x-1/2 bg-color-container overflow-y-auto`
	);
	classes += ' ' + (rest.class || '');
	delete rest.class;
</script>

<!--
	Box shadow only visible when a tooltip and popup overlap.
	Distinguishes the tooltip when it overlaps a popup.

	The stopImmediatePropagation on mousemove prevents tooltips below this
	marker from being shown when mouseover.	
-->
<div class="text-color-text relative text-sm">
	<div
		role="tooltip"
		bind:this={container}
		onwheel={preventZoom}
		ontouchmove={preventZoom}
		onmousemove={(ev) => ev.stopImmediatePropagation()}
		class={classes}
		class:p-4={!noPad}
		{...rest}
	>
		{@render children?.()}
	</div>
	{#if !noTip}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 150 100"
			class="fill-color-container-level-0 stroke-color-border-muted absolute bottom-0 left-1/2 h-4 w-8 -translate-x-1/2 transform"
		>
			<line class="stroke-color-border-muted" stroke-width="14" x1="0" y1="0" x2="75" y2="100" />
			<line class="stroke-color-border-muted" stroke-width="14" x1="75" y1="100" x2="150" y2="0" />
			<polygon points="0,0 75,100 150,0" />
		</svg>
	{/if}
</div>
