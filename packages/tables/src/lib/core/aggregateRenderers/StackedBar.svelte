<script lang="ts">
	/**
	 * The `StackedBar` component represents a set of values as a stacked bar chart.
	 */

	import { type ScaleLinear, scaleLinear } from 'd3-scale';

	/**
	 * Array of values to be displayed.
	 */
	export let values: number[];

	/**
	 * A D3 color scale used to determine bar color.
	 */
	export let colorScale: (val: any) => string;

	/**
	 * Width of cell (in pixels).
	 */
	export let width = 100;

	const height = 30;
	const marginRight = 10;
	const marginLeft = 0;

	let x: ScaleLinear<number, number>;
	$: x = scaleLinear()
		.range([marginLeft, width - marginRight])
		.domain([0, values.length]);

	let sortedData;
	let bars: { start: number; end: number; val: number }[] = [];
	const update = (values: number[]) => {
		// count the values: produces a list of [value, count] pairs
		const counts: Record<number, number> = Object.create(null);
		values.forEach((val) => {
			counts[val] = counts[val] ? counts[val] + 1 : 1;
		});

		// sort by descending frequency: see https://stackoverflow.com/a/1069840
		sortedData = Object.entries(counts).sort(([, a], [, b]) => b - a);

		bars = [];
		let start = 0;
		for (const d of sortedData) {
			bars.push({ start, end: start + d[1], val: +d[0] });
			start += d[1];
		}

		// order bars based on label
		bars = bars.sort((a, b) => (a.val < b.val ? -1 : a.val > b.val ? +1 : 0));
	};

	$: update(values);

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	$$restProps;
</script>

<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
	{#each bars as bar}
		<rect
			x={x(bar.start)}
			width={x(bar.end) - x(bar.start)}
			y={0}
			{height}
			fill={colorScale ? colorScale(bar.val) : 'lightgrey'}
			stroke="black"
		/>

		<text x={x(bar.start) + 6} y={height - 6} font-size="12px" fill="white">
			{bar.val}
		</text>
	{/each}
</svg>
