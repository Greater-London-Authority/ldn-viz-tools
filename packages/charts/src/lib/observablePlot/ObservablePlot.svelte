<script lang="ts">
	import * as Plot from '@observablehq/plot';
	import ChartContainer from '../chartContainer/ChartContainer.svelte';

	export let spec;

	export let responsiveWidth = false;

	export let data = []; // for downlaod button only

	// for container
	export let title;
	export let subTitle;
	export let alt;
	export let footer;
	export let exportBtns;

	export let domNode;

	const renderPlot = (node) => node.appendChild(Plot.plot(spec));

	let width: number;
	let height: number;
	let dimensions = { height: 0, width: 0 };
	let updateDimensions;
	$: {
		clearTimeout(updateDimensions);
		updateDimensions = setTimeout(() => {
			dimensions = { height, width };
		}, 200);
	}

	$: {
		if (responsiveWidth) {
			spec.width = dimensions.width;
		}
	}
</script>

{#key spec}
	<ChartContainer
		{data}
		{title}
		{subTitle}
		{alt}
		{footer}
		{exportBtns}
		{...$$restProps}
		chartHeight={'h-fit'}
	>
		<div
			use:renderPlot
			{...$$restProps}
			bind:this={domNode}
			bind:clientWidth={width}
			bind:clientHeight={height}
		/>
	</ChartContainer>
{/key}
