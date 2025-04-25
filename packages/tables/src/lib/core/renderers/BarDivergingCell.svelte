<script lang="ts">
	/**
	 * The `BarDivergingCell` component renders a table cell representing a numerical value as a bar, where the length of the bar encodes the value.
	 * There is a vertical line at x=0, and the bar color indicates whether the value is greater tha or less than 0.
	 * @component
	 */

	import { format } from 'd3-format';
	import { scaleLinear } from 'd3-scale';
	import { getVal } from '../lib/getVal';

	/**
	 * The value to be encoded in the cell.
	 */
	export let value: number;

	/**
	 * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
	 * which is based on Python 3’s format specification mini-language (PEP 3101)).
	 * If set to a falsy value, then bars will not be labelled with a value.
	 */
	export let formatString = '0.0f';

	/**
	 * Text size of labels (in pixels).
	 */
	export let textSize = 16;

	/**
	 * Color to be applied to bars corresponding to positive values.
	 */
	export let positiveColor: string | ((value: number) => string) = 'blue';

	/**
	 * Color to be applied to bars corresponding to negative values.
	 */
	export let negativeColor: string | ((value: number) => string) = 'red';

	export let extent = [0, 1]; // used to pass automatically extracted val

	/**
	 * Width of cell (in pixels).
	 */
	export let width = 100;

	const height = 30;

	const barVerticalPadding = 5;

	let x;
	$: x = scaleLinear().domain(extent).range([0, width]);

	$: f = format(formatString);

	const textPadding = 2;

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	$$restProps;
</script>

<div class="h-full flex items-center">
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
				fill={getVal(value, negativeColor)}
			/>

			<!-- zero line -->
			<line x1={x(0)} x2={x(0)} y1={0} y2={height} stroke="black" />

			{#if formatString}
				{#if value < extent[0] / 2}
					<!-- text inside bar, which is pointing left -->
					<text
						text-anchor="start"
						fill="white"
						x={x(value) + textPadding}
						y={height / 2}
						dominant-baseline="central"
						font-size={`${textSize}px`}>{f(+value)}</text
					>
				{:else}
					<!-- text to left of bar-->
					<text
						text-anchor="end"
						fill="black"
						x={x(value) - textPadding}
						y={height / 2}
						dominant-baseline="central"
						font-size={`${textSize}px`}>{f(+value)}</text
					>
				{/if}
			{/if}
		{:else}
			<rect
				x={x(0)}
				width={x(value) - x(0)}
				y={barVerticalPadding}
				height={height - 2 * barVerticalPadding}
				fill={getVal(value, positiveColor)}
			/>

			<!-- zero line -->
			<line x1={x(0)} x2={x(0)} y1={0} y2={height} stroke="black" />

			{#if formatString}
				{#if value > extent[1] / 2}
					<!-- text inside bar, which is pointing right -->
					<text
						text-anchor="end"
						fill="white"
						x={x(value) - textPadding}
						y={height / 2}
						dominant-baseline="central"
						font-size={`${textSize}px`}>{f(+value)}</text
					>
				{:else}
					<!-- text to left of bar-->
					<text
						text-anchor="start"
						fill="black"
						x={x(value) + textPadding}
						y={height / 2}
						dominant-baseline="central"
						font-size={`${textSize}px`}>{f(+value)}</text
					>
				{/if}
			{/if}
		{/if}
	</svg>
</div>
