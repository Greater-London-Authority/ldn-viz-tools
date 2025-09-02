<script lang="ts">
	/**
	 * The `BarChart` component renders a set of values as a bar chart.
	 * @component
	 */

	import { max } from 'd3-array';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import type { BarChartProps } from '$lib/core/aggregateRenderers/BarChartProps';

	let { values, colorScale, posScale, width = 100, ...rest }: BarChartProps = $props();

	const height = 30;
	const marginTop = 0;
	const marginRight = 10;
	const marginBottom = 10;
	const marginLeft = 0;

	let sortedData = $derived.by(() => {
		// count the values: produces a list of [value, count] pairs
		const counts = Object.create(null);
		values.forEach((val) => {
			counts[val] = counts[val] ? counts[val] + 1 : 1;
		});

		// sort by descending frequency: see https://stackoverflow.com/a/1069840
		let sorted_data = Object.entries(counts).sort(([, a], [, b]) => b - a);

		// null will have been converted to the string "null" by the above
		return sorted_data.map((d) => [d[0] === 'null' ? null : d[0], d[1]]);
	});

	let x = $derived.by(() => {
		const defaultScale = scaleBand()
			.domain(sortedData.map((d) => d[0])) // descending frequency
			.range([marginLeft, width - marginRight])
			.padding(0.1);

		return posScale
			? scaleBand()
					.domain(posScale.domain())
					.range([marginLeft, width - marginRight])
			: defaultScale;
	});

	let y = $derived(
		scaleLinear()
			.domain([0, +max(sortedData, (d) => d[1])])
			.range([height - marginBottom, marginTop])
	);

	const truncateLabel = (str, maxLen) => {
		if (!str) {
			return '';
		} else if (str.length > maxLen) {
			return str.slice(0, maxLen - 3) + '...';
		} else {
			return str;
		}
	};
</script>

<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
	<g>
		{#each sortedData as d}
			<rect
				fill={colorScale ? colorScale(d[0]) : 'lightgrey'}
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
