<script lang="ts">
	/**
	 * The `Dot` component renders a table cell representing a numerical value as a tick;
	 * the horizontal position of the dot encodes the value.
	 * See also: [Tick](./?path=/docs/tables-components-renderers-tick--documentation)
	 * @component
	 */

	import { format } from 'd3-format';

	interface Props {
		/**
		 * Color of the dot, in any CSS format (color name, hex-string, `rgb()` notation, etc.).
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
		extent: any;
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

	let d = $derived((value - extent[0]) / (extent[1] - extent[0]));

	const fPercentage = format('0.0%');

	let f = $derived(format(formatString));
</script>

<div
	class="relative ml-[-3.5px] mt-[-3.5px] h-[7px] w-[7px] rounded-sm opacity-100"
	style="width: 7px; height: 7px;"
	style:background-color={color}
	style:left={fPercentage(d)}
>
	{#if showValues}
		<div class="pl-2">{f(value)}</div>
	{:else}
		<div>&nbsp;</div>
	{/if}
</div>
