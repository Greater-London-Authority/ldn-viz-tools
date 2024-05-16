<script lang="ts">
	import * as Plot from '@observablehq/plot';
	import { onMount, tick } from 'svelte';
	import ChartContainer from '../chartContainer/ChartContainer.svelte';

	export let spec;

	export let data: any = []; // for downlaod button only

	// for container
	export let title;
	export let subTitle;
	export let alt;
	export let footer;

	export let domNode: any;

	const renderPlot = (node: any) => node.appendChild(Plot.plot(spec));

	let width: number;
	let height: number;
	let dimensions = { height: 0, width: 0 };

	let borderBoxSize: ResizeObserverSize[] | { blockSize: any; inlineSize: any }[];

	$: spec.height = borderBoxSize ? borderBoxSize[0].blockSize : 550;
	$: spec.width = borderBoxSize ? borderBoxSize[0].inlineSize : 550;

	// $: width = borderBoxSize ? borderBoxSize[0].inlineSize : 550;
	// $: height = borderBoxSize ? borderBoxSize[0].blockSize : 550;

	// onMount(() => {
	// 	updateDimensions();
	// 	window.addEventListener('resize', updateDimensions);
	// 	return () => {
	// 		window.removeEventListener('resize', updateDimensions);
	// 	};
	// });

	// const updateDimensions = () => {
	// 	console.log(borderBoxSize);
	// 	dimensions = {
	// 		height: borderBoxSize ? borderBoxSize[0].blockSize : 550,
	// 		width: borderBoxSize ? borderBoxSize[0].inlineSize : 550
	// 	};
	// 	// spec.width = Math.max(dimensions.width, 550);
	// 	spec.width = dimensions.width;
	// };
</script>

{#key spec}
	<ChartContainer {data} {title} {subTitle} {alt} {footer} {...$$restProps} chartHeight={'h-fit'}>
		<div use:renderPlot {...$$restProps} bind:this={domNode} bind:borderBoxSize {width} {height} />
	</ChartContainer>

	<!-- bind:clientWidth={width}
	bind:clientHeight={height} -->
{/key}
<p>
	border box size ={borderBoxSize ? borderBoxSize[0].inlineSize : 550} X {borderBoxSize
		? borderBoxSize[0].blockSize
		: 550}
</p>
<p>size = {width} x {height}</p>

<style>
	:global(.defaultCcolorLegendLabel-swatch) {
		font-size: 14px;
	}
</style>
