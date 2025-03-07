<script>
	/**
	 * The `<MapMarkerStyledContainer>` component is a wrapping container for use
	 * within marker components. It provides standardised styling that is
	 * suitable for the vast majority of map tooltips and popups.
	 * @component
	 */

	/**
	 * If `true`, then a styled tip/arrow is not drawn at the bottom of the container.
	 */
	export let noTip = false;

	/**
	 * If `true`, then the standard container padding is not applied.
	 */
	export let noPad = false;

	let container;

	const preventZoom = (e) => {
		const hasVerticalScroll = container.scrollHeight > container.clientHeight;
		if (hasVerticalScroll) {
			e.stopPropagation();
		}
	};

	let classes = `shadow-lg border border-color-ui-border-secondary absolute w-max bottom-[calc(1rem-1px)] left-1/2 transform -translate-x-1/2 bg-color-container-level-0 overflow-y-auto`;
	classes += ' ' + ($$restProps.class || '');
	delete $$restProps.class;
</script>

<!--
	Box shadow only visible when a tooltip and popup overlap.
	Distinguishes the tooltip when it overlaps a popup.

	The stopImmediatePropagation on mousemove prevents tooltips below this
	marker from being shown when mouseover.	
-->
<div class="relative text-color-text-primary text-sm">
	<div
		role="tooltip"
		bind:this={container}
		on:wheel={preventZoom}
		on:touchmove={preventZoom}
		on:mousemove|stopImmediatePropagation={() => {}}
		class={classes}
		class:p-4={!noPad}
		{...$$restProps}
	>
		<slot />
	</div>
	{#if !noTip}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 150 100"
			class="absolute bottom-0 left-1/2 w-8 h-4 transform -translate-x-1/2 stroke-color-ui-border-secondary fill-color-container-level-0"
		>
			<line
				class="stroke-color-ui-border-secondary"
				stroke-width="14"
				x1="0"
				y1="0"
				x2="75"
				y2="100"
			/>
			<line
				class="stroke-color-ui-border-secondary"
				stroke-width="14"
				x1="75"
				y1="100"
				x2="150"
				y2="0"
			/>
			<polygon points="0,0 75,100 150,0" />
		</svg>
	{/if}
</div>

<style>
	:global(.maplibregl-popup > *) {
		pointer-events: none;
		border-radius: 0;
		margin: 0;
		padding: 0;
	}

	:global(.maplibregl-popup-tip) {
		display: none;
	}
</style>
