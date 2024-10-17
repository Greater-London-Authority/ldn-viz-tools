<script>
	/**
	 * The `StackedBar` component represents a set of values as a stacked bar chart.
	 */

	import { scaleLinear } from 'd3-scale';

	/**
	 * Array of values to be displayed.
	 */
	export let values;

	/**
	 * A D3 color scale used to determine bar color.
	 */
	export let colorScale;

	/**
	 * Width of cell (in pixels).
	 */
	export let width = 100;

	const height = 30;
	const marginRight = 10;
	const marginLeft = 0;

	let x;
	$: x = scaleLinear()
		.range([marginLeft, width - marginRight])
		.domain([0, values.length]);

	let sortedData;
	let bars = [];
	const update = (values) => {
		// count the values: produces a list of [value, count] pairs
		const counts = Object.create(null);
		values.forEach((val) => {
			counts[val] = counts[val] ? counts[val] + 1 : 1;
		});

		// sort by descending frequency: see https://stackoverflow.com/a/1069840
		sortedData = Object.entries(counts).sort(([, a], [, b]) => b - a);

		bars = [];
		let start = 0;
		for (const d of sortedData) {
			bars.push({ start, end: start + d[1], val: d[0] });
			start += d[1];
		}

		// order bars based on label
		bars = bars.sort((a, b) => (a.val < b.val ? -1 : a.val > b.val ? +1 : 0));
	};

	$: update(values);
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
