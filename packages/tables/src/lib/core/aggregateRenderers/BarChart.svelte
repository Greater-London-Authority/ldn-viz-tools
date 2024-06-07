<script>
	// This is based on the D3 Bar Chart example:
	// https://observablehq.com/@d3/bar-chart

	// TODO: option to show either proportions or counts

	import { scaleLinear, scaleBand } from 'd3-scale';
	import { max } from 'd3-array';

	export let values;

	export let table;
	export let colSpec;

	// TODO: move labels to separate span so they don't get truncaed if max val is multiple digits
	// TODO: logic for not overlapping lots of labels

	// Declare the chart dimensions and margins.
	const width = 100;
	const height = 30;
	const marginTop = 0;
	const marginRight = 10;
	const marginBottom = 10;
	const marginLeft = 0;

	let posScale = () => 0;
	$: posScale = table.posScales[colSpec.short_label];

	let sortedData;
	let x;
	let y;

	const update = (data) => {
		// count the values: produces a list of [value, count] pairs
		const counts = Object.create(null);
		data.forEach((val) => {
			counts[val] = counts[val] ? counts[val] + 1 : 1;
		});

		// sort by descending frequency: see https://stackoverflow.com/a/1069840
		sortedData = Object.entries(counts).sort(([, a], [, b]) => b - a);

		// null will have been converted to the string "null" by the above
		sortedData = sortedData.map((d) => [d[0] === 'null' ? null : d[0], d[1]]);

		const defaultScale = scaleBand()
			.domain(sortedData.map((d) => d[0])) // descending frequency
			.range([marginLeft, width - marginRight])
			.padding(0.1);

		x = posScale
			? scaleBand()
					.domain(posScale.domain())
					.range([marginLeft, width - marginRight])
			: defaultScale;

		// Declare the y (vertical position) scale.
		y = scaleLinear()
			.domain([0, max(sortedData, (d) => d[1])])
			.range([height - marginBottom, marginTop]);
	};

	const truncateLabel = (str, maxLen) => {
		if (!str) {
			return '';
		} else if (str.length > maxLen) {
			return str.slice(0, maxLen - 3) + '...';
		} else {
			return str;
		}
	};

	$: update(values, posScale);
</script>

<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
	<g>
		{#each sortedData as d}
			<rect
				fill={table.scales ? table.scales[colSpec.short_label](d[0]) : 'lightgrey'}
				x={x(d[0])}
				width={x.bandwidth()}
				y={y(d[1])}
				height={y(0) - y(d[1])}
			>
				<title>{`${d[0]}: ${d[1]}`}</title>
			</rect>

			{#if sortedData.length <= 3}
				<text
					fill="black"
					x={x(d[0]) + x.bandwidth() / 2}
					text-anchor="middle"
					y={height - marginBottom + 10}
					font-size="12px"
				>
					{truncateLabel(d[0], 7)}
				</text>
			{/if}
		{/each}
	</g>
</svg>
