<script context="module" lang="ts">
	import { getContext } from 'svelte';
	const key = {};

	export type ChartContext = {
		data: { [key: string]: any }[];
		xScale: any; //check types
		yScale: any; //check types
		width: number;
		height: number;
		chartWidth: number;
		chartHeight: number;
	};

	export const getChartContext = () => {
		return getContext<ChartContext>(key);
	};
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import { extent } from 'd3-array';
	import { scaleLinear } from 'd3-scale';

	import ExportBtns from '../shared/ExportBtns.svelte';
	import Footer from '../shared/Footer.svelte';
	import SubTitle from '../shared/SubTitle.svelte';
	import Title from '../shared/Title.svelte';

	export let data: { [key: string]: any }[];
	export let title: string | null = null;
	export let subTitle: string | null = null;
	export let alt: string | null = null;
	export let footer: boolean = false;
	export let exportBtns: boolean = false;

	const width = writable(400);
	const height = writable(400);
	const chartWidth = writable(400);
	const chartHeight = writable(400);

	let chart;

	// const xScale = () => {
	// 	return scaleLinear().domain([0, 100]).nice().range([0, 200]);
	// };

	// d.value is effecively hardcoded the 'value'
	const extentX = extent(data, (d) => d.value);
	const extentY = extent(data, (d) => d.value);

	const xScale = scaleLinear()
		.domain(extentX as number[])
		.nice()
		.range([0, $chartWidth]);
	const yScale = scaleLinear()
		.domain(extentY as number[])
		.nice()
		.range([$chartHeight, 0]);

	setContext(key, {
		data,
		xScale,
		yScale,
		width,
		height,
		chartWidth,
		chartHeight
	});
</script>

<div class="chart-container">
	{#if title}
		<Title>{title}</Title>
	{/if}
	{#if subTitle}
		<SubTitle>{subTitle}</SubTitle>
	{/if}

	{#if alt}
		<h5 class="sr-only">{alt}</h5>
	{/if}

	<!-- Viz element goes here -->
	<div class="chart" bind:clientWidth={$width} bind:clientHeight={$height}>
		<svg bind:this={chart} width={$chartWidth} height={$chartHeight}>
			<slot {chart} />
		</svg>
	</div>

	{#if footer === true}
		<Footer />
	{/if}
	{#if exportBtns === true}
		<ExportBtns />
	{/if}
</div>

<style>
	svg {
		position: absolute;
		top: 0;
		left: 0;
		overflow: visible;
	}
</style>
