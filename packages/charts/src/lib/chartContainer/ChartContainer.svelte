<script lang="ts">
	/**
	 * The `ChartContainer` is a wrapper around a plot that adds additional information such as a title, subtitle, and description.
	 * It also provides controls such as data/image download buttons.
	 *
	 * **Note**: You must provide a `chartDescription` for accessibility.
	 *
	 * **Alternatives**: normally the [ObservablePlot](./?path=/docs/charts-components-observableplot--documentation) or other plot component would be used rather than using `ChartContainer` directly.
	 * 	@component
	 */

	import { classNames } from '@ldn-viz/ui';
	import ExportBtns from './ExportBtns.svelte';
	import Footer from './Footer.svelte';
	import SubTitle from './SubTitle.svelte';
	import Title from './Title.svelte';

	// For save as image
	let chartToCapture: HTMLDivElement = $state() as HTMLDivElement;

	interface Props {
		/**
		 * Title that is displayed in large text above the plot.
		 */
		title?: string;
		/**
		 * Subtitle that is displayed below the title, but above the plot.
		 */
		subTitle?: string;
		/**
		 * Alt-text for the plot.
		 */
		alt?: string;
		/**
		 * What appears in the footer:
		 *
		 * * `byline` (string) - statement of who created the visualization
		 * * `source` (string) - statement of where the data came from
		 * * `note` (string) - any additional footnotes
		 */
		source?: string;
		byline?: string;
		note?: string;
		/**
		 * Data Download Button in the footer
		 *
		 * Defaults to true which allows user to select download in either 'CSV' or 'JSON' format.
		 * Set to false to hide completely.
		 * Supply a custom list of formats as an array of strings. Current options either 'CSV', or 'JSON'
		 *
		 */
		dataDownloadButton?: true | false | ('CSV' | 'JSON')[];
		/**
		 * The file name to be used for the downloaded data or image file.
		 */
		filename?: string;
		/**
		 * The Data passed to the data Download Button(s) in the footer
		 */
		data?: { [key: string]: any }[] | undefined;
		/**
		 * Image Download Button in the footer
		 *
		 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
		 * Set to false to hide completely.
		 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'
		 *
		 */
		imageDownloadButton?: true | false | ('PNG' | 'SVG')[];
		/**
		 * Tailwind class to set chart area height
		 */
		chartHeight?: string;
		overrideClass?: string;
		/**
		 * Tailwind class to set overall chart width
		 */
		chartWidth?: string;
		/**
		 * If set to `true`, set `display: contents` on the top-level `ChartContainer` div,
		 * so that a grid layout can be applied to align parts of charts across two columns
		 */
		alignMultiple?: boolean;
		/**
		 * Description of the chart for use in a modal for sighted users.
		 */
		chartDescription?: string;
		controls?: import('svelte').Snippet;
		legend?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		description?: import('svelte').Snippet;
	}

	let {
		title = '',
		subTitle = '',
		alt = '',
		source = '',
		byline = '',
		note = '',
		dataDownloadButton = true,
		filename = '',
		data = undefined,
		imageDownloadButton = true,
		chartHeight = 'h-60',
		overrideClass = '',
		chartWidth = 'w-full',
		alignMultiple = false,
		chartDescription = '',
		controls,
		legend,
		children,
		description
	}: Props = $props();

	let chartClass = $derived(
		classNames('relative', chartHeight, overrideClass, alignMultiple ? 'min-w-0' : '')
	);
	let classes = $derived(
		classNames(chartWidth, alignMultiple ? 'contents not-prose' : 'flex flex-col not-prose')
	);
</script>

<div class={classes} bind:this={chartToCapture} id="captureElement">
	{#if alt}
		<p class="sr-only">{alt}</p>
	{/if}

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

	<!-- any controls to be displayed below the title and subTitle, but above the chart itself -->
	{@render controls?.()}

	<!-- separate slot for legend, so that main chart can be aligned if legends wrap over different number of lines-->
	{@render legend?.()}

	<!-- Visualisation goes here -->
	<div class={chartClass}>
		{@render children?.()}
	</div>

	<!-- long description for screen readers -->
	{@render description?.()}

	{#if source || byline || note || chartDescription || dataDownloadButton || imageDownloadButton}
		<Footer {source} {byline} {note} {chartDescription}>
			{#snippet exportBtns()}
				<ExportBtns
					{chartToCapture}
					{filename}
					dataForDownload={data}
					{dataDownloadButton}
					{imageDownloadButton}
				/>
			{/snippet}
		</Footer>
	{/if}
</div>
