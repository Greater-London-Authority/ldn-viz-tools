<script lang="ts">
	/**
	 * The `BarChart` component renders a set of values as a bar chart.
	 * @component
	 */

	import type { BarChartProps } from '$lib/core/aggregateRenderers/BarChartProps';
	import { max } from 'd3-array';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { getVal } from '../../getVal';

	let { values, color = 'lightgrey', posScale, width = 100, ..._rest }: BarChartProps = $props();

	const height = 30;
	const marginTop = 0;
	const marginRight = 10;
	const marginBottom = 10;
	const marginLeft = 0;

	let sortedData = $derived.by(() => {
		// count the values: produces a list of [value, count] pairs
		const counts: Record<string, number> = Object.create(null);
		values.forEach((val: any) => {
			counts[val] = counts[val] ? counts[val] + 1 : 1;
		});

		// sort by descending frequency: see https://stackoverflow.com/a/1069840
		let sorted_data = Object.entries(counts).sort(([, a], [, b]) => (b as number) - (a as number));

		// null will have been converted to the string "null" by the above
		return sorted_data.map((d) => [d[0] === 'null' ? null : d[0], d[1]] as [string | null, number]);
	});

	let x = $derived.by(() => {
		const defaultScale = scaleBand()
			.domain(sortedData.map((d) => String(d[0]))) // descending frequency
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
			.domain([0, max(sortedData, (d) => d[1]) ?? 0])
			.range([height - marginBottom, marginTop])
	);

	const truncateLabel = (str: string | null, maxLen: number): string => {
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
				fill={getVal(d[0] as string | number, color) as string}
				x={x(String(d[0]))}
				width={x.bandwidth()}
				y={y(d[1])}
				height={y(0) - y(d[1])}
			>
				<title>{`${d[0]}: ${d[1]}`}</title>
			</rect>

			{#if sortedData.length <= 3}
				<text
					fill="black"
					x={(x(String(d[0])) ?? 0) + x.bandwidth() / 2}
					text-anchor="middle"
					y={height - marginBottom + 10}
					font-size="12px"
				>
					{truncateLabel(String(d[0]), 7)}
				</text>
			{/if}
		{/each}
	</g>
</svg>
