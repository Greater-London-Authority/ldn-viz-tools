<script lang="ts">
	import Line from '../shared/Line.svelte';
	import Scatter from '../shared/Scatter.svelte';

	import Chart from '../shared/Chart.svelte';

	export let data: { [key: string]: any }[];
	export let title: string | null = null;
	export let subTitle: string | null = null;
	export let alt: string | null = null;
	export let footer = false;
	export let exportBtns = false;
	export let x = 'x';
	export let y = 'y';
	export let xDomain: any[] = [0, null];
	export let yDomain: any[] = [0, null];
	export let yScale: ((x: any) => number | undefined) | undefined = undefined;

	export let xAxis: { [key: string]: any } = { display: true };
	export let yAxis: { [key: string]: any } = { display: true };
	export let markOptions: { [key: string]: any } = {};

	// all other layercake props accepted with ...$$restProps rtm
	let padding = { left: 50, bottom: 0 };

	export let showLine = false;
</script>

<Chart
	{data}
	{x}
	{y}
	{yScale}
	{xDomain}
	{yDomain}
	{padding}
	{...$$restProps}
	let:aspectRatio
	let:containerHeight
	let:containerWidth
	let:height
	let:width
	let:element
	{title}
	{subTitle}
	{alt}
	{footer}
	{exportBtns}
	{...$$restProps}
>
	<Scatter {...markOptions} />

	{#if showLine}
		<Line {...markOptions} />
	{/if}
</Chart>
