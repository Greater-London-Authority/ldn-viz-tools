<script context="module" lang="ts">
	/**
	 * The `ObservablePlot` component allows the rendering of visualisations using the [Observable Plot](https://observablehq.com/plot/) library, wrapped in a [ChartContainer](./?path=/docs/charts-chartcontainer--documentation) wrapper.
	 *  @component
	 */

	import type {
		AddEventHandlerFunction,
		AddEventHandlerInnerFunction,
		Position,
		RegisterTooltipFunction
	} from './types.ts';

	export const registerTooltip: RegisterTooltipFunction =
		(posStore, markShape = 'circle') =>
		(index, scales, values, dimensions, context, next) => {
			const el = next && next(index, scales, values, dimensions, context);
			const marks = el?.querySelectorAll(markShape) || [];

			addEventHandlerInner(
				'mouseenter',
				(ev: MouseEvent, d: any) => {
					posStore.set({
						...d,
						clientX: ev.clientX,
						clientY: ev.clientY,
						pageX: ev.pageX,
						pageY: ev.pageY,
						layerX: ev.layerX,
						layerY: ev.layerY
					}); // can't use the $store syntax here
				},
				marks,
				values,
				index
			);

			addEventHandlerInner(
				'mouseleave',
				() => {
					posStore.set(undefined); // can't use the $store syntax here
				},
				marks,
				values,
				index
			);

			return el ?? null;
		};

	export const addEventHandler: AddEventHandlerFunction =
		(eventName, eventHandler, markShape = 'circle') =>
		(index, scales, values, dimensions, context, next) => {
			const el = next && next(index, scales, values, dimensions, context);
			const marks = el?.querySelectorAll(markShape) || [];

			addEventHandlerInner(eventName, eventHandler, marks, values, index);

			return el ?? null;
		};

	const addEventHandlerInner: AddEventHandlerInnerFunction = (
		eventName,
		eventHandler,
		marks,
		values,
		index
	) => {
		for (let i = 0; i < marks.length; i++) {
			const d = {
				index: index[i],

				x: values.channels.x?.value[i],
				x1: values.channels.x1?.value[i],
				x2: values.channels.x2?.value[i],
				cx: values.channels.cx?.value[i],
				
				y: values.channels.y?.value[i],
				y1: values.channels.y1?.value[i],
				y2: values.channels.y2?.value[i],
				cy: values.channels.cy?.value[i],
			};

			marks[i].addEventListener(eventName, (ev: any) => eventHandler(ev, d));
		}
	};
</script>

<script lang="ts">
	import { afterUpdate, onMount, setContext } from 'svelte';
	import { derived, writable } from 'svelte/store';

	import * as Plot from '@observablehq/plot';
	import ChartContainer from '../chartContainer/ChartContainer.svelte';

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

	const renderPlot = (node: HTMLDivElement) => {
		node.appendChild(Plot.plot(spec));
	};

	let width: number;

	onMount(() => {
		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => {
			window.removeEventListener('resize', updateDimensions);
		};
	});

	afterUpdate(() => {
		updateDimensions();
	});

	const updateDimensions = () => {
		spec.width = width;
	};

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
		{source}
		{note}
		{byline}
		{dataDownloadButton}
		{imageDownloadButton}
		{...$$restProps}
		chartHeight={'h-fit'}
		{chartWidth}
	>
		<div use:renderPlot {...$$restProps} bind:this={domNode} bind:clientWidth={width} />

		<!-- IMPORTANT TODO: data prop and exportData prop for buttons - align usage-->
		{#if $tooltipStore && $tooltipData}
			<div
				class="absolute max-w-[200px] text-sm p-2 bg-color-container-level-1 shadow z-50 -translate-x-1/2 -translate-y-full"
				style:top={`${$tooltipStore.layerY + tooltipOffset}px`}
				style:left={`${$tooltipStore.layerX}px`}
			>
				<slot name="tooltip">
					<pre>{JSON.stringify(data[$tooltipStore.index], null, 2)}</pre>
				</slot>

				<div
					class="absolute bg-color-container-level-1 rotate-45 w-4 h-4 -translate-x-1/2 inset-x-1/2"
				/>
			</div>
		{/if}
	</ChartContainer>
{/key}

<style>
	:global(.defaultColorLegendLabel-swatch) {
		font-size: 1rem;
	}
</style>
