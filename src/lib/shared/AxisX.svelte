<script lang="ts">
	import { getChartContext } from '../chartContainer/ChartContainer.svelte';

	const { height, chartHeight, xScale } = getChartContext();

	let xTicks = xScale.ticks(5);
</script>

<g class="axis x-axis" transform="translate(0, {$chartHeight})">
	{#each xTicks as tick}
		<text x={xScale(tick)} y={height} dominant-baseline="hanging" dy="6" fill="black">{tick}</text>
	{/each}
</g>
