<script context="module">
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

	export let spec;

	export let responsiveWidth = false;

	export let data = []; // for downlaod button only

	// for container
	export let title;
	export let subTitle;
	export let alt;
	export let footer;
	export let exportBtns;

	export let domNode;

	export let tooltipStore = writable();

	/** A y-offset from the hover point, in pixels. */
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
		{exportBtns}
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
