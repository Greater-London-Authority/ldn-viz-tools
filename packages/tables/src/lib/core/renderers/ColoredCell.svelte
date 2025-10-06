<script lang="ts">
	/**
	 * The `ColoredCell` component renders a table cell representing a numerical value as a label, with the background color encoding the value.
	 * See also [ColorAndLabel](./?path=/docs/tables-components-renderers-colorandlabel--documentation).
	 * @component
	 */

	import { format, hsl, type ScaleThreshold } from 'd3';
	import { getVal } from '../lib/getVal';

	/**
	 * The value to be encoded in the cell.
	 */
	export let value: number;

	/**
	 * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
	 * which is based on Python 3’s format specification mini-language (PEP 3101)).
	 * If set to a falsy value, then bars will not be labelled with a value.
	 */
	export let formatString = '.2f';

	/**
	 * A D3 color scale used to determine cell background color.
	 */
	export let color: ScaleThreshold<string | number, string> | (() => string) | string;

	$: f = format(formatString);
</script>

{#if !color}
	<span />
{:else if value}
	<span
		class={`text-right flex h-full justify-end p-2 items-center`}
		style={`background-color: ${getVal(value, color)}; color: ${
			hsl(getVal(value, color).toString()).l >= 0.6 ? '#000000' : '#FFFFFF'
		}`}
	>
		{#if formatString}{f(+value)}{/if}
	</span>
{/if}
