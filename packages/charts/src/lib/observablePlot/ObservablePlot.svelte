<script lang="ts">
	/**
	 * The `ObservablePlot` component allows the rendering of visualisations using the [Observable Plot](https://observablehq.com/plot/) library, wrapping an `ObservablePlotInner` component in a [ChartContainer](./?path=/docs/charts-components-chartcontainer--documentation) wrapper.
	 * If you do not require the extra chrome applied by the `ChartContainer`, or need to include several plots in the same container, then use the [ObservablePlotInner](./?path=/docs/charts-components-observableplotinner--documentation) component directly.
	 * @component
	 */

	import type { Position } from './types.ts';

	import { randomId } from '@ldn-viz/ui';
	import { writable } from 'svelte/store';
	import ChartContainer from '../chartContainer/ChartContainer.svelte';
	import ObservablePlotInner from './ObservablePlotInner.svelte';

	interface Props {
		/**
		 * The Observable Plot specification for the visualization.
		 */
		spec: any;
		/**
		 * Data being visualized (as an array of objects), to be used by data download button.
		 */
		data?: { [key: string]: any }[];
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
		 * Tailwind width class passed to Chart Container.
		 */
		chartWidth?: string;
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
		 * Image Download Button in the footer
		 *
		 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
		 * Set to false to hide completely.
		 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'
		 *
		 */
		imageDownloadButton?: true | false | ('PNG' | 'SVG')[];
		/**
		 * The file name to be used for the downloaded data or image file.
		 */
		filename?: string;
		/**
		 * Provides a way to access the DOM node into which the visualization is rendered.
		 */
		domNode?: any;
		/**
		 * A store that stores details of the moused-over point.
		 * Used for custom tooltips.
		 */
		tooltipStore?: any;
		/** A y-offset between data points and tooltips (pixels). */
		tooltipOffset?: any;
		/**
		 * If `false`, then use the `Plot.plot` function provided by Observable Plot (rather than the wrapper provided by `@ldn-viz`),
		 * so that default chart-level styling is not applied.
		 */
		applyDefaults?: boolean;
		/**
		 * Value set as the `id` attribute of the chart, for use in description (defaults to randomly generated value).
		 */
		id?: any;
		/**
		 * Detailed description of the chart for use by screen readers and in a modal for sighted users.
		 */
		chartDescription?: string;
		/**
		 * Defaults to `true` inside `ObservablePlotInner` but exposed here in case you want to change to `false`.
		 * If `false`, screen readers will dictate the content of the charts, which is largely undesirable.
		 * Instead ensure the title, subtitle and chartDescription of the chart and/or surrounding text explains the key takeaways.
		 */
		ariaHidden?: boolean;
		controls?: import('svelte').Snippet;
		tooltip?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		spec,
		data = [],
		title = '',
		subTitle = '',
		alt = '',
		chartWidth = '',
		source = '',
		byline = '',
		note = '',
		dataDownloadButton = true,
		imageDownloadButton = true,
		filename = '',
		domNode = undefined,
		tooltipStore = writable<Position>(),
		tooltipOffset = -16,
		applyDefaults = true,
		id = randomId(),
		chartDescription = '',
		ariaHidden = true,
		controls,
		tooltip,
		...rest
	}: Props = $props();

	const tooltip_render = $derived(tooltip);
</script>

{#key spec}
	<ChartContainer
		{data}
		{title}
		{subTitle}
		{alt}
		{source}
		{note}
		{byline}
		{dataDownloadButton}
		{imageDownloadButton}
		{filename}
		{...rest}
		chartHeight={'h-fit'}
		{chartWidth}
		{chartDescription}
	>
		<!-- any controls to be displayed below the title and subTitle, but above the chart itself -->
		{@render controls?.()}

		<ObservablePlotInner
			{data}
			{domNode}
			{tooltipStore}
			{tooltipOffset}
			{spec}
			{applyDefaults}
			{ariaHidden}
			ariaDescribedBy="{id}-description"
			{id}
		>
			{#snippet tooltip()}
				{@render tooltip_render?.()}
			{/snippet}
		</ObservablePlotInner>

		{#snippet description()}
			<p class="sr-only" id="{id}-description">
				{chartDescription}
			</p>
		{/snippet}
	</ChartContainer>
{/key}

<style>
	:global(.defaultColorLegendLabel-swatch) {
		font-size: 1rem;
	}
</style>
