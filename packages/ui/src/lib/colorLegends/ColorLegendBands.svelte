<script lang="ts">
	import { scaleLinear, type ScaleLinear } from 'd3-scale';

	export let scale;
	export let title = '';
	export let highlightedValue: number | undefined = undefined;
	export let leftLabel = '';
	export let rightLabel = '';

	export let minVal: number | undefined;
	export let maxVal: number | undefined;

	const width = 600;
	const height = 20;

	let domain: number[];
	$: domain = scale.domain();

	// domain.slice(-1)[0]
	// [domain[0]

	let xScale: ScaleLinear<number, number>;
	$: xScale = scaleLinear()
		.range([0, width])
		.domain([minVal ?? domain[0], maxVal ?? domain.slice(-1)[0]]);

	$: console.log('xScale:', xScale.range(), xScale.domain());
</script>

<div class="flex flex-col items-center gap-2">
	{#if title}<p class="font-bold">{title}</p>{/if}

	<svg viewBox={`-10 0 ${width + 25} ${height + 45}`} class="max-w-3xl">
		{#if minVal}
			{@const startX = xScale(minVal ?? domain[0])}
			<rect x={startX} width={xScale(domain[0]) - startX} y={0} {height} fill={scale(minVal)} />
		{/if}

		{#each domain as val, i}
			{#if i === domain.length - 1}
				{@const endX = xScale(maxVal ?? domain[i + 1])}
				<rect
					x={xScale(domain[i])}
					width={endX - xScale(domain[i])}
					y={0}
					{height}
					fill={scale(val)}
				/>
			{:else}
				<rect
					x={xScale(domain[i])}
					width={xScale(domain[i + 1]) - xScale(domain[i])}
					y={0}
					{height}
					fill={scale(val)}
				/>
			{/if}
		{/each}

		{#each domain as val}
			{@const x = xScale(val)}

			<line x1={x} x2={x} y1={height} y2={height + 5} stroke="black" />
			<text {x} y={height + 20} text-anchor="middle" class="select-none">
				{val}
			</text>
		{/each}

		<text x={0} y={height + 20 + 20} text-anchor="start" font-size="20px">
			{leftLabel}
		</text>

		<text x={width} y={height + 20 + 20} text-anchor="end" font-size="20px">
			{rightLabel}
		</text>

		{#if highlightedValue}
			<g transform={`translate(${xScale(highlightedValue)}, ${height + 20} ) scale(20) `}>
				<path d={`M-0.5,0 L0.5,0 L 0,-${Math.sqrt(2 / 3)} Z`} fill="red" />
			</g>
		{/if}
	</svg>
</div>
