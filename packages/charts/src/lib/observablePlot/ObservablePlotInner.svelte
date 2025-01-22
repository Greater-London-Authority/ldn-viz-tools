<script context="module" lang="ts">
	/**
	 * The `ObservablePlotInner` component allows the rendering of visualisations using the [Observable Plot](https://observablehq.com/plot/) library.
	 * It does *not* apply the  [ChartContainer](./?path=/docs/charts-chartcontainer--documentation) as a wrapper:
	 * if you require this, use the [ObservablePlot](./?path=/docs/charts-observableplot--documentation) component instead.
	 *  @component
	 */

	import type {
		AddEventHandlerFunction,
		AddEventHandlerInnerFunction,
		EventHandler,
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

	export const addMultipleEventHandlers = (events: EventHandler[]) => {
		return (index, scales, values, dimensions, context, next) => {
			const el = next && next(index, scales, values, dimensions, context);

			for (const event of events) {
				const marks = el?.querySelectorAll(event.markShape ?? 'rect') || [];

				if (event.type === 'tooltip') {
					const mouseEnterHandler = (ev: MouseEvent, d: any) => {
						event.store.set({
							...d,
							clientX: ev.clientX,
							clientY: ev.clientY,
							pageX: ev.pageX,
							pageY: ev.pageY,
							layerX: ev.layerX,
							layerY: ev.layerY
						}); // can't use the $store syntax here
					};
					addEventHandlerInner('mouseenter', mouseEnterHandler, marks, values, index);
					const mouseMoveHandler = (ev: MouseEvent, d: any) => {
						event.store.set({
							...d,
							clientX: ev.clientX,
							clientY: ev.clientY,
							pageX: ev.pageX,
							pageY: ev.pageY,
							layerX: ev.layerX,
							layerY: ev.layerY
						}); // can't use the $store syntax here
					};
					addEventHandlerInner('mousemove', mouseMoveHandler, marks, values, index);

					const mouseLeaveHandler = () => {
						event.store.set(undefined);
					};
					addEventHandlerInner('mouseout', mouseLeaveHandler, marks, values, index);
				} else {
					addEventHandlerInner(event.type, event.handler, marks, values, index);
				}
			}

			return el ?? null;
		};
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
				cy: values.channels.cy?.value[i]
			};

			marks[i].addEventListener(eventName, (ev: any) => eventHandler(ev, d));
		}
	};
</script>

<script lang="ts">
	import * as ObservablePlot from '@observablehq/plot';
	import * as Plot from '../observablePlotFragments/plot';

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

	/**
	 * If `false`, then use the `Plot.plot` function provided by Observable Plot (rather than the wrapper provided by `@ldn-viz`),
	 * so that default chart-level styling is not applied.
	 */
	export let applyDefaults = true;

	/**
	 * If `false`, screen readers will dictate the content of the charts, which is largely undesirable.
	 * Instead ensure the title and subtitle of the chart and/or surrounding text explains the key takeaways.
	 */
	export let ariaHidden = true;

	/**
	 * This should be the ID for the simple plain text description of the chart. Defaults to empty string.
	 */
	export let ariaDescribedBy = '';

	const renderPlot = (node: HTMLDivElement) => {
		if (applyDefaults) {
			node.appendChild(Plot.plot(spec));
		} else {
			node.appendChild(ObservablePlot.plot(spec));
		}
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
		if (spec.width !== width) {
			spec.width = width;
		}
	};

	const tooltipData = derived(tooltipStore, ($tooltipStore) =>
		$tooltipStore ? data[$tooltipStore.index] : undefined
	);
	setContext('tooltipData', tooltipData);
</script>

{#key spec}
	<div
		use:renderPlot
		{...$$restProps}
		bind:this={domNode}
		bind:clientWidth={width}
		aria-hidden={ariaHidden}
		aria-describedby={ariaDescribedBy}
	/>

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
{/key}
