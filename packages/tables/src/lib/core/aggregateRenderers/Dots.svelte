<script>
	/**
	 * The `Dots` component renders a set of values as something like a beeswarm plot or jittered Cleveland dot plot.
	 * Different plots in the same column have a consistent x-axis based on computed extent of column.
	 * @component
	 */

	import { scaleLinear } from 'd3-scale';

	/**
	 * Array of values to be displayed.
	 */
	export let values;
	export let extent = [0, 1];

	/**
	 * Width of cell (in pixels).
	 */
	export let width = 100;

	const height = 30;
	const marginRight = 10;
	const marginBottom = 10;
	const marginLeft = 0;

	const radius = 1;
	const padding = 1.5;

	const dodge = (values) => {
		return values.map((v) => ({
			x: x(v),
			y: Math.random(),
			data: v
		}));
	};

	let dodgedValues = [];
	let x;

	const useCanvas = true;
	let canvasRef;

	const update = (values) => {
		x = scaleLinear()
			.domain(extent)
			.range([marginLeft, width - marginRight]);

		dodgedValues = dodge(values, { radius: radius * 2 + padding });
	};

	const drawCanvas = (dodgedValues, canvasRef) => {
		if (useCanvas && canvasRef && dodgedValues.length > 0) {
			const ctx = canvasRef.getContext('2d');
			ctx.clearRect(0, 0, width, height);
			for (const point of dodgedValues) {
				const cx = point.x;
				const cy = (height - marginBottom) * point.y;
				ctx.fillStyle = 'rgb(200, 0, 0)';
				ctx.fillRect(cx, cy, 1, 1);
			}
		}
	};

	$: update(values);
	$: drawCanvas(dodgedValues, canvasRef);
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
