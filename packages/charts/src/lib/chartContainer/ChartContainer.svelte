<script context="module" lang="ts">
	import { LayerCake, Svg } from 'layercake';
</script>

<script lang="ts">
	import ExportBtns from '../shared/ExportBtns.svelte';
	import Footer from '../shared/Footer.svelte';
	import SubTitle from '../shared/SubTitle.svelte';
	import Title from '../shared/Title.svelte';

	// export props to popultae the container
	export let title: string | null = null;
	export let subTitle: string | null = null;
	export let alt: string | null = null;
	export let footer = false;
	export let exportBtns = false;

	// export props for layercake
	export let data: { [key: string]: any }[];
	export let x = 'x';
	export let y = 'y';
	export let yScale: ((x: any) => number | undefined) | undefined = undefined;
	export let xDomain: any[] = [0, null];
	export let yDomain: any[] = [0, null];
	// all other layercake props accepted with ...$$restProps rtm
	let padding = { left: 50, bottom: 0 };
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
	<div class="chart">
		<LayerCake
			{data}
			{x}
			{y}
			{yScale}
			{xDomain}
			{yDomain}
			{padding}
			{...$$restProps}
			let:aspectRatio
			let:containerHeight
			let:containerWidth
			let:height
			let:width
			let:element
		>
			<Svg>
				<slot {aspectRatio} {containerHeight} {containerWidth} {height} {width} {element} />
			</Svg>
		</LayerCake>
	</div>

	{#if footer === true}
		<Footer />
	{/if}
	{#if exportBtns === true}
		<ExportBtns />
	{/if}
</div>

<style>
	.chart-container {
		@apply flex flex-col w-full;
	}

	.chart {
		@apply w-full h-60 relative;
	}

	/* svg {
		position: absolute;
		top: 0;
		left: 0;
		overflow: visible;
	} */
</style>
