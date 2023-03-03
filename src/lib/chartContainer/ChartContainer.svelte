<script lang="ts">
	import { extent, scaleLinear } from 'd3';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import ExportBtns from '../shared/ExportBtns.svelte';
	import Footer from '../shared/Footer.svelte';
	import SubTitle from '../shared/SubTitle.svelte';
	import Title from '../shared/Title.svelte';

	export let title: string | null = null;
	export let subTitle: string | null = null;
	export let alt: string | null = null;
	export let footer: boolean = false;
	export let exportBtns: boolean = false;

	export let data: { [key: string]: any }[];
	export let xKey: string = 'x';
	export let key: Symbol;

	let width = 400;
	let height = 400;

	let xScale: any;

	const widthStore = writable(width);
	const xScaleStore = writable(xScale);

	setContext(key, { data, widthStore, height, xScaleStore });
	setContext('width', widthStore);
	// setContext(key, xScaleStore);

	$: extentX = extent(data, (d) => d[xKey]);

	$: xScale = scaleLinear().domain([0, 100]).nice().range([0, width]);

	$: widthStore.set(width);
	$: xScaleStore.set(xScale);
</script>

<div class="chart-container" bind:clientWidth={width} bind:clientHeight={height}>
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
	<slot {key} />

	{#if footer === true}
		<Footer />
	{/if}
	{#if exportBtns === true}
		<ExportBtns />
	{/if}
</div>
