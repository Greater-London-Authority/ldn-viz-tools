<script lang="ts">
	/**
	 * The `Tick` component renders a table cell representing a numerical value as a tick;
	 * the horizontal position of the tick encodes the value.
	 * See also: [Dot](./?path=/docs/tables-components-encodings-dot--documentation)
	 * @component
	 */

	import { format } from 'd3-format';

	interface Props {
		/**
		 * Color of the tick, in any CSS format (color name, hex-string, `rgb()` notation, etc.).
		 */
		color?: string;
		/**
		 * If `true`, then the numerical value will be displayed as text beside the symbol.
		 */
		showValues?: boolean;
		/**
		 * The value to be encoded in the cell.
		 */
		value: number;
		/**
		 * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
		 * which is based on Python 3’s format specification mini-language (PEP 3101)).
		 */
		formatString?: string;
		extent: [number, number];
		[key: string]: any;
	}

	let {
		color = 'steelblue',
		showValues = true,
		value,
		formatString = '0.0f',
		extent,
		...rest
	}: Props = $props();

	const fPercentage = format('0.0%');

	let f = $derived(format(formatString));
	let d = $derived((value - extent[0]) / (extent[1] - extent[0]));
</script>

<div
	class="relative top-0 z-[-1] h-full w-[3px] -translate-x-1/2 transform"
	style="width: 3px"
	style:background={color}
	style:left={fPercentage(d)}
>
	{#if showValues}
		<div class="pl-2">{f(value)}</div>
	{:else}
		<div>&nbsp;</div>
	{/if}
</div>
