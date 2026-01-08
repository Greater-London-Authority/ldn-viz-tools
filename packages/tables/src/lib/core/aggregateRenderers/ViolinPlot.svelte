<script lang="ts">
	/**
	 * The `ViolinPlot` component renders a set of values as a violin plot.
	 * @component
	 */

	import { bin, type Bin, max, mean, min, quantile } from 'd3-array';
	import type { ScaleLinear } from 'd3-scale';
	import { scaleLinear } from 'd3-scale';

	import type { ViolinProps } from '$lib/core/aggregateRenderers/ViolinProps';
	import { area, curveCatmullRom } from 'd3-shape';

	let { values, extent = [0, 1], width = 100, ..._rest }: ViolinProps = $props();

	// Declare the chart dimensions and margins.
	const height = 30;
	const marginTop = 0;
	const marginRight = 10;
	const marginBottom = 0;
	const marginLeft = 0;

	type Box = {
		min: number | undefined;
		max: number | undefined;
		q1: number | undefined;
		mean: number | undefined;
		q2: number | undefined;
		q3: number | undefined;
	};

	let box: Box = $derived({
		min: min(values),
		max: max(values),
		q1: quantile(values, 0.25),
		mean: mean(values),
		q2: quantile(values, 0.5),
		q3: quantile(values, 0.75)
	});

	let bins: Array<Bin<number, number>> = $derived(bin()(values));

	let x: ScaleLinear<number, number> = $derived(
		scaleLinear()
			.domain(extent)
			.range([marginLeft, width - marginRight])
	);

	let y: ScaleLinear<number, number> = $derived.by(() => {
		const m = max(bins, (d) => d.length) ?? 0;
		return scaleLinear()
			.domain([-m, +m])
			.range([height - marginBottom, marginTop]);
	});

	const areaGenerator = area<Bin<number, number>>()
		.x0((d) => (x(d.x0 ?? 0) + x(d.x1 ?? 0)) / 2)
		.y0((d) => y(-d.length))
		.y1((d) => y(d.length))
		.curve(curveCatmullRom);
</script>

<!-- TODO: tooltips -->
<svg viewBox={`0 0 ${width} ${height}`} {width} {height}>
	<path d={areaGenerator(bins)} fill="lightgrey" />

	<!-- line from q1 to q3 -->
	{#if box.q1 !== undefined && box.q3 !== undefined}
		<line x1={x(box.q1)} x2={x(box.q3)} y1={height / 2} y2={height / 2} stroke="black" />
	{/if}

	<!-- median -->
	{#if box.q2 !== undefined}
		<line x1={x(box.q2)} x2={x(box.q2)} y1={height * 0.25} y2={height * 0.75} stroke="black" />
	{/if}

	<!-- mean -->
	{#if box.mean !== undefined}
		<line
			x1={x(box.mean)}
			x2={x(box.mean)}
			y1={height * 0.25}
			y2={height * 0.75}
			stroke="black"
			stroke-dasharray="2,2"
		/>
	{/if}
</svg>
