<script lang="ts">
	import type { LayerCake } from 'layercake';
	import { getContext } from 'svelte';
	const { yScale, yRange, xRange, padding, width } = getContext<LayerCake>('LayerCake');

	export let gridlines: boolean = false;
	export let baseline: boolean = false;

	export let ticks: number | [] | ((d: any) => void) = 10;
	export let xTick: number = 0;
	export let yTick: number = 6;
	export let dxTick: number = 0;
	export let dyTick: number = -4;
	export let textAnchor = 'start';
	export let prefix = '';
	export let suffix = '';

	export let formatTick: (d: any) => void = (d) => d;

	$: isBandwidth = typeof $yScale.bandwidth === 'function';

	// $: tickVals = $yScale.ticks(ticks);

	$: tickVals = Array.isArray(ticks)
		? ticks
		: isBandwidth
		? $yScale.domain()
		: typeof ticks === 'function'
		? ticks($yScale.ticks())
		: $yScale.ticks(ticks);

	// Props (from work in observable)
	// 	label:
	// 	grid:
	// 	tickFormat:
	//  ticks
</script>

<g class="axis y-axis" transform="translate({-$padding.left}, 0)">
	{#each tickVals as tick, i (tick)}
		<g
			class="tick tick-{tick}"
			transform="translate({$xRange[0] + (isBandwidth ? $padding.left : 0)}, {$yScale(tick)})"
		>
			{#if gridlines !== false}
				<line
					x1={$padding.left}
					x2={$width + $padding.left}
					y1={yTick + (isBandwidth ? $yScale.bandwidth() / 2 : 0)}
					y2={yTick + (isBandwidth ? $yScale.bandwidth() / 2 : 0)}
					class="stroke-gray-200"
				/>
			{/if}
			<text
				x={xTick}
				y={yTick + (isBandwidth ? $yScale.bandwidth() / 2 : 0)}
				dx={isBandwidth ? -4 : dxTick}
				dy={isBandwidth ? 4 : dyTick}
				style="text-anchor:{isBandwidth ? 'end' : textAnchor};"
			>
				{i == tickVals.length - 1 ? prefix + formatTick(tick) + suffix : formatTick(tick)}</text
			>
		</g>
	{/each}
	{#if baseline !== false}
		<line
			transform="translate({$padding.left}, 0)"
			x1={0}
			x2={0}
			y1={Math.min(...$yRange)}
			y2={Math.max(...$yRange)}
			class="stroke-gray-400"
		/>
	{/if}
</g>
