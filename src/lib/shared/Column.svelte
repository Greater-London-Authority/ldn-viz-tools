<script lang="ts">
	import { getChartContext } from '../chartContainer/ChartContainer.svelte';

	const { data, xScale, yScale, width } = getChartContext();
</script>

<g>
	{#each data as d, i}
		<rect
			x={xScale(d.value)}
			y={yScale(d.value)}
			width={$width / data.length - 20}
			height={d.value}
			fill="red"
		/>
	{/each}
</g>
