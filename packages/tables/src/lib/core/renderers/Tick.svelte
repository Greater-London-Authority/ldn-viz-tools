<script lang="ts">
	/**
	 * The `Tick` component renders a table cell representing a numerical value as a tick;
	 * the horizontal position of the tick encodes the value.
	 * See also: [Dot](./?path=/docs/tables-components-encodings-dot--documentation)
	 * @component
	 */

	import { format } from 'd3-format';
	import { getVal } from '../lib/getVal';

	/**
	 * Color of the tick, in any CSS format (color name, hex-string, `rgb()` notation, etc.).
	 */
	export let color: string | ((value: number) => string) = 'steelblue';

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

	export let extent: [number, number];

	$: d = (value - extent[0]) / (extent[1] - extent[0]);

	const fPercentage = format('0.0%');

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	$$restProps;
</script>

<div
	class="w-[3px] h-full top-0 transform -translate-x-1/2 z-[-1] relative"
	style="width: 3px"
	style:background={getVal(value, color)}
	style:left={fPercentage(d)}
>
	{#if showValues}
		<div class="pl-2">{f(value)}</div>
	{:else}
		<div>&nbsp;</div>
	{/if}
</div>
