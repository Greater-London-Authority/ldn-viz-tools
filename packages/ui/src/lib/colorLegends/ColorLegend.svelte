<script lang="ts">
	/**
	 * The `<ColorLegend>` component draws a legend for a D3 color scale.
	 *
	 * @component
	 */

	// This file is based on
	// https://observablehq.com/@d3/color-legend
	// Copyright 2021, Observable Inc.
	// Released under the ISC license.

	// It has been modified to use Svelte rather than just D3.js, and to allow a value on the scale to be highlighted.

	import { quantile, range } from 'd3-array';
	import { axisBottom } from 'd3-axis';
	import { format } from 'd3-format';
	import { interpolate, interpolateRound, quantize } from 'd3-interpolate';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { select } from 'd3-selection';

	interface Props {
		/**
		 * A d3 color scale object
		 */
		color: any;
		/**
		 * Title to display above the colors.
		 */
		title?: string;
		/**
		 * Height of the axis ticks (pixels).
		 */
		tickSize?: number;
		/**
		 * Width of the legend (pixels).
		 */
		width?: number;
		/**
		 * Height of the legend (pixels).
		 */
		height?: any;
		/**
		 * Top margin size (pixels).
		 */
		marginTop?: number;
		/**
		 * Right margin size (pixels).
		 */
		marginRight?: number;
		/**
		 * Bottom margin size (pixels).
		 */
		marginBottom?: any;
		/**
		 * Left margin size (pixels).
		 */
		marginLeft?: number;
		/**
		 * Suggested number of ticks (the number of ticks is not guaranteed to be the same as this)
		 */
		ticks?: any;
		/**
		 * Format string to apply to tick labels (see the [`d3-format` docs](https://d3js.org/d3-format#locale_format))
		 */
		tickFormat?: any;
		tickValues?: undefined | number[];
		/**
		 * Value to highlight on the scale with arrow.
		 */
		highlightedValue?: undefined | string | number;
		/**
		 * Label displayed below legend, on the left.
		 * Intended to describe the meaning of values at this end of the scale (e.g. "Younger" or "Less deprivation")
		 */
		leftLabel?: string;
		/**
		 * Label displayed below legend, on the right.
		 * Intended to describe the meaning of values at this end of the scale (e.g. "Older" or "More deprivation")
		 */
		rightLabel?: string;
		/**
		 * If `true`, then the legend will be reversed, so that it is drawn from left to right.
		 * Note that you will need to swap the value sof the `leftLabel` and `rightLabel` props yourself.
		 */
		reverse?: boolean;
	}

	let {
		color,
		title = '',
		tickSize = 6,
		width = 320,
		height = 44 + tickSize,
		marginTop = 18,
		marginRight = 0,
		marginBottom = 16 + tickSize,
		marginLeft = 0,
		ticks = width / 64,
		tickFormat = undefined,
		tickValues = $bindable(undefined),
		highlightedValue = undefined,
		leftLabel = '',
		rightLabel = '',
		reverse = false
	}: Props = $props();

	const ramp = (color: any, n = 256) => {
		const canvas = document.createElement('canvas');
		canvas.width = n;
		canvas.height = 1;
		const context = canvas.getContext('2d');
		if (context) {
			for (let i = 0; i < n; ++i) {
				context.fillStyle = color(i / (n - 1));

				const xp = reverse ? n - i : i;
				context.fillRect(xp, 0, 1, 1);
			}
		}
		return canvas.toDataURL();
	};

	let axisState = $derived.by(() => {
		let x;
		let n = 0;
		let tv = tickValues;

		let tickF: string | ((n: any) => string | null | undefined) | undefined = undefined;

		let tickAdjust = (g: any) =>
			g.selectAll('.tick line').attr('y1', marginTop + marginBottom - height);

		if (color.interpolate) {
			// continuous scale
			n = Math.min(color.domain().length, color.range().length);
			x = color.copy().rangeRound(quantize(interpolate(marginLeft, width - marginRight), n));
		} else if (color.interpolator) {
			// Sequential scale
			x = Object.assign(
				color
					.copy()
					.interpolator(
						reverse
							? interpolateRound(width - marginRight, marginLeft)
							: interpolateRound(marginLeft, width - marginRight)
					),
				{
					range() {
						return [marginLeft, width - marginRight];
					}
				}
			);

			// scaleSequentialQuantile doesn't implement ticks or tickFormat.
			if (!x.ticks) {
				if (tv === undefined) {
					n = Math.round(ticks + 1);
					tv = range(n).map((i) => quantile(color.domain(), i / (n - 1))!);
				}
				if (typeof tickFormat !== 'function') {
					tickF = format(tickFormat === undefined ? ',f' : tickFormat);
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
					? (d: any) => d
					: typeof tickFormat === 'string'
						? format(tickFormat)
						: tickFormat;

			x = scaleLinear()
				.domain([-1, color.range().length - 1])
				.rangeRound([marginLeft, width - marginRight]);

			tv = range(thresholds.length);
			tickF = (i: string | number) => thresholdFormat(thresholds[i]);
		} else {
			// ordinal scale
			x = scaleBand()
				.domain(color.domain())
				.rangeRound([marginLeft, width - marginRight]);

			tickAdjust = () => {};
		}

		if (reverse) {
			if (color.interpolator) {
				// this isn't a real D3 scale: flipping the domain won't work, so we did the reversing above
			} else if (x.domain()?.length > 2) {
				x.domain(x.domain().reverse());
			} else if (x.domain()) {
				x.domain(x.domain().reverse());
			} else {
				x = x.reverse();
			}
		}

		if (tickFormat && !tickF) {
			tickF = tickFormat;
		}

		return { x, n, tickF, tickAdjust, tickValues: tv };
	});

	let ticksRef: SVGElement | undefined = $state();

	$effect(() => {
		if (ticksRef) {
			const bottomAxis = axisBottom(axisState.x)
				.ticks(ticks, typeof axisState.tickF === 'string' ? axisState.tickF : undefined)
				.tickSize(tickSize)
				.tickValues(axisState.tickValues!);

			if (typeof axisState.tickF === 'function') {
				const formatter = axisState.tickF;
				bottomAxis.tickFormat((d, i) => {
					const value = formatter(d);
					return value ?? '';
				});
			}

			select(ticksRef)
				.call(bottomAxis as any, 0)
				.call(axisState.tickAdjust)
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
	});
</script>

<svg
	width="100%"
	viewBox="0  0 {width} {height}"
	style="overflow: visible; display: block;"
	class="text-color-text-primary"
>
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
			xlink:href={ramp(color.copy().domain(quantize(interpolate(0, 1), axisState.n)))}
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
					x={reverse ? axisState.x(i) : axisState.x(i - 1)}
					y={marginTop}
					width={reverse
						? axisState.x(i - 1) - axisState.x(i)
						: axisState.x(i) - axisState.x(i - 1)}
					height={height - marginTop - marginBottom}
					fill={d}
				/>
			{/each}
		</g>
	{:else}
		<!-- ordinal -->
		<g>
			{#each color.domain() as d}
				<rect
					x={axisState.x(d)}
					y={marginTop}
					width={Math.max(0, axisState.x.bandwidth() - 1)}
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
		<g
			transform={`translate(${axisState.x(highlightedValue)}, ${height - marginBottom + 10} ) scale(10) `}
		>
			<path d={`M-0.5,0 L0.5,0 L 0,-${Math.sqrt(2 / 3)} Z`} fill="black" />
		</g>
	{/if}
</svg>
