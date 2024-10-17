<script>
	/**
	 * The `ViolinPlot` component renders a set of values as a violin plot.
	 * @component
	 */

	import { scaleLinear } from 'd3-scale';
	import { bin, max, mean, min, quantile } from 'd3-array';

	import { area, curveCatmullRom } from 'd3-shape';

	/**
	 * Array of values to be displayed.
	 */
	export let values;
	export let extent = [0, 1];

	/**
	 * Width of cell (in pixels).
	 */
	export let width = 100;

	// Declare the chart dimensions and margins.
	const height = 30;
	const marginTop = 0;
	const marginRight = 10;
	const marginBottom = 0;
	const marginLeft = 0;

	let box;
	let bins = [];
	let x;
	let y;
	const update = (values) => {
		bins = bin()(
			//.value((d) => d.rate)
			values
		);

		x = scaleLinear()
			.domain(extent)
			.range([marginLeft, width - marginRight]);

		// Declare the y (vertical position) scale.
		const m = max(bins, (d) => d.length);
		y = scaleLinear()
			.domain([-m, +m])
			.range([height - marginBottom, marginTop]);

		box = {
			min: min(values),
			max: max(values),
			q1: quantile(values, 0.25),
			mean: mean(values),
			q2: quantile(values, 0.5),
			q3: quantile(values, 0.75)
		};
	};

	const areaGenerator = area()
		.x0((d) => (x(d.x0) + x(d.x1)) / 2)
		.y0((d) => y(-d.length))
		.y1((d) => y(d.length))
		.curve(curveCatmullRom);

	$: update(values);
</script>

<!-- TODO: tooltips -->
<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
	<path d={areaGenerator(bins)} fill="lightgrey" />

	<!-- line fr0m q1 to q3 -->
	<line x1={x(box.q1)} x2={x(box.q3)} y1={height / 2} y2={height / 2} stroke="black" />

	<!-- median -->
	<line x1={x(box.q2)} x2={x(box.q2)} y1={height * 0.25} y2={height * 0.75} stroke="black" />

	<!-- mean -->
	<line
		x1={x(box.mean)}
		x2={x(box.mean)}
		y1={height * 0.25}
		y2={height * 0.75}
		stroke="black"
		stroke-dasharray="2,2"
	/>
</svg>
