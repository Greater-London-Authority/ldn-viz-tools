<script lang="ts">
	/**
	 * The `DoubleBarCell` component renders a table cell representing a numerical value as a bar, where the length of the bar encodes the value.
	 * There is a vertical line at x=0, and the bar color indicaes whether the value is greater tha or less than 0.
	 * @component
	 */

	import { scaleLinear } from 'd3-scale';

	/**
	 * The value to be encoded in the cell.
	 */
	export let value: number;

	export let extent = [0, 1]; // used to pass automatically extracted val

	// TODO: separate props for positiveColor/negativeColor ?

	const width = 100;
	const height = 30;

	const barVerticalPadding = 5;

	let x;
	$: x = scaleLinear().domain(extent).range([0, width]);
</script>

<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
	<!-- background bar -->
	<rect
		x="0"
		{width}
		y={barVerticalPadding}
		height={height - 2 * barVerticalPadding}
		fill="lightgrey"
	/>

	<!-- data bar -->
	{#if value < 0}
		<rect
			x={x(value)}
			width={x(0) - x(value)}
			y={barVerticalPadding}
			height={height - 2 * barVerticalPadding}
			fill="red"
		/>
	{:else}
		<rect
			x={x(0)}
			width={x(value) - x(0)}
			y={barVerticalPadding}
			height={height - 2 * barVerticalPadding}
			fill="blue"
		/>
	{/if}

	<!-- zero line -->
	<line x1={x(0)} x2={x(0)} y1={0} y2={height} stroke="black" />
</svg>
