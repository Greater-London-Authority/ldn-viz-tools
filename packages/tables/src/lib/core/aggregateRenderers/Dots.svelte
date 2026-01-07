<script lang="ts">
	/**
	 * The `Dots` component renders a set of values as something like a beeswarm plot or jittered Cleveland dot plot.
	 * Different plots in the same column have a consistent x-axis based on computed extent of column.
	 * @component
	 */

	import { scaleLinear, type ScaleLinear } from 'd3-scale';
	import type { DotsProps } from '$lib/core/aggregateRenderers/DotsProps';

	let { values, extent = [0, 1], width = 100, ...rest }: DotsProps = $props();

	const height = 30;
	const marginRight = 10;
	const marginBottom = 10;
	const marginLeft = 0;

	const radius = 1;

	const dodge = (values: number[], x: ScaleLinear<number, number>) => {
		return (values || []).map((v) => ({
			x: x(v),
			y: Math.random(),
			data: v
		}));
	};

	type DodgedVal = { x: number; y: number; data: number };

	//let x: ScaleLinear<number, number> = $state();

	const useCanvas = true;
	let canvasRef: HTMLCanvasElement = $state();

	const drawCanvas = (dodgedValues: DodgedVal[], canvasRef: HTMLCanvasElement) => {
		if (useCanvas && canvasRef && dodgedValues.length > 0) {
			const ctx = canvasRef.getContext('2d');
			if (!ctx) {
				return;
			}
			ctx.clearRect(0, 0, width, height);
			for (const point of dodgedValues) {
				const cx = point.x;
				const cy = (height - marginBottom) * point.y;
				ctx.fillStyle = 'rgb(200, 0, 0)';
				ctx.fillRect(cx, cy, 1, 1);
			}
		}
	};

	let x = $derived(
		scaleLinear()
			.domain(extent)
			.range([marginLeft, width - marginRight])
	);

	let dodgedValues: DodgedVal[] = $derived.by(() => {
		return dodge(values, x);
	});

	$effect(() => {
		drawCanvas(dodgedValues, canvasRef);
	});
</script>

{#if useCanvas}
	<canvas {width} {height} bind:this={canvasRef}></canvas>
{:else}
	<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
		{#each dodgedValues as point}
			<circle cx={x(point.x)} cy={(height - marginBottom) * point.y} r={radius} opacity={0.1}>
				<title>{point.data}</title>
			</circle>
		{/each}
	</svg>
{/if}
