<script lang="ts">
	/**
	 * The `Histogram` component renders a set of values as a histogram.
	 * @component
	 */

	import { type ScaleLinear, scaleLinear } from 'd3-scale';
	import { type Bin, bin, max } from 'd3-array';

	/**
	 * Array of values to be displayed.
	 */
	export let values: number[];
	export let extent = [0, 1];

	/**
	 * Color of bars.
	 */
	export let color = 'steelblue';

	// TODO: move labels to separate span so they don't get truncated if max val is multiple digits

	/**
	 * Width of cell (in pixels).
	 */
	export let width = 100;

	const height = 30;
	const marginTop = 0;
	const marginRight = 10;
	const marginBottom = 10;
	const marginLeft = 0;

	let bins: Array<Bin<number, number>>;
	let hints: [number, number];
	let x: ScaleLinear<number, number>;
	let y: ScaleLinear<number, number>;

	const update = (data: number[]) => {
		// Bin the data.
		bins = bin()(
			//.value((d) => d.rate)
			data
		);

		hints = [bins[0].x0 ?? 0, bins.slice(-1)[0].x1 ?? 0];

		x = scaleLinear()
			.domain(extent)
			.range([marginLeft, width - marginRight]);

		y = scaleLinear()
			.domain([0, max(bins, (d) => d.length) ?? 0])
			.range([height - marginBottom, marginTop]);
	};

	$: update(values);

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	$$restProps;
</script>

<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
	<g fill={color}>
		{#each bins as d}
			{#if d.x0 !== undefined && d.x1 !== undefined}
				<rect
					x={x(d.x0) + 1}
					width={x(d.x1) - x(d.x0) - 1}
					y={y(d.length)}
					height={y(0) - y(d.length)}
				>
					<title>{`${d.x0} - ${d.x1}: ${d.length}`}</title>
				</rect>
			{/if}
		{/each}
	</g>

	<text x={x(hints[0]) + 4} y={height - marginBottom + 10} font-size="12px" text-anchor="middle">
		{hints[0]}
	</text>

	<text x={x(hints[1])} y={height - marginBottom + 10} font-size="12px" text-anchor="middle">
		{hints[1]}
	</text>
</svg>
