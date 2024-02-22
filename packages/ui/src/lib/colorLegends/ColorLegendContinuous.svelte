<script lang="ts">
	import { scaleLinear, type ScaleLinear } from 'd3-scale';

	export let scale: ScaleLinear<number, string>;
	export let title = '';

	const width = 600;
	const height = 20;

	let xScale: ScaleLinear<number, number>;
	$: xScale = scaleLinear().range([0, width]).domain(scale.domain());
</script>

<div class="flex flex-col items-center gap-2">
	{#if title}<p class="font-bold">{title}</p>{/if}

	<svg viewBox={`-10 0 ${width + 25} ${height + 30}`} class="max-w-3xl">
		<defs>
			<linearGradient id="linear-gradient">
				{#each [...Array(width)].map((d, i) => i) as x}
					<stop offset={`${(100 * x) / width}%`} stop-color={scale(xScale.invert(x))} />
				{/each}
			</linearGradient>
		</defs>

		<rect x={0} {width} y={0} {height} fill="url(#linear-gradient)" />

		{#each scale.ticks() as val}
			{@const x = xScale(val)}

			<line x1={x} x2={x} y1={height} y2={height + 5} stroke="black" />
			<text {x} y={height + 20} text-anchor="middle" class="select-none">
				{val}
			</text>
		{/each}
	</svg>
</div>
