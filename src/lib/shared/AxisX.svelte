<script lang="ts">
	export let height: number;
	export let xScale: any;
	export let margin: { [key: string]: number };
	let xTicks = xScale.ticks(5);
</script>

<g>
	{#each xTicks as tick}
		<text
			x={xScale(tick)}
			y={height - margin.bottom}
			dominant-baseline="hanging"
			dy="6"
			fill="black">{tick}</text
		>
	{/each}
</g>
