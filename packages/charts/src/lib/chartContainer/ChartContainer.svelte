<script lang="ts">
	import { classNames } from '@ldn-viz/ui';
	import ExportBtns from './ExportBtns.svelte';
	import Footer from './Footer.svelte';
	import SubTitle from './SubTitle.svelte';
	import Title from './Title.svelte';

	// export props to popultae the container
	export let title: string | null = null;
	export let subTitle: string | null = null;
	export let alt: string | null = null;
	export let footer:
		| { byline?: string; source?: string; note?: string; exportBtns: boolean }
		| undefined = { exportBtns: true };

	export let chartHeight = 'h-60'; // tailwind class to set chart area height
	// export let chartWidth = 'w-96'; // tailwind class to set chart area height
	let chartClass = classNames('relative', chartHeight);

	// export props for layercake
	export let data: { [key: string]: any }[];

	// For save as image
	let chartToCapture: HTMLDivElement;
</script>

<div class={`chart-container`} bind:this={chartToCapture} id="captureElement">
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
	{#if footer}
		<Footer {...footer}>
			<ExportBtns {chartToCapture} data slot="exportBtns" />
		</Footer>
	{/if}
</div>

<style>
	.chart-container {
		@apply flex flex-col;
	}
</style>
