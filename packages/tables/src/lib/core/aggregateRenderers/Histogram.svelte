<script>
	// This is based on the D3 Histogram example:
	// https://observablehq.com/@d3/histogram/2?intent=fork

	import { scaleLinear } from 'd3-scale';
	import { bin, max } from 'd3-array';

	export let values;
	export let table;
	export let colSpec;

	export let color = 'steelblue';

	// TODO: move labels to separate span so they don't get truncaed if max val is multiple digits

	// Declare the chart dimensions and margins.
	const width = 100;
	const height = 30;
	const marginTop = 0;
	const marginRight = 10;
	const marginBottom = 10;
	const marginLeft = 0;

	let bins;
	let hints;
	let x;
	let y;

	const update = (data) => {
		// Bin the data.
		bins = bin()(
			//.value((d) => d.rate)
			data
		);

		hints = [bins[0].x0, bins.slice(-1)[0].x1];

		// Declare the x (horizontal position) scale.
		x = scaleLinear()
			.domain(table.extents[colSpec.short_label])
			//   .domain([bins[0].x0, bins[bins.length - 1].x1])
			.range([marginLeft, width - marginRight]);

		// Declare the y (vertical position) scale.
		y = scaleLinear()
			.domain([0, max(bins, (d) => d.length)])
			.range([height - marginBottom, marginTop]);
	};

	$: update(values);
</script>

<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
	<g fill={color}>
		{#each bins as d}
			<rect
				x={x(d.x0) + 1}
				width={x(d.x1) - x(d.x0) - 1}
				y={y(d.length)}
				height={y(0) - y(d.length)}
			>
				<title>{`${d.x0} - ${d.x1}: ${d.length}`}</title>
			</rect>
		{/each}
	</g>

	<text x={x(hints[0]) + 4} y={height - marginBottom + 10} font-size="12px" text-anchor="middle">
		{hints[0]}
	</text>

	<text x={x(hints[1])} y={height - marginBottom + 10} font-size="12px" text-anchor="middle">
		{hints[1]}
	</text>
</svg>
