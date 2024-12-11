<script lang="ts">
	/**
	 * The `Dot` component renders a table cell representing a numerical value as a tick;
	 * the horizontal position of the dot encodes the value.
	 * See also: [Tick](./?path=/docs/tables-renderers-tick--documentation)
	 * @component
	 */

	import { format } from 'd3-format';

	/**
	 * Color of the dot, in any CSS format (color name, hex-string, `rgb()` notation, etc.).
	 */
	export let color = 'steelblue';

	/**
	 * If `true`, then the numerical value will be displayed as text beside the symbol.
	 */
	export let showValues = true;

	/**
	 * The value to be encoded in the cell.
	 */
	export let value: number;

	/**
	 * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
	 * which is based on Python 3’s format specification mini-language (PEP 3101)).
	 */
	export let formatString = '0.0f';
	$: f = format(formatString);

	export let extent;

	let d;
	$: d = (value - extent[0]) / (extent[1] - extent[0]);

	const fPercentage = format('0.0%');

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	$$restProps;
</script>

<div
	class="opacity-100 rounded-sm w-[7px] h-[7px] mt-[-3.5px] ml-[-3.5px] relative"
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
