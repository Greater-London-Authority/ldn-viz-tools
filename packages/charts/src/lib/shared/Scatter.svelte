<script lang="ts">
	import type { LayerCake } from 'layercake';
	import { getContext } from 'svelte';

	const { data, xGet, yGet, xScale, yScale } = getContext<LayerCake>('LayerCake');

	export let r = 5;
	export let fill = '#0cf';
	export let stroke = '#000';
	export let strokeWidth = 0;
</script>

<g class="scatter-group">
	{#each $data as d}
		<circle
			cx={$xGet(d) + ($xScale.bandwidth ? $xScale.bandwidth() / 2 : 0)}
			cy={$yGet(d) + ($yScale.bandwidth ? $yScale.bandwidth() / 2 : 0)}
			{r}
			{fill}
			{stroke}
			stroke-width={strokeWidth}
		/>
	{/each}
</g>
