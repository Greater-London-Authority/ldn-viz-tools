<script lang="ts">
	import { getChartContext } from '../chartContainer/ChartContainer.svelte';

	const { width, height, yScale } = getChartContext();

	let yTicks = yScale.ticks(5);
</script>

<g class="axis y-axis">
	{#each yTicks as tick}
		<text x="0" y={yScale(tick)} dy="-6" fill="black">{tick}</text>
		<line x1="0" y1={yScale(tick)} x2={$width} y2={yScale(tick)} stroke="#eaeaea" />
	{/each}
</g>
