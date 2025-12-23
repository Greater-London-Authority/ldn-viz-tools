<script lang="ts">
	/**
	 * The `BoxPlot` component renders a set of values as a BoxPlot.
	 * @component
	 */

	import type { BoxPlotProps } from '$lib/core/aggregateRenderers/BoxPlotProps';
	import { max, mean, min, quantile } from 'd3-array';
	import { type ScaleLinear, scaleLinear } from 'd3-scale';

	let {
		values = [],
		extent = [0, 1],
		showAllPoints = false,
		width = 100,
		...rest
	}: BoxPlotProps = $props();

	const height = 30;
	const marginRight = 10;
	const marginLeft = 0;

	let canvasRef: HTMLCanvasElement = $state();

	type Box = {
		min: number | undefined;
		max: number | undefined;
		q1: number | undefined;
		mean: number | undefined;
		q2: number | undefined;
		q3: number | undefined;
	};

	let x: ScaleLinear<number, number>;
	let box: Box = $state();

	const update = (values: number[]) => {
		x = scaleLinear()
			.domain(extent)
			.range([marginLeft, width - marginRight]);

		box = {
			min: min(values),
			max: max(values),
			q1: quantile(values, 0.25),
			mean: mean(values),
			q2: quantile(values, 0.5),
			q3: quantile(values, 0.75)
		};
	};

	const drawCanvas = (box: Box, showAllPoints: boolean, canvasRef: HTMLCanvasElement) => {
		if (canvasRef && box) {
			const ctx = canvasRef.getContext('2d');
			if (!ctx) {
				return;
			}
			ctx.clearRect(0, 0, width, height);

			// box from Q1 to Q3
			ctx.fillStyle = 'rgb(128, 128, 128)';
			if (box.q1 !== undefined && box.q3 !== undefined) {
				ctx.fillRect(x(box.q1), 0, x(box.q3 - box.q1), height);
			}

			// line for median
			ctx.strokeStyle = 'rgb(200, 0, 0)';

			if (box.q2 != undefined) {
				ctx.beginPath();
				ctx.moveTo(x(box.q2), 0);
				ctx.lineTo(x(box.q2), height);
				ctx.stroke();
			}

			// dashed line for mean
			if (box.mean != undefined) {
				ctx.setLineDash([2, 2]);
				ctx.beginPath();
				ctx.moveTo(x(box.mean), 0);
				ctx.lineTo(x(box.mean), height);
				ctx.stroke();
				ctx.setLineDash([]);
			}

			// small whiskers
			ctx.strokeStyle = 'rgb(0, 0, 0)';

			if (box.min !== undefined && box.q2 !== undefined) {
				ctx.beginPath();
				ctx.moveTo(x(box.min), height / 2);
				ctx.lineTo(x(box.q2), height / 2);
				ctx.stroke();
			}

			if (box.min !== undefined) {
				ctx.beginPath();
				ctx.moveTo(x(box.min), 0);
				ctx.lineTo(x(box.min), height);
				ctx.stroke();
			}

			// large whiskers
			ctx.strokeStyle = 'rgb(0, 0, 0)';
			if (box.q2 !== undefined && box.max !== undefined) {
				ctx.beginPath();
				ctx.moveTo(x(box.q2), height / 2);
				ctx.lineTo(x(box.max), height / 2);
				ctx.stroke();
			}

			if (box.max !== undefined) {
				ctx.beginPath();
				ctx.moveTo(x(box.max), 0);
				ctx.lineTo(x(box.max), height);
				ctx.stroke();
			}

			// individual data points
			if (showAllPoints) {
				for (const val of values) {
					const cx = x(val);
					const cy = height * Math.random();
					ctx.fillStyle = 'rgb(0, 0, 0, 0.05)';
					ctx.fillRect(cx, cy, 1, 1);
				}
			}
		}
	};

	$effect(() => {
		update(values || []);
	});
	$effect(() => {
		drawCanvas(box, showAllPoints, canvasRef);
	});
</script>

<canvas {width} {height} bind:this={canvasRef}></canvas>
