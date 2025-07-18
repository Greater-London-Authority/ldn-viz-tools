<script lang="ts">
	/**
	 * The `ProportionalSymbol` component renders a table cell encoding a single value as a circle, with the radius encoding the value.
	 * @component
	 */
	import { format } from 'd3-format';

	interface Props {
		/**
		 * The fill color of the proportional symbol.
		 */
		color?: string;
		/**
		 * The value to be encoded in the cell.
		 */
		value: number;
		/**
		 * If `true`, then the numerical value will be displayed as text beside the symbol.
		 */
		showValues?: boolean;
		/**
		 * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
		 * which is based on Python 3’s format specification mini-language (PEP 3101)).
		 */
		formatString?: string;
		/**
		 * Array containing the min and max values in the data; used ad domain for scale.
		 */
		extent: [number, number];
		[key: string]: any;
	}

	let {
		color = 'steelblue',
		value,
		showValues = false,
		formatString = '0.0f',
		extent,
		...rest
	}: Props = $props();

	const fPercentage = format('0.0%');

	// See the MDN docs on radial gradients: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient

	let f = $derived(format(formatString));
	let r = $derived(Math.sqrt((value - extent[0]) / (extent[1] - extent[0])));
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
