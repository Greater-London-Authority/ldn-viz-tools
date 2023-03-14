<script lang="ts">
	import { getChartContext } from '../chartContainer/ChartContainer.svelte';

	const { data, xScale, yScale, chartWidth } = getChartContext();
</script>

<!-- {$chartWidth} -->

<!-- <div style={`width: ${chartWidth}`} class="h-20 bg-slate-600" /> -->

<g>
	{#each data as d, i}
		<rect x={xScale(d.value)} y={yScale(d.value)} width={$chartWidth} height={d.value} fill="red" />
	{/each}
</g>
