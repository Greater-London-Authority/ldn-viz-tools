<script lang="ts">
	/**
	 * The `PairArrowAxis` component renders an axis for the `PairArrowCell` component.
	 * @component
	 */

	import { format } from 'd3-format';
	import { type ScaleLinear, scaleLinear } from 'd3-scale';

	const height = 20;

	const barEndPadding = 15;

	let x: ScaleLinear<number, number> = $derived(
		scaleLinear()
			.domain(extent)
			.range([barEndPadding, width - barEndPadding])
	);

	interface Props {
		/**
		 * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
		 * which is based on Python 3’s format specification mini-language (PEP 3101)).
		 * If set to a falsy value, then bars will not be labelled with a value.
		 */
		formatString?: string;
		extent?: any; // used to pass automatically extracted val
		/**
		 * Width of cell (in pixels).
		 */
		width?: number;
		numTicks?: number;
		textSize?: number;
		[key: string]: any;
	}

	let {
		formatString = '0.0f',
		extent = [0, 1],
		width = 100,
		numTicks = 4,
		textSize = 8,
		...rest
	}: Props = $props();

	const topPadding = height; // padding above the horizontal rule

	let f = $derived(format(formatString));

	let ticks = $derived(x.ticks(numTicks));
</script>

<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
	<g transform={`translate(0, ${topPadding})`}>
		<line x1={0} x2={width} y1={0} y2={0} stroke="currentColor" />

		{#each ticks as tick}
			<line x1={x(tick)} x2={x(tick)} y1={0} y2={-6} stroke="currentColor" />

			<text
				x={x(tick)}
				y="-12"
				fill="currentColor"
				font-size={`${textSize}px`}
				text-anchor="middle"
			>
				{f(tick)}
			</text>
		{/each}
	</g>
</svg>
