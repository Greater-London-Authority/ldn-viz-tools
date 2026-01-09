<script lang="ts">
	/**
	 * The `BarDivergingAxis` component renders an axis for the `BarDivergingCell` component.
	 * @component
	 */

	import type { BarDivergingAxisProps } from '$lib/core/renderers/BarDivergingAxisProps';
	import { format } from 'd3-format';
	import { scaleLinear } from 'd3-scale';

	const height = 20;

	let {
		formatString = '0.0f',
		extent = [0, 1],
		width = 100,
		numTicks = 4,
		textSize = 8,
		..._rest
	}: BarDivergingAxisProps = $props();

	const topPadding = height; // padding above the horizontal rule

	let x = $derived(scaleLinear().domain(extent).range([0, width]));
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
