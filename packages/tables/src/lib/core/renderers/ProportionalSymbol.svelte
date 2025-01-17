<script lang="ts">
	/**
	 * The `ProportionalSymbol` component renders a table cell encoding a single value as a circle, with the radius encoding the value.
	 * @component
	 */
	import { format } from 'd3-format';

	/**
	 * The fill color of the proportional symbol.
	 */
	export let color = 'steelblue';

	/**
	 * The value to be encoded in the cell.
	 */
	export let value: number;

	/**
	 * If `true`, then the numerical value will be displayed as text beside the symbol.
	 */
	export let showValues = false;

	/**
	 * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
	 * which is based on Python 3’s format specification mini-language (PEP 3101)).
	 */
	export let formatString = '0.0f';
	$: f = format(formatString);

	/**
	 * Array containing the min and max values in the data; used ad domain for scale.
	 */
	export let extent: [number, number];

	$: r = Math.sqrt((value - extent[0]) / (extent[1] - extent[0]));

	const fPercentage = format('0.0%');

	// See the MDN docs on radial gradients: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	$$restProps;
</script>

<div
	style:background={`radial-gradient(circle closest-side, ${color} ${fPercentage(r)}, transparent ${fPercentage(r)})`}
	title=""
	class="lu-renderer-circle lu-detail le-td le-td-lu-c63 le-td-lu-c63T0"
	data-renderer="circle"
	data-group="d"
	data-id="col9"
>
	{#if showValues}
		<div>{f(value)}</div>
	{:else}
		<div>&nbsp;</div>
	{/if}
</div>
