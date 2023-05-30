<script lang="ts">
	import type { LayerCake } from 'layercake';
	import { getContext } from 'svelte';

	const { height, xScale, xRange, yRange } = getContext<LayerCake>('LayerCake');

	export let gridlines: boolean = false;
	export let baseline: boolean = false;

	export let ticks: number | any[] | ((d: any) => void) | undefined = undefined;
	export let xTick: number | undefined = undefined;
	export let yTick: number = 16;
	export let formatTick: (d: any) => void = (d) => d;
	export let snapTicks = false;
	export let dxTick: number = 0;
	export let dyTick: number = 10;
	export let prefix: string = '';
	export let suffix: string = '';

	$: isBandwidth = typeof $xScale.bandwidth === 'function';

	$: tickVals = Array.isArray(ticks)
		? ticks
		: isBandwidth
		? $xScale.domain()
		: typeof ticks === 'function'
		? ticks($xScale.ticks())
		: $xScale.ticks(ticks);

	const textAnchor = (i: number) => {
		if (snapTicks === true) {
			if (i === 0) {
				return 'start';
			}
			if (i === tickVals.length - 1) {
				return 'end';
			}
		}
		return 'middle';
	};
</script>

<g class="axis x-axis">
	{#each tickVals as tick, i (tick)}
		<g class="tick tick-{i}" transform="translate({$xScale(tick)},{Math.max(...$yRange)})">
			{#if gridlines !== false}
				<line y1={$height * -1} y2="0" x1="0" x2="0" class="stroke-gray-200" />
			{/if}
			<text
				x={xTick || isBandwidth ? $xScale.bandwidth() / 2 : 0}
				y={yTick}
				dx={dxTick}
				dy={dyTick}
				text-anchor={textAnchor(i)}
				>{i == tickVals.length - 1 ? prefix + formatTick(tick) + suffix : formatTick(tick)}</text
			>
		</g>
	{/each}
	{#if baseline !== false}
		<line
			x1={0}
			x2={Math.max(...$xRange)}
			y1={Math.max(...$yRange)}
			y2={Math.max(...$yRange)}
			class="stroke-gray-400"
		/>
	{/if}
</g>
