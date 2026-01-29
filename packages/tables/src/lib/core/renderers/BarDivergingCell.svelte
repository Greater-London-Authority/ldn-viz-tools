<script lang="ts">
	/**
	 * The `BarDivergingCell` component renders a table cell representing a numerical value as a bar, where the length of the bar encodes the value.
	 * There is a vertical line at x=0, and the bar color indicates whether the value is greater than or less than 0.
	 * @component
	 */

	import type { BarDivergingCellProps } from '$lib/core/renderers/BarDivergingCellProps';
	import { theme } from '@ldn-viz/ui';
	import { format } from 'd3-format';
	import { scaleLinear } from 'd3-scale';
	import { getVal } from '../../getVal';

	let {
		value,
		formatString = '0.0f',
		textSize = 16,
		positiveColor = theme.tokenNameToValue('data.primary'),
		negativeColor = theme.tokenNameToValue('data.secondary'),
		extent = [0, 1],
		width = 100,
		..._rest
	}: BarDivergingCellProps = $props();

	const height = 30;

	const barVerticalPadding = 5;

	let x = $derived(scaleLinear().domain(extent).range([0, width]));

	let f = $derived(format(formatString));

	const textPadding = 2;
</script>

<div class="flex h-full items-center">
	<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
		<!-- background bar -->
		<rect
			x="0"
			{width}
			y={barVerticalPadding}
			height={height - 2 * barVerticalPadding}
			fill={theme.tokenNameToValue('surface.neutral')}
		/>

		<!-- data bar -->
		{#if value < 0}
			<rect
				x={x(value)}
				width={x(0) - x(value)}
				y={barVerticalPadding}
				height={height - 2 * barVerticalPadding}
				fill={getVal(value, negativeColor) as string}
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
				fill={getVal(value, positiveColor) as string}
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
