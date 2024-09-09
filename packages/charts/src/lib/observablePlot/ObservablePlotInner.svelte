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
				x: values.channels.x.value[i],
				y: values.channels.y.value[i]
			};

			marks[i].addEventListener(eventName, (ev: any) => eventHandler(ev, d));
		}
	};
</script>

<script lang="ts">
	import * as Plot from '@observablehq/plot';

	import { afterUpdate, onMount, setContext } from 'svelte';
	import { derived, writable } from 'svelte/store';

	/**
	 * The Observable Plot specification for the visualization.
	 */
	export let spec;

	/**
	 * Data being visualized (as an array of objects), to be used by data download button.
	 */
	export let data: { [key: string]: any }[] = [];

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
