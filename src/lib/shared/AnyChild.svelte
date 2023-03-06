<script lang="ts">
	import { getChartContext } from '../chartContainer/ChartContainer.svelte';

	const { data, xScale, yScale } = getChartContext();
</script>

<g>
	{#each data as d}
		<circle
			cx={xScale(d.value)}
			cy={yScale(d.value)}
			r={'10'}
			fill="purple"
			stroke="black"
			tabIndex="0"
		/>
	{/each}
</g>
