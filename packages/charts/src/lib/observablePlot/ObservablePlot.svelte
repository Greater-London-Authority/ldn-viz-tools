<script context="module" lang="ts">
	import type { AddClickFunction, Position } from './types.ts';

	export const addClick: AddClickFunction =
		(posStore, markShape = 'circle') =>
		(index, scales, values, dimensions, context, next) => {
			const el = next && next(index, scales, values, dimensions, context);
			const marks = el?.querySelectorAll(markShape) || [];
			for (let i = 0; i < marks.length; i++) {
				const d = {
					index: index[i],
					x: values.channels.x.value[i],
					y: values.channels.y.value[i]
				};
				marks[i].addEventListener('mouseenter', (ev: any) => {
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
			return el ?? null;
		};
</script>

<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { derived, writable } from 'svelte/store';

	import * as Plot from '@observablehq/plot';
	import ChartContainer from '../chartContainer/ChartContainer.svelte';

	export let spec;

	export let data: any = []; // for download button only

	// for container
	export let title: string | undefined = undefined;
	export let subTitle: string | undefined = undefined;
	export let alt: string | undefined = undefined;
	export let footer:
		| {
				byline?: string | undefined;
				source?: string | undefined;
				note?: string | undefined;
				exportBtns: boolean;
		  }
		| undefined = undefined;

	export let domNode: any = undefined;

	export let tooltipStore = writable<Position>();

	/** A y-offset from the hover point, in pixels. */
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
