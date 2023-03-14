<script context="module" lang="ts">
	import { getContext } from 'svelte';
	const key = {};

	export type ChartContext = {
		data: { [key: string]: any }[];
		xScale: any; //check types
		yScale: any; //check types
		containerWidth: number;
		containerHeight: number;
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

	import { scaleLinear } from 'd3';
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

	let containerWidth = 400;
	let containerHeight = 400;
	let chartWidth = undefined || 400;
	let chartHeight = 400;

	const _containerWidth = writable(containerWidth);
	const _containerHeight = writable(containerHeight);
	const _chartWidth = writable(chartWidth);
	const _chartHeight = writable(chartHeight);

	$: $_containerWidth = containerWidth;
	$: $_containerHeight = containerHeight;
	$: $_chartWidth = chartWidth;
	$: $_chartHeight = chartHeight;

	let chart: any;

	// const xScale = () => {
	// 	return scaleLinear().domain([0, 100]).nice().range([0, 200]);
	// };

	// d.value is effecively hardcoded the 'value'
	const extentX = extent(data, (d) => d.value);
	const extentY = extent(data, (d) => d.value);

	const xScale = scaleLinear()
		.domain(extentX as number[])
		.nice()
		.range([0, $_chartWidth]);
	const yScale = scaleLinear()
		.domain(extentY as number[])
		.nice()
		.range([$_chartHeight, 0]);

	$: context = {
		data,
		xScale,
		yScale,
		containerWidth: _containerWidth,
		containerHeight: _containerHeight,
		chartHeight: _chartHeight,
		chartWidth: _chartWidth
	};

	$: setContext(key, context);
</script>

<div
	class="chart-container h-screen"
	bind:clientWidth={containerWidth}
	bind:clientHeight={containerHeight}
>
	{#if title}
		<Title>{title}</Title>
	{/if}
	{#if subTitle}
		<SubTitle>{subTitle}</SubTitle>
	{/if}

	{#if alt}
		<h5 class="sr-only">{alt}</h5>
	{/if}

	ChartWidth {$_chartWidth}
	ChartHeight {$_chartHeight}

	containerWidth {$_containerWidth}
	containerHeight {$_containerHeight}

	<!-- Viz element goes here -->

	<div class="chart h-60" bind:clientWidth={chartWidth} bind:clientHeight={chartHeight}>
		<svg bind:this={chart}>
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
