<script lang="ts">
	export let width: number;
	export let yScale: any;
	export let margin: { [key: string]: number };
	let yTicks = yScale.ticks(5);
</script>

<g transform="translate({margin.left} {margin.top})">
	{#each yTicks as tick}
		<text x="0" y={yScale(tick)} dy="-6" fill="black">{tick} {tick === 60 ? ' label' : ''}</text>
		<line x1="0" y1={yScale(tick)} x2={width} y2={yScale(tick)} stroke="#eaeaea" />
	{/each}
</g>
