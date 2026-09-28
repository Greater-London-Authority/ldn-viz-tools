<script lang="ts">
	import { theme } from '@ldn-viz/ui';

	/**
	 * The `<SymbolLegend>` component draws a legend using for a D3 symbol scale.
	 *
	 * @component
	 */

	// This file is based on
	// https://d3-legend.susielu.com/
	// Copyright 2015, Susie Lu
	// Released under the Apache-2.0 license.

	interface Props {
		/**
		 * A color token name.
		 */
		colorToken: any;
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

	let axisState = $derived.by(() => {
		let x;
		let n = 0;
		let tv = tickValues;

		let tickF: string | ((n: any) => string | null | undefined) | undefined = undefined;

		let tickAdjust = (g: any) =>
			g
				.selectAll('.tick line')
				.attr('y1', marginTop + marginBottom - height)
				.attr('stroke', theme.tokenNameToValue('text.muted'));

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
</script>

<svg
	width="100%"
	viewBox="0 0 {width} {height}"
	style="overflow: visible; display: block;"
	class="text-color-text"
>
	<!-- ordinal -->
	<g>
		{#each color.domain() as d, i (i)}
		<circle
			x={axisState.x(d)}
			y={marginTop}
			width={Math.max(0, axisState.x.bandwidth() - 1)}
			height={height - marginTop - marginBottom}
			fill={theme.tokenNameToValue(color, theme.currentTheme)}
		/>
		{/each}
	</g>
</svg>
