<script context="module" lang="ts">
	/**
	 * The `ObservablePlot` component allows the rendering of visualisations using the [Observable Plot](https://observablehq.com/plot/) library, wrapped in a [ChartContainer](./?path=/docs/charts-chartcontainer--documentation) wrapper.
	 *  @component
	 */

	export const addClick =
		(posStore, markShape = 'circle') =>
		(index, scales, values, dimensions, context, next) => {
			const el = next(index, scales, values, dimensions, context);
			const marks = el.querySelectorAll(markShape);
			for (let i = 0; i < marks.length; i++) {
				const d = { index: index[i], x: values.channels.x.value[i], y: values.channels.y.value[i] };
				marks[i].addEventListener('mouseenter', (ev) => {
					posStore.set({
						...d,
						clientX: ev.clientX,
						clientY: ev.clientY,
						pageX: ev.pageX,
						pageY: ev.pageY,
						layerX: ev.layerX,
						layerY: ev.layerY
					}); // can't use the $store syntax here
				});

				marks[i].addEventListener('mouseleave', () => {
					posStore.set(undefined);
				});
			}
			return el;
		};
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { derived, writable } from 'svelte/store';

	import * as Plot from '@observablehq/plot';
	import ChartContainer from '../chartContainer/ChartContainer.svelte';

	/**
	 * The Observable Plot specification for the visualization.
	 */
	export let spec;

	export let responsiveWidth = false;

	/**
	 * Data being visualized (as an array of objects), to be used by data download button.
	 */
	export let data = [];

	/**
	 * Title that is displayed in large text above the plot.
	 */
	export let title;

	/**
	 * Subtitle that is displayed below the title, but above the plot.
	 */
	export let subTitle;

	/**
	 * Alt-text for the plot.
	 */
	export let alt;

	/**
	 * Object specifying what appears in the footer:
	 *
	 * * `byline` (string) - statement of who created the visualization
	 * * `source` (string) - statement of where the data came from
	 * * `note` (string) - any additional footnotes
	 * * `exportBtns` (boolean) - if `false`, then data/image download buttons will be hidden
	 */
	export let footer;

	/**
	 * Provides a way to access the DOM node into which the visualization is rendered.
	 */
	export let domNode;

	/**
	 * A store that stores details of the moused-over point.
	 * Used for custom tooltips.
	 */
	export let tooltipStore = writable();

	/** A y-offset between data points and tooltips (pixels). */
	export let tooltipOffset = -16;

	const renderPlot = (node) => node.appendChild(Plot.plot(spec));
	let width: number;
	let height: number;
	let dimensions = { height: 0, width: 0 };
	let updateDimensions;
	$: {
		clearTimeout(updateDimensions);
		updateDimensions = setTimeout(() => {
			dimensions = { height, width };
		}, 200);
	}

	$: {
		if (responsiveWidth) {
			spec.width = dimensions.width;
		}
	}

	const tooltipData = derived(tooltipStore, ($tooltipStore) =>
		$tooltipStore ? data[$tooltipStore.index] : undefined
	);
	setContext('tooltipData', tooltipData);
</script>

{#key spec}
	<ChartContainer
		{data}
		{title}
		{subTitle}
		{alt}
		{footer}
		{...$$restProps}
		chartHeight={'h-fit'}
	>
		<div
			use:renderPlot
			{...$$restProps}
			bind:this={domNode}
			bind:clientWidth={width}
			bind:clientHeight={height}
		/>

		<!-- todo: pass to slot data[i] -->
		{#if $tooltipStore && $tooltipData}
			<div
				class="absolute max-w-[200px] text-xs text-center p-2 bg-core-grey-100 text-core-grey-700 dark:bg-core-grey-700 dark:text-core-grey-50 shadow-md -translate-x-1/2 -translate-y-full z-50"
				style:top={`${$tooltipStore.layerY + tooltipOffset}px`}
				style:left={`${$tooltipStore.layerX}px`}
			>
				<slot name="tooltip">
					<pre>{JSON.stringify(data[$tooltipStore.index], null, 2)}</pre>
				</slot>
			</div>
		{/if}
	</ChartContainer>
{/key}

<style>
	:global(.defaultCcolorLegendLabel-swatch) {
		font-size: 20px;
	}
</style>
