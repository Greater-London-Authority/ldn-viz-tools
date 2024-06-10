<script>
	/**
	 * The `ViolinPlot` component renders a set of values as a BoxPlot.
	 * @component
	 */

	import { max, mean, min, quantile } from 'd3-array';
	import { scaleLinear } from 'd3-scale';

	/**
	 * Array of values to be displayed.
	 */
	export let values;
	export let extent;

	export let showAllPoints = false;

	const width = 100;
	const height = 30;
	const marginRight = 10;
	const marginLeft = 0;

	let canvasRef;

	let x;
	let box;

	const update = (values) => {
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

	const drawCanvas = () => {
		if (canvasRef && box) {
			const ctx = canvasRef.getContext('2d');
			ctx.clearRect(0, 0, width, height);

			// box from Q1 to Q3
			ctx.fillStyle = 'rgb(128, 128, 128)';
			ctx.fillRect(x(box.q1), 0, x(box.q3 - box.q1), height);

			// line for median
			ctx.strokeStyle = 'rgb(200, 0, 0)';
			ctx.beginPath();
			ctx.moveTo(x(box.q2), 0);
			ctx.lineTo(x(box.q2), height);
			ctx.stroke();

			// dashed line for mean
			ctx.setLineDash([2, 2]);
			ctx.beginPath();
			ctx.moveTo(x(box.mean), 0);
			ctx.lineTo(x(box.mean), height);
			ctx.stroke();
			ctx.setLineDash([]);

			// small whiskers
			ctx.strokeStyle = 'rgb(0, 0, 0)';
			ctx.beginPath();
			ctx.moveTo(x(box.min), height / 2);
			ctx.lineTo(x(box.q2), height / 2);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(x(box.min), 0);
			ctx.lineTo(x(box.min), height);
			ctx.stroke();

			// large whiskers
			ctx.strokeStyle = 'rgb(0, 0, 0)';
			ctx.beginPath();
			ctx.moveTo(x(box.q2), height / 2);
			ctx.lineTo(x(box.max), height / 2);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(x(box.max), 0);
			ctx.lineTo(x(box.max), height);
			ctx.stroke();

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

	$: update(values);
	$: drawCanvas(box, showAllPoints, canvasRef);
</script>

<canvas {width} {height} bind:this={canvasRef}></canvas>
