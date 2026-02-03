<script lang="ts">
	/**
	 * The `PairArrowAxis` component renders an axis for the `PairArrowCell` component.
	 * @component
	 */

	import type { PairArrowAxisProps } from '$lib/core/renderers/PairArrowAxisProps';
	import { format } from 'd3-format';
	import { type ScaleLinear, scaleLinear } from 'd3-scale';

	const height = 20;

	const barEndPadding = 15;

	let {
		formatString = '0.0f',
		extent = [0, 1],
		width = 100,
		numTicks = 4,
		textSize = 8,
		..._rest
	}: PairArrowAxisProps = $props();

	let x: ScaleLinear<number, number> = $derived(
		scaleLinear()
			.domain(extent)
			.range([barEndPadding, width - barEndPadding])
	);

	const topPadding = height; // padding above the horizontal rule

	let f = $derived(format(formatString));

	let ticks = $derived(x.ticks(numTicks));
</script>

<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
	<g transform={`translate(0, ${topPadding})`}>
		<line x1={0} x2={width} y1={0} y2={0} stroke="currentColor" />

		{#each ticks as tick (tick)}
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
