<script lang="ts">
	/**
	 * The `ColorAndLabel` component renders a table cell representing a numerical value as a label, next to a small square with a background color encoding the value.
	 * See also [ColoredCell](./?path=/docs/tables-components-renderers-coloredcell--documentation).
	 * @component
	 */

	interface Props {
		/**
		 * The value to be encoded in the cell.
		 */
		value: number;
		/**
		 * A D3 color scale used to determine cell background color.
		 */
		colorScale: any;
	}

	let { value, colorScale }: Props = $props();
</script>

<div class="flex h-full items-center">
	<div
		class="mr-1 h-4 w-4 flex-none"
		style={`background-color: ${colorScale ? colorScale(value) : 'lightgrey'};`}
	></div>
	<div class="w-0 flex-auto items-center overflow-hidden truncate">{value}</div>
</div>
