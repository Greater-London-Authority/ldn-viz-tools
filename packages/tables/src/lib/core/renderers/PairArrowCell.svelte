<script lang="ts">
	/**
	 * The `PairArrow` component renders a table cell containing an arrow pointing from a context value to the cell's value.
	 * The color of the arrow indicates whetehr it is increasing or decreasing
	 * @component
	 */

	import { scaleLinear } from 'd3-scale';

	/**
	 * The value to be encoded in the cell.
	 */
	export let value: number;

	export let extent = [0, 1]; // used to pass automatically extracted val

	export let contextVals: number[] = [0]; // value to be compared to

	/**
	 * Width of cell (in pixels).
	 */
	export let width = 100;

	const height = 30;

	const barEndPadding = 15;

	let x;
	$: x = scaleLinear()
		.domain(extent)
		.range([barEndPadding, width - barEndPadding]);
</script>

<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
	<defs>
		<!-- A marker to be used as an arrowhead -->
		<marker
			id="arrow"
			viewBox="0 0 10 10"
			refX="5"
			refY="5"
			markerWidth="6"
			markerHeight="6"
			orient="auto-start-reverse"
			stroke="context-stroke"
			fill="context-fill"
		>
			<path d="M 0 0 L 10 5 L 0 10 z" />
		</marker>
	</defs>

	<line
		x1={x(contextVals[0])}
		x2={x(value)}
		y1={height / 2}
		y2={height / 2}
		stroke={value > contextVals[0] ? 'blue' : 'red'}
		fill={value > contextVals[0] ? 'blue' : 'red'}
		marker-end="url(#arrow)"
	/>
</svg>
