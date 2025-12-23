<script lang="ts">
	/**
	 * The `StackedBar` component represents a set of values as a stacked bar chart.
	 */

	import type { StackedBarProps } from '$lib/core/aggregateRenderers/StackedBarProps';
	import { type ScaleLinear, scaleLinear } from 'd3-scale';
	import { getVal } from '../../getVal';

	let { values, color = 'red', width = 100, ...rest }: StackedBarProps = $props();

	const height = 30;
	const marginRight = 10;
	const marginLeft = 0;

	let x: ScaleLinear<number, number> = $derived(
		scaleLinear()
			.range([marginLeft, width - marginRight])
			.domain([0, values.length])
	);

	let sortedData;

	let bars: { start: number; end: number; val: string }[] = $derived.by(() => {
		// count the values: produces a list of [value, count] pairs

		const counts: Record<number, number> = Object.create(null);
		values.forEach((val) => {
			counts[val] = counts[val] ? counts[val] + 1 : 1;
		});

		// sort by descending frequency: see https://stackoverflow.com/a/1069840
		sortedData = Object.entries(counts).sort(([, a], [, b]) => b - a);

		const newBars = [];
		let start = 0;
		for (const d of sortedData) {
			newBars.push({ start, end: start + d[1], val: d[0] });
			start += d[1];
		}

		// order bars based on label
		return newBars.sort((a, b) => (a.val < b.val ? -1 : a.val > b.val ? +1 : 0));
	});
</script>

<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
	{#each bars as bar}
		<rect
			x={x(bar.start)}
			width={x(bar.end) - x(bar.start)}
			y={0}
			{height}
			fill={getVal(bar.val, color) as string}
			stroke="black"
		/>

		<text x={x(bar.start) + 6} y={height - 6} font-size="12px" fill="white">
			{bar.val}
		</text>
	{/each}
</svg>
