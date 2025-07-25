<script lang="ts">
	/**
	 * The `ColoredCell` component renders a table cell representing a numerical value as a label, with the background color encoding the value.
	 * See also [ColorAndLabel](./?path=/docs/tables-components-renderers-colorandlabel--documentation).
	 * @component
	 */

	import { hsl } from 'd3-color';
	import { format } from 'd3-format';
	import { type ScaleThreshold } from 'd3-scale';

	interface Props {
		/**
		 * The value to be encoded in the cell.
		 */
		value: number;
		/**
		 * Format string defining how the number should be formatted for display (expressed in `d3-format`'s [notation](https://d3js.org/d3-format#locale_format),
		 * which is based on Python 3’s format specification mini-language (PEP 3101)).
		 * If set to a falsy value, then bars will not be labelled with a value.
		 */
		formatString?: string;
		/**
		 * A D3 color scale used to determine cell background color.
		 */
		colorScale: ScaleThreshold<string | number, string> | (() => string);
	}

	let { value, formatString = '.2f', colorScale }: Props = $props();

	let f = $derived(format(formatString));
</script>

{#if !colorScale}
	<span></span>
{:else if value}
	<span
		class="flex h-full items-center justify-end p-2 text-right"
		style={`background-color: ${colorScale(value)}; color: ${
			hsl(colorScale(value).toString()).l >= 0.6 ? '#000000' : '#FFFFFF'
		}`}
	>
		{#if formatString}{f(+value)}{/if}
	</span>
{/if}
