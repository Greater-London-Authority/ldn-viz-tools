<script lang="ts">
	/**
	 * The `Histogram` component renders a set of values as a histogram.
	 * @component
	 */

	import { type Bin, bin, max } from 'd3-array';
	import { type ScaleLinear, scaleLinear } from 'd3-scale';
	import type { HistogramProps } from '$lib/core/aggregateRenderers/HistogramProps';

	// TODO: move labels to separate span so they don't get truncated if max val is multiple digits

	let { values, extent = [0, 1], color = 'steelblue', width = 100, ...rest }: HistogramProps = $props();

	const height = 30;
	const marginTop = 0;
	const marginRight = 10;
	const marginBottom = 10;
	const marginLeft = 0;

	let bins: Array<Bin<number, number>> = $derived(
		bin()(
			//.value((d) => d.rate)
			values
		)
	);

	let hints: [number, number] = $derived([bins[0].x0 ?? 0, bins.slice(-1)[0].x1 ?? 0]);

	let x: ScaleLinear<number, number> = $derived(
		scaleLinear()
			.domain(extent)
			.range([marginLeft, width - marginRight])
	);

	let y: ScaleLinear<number, number> = $derived(
		scaleLinear()
			.domain([0, max(bins, (d) => d.length) ?? 0])
			.range([height - marginBottom, marginTop])
	);
</script>

{#if bins}
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
{/if}
