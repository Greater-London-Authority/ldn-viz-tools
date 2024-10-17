<script lang="ts">
	/**
	 * The `PairArrowAxis` component rendersan axis for the `PairArrowCell` component.
	 * @component
	 */

	import { format } from 'd3-format';
	import { scaleLinear } from 'd3-scale';

	/**
	 * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
	 * which is based on Python 3’s format specification mini-language (PEP 3101)).
	 * If set to a falsy value, then bars will not be labelled with a value.
	 */
	export let formatString = '0.0f';

	export let extent = [0, 1]; // used to pass automatically extracted val

	/**
	 * Width of cell (in pixels).
	 */
	export let width = 100;

	const height = 30;

	let f;
	$: if (formatString) {
		f = format(formatString);
	}

	const barEndPadding = 15;

	let x;
	$: x = scaleLinear()
		.domain(extent)
		.range([barEndPadding, width - barEndPadding]);

	export let numTicks = 4;
	$: ticks = x.ticks(numTicks);

	export let textSize = '8px';

	const topPadding = height; // padding above the horiontal rule
</script>

<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
	<g transform={`translate(0, ${topPadding})`}>
		<line x1={0} x2={width} y1={0} y2={0} stroke="black" />

		{#each ticks as tick}
			<line x1={x(tick)} x2={x(tick)} y1={0} y2={-6} stroke="black" />

			<text x={x(tick)} y="-9" fill="black" font-size={textSize} text-anchor="middle">
				{f(tick)}
			</text>
		{/each}
	</g>
</svg>
