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

	<svg viewBox={`0 0 ${width} ${height + 30}`} class="max-w-3xl">
		{#each scale.domain() as val, i}
			<rect
				x={(width * i) / scale.domain().length}
				width={width / scale.domain().length}
				y={0}
				{height}
				fill={scale(val)}
			/>
			<text
				x={(width * (i + 0.5)) / scale.domain().length}
				y={height + 20}
				text-anchor="middle"
				class="select-none"
			>
				{val}
			</text>
		{/each}
	</svg>
</div>
