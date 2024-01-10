<script lang="ts">
	import { classNames } from '@ldn-viz/ui';
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
	export let chartHeight = 'h-60'; // tailwind class to set chart are height
	let chartClass = classNames('w-full relative', chartHeight);

	// export props for layercake
	export let data: { [key: string]: any }[];

	// For save as image
	let chartToCapture: HTMLDivElement;
</script>

<div class="chart-container" bind:this={chartToCapture} id="captureElement">
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
	<div class={chartClass}>
		<slot />
	</div>

	{#if footer === true}
		<Footer />
	{/if}
	{#if exportBtns === true}
		<ExportBtns {chartToCapture} {data} />
	{/if}
</div>

<style>
	.chart-container {
		@apply flex flex-col w-full;
	}
</style>
