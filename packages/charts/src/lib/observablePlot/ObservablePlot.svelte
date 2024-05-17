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
				(ev: MouseEvent, d) => {
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
				(ev: MouseEvent, d) => {
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
				x: values.channels.x.value[i],
				y: values.channels.y.value[i]
			};

			marks[i].addEventListener(eventName, (ev: any) => eventHandler(ev, d));
		}
	};
</script>

<script lang="ts">
	import { onMount, setContext } from 'svelte';
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
	export let data: any[] = [];

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
		| {
				byline?: string | undefined;
				source?: string | undefined;
				note?: string | undefined;
				exportBtns: boolean;
		  }
		| undefined = undefined;

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

	const updateDimensions = () => {
		spec.width = width;
	};

	const tooltipData = derived(tooltipStore, ($tooltipStore) =>
		$tooltipStore ? data[$tooltipStore.index] : undefined
	);
	setContext('tooltipData', tooltipData);
</script>

{#key spec}
	<ChartContainer {data} {title} {subTitle} {alt} {footer} {...$$restProps} chartHeight={'h-fit'}>
		<div use:renderPlot {...$$restProps} bind:this={domNode} bind:clientWidth={width} />

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
		font-size: 14px;
	}
</style>
