<script lang="ts">
	/**
	 * The `ChartContainer` is a wrapper around a plot that adds additional information such as a title, subtitle, and description.
	 * It also provides controls usch as data/image download buttons.
	 *
	 * **Alternatives**: normally the [ObservablePlot](./?path=/docs/charts-observableplot--documentation) or other plot component would be used rather than using `ChartContainer` directly.
	 * 	@component
	 */

	import { classNames } from '@ldn-viz/ui';
	import ExportBtns from './ExportBtns.svelte';
	import Footer from './Footer.svelte';
	import SubTitle from './SubTitle.svelte';
	import Title from './Title.svelte';

	/**
	 * Title that is displayed in large text above the plot.
	 */
	export let title = '';

	/**
	 * Subtitle that is displayed below the title, but above the plot.
	 */
	export let subTitle = '';

	/**
	 * Alt-text for the plot.
	 */
	export let alt = '';

	/**
	 * Object specifying what appears in the footer:
	 *
	 * * `byline` (string) - statement of who created the visualization
	 * * `source` (string) - statement of where the data came from
	 * * `note` (string) - any additional footnotes
	 * * `exportBtns` (boolean) - if `false`, then data/image download buttons will be hidden
	 */
	export let footer:
		| { byline?: string; source?: string; note?: string; exportBtns: boolean }
		| undefined = { exportBtns: true };

	/**
	 * Tailwind class to set chart area height
	 */
	export let chartHeight = 'h-60';

	export let overrideClass = '';
	let chartClass = classNames('relative', chartHeight, overrideClass);

	/**
	 * Tailwind class to set overall chart width
	 */
	export let chartWidth = 'w-full';

	/**
	 * Data being visualized (as an array of objects), to be used by data download button.
	 */
	export let data: { [key: string]: any }[] | undefined = undefined;

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

	<!-- Visualisation goes here -->
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
