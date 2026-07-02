<script module lang="ts">
	/**
	 * The `ObservablePlotInner` component allows the rendering of visualisations using the [Observable Plot](https://observablehq.com/plot/) library.
	 * It does *not* apply the  [ChartContainer](./?path=/docs/charts-components-chartcontainer--documentation) as a wrapper:
	 * if you require this, use the [ObservablePlot](./?path=/docs/charts-components-observableplot--documentation) component instead.
	 *
	 * **Note**: if you use this instead of the `ObservablePlot` component, ensure you add a description of the chart somewhere on the page with an `id` equal to the value of `ariaDescribedBy` for screen reader use.
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
		return (index: any, scales: any, values: any, dimensions: any, context: any, next: any) => {
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

	import { onMount, setContext } from 'svelte';
	import { derived, writable, type Writable } from 'svelte/store';

	interface Props {
		/**
		 * The Observable Plot specification for the visualization.
		 */
		spec: any;
		/**
		 * Data being visualized (as an array of objects), to be used by custom tooltips.
		 */
		data?: { [key: string]: any }[];
		/**
		 * Provides a way to access the DOM node into which the visualization is rendered.
		 */
		domNode?: any;
		/**
		 * A store that stores details of the moused-over point.
		 * Used for custom tooltips.
		 */
		tooltipStore?: Writable<{ [key: string]: any }>;
		/** A y-offset between data points and tooltips (pixels). */
		tooltipOffset?: any;
		/**
		 * If `false`, then use the `Plot.plot` function provided by Observable Plot (rather than the wrapper provided by `@ldn-viz`),
		 * so that default chart-level styling is not applied.
		 */
		applyDefaults?: boolean;
		/**
		 * If `false`, screen readers will dictate the content of the charts, which is largely undesirable.
		 * Instead ensure the title and subtitle of the chart and/or surrounding text explains the key takeaways.
		 */
		ariaHidden?: boolean;
		/**
		 * This should be the ID for the simple plain text description of the chart. Defaults to empty string.
		 */
		ariaDescribedBy?: string;
		/**
		 * Defaults to randomly generated id passed in by `ObservablePlot`
		 */
		id: any;
		tooltip?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		spec = $bindable(),
		data = [],
		domNode = $bindable(undefined),
		tooltipStore = writable<Position>(),
		tooltipOffset = -16,
		applyDefaults = true,
		ariaHidden = true,
		ariaDescribedBy = '',
		id,
		tooltip,
		...rest
	}: Props = $props();

	const renderPlot = (node: HTMLDivElement) => {
		node.innerHTML = '';

		if (applyDefaults) {
			node.appendChild(Plot.plot(spec));
		} else {
			node.appendChild(ObservablePlot.plot(spec));
		}
	};

	let width = $state(0);

	onMount(() => {
		// updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => {
			window.removeEventListener('resize', updateDimensions);
		};
	});

	/*
	afterUpdate(() => {
		updateDimensions();
	});
	*/

	const updateDimensions = () => {
		if (spec && spec.width !== width) {
			spec.width = width;

			// the #key block is no longer triggering a re-render when spec.width changes
			renderPlot(domNode);
		}
	};

	$effect(() => {
		if (width) {
			updateDimensions();
		}
	});

	// svelte-ignore state_referenced_locally
	const tooltipData = derived(tooltipStore, ($tooltipStore) =>
		$tooltipStore ? data[$tooltipStore.index] : undefined
	);
	setContext('tooltipData', tooltipData);
</script>

{#key spec}
	<div
		use:renderPlot
		{...rest}
		bind:this={domNode}
		bind:clientWidth={width}
		aria-hidden={ariaHidden}
		aria-describedby={ariaDescribedBy}
		{id}
		class="themed-chart"
	></div>

	<!-- IMPORTANT TODO: data prop and exportData prop for buttons - align usage-->
	{#if $tooltipStore && $tooltipData}
		<div
			class="absolute z-50 max-w-[200px] -translate-x-1/2 -translate-y-full bg-color-container p-2 text-sm shadow"
			style:top={`${$tooltipStore.layerY + tooltipOffset}px`}
			style:left={`${$tooltipStore.layerX}px`}
		>
			{#if tooltip}{@render tooltip()}{:else}
				<pre>{JSON.stringify(data[$tooltipStore.index], null, 2)}</pre>
			{/if}

			<div class="absolute inset-x-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-color-container"></div>
		</div>
	{/if}
{/key}

<style>
	:global(.themed-chart svg) {
		--plot-background: var(--color-chart-background) !important;
	}
	:global(.themed-chart [aria-label='tip']) {
		stroke: var(--color-border-muted) !important;
	}
</style>
