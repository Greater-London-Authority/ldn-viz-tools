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
	 * What appears in the footer:
	 *
	 * * `byline` (string) - statement of who created the visualization
	 * * `source` (string) - statement of where the data came from
	 * * `note` (string) - any additional footnotes
	 */
	export let source = '';

	export let byline = '';

	export let note = '';

	/**
	 * Data Download Button in the footer
	 *
	 * Defaults to true which allows user to select download in either 'CSV' or 'JSON' format.
	 * Set to false to hide completely.
	 * Supply a custom list of formats as an array of strings. Current options either 'CSV', or 'JSON'
	 *
	 */
	export let dataDownloadButton: true | false | ('CSV' | 'JSON')[] = true;

	/**
	 * The Data passed to the data Download Button(s) in the footer
	 */
	export let data: { [key: string]: any }[] | undefined = undefined;

	/**
	 * Image Download Button in the footer
	 *
	 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
	 * Set to false to hide completely.
	 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'
	 *
	 */
	export let imageDownloadButton: true | false | ('PNG' | 'SVG')[] = true;

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

	// For save as image
	let chartToCapture: HTMLDivElement;
</script>

<div class={`chart-container ${chartWidth}`} bind:this={chartToCapture} id="captureElement">
	{#if title || subTitle}
		<div class="mb-4">
			{#if title}
				<Title>{title}</Title>
			{/if}
			{#if subTitle}
				<SubTitle>{subTitle}</SubTitle>
			{/if}
		</div>
	{/if}

	{#if alt}
		<h5 class="sr-only">{alt}</h5>
	{/if}

	<!-- any controls to be displayed below the title and subTitle, but above the chart itself -->
	<slot name="controls" />

	<!-- Visualisation goes here -->
	<div class={chartClass}>
		<slot />
	</div>

	{#if source || byline || note || dataDownloadButton || imageDownloadButton}
		<Footer {source} {byline} {note}>
			<ExportBtns
				{chartToCapture}
				idToPad="captureElement"
				dataForDownload={data}
				{dataDownloadButton}
				{imageDownloadButton}
				slot="exportBtns"
			/>
		</Footer>
	{/if}
</div>

<style lang="postcss">
	.chart-container {
		@apply flex flex-col;
	}
</style>
