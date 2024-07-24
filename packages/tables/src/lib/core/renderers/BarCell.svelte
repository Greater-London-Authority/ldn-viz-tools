<script lang="ts">
	/**
	 * The `BarCell` component renders a table cell representing a numerical value as a bar, where the length of the bar encodes the value.
	 * @component
	 */

	import { format } from 'd3-format';

	/**
	 * The value to be encoded in the cell.
	 */
	export let value: number;

	/**
	 * Color of the bar, in any CSS format (color name, hex-string, `rgb()` notation, etc.).
	 */
	export let color: string | undefined = 'red';

	/**
	 * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
	 * which is based on Python 3’s format specification mini-language (PEP 3101)).
	 * If set to a falsy value, then bars will not be labelled with a value.
	 */
	export let formatString = '0.0f';

	export let extent = [0, 1]; // used to pass automatically extracted val
	export let domain; // allows extent to be over-ridden

	const formatPercent = format('0.0f');
	const scale = (val: number) => {
		if (domain) {
			return formatPercent((100 * (val - domain[0])) / (domain[1] - domain[0]));
		} else {
			return formatPercent((100 * (val - extent[0])) / (extent[1] - extent[0]));
		}
	};

	let f;
	$: if (formatString) {
		f = format(formatString);
	}
</script>

<div class="p-1">
	<div class="bg-core-grey-200 h-full flex relative text-xs">
		<div
			style={`width:${scale(+value)}%; background-color:${color}`}
			class="h-full text-right absolute left-0"
		/>

		{#if +value <= 0.4}
			<div class="relative p-1 ml-1" style={`padding-left:${scale(+value)}%`}>
				{#if formatString}{f(+value)}{/if}
			</div>
		{:else}
			<div class="relative p-1 text-right text-white" style={`width:${scale(+value)}%`}>
				{#if formatString}{f(+value)}{/if}
			</div>
		{/if}
	</div>
</div>
