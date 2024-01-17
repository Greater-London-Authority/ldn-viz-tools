<script>
	import * as Plot from '@observablehq/plot';
	import ChartContainer from '../chartContainer/ChartContainer.svelte';

	export let spec;

	export let data = []; // for downlaod button only

	// for container
	export let title;
	export let subTitle;
	export let alt;
	export let footer;
	export let exportBtns;

	export let domNode;

	const renderPlot = (node) => node.appendChild(Plot.plot(spec));
</script>

{#key spec}
	<ChartContainer {data} {title} {subTitle} {alt} {footer} {exportBtns} {...$$restProps} chartHeight={"h-fit"}>
		<div use:renderPlot {...$$restProps} bind:this={domNode} />
	</ChartContainer>
{/key}

