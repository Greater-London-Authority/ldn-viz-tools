<script lang="ts">
	/**
	 * The `<ChartContainer>` component provides a consistent 'Chrome' to the chart elements passed as the default slot.
	 * 
	 * The component orchestrates the width of the contained chart and supplies the Title, Subtitle, Alternative text etc. via the availible props.

	 * @component
	 */

	import { classNames } from '@ldn-viz/ui';
	import ExportBtns from './ExportBtns.svelte';
	import Footer from './Footer.svelte';
	import SubTitle from './SubTitle.svelte';
	import Title from './Title.svelte';

	// Chart Title
	export let title: string | null = null;
	// Chart Subtitle
	export let subTitle: string | null = null;
	// Alternative text describing the chart
	export let alt: string | null = null;
	// Object defining the contents of the chart footer
	export let footer:
		| { byline?: string; source?: string; note?: string; exportBtns: boolean }
		| undefined = { exportBtns: true };

	// tailwind class to set chart area height - applies only to the slotted chart
	export let chartHeight = 'h-60';
	// tailwind class to set overall chart width
	export let chartWidth = 'w-full';

	let chartClass = classNames('relative', chartHeight);

	// Data to be used by the export data buttons
	export let exportData: { [key: string]: any }[] | undefined = undefined;

	// For save as image
	let chartToCapture: HTMLDivElement;
</script>

<div class={`chart-container ${chartWidth}`} bind:this={chartToCapture} id="captureElement">
	{#if title}
		<Title>{title}</Title>
	{/if}
	{#if subTitle}
		<SubTitle>{subTitle}</SubTitle>
	{/if}

	{#if alt}
		<h5 class="sr-only">{alt}</h5>
	{/if}

	<!-- Viz element accepted as defaul slot -->
	<div class={chartClass}>
		<slot />
	</div>
	{#if footer}
		<Footer {...footer}>
			<ExportBtns {chartToCapture} exportData slot="exportBtns" />
		</Footer>
	{/if}
</div>

<style>
	.chart-container {
		@apply flex flex-col;
	}
</style>
