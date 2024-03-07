<script lang="ts">
	// This file is based on

	// https://observablehq.com/@d3/color-legend
	// Copyright 2021, Observable Inc.
	// Released under the ISC license.

	// It has been modified to use Svelte rather than just D3.js, and to allow a value on the scale to be highlighted.

	import * as d3 from 'd3';
	export let color: any;

	export let title = '';
	export let tickSize = 6;
	export let width = 320;
	export let height = 44 + tickSize;
	export let marginTop = 18;
	export let marginRight = 0;
	export let marginBottom = 16 + tickSize;
	export let marginLeft = 0;
	export let ticks = width / 64;
	export let tickFormat: (v: any) => string;
	export let tickValues: undefined | number[];

	export let highlightedValue: undefined | string | number;
	export let leftLabel = '';
	export let rightLabel = '';

	const ramp = (color, n = 256) => {
		const canvas = document.createElement('canvas');
		canvas.width = n;
		canvas.height = 1;
		const context = canvas.getContext('2d');
		if (context) {
			for (let i = 0; i < n; ++i) {
				context.fillStyle = color(i / (n - 1));
				context.fillRect(i, 0, 1, 1);
			}
		}
		return canvas.toDataURL();
	};

	let x;
	let n;
	let tickAdjust = (g) => g.selectAll('.tick line').attr('y1', marginTop + marginBottom - height);
	$: {
		if (color.interpolate) {
			// continuous scale
			n = Math.min(color.domain().length, color.range().length);
			x = color.copy().rangeRound(d3.quantize(d3.interpolate(marginLeft, width - marginRight), n));
		} else if (color.interpolator) {
			// Sequential scale
			x = Object.assign(
				color.copy().interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
				{
					range() {
						return [marginLeft, width - marginRight];
					}
				}
			);

			// scaleSequentialQuantile doesn’t implement ticks or tickFormat.
			if (!x.ticks) {
				if (tickValues === undefined) {
					n = Math.round(ticks + 1);
					tickValues = d3.range(n).map((i) => d3.quantile(color.domain(), i / (n - 1)));
				}
				if (typeof tickFormat !== 'function') {
					tickFormat = d3.format(tickFormat === undefined ? ',f' : tickFormat);
				}
			}
		} else if (color.invertExtent) {
			// Threshold scale

			const thresholds = color.thresholds
				? color.thresholds() // scaleQuantize
				: color.quantiles
					? color.quantiles() // scaleQuantile
					: color.domain(); // scaleThreshold

			const thresholdFormat =
				tickFormat === undefined
					? (d) => d
					: typeof tickFormat === 'string'
						? d3.format(tickFormat)
						: tickFormat;

			x = d3
				.scaleLinear()
				.domain([-1, color.range().length - 1])
				.rangeRound([marginLeft, width - marginRight]);

			tickValues = d3.range(thresholds.length);
			tickFormat = (i) => thresholdFormat(thresholds[i], i);
		} else {
			// ordinal scale
			x = d3
				.scaleBand()
				.domain(color.domain())
				.rangeRound([marginLeft, width - marginRight]);

			tickAdjust = () => {};
		}
	}

	let ticksRef: SVGElement;
	$: {
		if (ticksRef) {
			const bottomAxis = d3
				.axisBottom(x)
				.ticks(ticks, typeof tickFormat === 'string' ? tickFormat : undefined)
				.tickFormat(typeof tickFormat === 'function' ? tickFormat : undefined)
				.tickSize(tickSize)
				.tickValues(tickValues);

			d3.select(ticksRef)
				.call(bottomAxis)
				.call(tickAdjust)
				.call((g: any) => g.select('.domain').remove())
				.call((g: any) =>
					g
						.append('text')
						.attr('x', marginLeft)
						.attr('y', marginTop + marginBottom - height - 6)
						.attr('fill', 'currentColor')
						.attr('text-anchor', 'start')
						.attr('font-weight', 'bold')
						.attr('class', 'title')
						.text(title)
				);
		}
	}
</script>

<svg width="100%" viewBox="0  0 {width} {height}" style="overflow: visible; display: block;">
	{#if !color}
		<text>Loading...</text>
	{:else if color.interpolate}
		<!-- continuous -->

		<image
			x={marginLeft}
			y={marginTop}
			width={width - marginLeft - marginRight}
			height={height - marginTop - marginBottom}
			preserveAspectRatio="none"
			xlink:href={ramp(color.copy().domain(d3.quantize(d3.interpolate(0, 1), n)))}
		/>
	{:else if color.interpolator}
		<!-- sequential -->

		<image
			x={marginLeft}
			y={marginTop}
			width={width - marginLeft - marginRight}
			height={height - marginTop - marginBottom}
			preserveAspectRatio="none"
			xlink:href={ramp(color.interpolator())}
		/>
	{:else if color.invertExtent}
		<!--threshold -->
		<g>
			{#each color.range() as d, i}
				<rect
					x={x(i - 1)}
					y={marginTop}
					width={x(i) - x(i - 1)}
					height={height - marginTop - marginBottom}
					fill={d}
				/>
			{/each}
		</g>
	{:else}
		<!-- ordinal -->
		<g>
			{#each color.domain() as d, i}
				<rect
					x={x(d)}
					y={marginTop}
					width={Math.max(0, x.bandwidth() - 1)}
					height={height - marginTop - marginBottom}
					fill={color(d)}
				/>
			{/each}
		</g>
	{/if}

	<g id="ticks" bind:this={ticksRef} transform={`translate(0,${height - marginBottom})`} />

	<text x={0} y={height + 5} text-anchor="start" font-size="10px" fill="currentColor">
		{leftLabel}
	</text>

	<text x={width} y={height + 5} text-anchor="end" font-size="10px" fill="currentColor">
		{rightLabel}
	</text>

	{#if highlightedValue}
		<g transform={`translate(${x(highlightedValue)}, ${height - marginBottom + 10} ) scale(10) `}>
			<path d={`M-0.5,0 L0.5,0 L 0,-${Math.sqrt(2 / 3)} Z`} fill="black" />
		</g>
	{/if}
</svg>
