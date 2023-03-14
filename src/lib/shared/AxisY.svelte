<script lang="ts">
	import { getChartContext } from '../chartContainer/ChartContainer.svelte';

	const { chartWidth, yScale } = getChartContext();

	let yTicks = yScale.ticks(5);
	// Props (from work in observable)
	// 	label:
	// 	grid:
	// 	tickFormat:
	//  ticks
</script>

<g class="axis y-axis">
	{#each yTicks as tick}
		<text x="0" y={yScale(tick)} dy="-6" fill="black">{tick}</text>
		<line x1="0" y1={yScale(tick)} x2={$chartWidth} y2={yScale(tick)} stroke="#eaeaea" />
	{/each}
</g>
