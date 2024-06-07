<script>
	// "Distribution bar" in LineUp

	import { scaleLinear } from 'd3-scale';

	export let values;
	export let table;
	export let colSpec;

	// Declare the chart dimensions and margins.
	const width = 100;
	const height = 30;
	const marginTop = 0;
	const marginRight = 10;
	const marginBottom = 10;
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
		// TODO: not sure this is best approach: ideally want consistent order between plots for different groups
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
			fill={table.scales ? table.scales[colSpec.short_label](bar.val) : 'lightgrey'}
			stroke="black"
		/>

		<text x={x(bar.start) + 6} y={height - 6} font-size="12px" fill="white">
			{bar.val}
		</text>
	{/each}
</svg>
