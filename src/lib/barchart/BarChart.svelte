<script lang="ts">
	import * as d3 from 'd3';
	import AxisX from '../shared/AxisX.svelte';
	import AxisY from '../shared/AxisY.svelte';
	import Title from '../shared/Title.svelte';
	import Tooltip from '../shared/Tooltip.svelte';

	export let data: { [key: string]: any }[];
	export let xKey: string = 'x';
	export let yKey: string = 'y';

	export let title: string | null = null;
	export let alt: string | null = null;

	export let width = 400;
	export let height = 400;

	export let fill: string = '#6DA7DE';
	export let stroke: string = '#18446C';

	const margin = { top: 20, right: 40, left: 0, bottom: 20 };

	$: extentX = d3.extent(data, (d) => d[xKey]);
	$: extentY = d3.extent(data, (d) => d[yKey]);

	$: console.log(extentX);
	$: barWidth = width / data.length;

	$: xScale = d3
		.scaleLinear()
		.domain([0, data.length])
		.nice()
		.range([margin.left, width - margin.right]);

	$: yScale = d3
		.scaleLinear()
		.domain(extentY as number[])
		.range([height - margin.top - margin.bottom, 0]);

	let hoveredData: { [key: string]: any } | null;
	$: console.log(hoveredData);
</script>

<div
	class="chart-container"
	bind:clientWidth={width}
	on:mouseleave={() => {
		hoveredData = null;
	}}
>
	{#if title}
		<Title>{title}</Title>
	{/if}
	{#if alt}
		<h5 class="sr-only">{alt}</h5>
	{/if}
	<svg {width} {height}>
		<AxisX {height} {xScale} {margin} />
		<AxisY {width} {yScale} {margin} />

		<g class="bar">
			{#each data as d, i}
				<rect
					x={xScale(i)}
					y={yScale(d[yKey])}
					width={barWidth - 10}
					height={yScale(0) - yScale(d[yKey])}
					{fill}
					{stroke}
					on:mouseover={() => {
						hoveredData = d;
					}}
					on:focus={() => {
						hoveredData = d;
					}}
				/>
			{/each}
		</g>
	</svg>
	{#if hoveredData}
		<Tooltip data={hoveredData} {xScale} {yScale} {xKey} {yKey} />
	{/if}
</div>
