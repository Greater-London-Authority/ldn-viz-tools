<script context="module" lang="ts">
	/**
	 * The `ObservablePlot` component allows the rendering of visualisations using the [Observable Plot](https://observablehq.com/plot/) library, wrapping an `ObservablePlotInner` component in a [ChartContainer](./?path=/docs/charts-chartcontainer--documentation) wrapper.
	 *  @component
	 */
</script>

<script lang="ts">
	import type { Position } from './types.ts';

	import { writable } from 'svelte/store';
	import ChartContainer from '../chartContainer/ChartContainer.svelte';
	import ObservablePlotInner from './ObservablePlotInner.svelte';

	/**
	 * The Observable Plot specification for the visualization.
	 */
	export let spec;

	/**
	 * Data being visualized (as an array of objects), to be used by data download button.
	 */
	export let data: { [key: string]: any }[] = [];

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
	 * Tailwind width class passed to Chart Container.
	 */
	export let chartWidth = '';

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
	 * Image Download Button in the footer
	 *
	 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
	 * Set to false to hide completely.
	 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'
	 *
	 */
	export let imageDownloadButton: true | false | ('PNG' | 'SVG')[] = true;

	/**
	 * Provides a way to access the DOM node into which the visualization is rendered.
	 */
	export let domNode: any = undefined;

	/**
	 * A store that stores details of the moused-over point.
	 * Used for custom tooltips.
	 */
	export let tooltipStore = writable<Position>();

	/** A y-offset between data points and tooltips (pixels). */
	export let tooltipOffset = -16;
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
		{...$$restProps}
		chartHeight={'h-fit'}
		{chartWidth}
	>
		<ObservablePlotInner {data} {domNode} {tooltipStore} {tooltipOffset} {spec} />
	</ChartContainer>
{/key}

<style>
	:global(.defaultColorLegendLabel-swatch) {
		font-size: 1rem;
	}
</style>
